"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A hairline that draws itself across its container, left to right, when it comes
 * into view. Used on the new-model beats, where the rule is structural rather than
 * decorative — it's the line each block is written along.
 *
 * `scaleX` from `origin-left` rather than an animated `width`: width is a layout
 * property and would relayout the row on every frame, where a transform is
 * composited. Scaling a 1px-tall box horizontally leaves its height alone, so
 * there is no need to counter-scale anything.
 *
 * Deliberately kept as its own element rather than a pseudo-element on the block:
 * the block itself slides in horizontally, and a rule drawing inside a translating
 * parent would compound the two transforms — the line's end point would move while
 * it was being drawn. Separate elements, one transform each.
 *
 * Matches `Reveal`'s duration/easing and viewport margin, so the rule and the copy
 * that follows it read as one arrival. Static under reduced motion.
 */
export default function DrawRule({
  className = "",
  /** Stagger offset in seconds. */
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const base = `h-px origin-left bg-[color:var(--border)] ${className}`;

  if (reduce) return <div aria-hidden className={base} />;

  return (
    <motion.div
      aria-hidden
      className={base}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}
