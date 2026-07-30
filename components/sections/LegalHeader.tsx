type Props = {
  /** The document's own title, read from the markdown. */
  title: string;
  /** The "Effective: … · Version: …" line, likewise. */
  effective: string;
  summary: string;
};

/**
 * The band at the top of every legal page: the title, what the policy covers,
 * and the version it is at. Moving around inside the document is LegalContents'
 * job, in the rail beside it; moving between policies is the footer's.
 *
 * It is a dark band by necessity, not decoration. At the top of the page the nav
 * has no container at all and sits bare in Cream over whatever is beneath it
 * (see Nav) — a document opening straight onto the paper canvas would render the
 * logo and links invisible. Same Ink field as the footer, so the page is
 * bracketed by the two.
 */
export default function LegalHeader({ title, effective, summary }: Props) {
  return (
    <header
      className="theme-dark relative"
      style={{ backgroundColor: "var(--color-ink-deep)" }}
    >
      <div className="shell relative z-10 pb-16 pt-32 lg:pb-20 lg:pt-40">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 max-w-[18ch] text-4xl">{title}</h1>
        <p className="mt-6 max-w-[54ch] text-lg text-[color:var(--text-muted)]">{summary}</p>
        <p className="mt-8 text-sm text-[color:var(--text-muted)]/80">{effective}</p>
      </div>
    </header>
  );
}
