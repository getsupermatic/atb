/**
 * The legal & policy pages, as data.
 *
 * Each entry pairs a route with the document that fills it: the markdown lives in
 * `content/legal/<slug>.md`, so the slug is the filename and there is no second
 * field to keep in step. Title and effective date are read from the document
 * itself — they are facts about the policy, and duplicating them here would let
 * the page and the document disagree.
 *
 * Order matches the footer's Legal column (lib/site.ts), which is also the order
 * the sibling links render in on every page.
 */

export type Policy = {
  /** Route segment and content filename. */
  slug: string;
  /** Short label — the footer column and the sibling-policy links. */
  label: string;
  /** One line under the page heading, and the page's meta description. */
  summary: string;
};

export const policies: readonly Policy[] = [
  {
    slug: "responsible-ai",
    label: "Responsible AI",
    summary:
      "The principles behind every system we design, deploy and operate — and how we keep humans accountable for them.",
  },
  {
    slug: "ai-transparency",
    label: "AI transparency",
    summary:
      "How we use AI in our own work, how we build it for clients, and what we tell the people it touches.",
  },
  {
    slug: "privacy",
    label: "Privacy",
    summary:
      "How we collect, use, store, share and protect personal data — and the rights you have over it.",
  },
  {
    slug: "terms",
    label: "Terms",
    summary: "The terms that govern your use of this website.",
  },
  {
    slug: "cookies",
    label: "Cookies",
    summary:
      "The cookies and similar technologies this site uses, and how to change your choices.",
  },
] as const;

export function findPolicy(slug: string): Policy | undefined {
  return policies.find((policy) => policy.slug === slug);
}
