"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// Statically imported so the emitted URL carries a content hash — a fixed
// /images/… path meant every swap of the artwork reused the same URL and served
// the previous shot from browser cache.
import heroPanels from "@/public/images/hero-panels.webp";
import MorphPanel from "@/components/motion/MorphPanel";
import GradedImage from "@/components/motion/GradedImage";
import { DUR, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { heroKeywords } from "@/lib/content";

/**
 * The hero. Opens full-screen, edge to edge, and wraps into a rounded contained
 * panel as you scroll — the reverse of the Capability-gap panel below it, so the
 * two bookend the page with the same gesture (brief §5.2).
 *
 * The runway is 175vh: 100vh of panel plus 75vh of scroll for the morph.
 */
export default function Hero() {
  const reduce = usePrefersReducedMotion();

  // The headline, intro and CTAs arrive in sequence on load. Nothing under
  // reduced motion — they render in place.
  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DUR.reveal, ease: EASE.entrance, delay: 0.15 + i * 0.08 },
        };

  return (
    <MorphPanel
      open={false}
      runway="175vh"
      ariaLabel="Introduction"
      cardClassName="theme-dark"
      height={{ from: "100vh", to: "88vh" }}
    >
      {/* The grade must wrap the image and nothing else — the scrims and copy
          below are siblings, or the grain and vignette would sit over the type. */}
      <GradedImage
        src={heroPanels}
        alt="Five monochrome panels of frontline workers using handheld devices: a supermarket colleague in the chilled aisle, a retail assistant serving a customer, a drive-through operator on a headset, a store colleague on a headset checking a phone, and a field engineer at the back of a van."
        priority
        sizes="100vw"
      />
      <div aria-hidden className="scrim-hero absolute inset-0" />
      <div aria-hidden className="scrim-top absolute inset-x-0 top-0 h-32" />

      <div className="absolute inset-0 flex items-center">
        <div className="shell">
          <div className="max-w-[42rem]">
            {/* Hard break holds the two-line composition; the line is short
                enough that no max-measure constraint is needed. Size only — the
                weight and tracking come from the base h1 rule, so it matches the
                headings further down the page. */}
            <motion.h1 className="text-6xl text-[color:var(--color-cream)]" {...stagger(0)}>
              The future,
              <br />
              put to work.
            </motion.h1>
            <motion.p
              className="mt-5 max-w-[44ch] text-base text-[color:var(--text-muted)]"
              {...stagger(1)}
            >
              We work at the beyond: where emerging technology meets the real world. We turn
              what&rsquo;s next into what&rsquo;s useful, creating intelligent, AI-powered
              solutions for the people at the heart of your business.
            </motion.p>
            <motion.div className="mt-7 flex flex-wrap items-center gap-3" {...stagger(2)}>
              {/* Cream fill with an Ink label rather than .btn-primary's Green —
                  16.28:1, and the only light-filled button on the site. */}
              <Link
                href="/contact"
                className="btn btn-primary bg-[color:var(--color-cream)] text-[color:var(--color-ink)]"
              >
                Talk to us
              </Link>
              <Link href="/how-we-work" className="btn btn-outline">
                See how we work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rolling keyword strip, pinned to the foot of the panel (§2.1). The list
          is repeated four times because .marquee-track translates by -50%: the
          track has to hold at least two full copies for the loop to be seamless,
          and four keeps it seamless on wide viewports too. */}
      <div
        className="marquee-mask scrim-band absolute inset-x-0 bottom-0 overflow-hidden border-t py-4 backdrop-blur-sm"
        style={{ borderColor: "var(--border)" }}
        aria-hidden
      >
        <div className="marquee-track flex w-max gap-10 pr-10">
          {[...heroKeywords, ...heroKeywords, ...heroKeywords, ...heroKeywords].map((k, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-medium text-[color:var(--text-muted)]"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </MorphPanel>
  );
}
