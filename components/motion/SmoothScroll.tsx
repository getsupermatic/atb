"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Single scroll source (§5.5): Lenis drives smooth/inertia scrolling and feeds
 * GSAP ScrollTrigger so every scroll-linked animation reads one timeline.
 * Disabled under reduced-motion — native scrolling, full functionality.
 */
export default function SmoothScroll() {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
    // Re-runs if the visitor changes the setting mid-session, tearing Lenis down
    // or standing it back up — the old matchMedia read could not see that.
  }, [reduce]);

  return null;
}
