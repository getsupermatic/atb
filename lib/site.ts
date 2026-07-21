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
    linkedin: "https://www.linkedin.com/company/at-the-beyond",
    x: "https://x.com/atbeyond",
  },
} as const;

export const primaryNav = [
  { label: "Who we are", href: "/who-we-are" },
  { label: "What we do", href: "/what-we-do" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
] as const;

export const products = [
  {
    name: "FrontlineOS",
    status: "Live",
    href: "/products/frontline-os",
    image: "/images/product-frontline.webp",
    summary:
      "An AI-native operating layer for frontline teams. Voice-first guidance, real-time knowledge, and a seamless line to the contact centre and back office behind them.",
    proof: "40%+ frontline productivity.",
  },
  {
    name: "CommerceOS",
    status: null,
    href: "/products/commerce-os",
    image: "/images/product-commerce.webp",
    summary:
      "AI-native commerce that bridges frontline staff, contact-centre agents and customers. Conversational experiences that lift both service and top line.",
    proof: "15–25% revenue uplift.",
  },
  {
    name: "MarketingOS",
    status: null,
    href: "/products/marketing-os",
    image: "/images/product-marketing.webp",
    summary:
      "A unified marketing intelligence and experience layer — AI-native strategy, campaign, creative and communications across your whole stack.",
    proof: "50%+ cost reduction. 10× faster campaigns.",
  },
] as const;

export const footerNav = {
  Company: [
    { label: "Who we are", href: "/who-we-are" },
    { label: "What we do", href: "/what-we-do" },
    { label: "How we work", href: "/how-we-work" },
    { label: "Careers", href: "/careers" },
  ],
  Products: [
    { label: "FrontlineOS", href: "/products/frontline-os" },
    { label: "CommerceOS", href: "/products/commerce-os" },
    { label: "MarketingOS", href: "/products/marketing-os" },
  ],
  More: [
    { label: "Insights", href: "/insights" },
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
