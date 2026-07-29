"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

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
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const [display, setDisplay] = useState(reduce ? value : from);
  const displayRef = useRef(display);
  displayRef.current = display;

  useEffect(() => {
    if (reduce) return;
    const target = inView ? value : from;
    const start_value = displayRef.current;
    if (start_value === target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const next = start_value + (target - start_value) * eased;
      displayRef.current = next;
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay((displayRef.current = target));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, from, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
