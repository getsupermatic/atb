/**
 * Shared site data — single source for nav, products, footer links and
 * canonical metadata. Copy drawn from the Master Copy Deck (§2).
 */

export const site = {
  name: "ATB.",
  legalName: "At Beyond Limited",
  fullName: "At The Beyond",
  domain: "https://atbeyond.com",
  email: "info@atbeyond.com",
  tagline: "AI-native products for the customer frontline.",
  description:
    "At The Beyond is an AI-native product and consulting company built for the customer frontline. We imagine, build and forward-deploy AI products for everywhere your business meets the customer — operations, commerce and marketing.",
  social: {
    linkedin: "https://www.linkedin.com/company/atbeyond",
    x: "https://x.com/atbeyond",
  },
} as const;

/**
 * The primary nav row.
 *
 * Three of the four are ANCHORS into the homepage rather than routes: the dedicated
 * What-we-think / How-we-work / What-we-do pages are not built yet, so each points
 * at the homepage section that carries its argument today. Careers is the one real
 * route. When a dedicated page ships, change its href here and nothing else needs
 * to move — the section ids can stay where they are.
 *
 * The mapping, and the sections that own these ids:
 *
 *   What we think → CapabilityGap  "Capability now advances by the month. Most
 *                                  frontline tools still change by the year."
 *   How we work   → NewModel    "A new model for a changed world." — products not
 *                                seats, outcomes not hours
 *   What we do    → Products    "Production-ready AI blueprints."
 *
 * Nav order follows page order, which is why How-we-work sits before What-we-do.
 *
 * Insights is deliberately absent — the page is still a stub carrying the closing
 * band alone. The route stands but nothing links to it, in nav or footer, and it
 * comes back here when the editorial index is built.
 *
 * footerNav.Company mirrors this row exactly; change one, change the other.
 */
export const primaryNav = [
  { label: "What we think", href: "/#what-we-think" },
  { label: "How we work", href: "/#how-we-work" },
  { label: "What we do", href: "/#what-we-do" },
  { label: "Careers", href: "/careers" },
] as const;

/**
 * `image` is optional and present only where real artwork exists. CommerceOS and
 * MarketingOS have none yet, and they deliberately carry no key rather than a
 * placeholder: the Products spread renders them as type only, and a borrowed
 * photograph there put the hero's own shot on the page twice.
 * Add the key when artwork lands — no consumer needs changing, they just start
 * rendering a plate.
 */
type Product = {
  name: string;
  status: string | null;
  href: string;
  image?: string;
  summary: string;
  proof: string;
};

export const products: readonly Product[] = [
  {
    name: "FrontlineOS",
    status: "Live",
    href: "/products/frontline-os",
    // A colleague on a headset serving a customer in the produce aisle — the
    // frontline moment FrontlineOS supports. Already a clean monochrome plate,
    // so Products.tsx runs it through .grade-film, the same grade as the header.
    image: "/images/product-frontline-os-mono.webp",
    summary:
      "An AI-native operating layer for frontline teams. Integrated with the common platforms and tools — from scheduling systems to SOP libraries — to provide a single, unified view, with voice-first guidance, real-time knowledge and a seamless connection to central operations and the back office.",
    proof: "40%+ frontline productivity.",
  },
  {
    name: "CommerceOS",
    status: null,
    href: "/products/commerce-os",
    summary:
      "AI-native commerce that bridges frontline staff, contact-centre agents and customers. Conversational experiences that lift both service and top line.",
    proof: "15–25% revenue uplift.",
  },
  {
    name: "MarketingOS",
    status: null,
    href: "/products/marketing-os",
    summary:
      "A unified marketing intelligence and experience layer — AI-native strategy, campaign, creative and communications across your whole stack.",
    proof: "50%+ cost reduction. 10× faster campaigns.",
  },
] as const;

export const footerNav = {
  // Mirrors primaryNav — same labels, same homepage anchors, same order.
  Company: [
    { label: "What we think", href: "/#what-we-think" },
    { label: "How we work", href: "/#how-we-work" },
    { label: "What we do", href: "/#what-we-do" },
    { label: "Careers", href: "/careers" },
  ],
  Products: [
    { label: "FrontlineOS", href: "/products/frontline-os" },
    { label: "CommerceOS", href: "/products/commerce-os" },
    { label: "MarketingOS", href: "/products/marketing-os" },
  ],
  More: [
    { label: "Contact", href: "/contact" },
    { label: "info@atbeyond.com", href: "mailto:info@atbeyond.com" },
  ],
  Legal: [
    { label: "Responsible AI", href: "/legal/responsible-ai" },
    { label: "AI Transparency Policy", href: "/legal/ai-transparency" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
} as const;
