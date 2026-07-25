"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
            style={{ height: "100vh", borderRadius: 0, ["--text-muted" as string]: "#cac6bb" } as React.CSSProperties}
          >
            <Image
              src="/images/hero-bg-test.png"
              alt="Light refracting through a prism against deep navy — spectral flares scattered across darkness."
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
                  "linear-gradient(100deg, rgba(11,26,46,0.92) 0%, rgba(11,26,46,0.7) 30%, rgba(11,26,46,0.3) 55%, rgba(11,26,46,0) 80%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-32"
              style={{ background: "linear-gradient(180deg, rgba(11,26,46,0.65), transparent)" }}
            />

            <div className="absolute inset-0 flex items-center">
              <div className="shell">
                <div className="max-w-[42rem]">
                  <motion.p className="eyebrow" {...stagger(0)}>
                    An AI-native product company
                  </motion.p>
                  <motion.h1 className="mt-5" style={{ fontSize: "var(--text-5xl)", color: "#f7f1e6" }} {...stagger(1)}>
                    Frontier AI,
                    <br />
                    <span style={{ color: "var(--text-muted)" }}>built for</span> the real world.
                  </motion.h1>
                  <motion.p
                    className="mt-5 max-w-[56ch] text-[color:var(--text-muted)]"
                    style={{ fontSize: "var(--text-lg)" }}
                    {...stagger(2)}
                  >
                    We imagine, build and forward-deploy AI-native products — underpinned by our
                    AI-native delivery — for everywhere your business meets the customer: the shop
                    floor, the drive-through, the field, the contact centre, the app and the online
                    store. Strategy that gets deployed.
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

            {/* Rolling keyword strip — pinned to the bottom of the hero graphic (§2.1) */}
            <div
              className="marquee-mask absolute inset-x-0 bottom-0 overflow-hidden border-t py-4 backdrop-blur-sm"
              style={{
                borderColor: "var(--border)",
                background:
                  "linear-gradient(0deg, rgba(11,26,46,0.92), rgba(11,26,46,0.45))",
              }}
              aria-hidden
            >
              <div className="marquee-track flex w-max gap-10 pr-10">
                {[...keywords, ...keywords, ...keywords, ...keywords].map((k, i) => (
                  <span
                    key={i}
                    className="text-sm font-medium text-[color:var(--text-muted)]"
                    style={{ fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}
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
