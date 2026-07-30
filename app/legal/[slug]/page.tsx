import fs from "node:fs";
import path from "node:path";
import { isValidElement, type ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import LegalHeader from "@/components/sections/LegalHeader";
import LegalContents, { type Heading } from "@/components/sections/LegalContents";
import { findPolicy, policies } from "@/lib/legal";

/**
 * One route for all five legal pages (§7.9). The documents live as markdown in
 * content/legal/ — the form they are drafted and reviewed in — and are read at
 * build time and rendered here. react-markdown runs on the server only, so none
 * of it reaches the browser.
 *
 * Adding a policy is a markdown file plus an entry in lib/legal.ts; nothing in
 * this file changes.
 */

type Params = { params: Promise<{ slug: string }> };

/** Every policy is a known route, so an unknown slug is a 404 rather than a miss. */
export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map(({ slug }) => ({ slug }));
}

type Document = { title: string; effective: string; body: string };

/**
 * Splits a policy into its title, its effective/version line, and the body.
 *
 * Both sit in the markdown rather than in lib/legal.ts because they are facts
 * about the document — keeping a second copy in TypeScript is how a page ends up
 * claiming a version the document it renders does not carry. They are lifted out
 * of the body because the page heading and the header band present them; leaving
 * them in would print each twice, and would put an `h1` inside the article.
 */
function readDocument(slug: string): Document | null {
  const file = path.join(process.cwd(), "content", "legal", `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(/^#\s+(.+?)\n+_(.+?)_\n+([\s\S]*)$/);
  if (!match) return null;

  const [, title, effective, body] = match;
  return { title, effective, body };
}

/**
 * A heading's anchor. Used twice — once to build the contents rail, once to put
 * the `id` on the rendered heading — so the two must agree exactly; that is why
 * it is one function rather than a rule applied twice.
 */
function anchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The document's sections, in order, at whatever depth that document actually
 * uses.
 *
 * Four of the five number their sections at `##` and put detail under `###` —
 * carrying both would give the Privacy Policy a thirty-six-entry rail, so only
 * the numbered sections go in. The Responsible AI Policy is built the other way:
 * four `##` sections, with the seven principles that are the substance of the
 * page sitting at `###` beneath one of them. A rail of four there maps nothing
 * worth mapping, so below six top-level sections the rail follows the document
 * down a level.
 */
const TOP_LEVEL_FLOOR = 6;

function contentsOf(body: string): Heading[] {
  const all = [...body.matchAll(/^(#{2,3}) +(.+?)\s*$/gm)].map(([, hashes, label]) => ({
    id: anchor(label),
    label,
    level: hashes.length as 2 | 3,
  }));

  const top = all.filter((heading) => heading.level === 2);
  return top.length < TOP_LEVEL_FLOOR ? all : top;
}

/** Heading text, for the anchor. The headings across all five documents are plain
 *  text today; this walks children anyway so a future `**bold**` in one does not
 *  silently produce an empty id. */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const policy = findPolicy(slug);
  const document = policy && readDocument(slug);
  if (!policy || !document) return {};

  return {
    title: document.title,
    description: policy.summary,
    alternates: { canonical: `/legal/${slug}` },
  };
}

/**
 * Three overrides, all structural rather than cosmetic — everything else is
 * styled by element in prose.css.
 */
const components: Components = {
  // The contents rail anchors to these, so every section heading needs an id.
  // Both levels get one whether or not the rail lists them — an id costs nothing
  // and makes any section of any policy linkable from outside.
  h2({ node, children, ...rest }) {
    void node;
    return (
      <h2 id={anchor(textOf(children))} {...rest}>
        {children}
      </h2>
    );
  },
  h3({ node, children, ...rest }) {
    void node;
    return (
      <h3 id={anchor(textOf(children))} {...rest}>
        {children}
      </h3>
    );
  },
  // Cross-references between the policies are internal routes, so they get
  // client-side navigation like every other link on the site. External ones stay
  // plain anchors.
  a({ href, children, ...rest }) {
    return href?.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} rel="noopener" {...rest}>
        {children}
      </a>
    );
  },
  // The cookie tables are wider than the reading column at narrow widths. Each
  // scrolls inside its own box so the page body never scrolls sideways.
  table({ node, ...rest }) {
    void node;
    return (
      <div className="prose-scroll">
        <table {...rest} />
      </div>
    );
  },
};

export default async function LegalPolicyPage({ params }: Params) {
  const { slug } = await params;
  const policy = findPolicy(slug);
  const document = policy && readDocument(slug);
  if (!policy || !document) notFound();

  return (
    <>
      <LegalHeader
        title={document.title}
        effective={document.effective}
        summary={policy.summary}
      />
      {/* The rail and the document. `minmax(0, …)` on the second column rather
          than `1fr`: a grid item's min-width is auto, so the cookie tables'
          min-width would otherwise widen the column instead of scrolling inside
          it, and the rail would be squeezed. */}
      <div className="shell grid gap-10 py-16 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-24">
        <LegalContents headings={contentsOf(document.body)} />
        {/* 54ch, not the 65–75 the unit's name suggests: `ch` is the width of a
            zero, and Instrument Sans's is wide (11.3px at the body size), so this
            measures out at ~75 characters — the top of the comfortable range for
            a document read in long sittings. */}
        <article className="prose max-w-[54ch]">
          <Markdown remarkPlugins={[remarkGfm]} components={components}>
            {document.body}
          </Markdown>
        </article>
      </div>
    </>
  );
}
