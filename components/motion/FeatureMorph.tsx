"use client";

import { useEffect, useRef } from "react";
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
            className="relative w-full overflow-hidden min-h-[62vh]"
            style={{ borderRadius: "1.75rem" }}
          >
            {/* The defocused aisle plate, in place of the Green ridge field
                (which has moved to the ATBOS panel). Decorative, so no alt text.
                .scrim-panel is back, and this time it is load-bearing rather than
                the black-gradient artefact it was over a flat green field: the
                copy is bottom-anchored, the scrim ramps to ink 0.78 exactly there,
                and the Copper line cannot clear 3:1 on this plate without it — see
                the note on .plate-aisle for the measurements. */}
            <div aria-hidden className="plate-aisle absolute inset-0" />
            <div aria-hidden className="scrim-panel absolute inset-0" />
            {/* In flow rather than absolute, so a heading that runs long pushes
                the card's min-height out instead of overflowing its top edge —
                which is what left the copy sitting tight to the top on short
                (and zoomed) viewports. h-full keeps it bottom-anchored once the
                morph sets the card to 100vh. */}
            <div className="relative flex h-full min-h-[62vh] flex-col justify-end">
              <div className="shell pt-[8vh] pb-[6vh] sm:pb-[8vh]">
                {/* The one hardcoded display size on the page, so it does not
                    follow --text-*. Lifted 4% in step with the scale floors —
                    kept to that, because this narrow-viewport value is what
                    stopped this bottom-anchored heading clipping on mobile. */}
                <h2 className="max-w-[18ch] text-[2.45rem] text-[color:var(--color-cream)] sm:text-5xl">
                  Capability now advances by the month.{" "}
                  {/* Copper against the plate's brightest pixel at the foot,
                      where .plate-aisle's veil and .scrim-panel combine to
                      0.857 coverage: 3.79:1. That clears the 3:1 large-text
                      bar and nothing more, so this line has to stay at display
                      size — see the note on .plate-aisle. */}
                  <span className="text-[color:var(--color-copper)]">
                    Most frontline tools still change by the year.
                  </span>
                </h2>
                <p
                  ref={sub}
                  className="mt-5 max-w-[42ch] text-[1.05rem] text-[color:var(--color-stone)] sm:text-xl"
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
