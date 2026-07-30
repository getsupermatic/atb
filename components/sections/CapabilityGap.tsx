"use client";

import { useRef } from "react";
import MorphPanel from "@/components/motion/MorphPanel";

/**
 * The capability gap — "capability now advances by the month; most frontline
 * tools still change by the year."
 *
 * Opens as a rounded contained card and straightens to a full-bleed panel as you
 * scroll through it (brief §5.2), the mirror of the Hero above. The supporting
 * line fades up partway through the morph rather than on arrival, so the panel
 * has already committed to full-bleed by the time it reads.
 */
export default function CapabilityGap() {
  const sub = useRef<HTMLParagraphElement>(null);

  return (
    <MorphPanel
      open
      runway="220vh"
      ariaLabel="Why now"
      /* #what-we-think is the primary nav's target — see the mapping on
         `primaryNav` in lib/site.ts. The id goes on the section, which is the
         runway, so arriving here lands at the START of the morph: the panel is in
         its contained, rounded resting state and opens as you scroll on.
         NO scroll margin, unlike the other two anchor targets. Any clearance here
         would show the tail of the Clients band above the panel, which is exactly
         what this anchor is meant to land past. It needs none: the card is centred
         in a min-h-screen sticky box, so its top edge already sits ~140px below the
         section top — well clear of the docked nav. */
      id="what-we-think"
      /* A constant floor, not an animated value: the card is 62vh at rest and the
         morph only grows its `height` to fill the viewport. */
      cardClassName="min-h-[62vh]"
      height={{ to: "100vh" }}
      extend={(tl) =>
        tl.fromTo(
          sub.current,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, ease: "none", duration: 0.4 },
          // 0.6 of the morph's 1 unit — the panel is most of the way open.
          0.6,
        )
      }
    >
      {/* Decorative, so no alt text. .scrim-panel is load-bearing rather than
          belt-and-braces here: the copy is bottom-anchored, the scrim ramps to ink
          0.78 exactly there, and the Copper line cannot clear 3:1 on this plate
          without it — see the note on .plate-aisle for the measurements. */}
      <div aria-hidden className="plate plate-aisle absolute inset-0" />
      <div aria-hidden className="scrim-panel absolute inset-0" />

      {/* In flow rather than absolute, so a heading that runs long pushes the
          card's min-height out instead of overflowing its top edge — which is
          what left the copy tight to the top on short and zoomed viewports.
          h-full keeps it bottom-anchored once the morph sets the card to 100vh. */}
      <div className="relative flex h-full min-h-[62vh] flex-col justify-end">
        <div className="shell pt-[8vh] pb-[6vh] sm:pb-[8vh]">
          {/* The one hardcoded display size on the site, so it does not follow
              --text-*. This narrow-viewport value is what stops the
              bottom-anchored heading clipping on mobile. */}
          <h2 className="max-w-[18ch] text-[2.45rem] text-[color:var(--color-cream)] sm:text-5xl">
            Capability now advances by the month.{" "}
            {/* Copper against the plate's brightest pixel at the foot, where the
                plate's veil and .scrim-panel combine to 0.857 coverage: 3.79:1.
                That clears the 3:1 large-text bar and nothing more, so this line
                has to stay at display size. */}
            <span className="text-[color:var(--color-copper)]">
              Most frontline tools still change by the year.
            </span>
          </h2>
          <p
            ref={sub}
            className="mt-5 max-w-[42ch] text-[1.05rem] text-[color:var(--color-stone)] sm:text-xl"
          >
            We exist to close the gap between what AI can do and what actually reaches your
            business.
          </p>
        </div>
      </div>
    </MorphPanel>
  );
}
