"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { VIEWPORT_REPLAY } from "@/lib/motion";

/**
 * Counts a figure between two values when it scrolls into view — 0 → 100 for
 * "100M+", or 100 → 1 for the "~1%" stat, where counting *down* is the point: the
 * figure is about how little of the investment reached the floor, so watching it
 * fall from 100 says the thing the number says.
 * Reverses when it leaves, so passing through the section replays the effect.
 * Under reduced motion it renders the final value immediately.
 */
type Props = {
  value: number;
  /** Where the count starts, and returns to on leaving. Defaults to 0. */
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function CountUp({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
  style,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT_REPLAY);
  const [display, setDisplay] = useState(from);
  /**
   * The live value, so a re-triggered animation can pick up from wherever the
   * last one got to rather than jumping back to `from`.
   *
   * Written ONLY inside the rAF loop below, never during render. Mirroring state
   * into a ref on every render (`ref.current = display`) is a real bug and not
   * just a lint complaint: React may render without committing, so the ref can
   * end up holding a value that was never shown.
   */
  const current = useRef(from);

  useEffect(() => {
    if (reduce) return;
    const target = inView ? value : from;
    const startValue = current.current;
    if (startValue === target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const next = t < 1 ? startValue + (target - startValue) * eased : target;
      current.current = next;
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, from, duration]);

  // Under reduced motion the figure renders at its final value immediately —
  // read from the prop rather than from state, which never animates in that case.
  const shown = reduce ? value : display;

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {shown.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
