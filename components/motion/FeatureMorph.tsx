"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Feature panel morph on scroll (§5.2): begins as a rounded contained card and,
 * as it is scrolled through, expands edge-to-edge — corners straightening,
 * side margins collapsing — into the focal panel. Scroll-linked (scrubbed) and
 * reversible. Under reduced-motion it renders as a static contained card.
 */
export default function FeatureMorph() {
  const section = useRef<HTMLDivElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);

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
        { paddingInline: "clamp(1.25rem, 5vw, 3rem)" },
        { paddingInline: 0, ease: "none", duration: 1 },
        0,
      )
        .fromTo(
          card.current,
          { borderRadius: "1.75rem" },
          { borderRadius: "0rem", height: "100vh", ease: "none", duration: 1 },
          0,
        )
        .fromTo(
          sub.current,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, ease: "none", duration: 0.4 },
          0.6,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} aria-label="Why now" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={pad} className="w-full" style={{ paddingInline: "clamp(1.25rem, 5vw, 3rem)" }}>
          <div
            ref={card}
            className="relative w-full overflow-hidden h-[62vh]"
            style={{ borderRadius: "1.75rem" }}
          >
            <Image
              src="/images/teal-tunnel.webp"
              alt="A curved corridor of layered light — the far side of a horizon."
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,46,51,0.15), rgba(15,46,51,0.35) 55%, rgba(15,46,51,0.72))",
              }}
            />
            <div className="absolute inset-0 flex items-end">
              <div className="shell pb-[6vh] sm:pb-[8vh]">
                <h2
                  className="max-w-[18ch] text-[color:var(--color-cream)] [font-size:2.35rem] sm:[font-size:var(--text-5xl)]"
                >
                  Capability now advances by the month.{" "}
                  <span style={{ color: "var(--color-lime)" }}>
                    Most frontline tools still change by the year.
                  </span>
                </h2>
                <p
                  ref={sub}
                  className="mt-5 max-w-[42ch] text-[color:var(--color-cream)] [font-size:1.05rem] sm:[font-size:var(--text-xl)]"
                  style={{ opacity: 0.92 }}
                >
                  We exist to close the gap between what AI can do and what actually
                  reaches your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
