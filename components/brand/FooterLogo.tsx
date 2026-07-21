"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import Logo from "./Logo";

/**
 * Footer logo with a live full stop. Each time the footer scrolls into view the
 * period detaches, waits at the far right edge of the footer base row, then
 * glides the full width of the foot along the baseline and docks precisely next
 * to the B — where its coordinates match the static `ATB.` mark exactly. On
 * scroll-out it resets to the right edge (off-screen) so the run replays.
 *
 * The dot's resting position is derived from the mono logo's SVG geometry
 * (viewBox 600 690 332 120, period at cx 909 / cy 789 / r 12), so it always
 * lands with the correct optical spacing regardless of the rendered height.
 */
export default function FooterLogo({ height = 26 }: { height?: number }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { margin: "0px 0px -8% 0px" });
  const [travel, setTravel] = useState(0);
  const [armed, setArmed] = useState(false);

  // Geometry: map the SVG period into rendered pixels.
  const s = height / 120;
  const diameter = 24 * s;
  const homeLeft = 297 * s; // (909 − 600 − 12) · s
  const homeTop = 87 * s; //  (789 − 690 − 12) · s

  // Measure how far the dot must travel to reach the right edge of the foot.
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const rail = wrap?.closest<HTMLElement>(".footer-base");
      if (!wrap || !rail) return;
      const dotRight = wrap.getBoundingClientRect().left + homeLeft + diameter;
      setTravel(Math.max(0, rail.getBoundingClientRect().right - dotRight));
      setArmed(true);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [diameter, homeLeft]);

  // Reduced motion / no-JS parity: render the intact mark, no travel.
  if (reduce) {
    return <Logo variant="mono" style={{ height }} />;
  }

  const parked = armed && !inView ? travel : 0;

  return (
    <span ref={wrapRef} className="relative inline-block">
      <Logo variant="mono" hideDot style={{ height }} />

      <motion.span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          left: homeLeft,
          top: homeTop,
          width: diameter,
          height: diameter,
          background: "var(--heading)",
        }}
        initial={false}
        animate={{
          x: inView && armed ? 0 : parked,
          boxShadow: inView
            ? [
                "0 0 0px 0px rgba(198, 214, 77, 0)",
                "0 0 14px 3px rgba(198, 214, 77, 0.65)",
                "0 0 0px 0px rgba(198, 214, 77, 0)",
              ]
            : "0 0 0px 0px rgba(198, 214, 77, 0)",
        }}
        transition={{
          x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
          boxShadow: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* Comet trail — points back the way it came, fades on arrival */}
        <motion.span
          aria-hidden
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: 0,
            height: diameter,
            width: diameter * 9,
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, rgba(198, 214, 77, 0.55), rgba(198, 214, 77, 0))",
          }}
          animate={{ opacity: inView ? [0, 0.9, 0] : 0, scaleX: inView ? [0.2, 1, 0.2] : 0.2 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.span>
    </span>
  );
}
