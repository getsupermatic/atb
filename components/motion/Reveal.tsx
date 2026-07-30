"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { DUR, EASE, VIEWPORT_ONCE } from "@/lib/motion";

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
  const reduce = usePrefersReducedMotion();
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
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DUR.reveal, ease: EASE.entrance, delay }}
    >
      {children}
    </MotionTag>
  );
}
