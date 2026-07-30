"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { EASE, MORPH_SCRUB, VIEWPORT_ONCE } from "@/lib/motion";
import GradedImage from "@/components/motion/GradedImage";

/**
 * A graded photographic plate that wipes in when it arrives and drifts slower
 * than the page as it passes — the brief's §5.3 "layered speeds", where the
 * foreground copy moves at scroll speed and the imagery lags behind it.
 *
 * Three layers, three elements, one transform each — following the rule recorded
 * on `DrawRule`: an animated transform nested inside another animating transform
 * compounds, and the inner element's end point moves while it is being animated.
 *
 *   frame  — the aspect box. Carries the clip-path wipe and the GSAP trigger.
 *   pan    — over-sized wrapper inside the grade. Carries the yPercent drift.
 *   grain / vignette — siblings of `pan`, and deliberately STILL. They are the
 *            grade's own overlays; a vignette that travelled with the picture
 *            would drag its own soft edges through the frame. (The same
 *            reasoning the retired hover-scale on the product cards carried.)
 *
 * The drift is scrubbed but NOT pinned. CapabilityGap and ATBOS both own the
 * pinned card→full-bleed morph, and a third pin on one page reads as a tic; an
 * unpinned trigger also needs no scroll runway, so it cannot collide with either
 * of their sticky sections.
 *
 * `pan` is 24% taller than the frame (−12% top and bottom) against a ±8 yPercent
 * travel. That is 8% of the wrapper's own height, so ±9.6% of the frame's — and
 * the slack is 12% each way. The margin is deliberate: at ±8 against a 20%
 * over-size the travel would be 9.6% against 10% of slack, and a subpixel
 * rounding error would pull the wrapper's own edge into frame.
 *
 * `.grade-film` supplies the grade itself (saturation, gamma, black/white
 * points) and is already `position: absolute; inset: 0; overflow: hidden`, so it
 * is the containing frame for `pan`. The recipe stays in one place — see
 * `components/brand/FilmGrade.tsx`.
 */
export default function PlateReveal({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Frame classes — the aspect ratio belongs here. */
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const pan = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    // One source of truth for both motion sets — the same value governs the GSAP
    // drift here and the Framer wipe below.
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pan.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            // The whole time the frame is on screen, so the drift is a full
            // pass rather than a movement that starts once you are level with it.
            start: "top bottom",
            end: "bottom top",
            scrub: MORPH_SCRUB,
          },
        },
      );
    }, frame);

    return () => ctx.revert();
  }, [reduce]);

  // Uncovers left to right — from the copy's gutter out toward the bleed edge,
  // so the wipe travels the same way the plate runs off the page. Both keyframes
  // carry a % unit: framer-motion interpolates the inset() arguments, and a bare
  // 0 against a 100% would not pair up.
  const wipe = reduce
    ? {}
    : {
        initial: { clipPath: "inset(0 100% 0 0)" },
        whileInView: { clipPath: "inset(0 0% 0 0)" },
        viewport: VIEWPORT_ONCE,
        transition: { duration: 0.9, ease: EASE.entrance },
      };

  return (
    <motion.div ref={frame} className={`relative overflow-hidden ${className}`} {...wipe}>
      {/* The image goes in as a child rather than via GradedImage's own `src`,
          because it needs the over-sized panning box between the grade and
          itself. The grain and vignette stay siblings of `pan` and therefore
          still, which is the point — see the note above. */}
      <GradedImage>
        <div ref={pan} className="absolute inset-x-0 -inset-y-[12%]">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
      </GradedImage>
    </motion.div>
  );
}
