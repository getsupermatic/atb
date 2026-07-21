"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            className="relative w-full overflow-hidden"
            style={{ height: "100vh", borderRadius: 0 }}
          >
            <Image
              src="/images/hero-hand.webp"
              alt="A hand reaching along an orbital curve toward a lime node — intelligence just beyond reach."
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "72% center" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, var(--color-cream) 6%, rgba(245,241,232,0.82) 32%, rgba(245,241,232,0.32) 54%, rgba(245,241,232,0) 76%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-32"
              style={{ background: "linear-gradient(180deg, rgba(245,241,232,0.6), transparent)" }}
            />

            <div className="absolute inset-0 flex items-center">
              <div className="shell">
                <div className="max-w-[42rem]">
                  <motion.p className="eyebrow" {...stagger(0)}>
                    An AI-native product company
                  </motion.p>
                  <motion.h1 className="mt-5" style={{ fontSize: "var(--text-5xl)" }} {...stagger(1)}>
                    AI-native products.
                    <br />
                    <span style={{ color: "var(--text-muted)" }}>For the customer</span> frontline.
                  </motion.h1>
                  <motion.p
                    className="mt-5 max-w-[56ch] text-[color:var(--text-muted)]"
                    style={{ fontSize: "var(--text-lg)" }}
                    {...stagger(2)}
                  >
                    We imagine, build and forward-deploy AI-native products — underpinned by our
                    AI-native delivery — for everywhere your business meets the customer: the shop
                    floor, the drive-through, the field, the contact centre, the app and the online
                    store. Strategy you can deploy, live from day one.
                  </motion.p>
                  <motion.div className="mt-7 flex flex-wrap items-center gap-3" {...stagger(3)}>
                    <Link href="/contact" className="btn btn-primary">
                      Talk to us
                    </Link>
                    <Link href="/how-we-work" className="btn btn-outline">
                      See how we work
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
