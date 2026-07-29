"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Masked top-down word reveal. The word sits in a clipped box and slides down
 * into it, so it reads as being drawn in from the top edge of its own space
 * rather than fading up like `Reveal` does elsewhere.
 *
 * The observer is on the WRAPPER, not the moving span, and that is essential
 * rather than incidental. `whileInView` on the inner span cannot work here:
 * IntersectionObserver accounts for clipping ancestors, and the inner span
 * starts translated fully outside its `overflow: hidden` parent, so its visible
 * area is zero — it would never register as in view and would sit hidden
 * forever, waiting for itself. The wrapper is always visible, so it is the thing
 * that can be observed.
 *
 * The padding/negative-margin pair is load-bearing too: `overflow: hidden` clips
 * to the line box, and `.statement` runs line-height 1.14 in Newsreader, which is
 * tighter than the face's descender depth — so the p of "Operations" and the g of
 * "Marketing" would be sliced off at rest. The padding extends the clip below the
 * baseline and the negative margin takes that space back out of the layout,
 * leaving the paragraph's metrics untouched.
 *
 * The entry is deliberately unhurried: an expo-out curve would cover most of the
 * travel in the first third of the duration and read as a snap, so this uses a
 * cubic-out over a longer duration to keep the slide legible to someone who is
 * still scrolling into the footer.
 *
 * It reverses on scroll-out so passing back through the footer replays the
 * effect, matching `CountUp` and the footer's full-stop dot. The two directions
 * are timed differently on purpose, because framer-motion's `delay` is
 * direction-agnostic: reusing the entry transition would make each word sit for
 * its stagger offset and then take a further second to leave, so ~1.8s of
 * un-revealing would play out behind you as you scroll up — and scrolling back in
 * sooner than that would catch the words mid-flight, starting the re-reveal from
 * partial positions with the stagger smeared. Leaving is therefore a quick
 * uniform retreat (no stagger, accelerating out), which parks every word before a
 * plausible re-entry.
 *
 * Under reduced motion it renders the word plainly, with no wrapper at all, so
 * there is no clip to go wrong.
 */
export default function WordReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -12% 0px" });

  if (reduce) return <>{children}</>;

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        paddingBottom: "0.22em",
        marginBottom: "-0.22em",
      }}
    >
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: "-105%" }}
        animate={{ y: inView ? "0%" : "-105%" }}
        transition={
          inView
            ? { duration: 1.05, ease: [0.33, 1, 0.68, 1], delay }
            : { duration: 0.4, ease: [0.4, 0, 1, 1], delay: 0 }
        }
      >
        {children}
      </motion.span>
    </span>
  );
}
