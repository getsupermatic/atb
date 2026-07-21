"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ATBOS — introduces ATB's internal operating system. The panel pins while you
 * scroll through it: on arrival it is just the ATBOS logo, and each scroll
 * brings the next statement in from the right, one at a time (the previous one
 * sliding off to the left). Scroll-linked (scrubbed) and reversible. Under
 * reduced motion the logo is static and all three statements render stacked, so
 * nothing is hidden behind motion.
 */
const headlines = [
  "One intelligent system runs the entire business — every pipeline, project, decision and delivery, in a single always-current view.",
  "An agentic engine sits at its core — scoping, building, shipping and improving every product we make.",
  "We build smarter, sharper and more consistently than ever — more creative, more innovative, and more informed with every decision.",
];

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-3xl)",
  lineHeight: 1.16,
  letterSpacing: "-0.015em",
};

export default function ATBOS() {
  const section = useRef<HTMLElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const lines = useRef<(HTMLParagraphElement | null)[]>([]);
  const [index, setIndex] = useState(-1);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Reserve the height of the tallest statement so the copy never shifts the
  // layout as lines swap — re-measured on width changes for responsive safety.
  const measureRef = useRef<HTMLDivElement>(null);
  const [copyH, setCopyH] = useState(0);
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => {
      let max = 0;
      el.querySelectorAll<HTMLElement>("[data-line]").forEach((n) => (max = Math.max(max, n.offsetHeight)));
      setCopyH(max);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scrubbed timeline: logo rises as the first line arrives, then each line
  // slides in from the right and off to the left as you scroll.
  useEffect(() => {
    if (reduce || !copyH) return;
    gsap.registerPlugin(ScrollTrigger);

    const els = lines.current.filter(Boolean) as HTMLParagraphElement[];
    const logoOffset = (copyH + 75) / 2;

    const ctx = gsap.context(() => {
      gsap.set(els, { opacity: 0, x: 120 });
      gsap.set(logo.current, { y: logoOffset });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            const next = p < 0.09 ? -1 : p < 0.41 ? 0 : p < 0.74 ? 1 : 2;
            setIndex((prev) => (prev === next ? prev : next));
          },
        },
      });

      tl.to({}, { duration: 0.5 }); // a beat of logo alone on arrival
      els.forEach((el, i) => {
        tl.to(el, { opacity: 1, x: 0, ease: "power2.out", duration: 1 });
        if (i === 0) tl.to(logo.current, { y: 0, ease: "power2.out", duration: 1 }, "<");
        tl.to({}, { duration: 1 }); // hold so the line can be read
        if (i < els.length - 1) tl.to(el, { opacity: 0, x: -90, ease: "power2.in", duration: 1 });
      });
    }, section);

    return () => ctx.revert();
  }, [reduce, copyH]);

  return (
    <section
      ref={section}
      className={reduce ? "relative" : "relative h-[320vh]"}
      aria-label="ATBOS — our operating system"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <Image src="/images/atbos-bg.webp" alt="" fill sizes="100vw" className="object-cover" />
        {/* Cream veil keeps the statements legible over the imagery */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, rgba(245,241,232,0.78) 0%, rgba(245,241,232,0.5) 55%, rgba(245,241,232,0.3) 100%)",
          }}
        />

        <div className="shell relative z-10 flex w-full flex-col items-center text-center">
          <img
            ref={logo}
            src="/images/atbos-logo.svg"
            alt="ATBOS"
            className="w-auto"
            style={{ height: "clamp(40px, 5.5vw, 72px)" }}
          />

          {reduce ? (
            <div className="mt-10 flex max-w-[44rem] flex-col gap-6">
              {headlines.map((h) => (
                <p key={h} className="font-[600] text-[color:var(--heading)]" style={headlineStyle}>
                  {h}
                </p>
              ))}
            </div>
          ) : (
            <>
              <div className="relative mt-10 w-full max-w-[44rem]" style={{ height: copyH || "16rem" }}>
                {headlines.map((h, i) => (
                  <p
                    key={h}
                    ref={(el) => {
                      lines.current[i] = el;
                    }}
                    className="absolute inset-x-0 top-0 font-[600] text-[color:var(--heading)]"
                    style={{ ...headlineStyle, opacity: 0 }}
                  >
                    {h}
                  </p>
                ))}
              </div>

              {/* Progress dots — reflect the line currently in view */}
              <div className="mt-8 flex items-center gap-2.5" aria-hidden>
                {headlines.map((h, i) => (
                  <span
                    key={h}
                    className="rounded-full transition-all duration-300"
                    style={{
                      height: 11,
                      width: i === index ? 30 : 11,
                      background: i === index ? "var(--color-teal)" : "rgba(41,95,102,0.28)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Hidden measuring stack — same width/typography as the live copy */}
        <div
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-1/2 w-full max-w-[44rem] -translate-x-1/2"
        >
          {headlines.map((h) => (
            <p key={h} data-line className="absolute inset-x-0 top-0 font-[600]" style={headlineStyle}>
              {h}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
