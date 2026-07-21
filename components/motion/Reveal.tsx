"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Section reveal (§5.5): gentle fade + slide-up on enter, staggerable for
 * groups. Editorial, not bouncy. Under reduced-motion it renders statically.
 */
type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Slide-in direction — "up" (default), or "left"/"right" for parallax panels. */
  from?: "up" | "left" | "right";
  /** Travel distance in px (overrides the per-direction default). */
  distance?: number;
  as?: "div" | "li" | "section";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  distance,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const d = distance ?? (from === "up" ? 28 : 64);
  const offset =
    from === "up"
      ? { y: d, x: 0 }
      : from === "left"
        ? { x: -d, y: 0 }
        : { x: d, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
