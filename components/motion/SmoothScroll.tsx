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
      // In-page anchors have to be handed to Lenis. A native anchor jump moves the
      // real scroll position while Lenis is still animating its own, and the two
      // fight — the page lands on the target and is then dragged back. This routes
      // any href="#id" through lenis.scrollTo instead.
      //
      // No `offset` here, deliberately. Lenis reads the target's own
      // `scroll-margin-top` (lenis.mjs, in its scrollTo element branch), which is
      // also what the native path uses when a /#section URL is loaded directly. So
      // each target's `scroll-mt-*` governs both paths and there is one source of
      // truth. An offset here would be ADDED to that margin, not replace it —
      // double-counting the nav clearance on every click.
      anchors: true,
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
