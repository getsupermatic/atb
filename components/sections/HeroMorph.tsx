"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Statically imported so the emitted URL carries a content hash. The hero
// artwork is being iterated on, and a fixed /images/… path meant every swap
// reused the same URL and served the previous shot from browser cache.
import heroPanels from "@/public/images/hero-panels.webp";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const keywords = [
  "AI-native products",
  "Frontline innovation",
  "Voice-first UX",
  "Generative commerce",
  "Marketing intelligence",
];

/**
 * Hero header graphic. It opens full-screen (edge-to-edge, square corners) and,
 * on scroll, wraps into a rounded contained panel — the reverse of the Why-now
 * feature morph (§5.2), so the two bookend the page with the same gesture.
 * Scroll-linked (scrubbed) and reversible; under reduced-motion it renders as a
 * static full-screen panel.
 */
export default function HeroMorph() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
      tl.fromTo(
        pad.current,
        { paddingInline: 0 },
        { paddingInline: "clamp(1.25rem, 5vw, 3rem)", ease: "none" },
        0,
      ).fromTo(
        card.current,
        { borderRadius: "0rem", height: "100vh" },
        { borderRadius: "1.75rem", height: "88vh", ease: "none" },
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 + i * 0.08 },
        };

  return (
    <section ref={section} className="hero-morph-section relative" aria-label="Introduction">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={pad} className="w-full">
          <div
            ref={card}
            className="theme-dark relative w-full overflow-hidden"
            style={{ height: "100vh", borderRadius: 0 }}
          >
            {/* .grade-film applies the supplied header grade — see globals.css.
                The wrapper holds the tone-map blends, so it must contain the
                image and nothing else; the scrims below stay outside it. */}
            <div className="grade-film">
              <Image
                src={heroPanels}
                alt="Five monochrome panels of frontline workers using handheld devices: a supermarket colleague in the chilled aisle, a retail assistant serving a customer, a drive-through operator on a headset, a store colleague on a headset checking a phone, and a field engineer at the back of a van."
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div aria-hidden className="grade-film-grain" />
              <div aria-hidden className="grade-film-vignette" />
            </div>
            <div aria-hidden className="scrim-hero absolute inset-0" />
            <div aria-hidden className="scrim-top absolute inset-x-0 top-0 h-32" />

            <div className="absolute inset-0 flex items-center">
              <div className="shell">
                <div className="max-w-[42rem]">
                  {/* Hard break holds the two-line composition; the line is
                      short enough that no max-measure constraint is needed.
                      Newsreader at the base h1 settings — size only here, so it
                      matches the headings further down the page. */}
                  <motion.h1 className="text-6xl text-[color:var(--color-chalk)]" {...stagger(0)}>
                    The future,
                    <br />
                    put to work.
                  </motion.h1>
                  {/* TRIAL — Instrument Sans regular in place of the Inter body
                      face, this paragraph only. See --font-intro. */}
                  <motion.p
                    className="mt-5 max-w-[44ch] font-normal text-base text-[color:var(--text-muted)] font-[family-name:var(--font-intro)]"
                    {...stagger(1)}
                  >
                    We work at the beyond: where emerging technology meets the real world. We turn
                    what&rsquo;s next into what&rsquo;s useful, creating intelligent, AI-powered
                    solutions for the people at the heart of your business.
                  </motion.p>
                  <motion.div className="mt-7 flex flex-wrap items-center gap-3" {...stagger(2)}>
                    {/* Warm Chalk fill with an Ink label rather than the Deep
                        Forest .btn-primary — 17.8:1, and the only light-filled
                        button on the site. */}
                    <Link
                      href="/contact"
                      className="btn btn-primary bg-[color:var(--color-chalk)] text-[color:var(--color-ink)]"
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

            {/* Rolling keyword strip — pinned to the bottom of the hero graphic (§2.1) */}
            <div
              className="marquee-mask scrim-band absolute inset-x-0 bottom-0 overflow-hidden border-t py-4 backdrop-blur-sm"
              style={{ borderColor: "var(--border)" }}
              aria-hidden
            >
              <div className="marquee-track flex w-max gap-10 pr-10">
                {[...keywords, ...keywords, ...keywords, ...keywords].map((k, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap text-sm font-medium text-[color:var(--text-muted)]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
