"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Cream print-grain parallax texture (§5.4). Quiet atmosphere, not decoration:
 * a fixed grain layer drifts on a transform (GPU-friendly, no repaint-heavy
 * background-position animation). Hidden under reduced-motion (also via CSS).
 */
export default function GrainBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  if (reduce) return null;

  return <motion.div aria-hidden className="grain-overlay" style={{ y }} />;
}
