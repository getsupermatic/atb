"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/brand/Logo";

/**
 * ATBOS — introduces ATB's internal operating system. The panel pins while you
 * scroll through it: on arrival it is just the ATBOS logo, and each scroll
 * brings the next statement in from the right, one at a time (the previous one
 * sliding off to the left). Scroll-linked (scrubbed) and reversible. Under
 * reduced motion the logo is static and all three statements render stacked, so
 * nothing is hidden behind motion.
 */
const headlines = [
  "The AI-native operating system we've built the whole company on, and the reason we deliver faster, at lower cost, and smarter.",
  "One intelligent system runs the entire business — every pipeline, project, decision and delivery, in a single always-current view.",
  "An agentic engine sits at its core — scoping, building, shipping and improving every product we make.",
  "We build smarter, sharper and more consistently than ever — more creative, more innovative, and more informed with every decision.",
];

// Shared by the live copy and the hidden measuring stack, so both wrap
// identically. Presentation lives in `.statement` / `text-3xl`.
const headlineClass = "statement text-3xl";

// Panel morph geometry, shared by the inline styles (which carry the arrival
// state, and the whole state under reduced motion) and the GSAP tweens.
const PAD = "clamp(1.25rem, 5vw, 3rem)";
const RADIUS = "1.75rem";
const MIN_H = "82vh";

export default function ATBOS() {
  const section = useRef<HTMLElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
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
    // Re-measure once the Newsreader web font loads — measuring before that
    // under-reports height (fallback font wraps to fewer lines), so the
    // tallest statement would overflow into the progress dots.
    document.fonts?.ready.then(measure);
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
      gsap.set(pad.current, { paddingInline: PAD });
      gsap.set(card.current, { borderRadius: RADIUS, minHeight: MIN_H });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            // Timeline: a 0.5 beat of logo alone, then each line spans 3 units
            // (fade-in, hold, fade-out); the last has no fade-out.
            const n = els.length;
            const total = 3 * n - 0.5;
            let next = -1;
            for (let i = 0; i < n; i++) if (p >= (0.5 + 3 * i) / total) next = i;
            setIndex((prev) => (prev === next ? prev : next));
          },
        },
      });

      // The panel builds in first — contained and rounded on arrival, opening to
      // full-bleed as you scroll through, the same gesture as FeatureMorph. It is
      // on the section's existing scrubbed timeline rather than a second
      // ScrollTrigger, so the morph and the statements can't drift apart.
      // 1.5 units against a 12.5-unit runway, so it resolves in the first ~12%
      // and overlaps the first statement's entrance rather than queueing.
      tl.fromTo(pad.current, { paddingInline: PAD }, { paddingInline: 0, ease: "none", duration: 1.5 }, 0)
        .fromTo(
          card.current,
          { borderRadius: RADIUS, minHeight: MIN_H },
          { borderRadius: "0rem", minHeight: "100vh", ease: "none", duration: 1.5 },
          0,
        );

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
      className="relative"
      style={reduce ? undefined : { height: `${Math.round(100 + (3 * headlines.length - 0.5) * 26)}vh` }}
      aria-label="ATBOS — our operating system"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
       <div ref={pad} className="w-full" style={{ paddingInline: PAD }}>
        {/* .plate-ridge-forest — the same Green ridge field as the
            Capability-now panel, so the two statement panels read as one device.
            It replaces the atbos-bg photograph, and both of that photograph's
            wrappers went with it: .duotone (nothing left to desaturate) and
            .veil-chalk-radial (it existed to lift copy off imagery; the flat
            field needs no help, and Cream on it is ~9:1).
            theme-dark comes with the green: it flips --heading and --text to Cream, which is what the wordmark, the statements and the dots all
            resolve through — so none of them hardcode a colour. */}
        <div
          ref={card}
          className="theme-dark plate-ridge-forest relative flex w-full items-center overflow-hidden"
          style={{ borderRadius: RADIUS, minHeight: MIN_H }}
        >
        {/* items-center on the card above centres this block vertically in the
            panel, so the wordmark, the statements and the progress slider stay as
            one centred group while the panel's min-height morphs 82vh -> 100vh.
            Without it the group sat top-aligned and drifted as the panel grew.
            The padding stays as a floor for short viewports. */}
        <div className="shell relative z-10 flex w-full flex-col items-center py-[7vh] text-center">
          {/* The wordmark is composed, not an asset: the atb mark itself with
              its full stop suppressed, then OS set in the display face. It
              replaces atbos-logo.svg, which was the old uppercase grotesque
              "ATBos" in #50727c — a retired palette teal.
              Everything is sized in em off the container's fluid font-size, so
              the pair scales as one. The mark's box carries 38 of its 384 viewBox
              units as padding below the baseline (9.9%), so aligning the two
              boxes' bottoms would float the mark above the OS baseline — hence
              the marginBottom nudge, which is that padding cancelled out. */}
          <div
            ref={logo}
            className="flex items-start justify-center"
            style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
            role="img"
            aria-label="ATBOS"
          >
            {/* Both nudges live on the mark, not the OS: the mark inherits the
                container's font-size, so 1em here is unambiguous, whereas an em
                on the OS span would resolve against its own larger font-size.
                Measured off the render at the 72px cap of the clamp —
                marginBottom lifts the mark until the two baselines agree
                (the OS box bottom sits below its baseline by the font's descent,
                the mark's by 9.9% of its height, and the two don't match), and
                marginRight cancels the trailing padding the closed box carries
                after the b, bringing the b→O gap into line with the 8–11px
                letter gaps inside the mark itself. */}
            <Logo
              hideDot
              height="1em"
              style={{ marginRight: "-0.278em" }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                /* Half the mark's ascender height, raised so its cap line sits
                   on the mark's — a lifted secondary mark rather than a true
                   superscript. Measured at the 72px cap of the clamp: 0.59em
                   gives a 29px cap against the mark's 58px — exactly half — and
                   the marginTop brings the two cap tops level. The OS box top is
                   not its cap top: half-leading and the font's ascent sit above
                   it, so the offset has to be measured rather than reasoned. The
                   residual 0.35px is the O's round overshoot, which should sit
                   proud of the cap line. */
                fontSize: "0.59em",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                marginTop: "0.078em",
              }}
            >
              OS
            </span>
          </div>

          {reduce ? (
            <div className="mt-10 flex max-w-[44rem] flex-col gap-6">
              {headlines.map((h) => (
                <p key={h} className={headlineClass}>
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
                    className={`absolute inset-x-0 top-0 ${headlineClass}`}
                    style={{ opacity: 0 }}
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
                      background:
                        i === index
                          ? "var(--color-cream)"
                          : "rgb(var(--cream-rgb) / 0.32)",
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
            <p key={h} data-line className={`absolute inset-x-0 top-0 ${headlineClass}`}>
              {h}
            </p>
          ))}
        </div>
        </div>
       </div>
      </div>
    </section>
  );
}
