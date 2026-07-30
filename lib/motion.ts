/**
 * Shared motion tokens (brief §5.6: "define shared tokens so motion feels like
 * one system … reuse everywhere").
 *
 * These mirror the --ease-* / --dur-* custom properties in globals.css. The
 * duplication is unavoidable rather than careless: Framer Motion needs easing as
 * a numeric array and GSAP as its own named string, and neither can read a CSS
 * custom property. Keeping both sides in one file at least means there is a
 * single place to change a curve, and a single place that records they must
 * agree.
 *
 * CSS owns anything a stylesheet can express (transitions, keyframes). This file
 * owns anything driven by JS.
 */

/** Cubic-bezier control points, as Framer Motion wants them. */
export const EASE = {
  /** Decelerating, long tail. The house entrance curve for reveals. */
  entrance: [0.16, 1, 0.3, 1],
  /** Accelerating. For things leaving, where a long tail reads as a stall. */
  exit: [0.4, 0, 1, 1],
  /** Symmetric. For state changes that are neither arriving nor leaving. */
  standard: [0.4, 0, 0.2, 1],
  /**
   * Plain cubic-out. Gentler than `entrance`, which covers most of its travel in
   * the first third — at long durations that reads as a snap. Used by WordReveal,
   * where the slide has to stay legible to someone still scrolling.
   */
  out: [0.33, 1, 0.68, 1],
  /** In-out, for the nav bar's slide away and back. */
  nav: [0.65, 0, 0.35, 1],
} as const;

/** Seconds. Matches --dur-* in globals.css, plus the JS-only longer beats. */
export const DUR = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  /** The standard section reveal — Reveal, DrawRule and the hero stagger. */
  reveal: 0.7,
} as const;

/**
 * How far into the viewport an element must come before it counts as arrived.
 * Negative bottom margin, so things trigger a little before they are fully in
 * view rather than exactly on the edge.
 */
export const VIEWPORT_MARGIN = "0px 0px -12% 0px";

/** For `whileInView` — fires once and stays put. */
export const VIEWPORT_ONCE = { once: true, margin: VIEWPORT_MARGIN } as const;

/**
 * For `useInView` on effects that reverse when they leave, so passing back
 * through a section replays them (CountUp, WordReveal, the footer's full stop).
 */
export const VIEWPORT_REPLAY = { margin: VIEWPORT_MARGIN } as const;

/**
 * Scroll-linked panel morphs (brief §5.2). The whole section is the runway: the
 * morph starts when its top hits the top of the viewport and finishes when its
 * bottom does, which is why every morph section is taller than the screen — the
 * extra height IS the scroll distance.
 *
 * `scrub: 0.6` rather than `true`: a fractional value adds a short catch-up
 * easing, so the morph settles instead of tracking the scroll position exactly.
 */
export const MORPH_SCRUB = 0.6;

export const MORPH_TRIGGER = {
  start: "top top",
  end: "bottom bottom",
  scrub: MORPH_SCRUB,
} as const;
