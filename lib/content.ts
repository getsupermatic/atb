/**
 * Home-page section copy, as data.
 *
 * Separate from lib/site.ts, which holds the site-wide facts (nav, products,
 * footer, metadata) that every page needs. This is per-section content, kept out
 * of the components for two reasons: most of it will reappear on the pages still
 * to be built — the pillars on What-we-do, the engagement models on How-we-work —
 * and copy changes should not mean editing JSX.
 *
 * Presentational details stay with their section. The engagement-model icons are
 * SVG components in WaysToWork.tsx, and the per-mark render heights below are the
 * exception that has to live with the data because it is a property of each piece
 * of artwork rather than of the layout.
 *
 * Copy drawn from the Master Copy Deck (briefs/documents).
 */

/** Rolling strip at the foot of the hero panel (brief §2.1). */
export const heroKeywords = [
  "AI-native products",
  "Frontline innovation",
  "Voice-first UX",
  "Generative commerce",
  "Marketing intelligence",
] as const;

/**
 * Trusted-by marks (cleared). `size` is the render height in px, tuned per mark
 * so they read at a similar optical size despite differing intrinsic padding and
 * aspect. `opacity` is the resting opacity. `dim` is an optional resting filter
 * for artwork that is intrinsically pale, and `hover` overrides the default
 * reveal-the-brand-colour rollover.
 */
export const CLIENT_HOVER_DEFAULT = "hover:opacity-100 hover:grayscale-0 hover:brightness-100";

/** Annotated rather than inferred: `as const` alone narrows each entry to its own
 *  literal type, so the optional keys would not exist on the ones that omit them. */
type Client = {
  src: string;
  alt: string;
  /** Intrinsic dimensions, for next/image's aspect ratio. */
  w: number;
  h: number;
  /** Render height in px. */
  size: number;
  opacity?: number;
  dim?: string;
  hover?: string;
};

export const clients: readonly Client[] = [
  { src: "/images/clients/burger-king.png", alt: "Burger King", w: 4000, h: 2400, size: 67, opacity: 0.85 },
  { src: "/images/clients/pepsico.png", alt: "PepsiCo", w: 3840, h: 2160, size: 65, opacity: 0.7 },
  {
    src: "/images/clients/john-lewis.png", alt: "John Lewis & Partners", w: 3840, h: 2160, size: 63,
    opacity: 0.85,
    // The mark is black, so revealing its own colour would do nothing. Tinted
    // Copper instead: brightness(0) flattens it, then the invert/sepia/hue chain
    // lifts it back up to the accent.
    hover: "hover:opacity-100 hover:[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(60%)_saturate(520%)_hue-rotate(1deg)_brightness(92%)_contrast(88%)]",
  },
  {
    src: "/images/clients/nestle.webp", alt: "Nestlé", w: 960, h: 276, size: 34,
    // A native light-grey line logo, so it needs darkening to sit with the
    // others, and its rollover stays monochrome — revealing its pale colour
    // would read as LOWER contrast, not higher.
    opacity: 1, dim: "brightness-[0.5]",
    hover: "hover:opacity-100 hover:brightness-[0.3] hover:contrast-[1.5]",
  },
  { src: "/images/clients/diageo.png", alt: "Diageo", w: 2237, h: 516, size: 24 },
] as const;

/**
 * Problem section — the three figures on the copper band. Annotated for the same
 * reason as `clients`: `as const` alone would narrow away the optional keys.
 * Fields map onto CountUp's props.
 */
type Stat = {
  value: number;
  /** Where the count starts. Defaults to 0. */
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: readonly Stat[] = [
  {
    value: 100,
    suffix: "M+",
    label:
      "frontline workers in the US alone — the largest, most underserved workforce for AI-driven productivity.",
  },
  {
    value: 1,
    // Counts DOWN from 100 rather than up from 0 — the figure is about how little
    // of the spend reached the floor, so the fall is the point.
    from: 100,
    prefix: "~",
    suffix: "%",
    label:
      "of enterprise software investment has reached the store floor. Without purpose-built products, AI repeats the mistake.",
  },
  {
    value: 4.4,
    decimals: 1,
    prefix: "$",
    suffix: "T",
    label:
      "long-term AI productivity opportunity (McKinsey) — yet 60%+ of companies see no significant impact today.",
  },
] as const;

/** A new model — the four ruled beats scrolling past the sticky headline. */
export const pillars = [
  {
    title: "Products, not seats.",
    body: "Rebuild the SaaS you rent as a product that's truly yours — just the features you need, customised to how you work, without the per-seat bill.",
  },
  {
    title: "Shaped to your reality.",
    body: "Start from our IP and customise to how your business actually runs — accelerating delivery without starting from scratch.",
  },
  {
    title: "Frontier, in weeks.",
    body: "Co-create new capabilities at the edge of what is possible — with rapid pilots tested in real operating environments.",
  },
  {
    title: "Outcomes, not hours.",
    body: "Use commercial models tied to the value created and the IP leveraged, not people multiplied by rates.",
  },
] as const;

/**
 * Three ways to work with us. `icon` names the SVG in WaysToWork.tsx rather than
 * holding markup, so the copy stays free of presentation.
 */
export const engagementModels = [
  {
    icon: "deploy",
    name: "Subscribe & Deploy",
    kicker: "AI Blueprints",
    body: "Immediate access to a production-ready product. Fully managed, maintained and continuously improved.",
  },
  {
    icon: "forward",
    name: "Customise & Accelerate",
    kicker: "Forward Deploy",
    body: "Our Blueprints, shaped to your brand, workflows, systems and operating reality.",
  },
  {
    icon: "frontier",
    name: "Co-Innovate & Pioneer",
    kicker: "Frontier Advisory",
    body: "New capabilities built with your team at the edge of what AI can do — tested in the real world.",
  },
] as const;

/** ATBOS — the statements that slide through the pinned panel, in order. */
export const atbosStatements = [
  "The AI-native operating system we've built the whole company on, and the reason we deliver faster, at lower cost, and smarter.",
  "One intelligent system runs the entire business — every pipeline, project, decision and delivery, in a single always-current view.",
  "An agentic engine sits at its core — scoping, building, shipping and improving every product we make.",
  "We build smarter, sharper and more consistently than ever — more creative, more innovative, and more informed with every decision.",
] as const;
