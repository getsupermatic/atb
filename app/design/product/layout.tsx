import type { Metadata } from "next";
/**
 * The product layer, imported HERE rather than through app/globals.css.
 *
 * That keeps it off every marketing page — nothing on the public site resolves
 * a single one of these variables — and it keeps the sheet honest about being
 * portable: it is loaded on its own, with no Tailwind preflight ordering to
 * lean on, which is exactly how the product codebase will load it.
 */
import "@/app/styles/product.css";

export const metadata: Metadata = {
  title: "Product design system",
  // Internal reference, not a page of the site. It is absent from
  // app/sitemap.ts (an explicit allowlist) and disallowed in app/robots.ts;
  // this is the third lock, for crawlers that arrive at the URL directly.
  robots: { index: false, follow: false },
};

export default function ProductDesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
