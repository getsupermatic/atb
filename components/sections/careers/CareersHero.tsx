"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { introduceHref, roles, whyJoin } from "@/lib/careers";

/**
 * The careers hero — a typographic panel on the brand's own Green ridge field.
 *
 * Deliberately NOT a `MorphPanel`. The card→full-bleed morph is the homepage's
 * opening gesture and it costs a 175–220vh scroll runway plus a pin; two pinned
 * panels ahead of a long role spec would fight the reading. This is a plain
 * full-bleed dark section with the homepage hero's staggered entrance.
 *
 * `.plate-ridge` rather than a photograph because there is no careers artwork, and
 * the only unused shots are the homepage's own signatures — reusing `hero-panels`
 * here would read as the same page twice. The ridge plate is measured: max channel
 * 80/255 at a standard deviation of 2.8, so it is all but a flat field. Against
 * its brightest pixel Cream is 7.95:1 and Stone 5.95:1, so both body and heading
 * copy clear AA with no veil — which is why `.plate-ridge` carries none.
 *
 * Copper is unusable as text here (2.73:1, failing even the large-text bar), so
 * the eyebrow is Stone via --text-muted rather than the accent it might otherwise
 * take. No `.scrim-top` either: the nav's Cream sits at ~16:1 on this field
 * unaided, and the homepage only needs that scrim because its hero is a
 * photograph with light frames near the top edge.
 */
export default function CareersHero() {
  const reduce = usePrefersReducedMotion();

  // Headline, intro and CTAs arrive in sequence on load, as on the homepage.
  // Nothing under reduced motion — they render in place.
  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DUR.reveal, ease: EASE.entrance, delay: 0.15 + i * 0.08 },
        };

  return (
    <section
      className="theme-dark plate plate-ridge relative flex min-h-[92vh] flex-col overflow-hidden"
      aria-label="Careers"
    >
      {/* pt-32 clears the fixed nav (~79px at its tallest, bare over the hero)
          with room to spare, so the eyebrow is never crowded under the logo. */}
      <div className="shell flex flex-1 items-center pt-32 pb-16">
        <div>
          <motion.p className="eyebrow" {...stagger(0)}>
            Careers
          </motion.p>
          {/* text-5xl, a step below the homepage's text-6xl: there is one h1 per
              page and the homepage's is the site's opening statement. Weight comes
              from the base h1 rule (300), so this matches it in everything but
              size. */}
          <motion.h1 className="mt-4 max-w-[24ch] text-5xl" {...stagger(1)}>
            Help build a different kind of AI company.
          </motion.h1>
          <motion.div
            className="mt-6 max-w-[54ch] space-y-4 text-lg text-[color:var(--text-muted)]"
            {...stagger(2)}
          >
            <p>
              We believe the teams that shape the next era of business will not look like the ones
              that shaped the last.
            </p>
            <p>
              They will be smaller, denser with talent and amplified by intelligent products and
              operating systems that make exceptional work repeatable.
            </p>
          </motion.div>
          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...stagger(3)}>
            {/* Conditional on there being a role to see — with none, the page's
                only route in is the general-interest band, so the outline button
                below becomes the primary action rather than leaving a link to an
                empty section. */}
            {roles.length > 0 && (
              /* Copper fill with an Ink label rather than .btn-primary's Green.
                 .btn-primary is a Green fill that reads by its Cream label rather
                 than by fill contrast — which holds on Ink, but this field IS
                 Green (--color-green-field, one step off the fill), so the pill
                 dissolves into the plate and the page's main action stops looking
                 like a button. Copper is the palette's CTA colour and separates
                 cleanly here; the label has to go to Ink, because Cream on Copper
                 is 2.18:1 and fails, where Ink is 5.59:1. Same pairing as
                 WaysToWork's CTA and the footer's Subscribe. */
              <Link
                href="#open-roles"
                className="btn btn-primary bg-[color:var(--color-copper)] text-[color:var(--color-ink)]"
              >
                See open roles
              </Link>
            )}
            <a href={introduceHref} className="btn btn-outline">
              Introduce yourself
            </a>
          </motion.div>
        </div>
      </div>

      {/* Why join — pinned to the foot of the panel, on the same hairline the
          homepage hero uses for its keyword strip. Real content rather than a
          decorative marquee, so it is a list and it does not scroll. */}
      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <ul className="shell grid gap-4 py-8 md:grid-cols-3 md:gap-10">
          {whyJoin.map((line, i) => (
            <motion.li key={line} className="statement text-xl" {...stagger(4 + i)}>
              {line}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
