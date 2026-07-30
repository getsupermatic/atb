import Reveal from "@/components/motion/Reveal";
import { introduceHref } from "@/lib/careers";

/**
 * General interest — the page's closing band, and the empty state the copy deck
 * asks for (§2.6): with no live roles it is the only way in, and it stands on its
 * own without one.
 *
 * The field is `.plate-aisle` — the defocused aisle behind the homepage's
 * Capability-now panel — under `.scrim-deep`, the vertical Ink wash the site's
 * statement bands use. It replaces the glass-planes photograph, which has been
 * removed from the site entirely; `ClosingBand` took the same field for the same
 * reason, so the two closing bands still read as one device.
 *
 * The pairing is measured. `.plate-aisle` carries a 0.35 veil and `.scrim-deep`
 * runs 0.62 → 0.82, so the weakest point is the TOP of the band, at a combined
 * 0.753 coverage. Against the plate's brightest pixel (247,242,233) that puts
 * Cream at 7.71:1 and Stone at 5.76:1 — both clear AA for body text, and the foot
 * of the band is deeper still. Copper is 2.65:1 there and unusable as text, which
 * is why nothing here is set in it.
 */
export default function GeneralInterest() {
  return (
    <section className="theme-dark relative overflow-hidden" aria-label="General interest">
      {/* The plate carries its own veil as a background layer, so it needs no
          wrapper and no next/image — the same construction as CapabilityGap. */}
      <div aria-hidden className="plate plate-aisle absolute inset-0" />
      <div aria-hidden className="scrim-deep absolute inset-0" />
      <div className="shell relative z-10 py-28 lg:py-36">
        <Reveal>
          {/* The one line on the page not lifted verbatim from the copy deck: the
              deck gives "General interest" as the section label, which is too flat
              to carry a closing band at display size. Every word here is the
              deck's own first sentence, re-punctuated as a headline — so the
              sentence is not then repeated as body copy below it. */}
          <h2 className="max-w-[26ch] text-4xl">
            Not always hiring. Always interested in exceptional people who want to build for the
            real world.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg text-[color:var(--text-muted)]">
            Tell us what you have built, what you want to build next and why ATB. is the place you
            want to do it.
          </p>
          <a href={introduceHref} className="btn btn-primary mt-9">
            Introduce yourself
          </a>
        </Reveal>
      </div>
    </section>
  );
}
