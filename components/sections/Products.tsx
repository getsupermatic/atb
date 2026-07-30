import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import WordReveal from "@/components/motion/WordReveal";
import PlateReveal from "@/components/motion/PlateReveal";
import { products } from "@/lib/site";

/**
 * Production-ready AI blueprints — an editorial spread, in place of the three
 * rounded panels this used to be (a glass FrontlineOS spotlight over two bordered
 * cards). Two things drove the change:
 *
 * 1. It was the third card grid in a row. NewModel was rebuilt off a 2×2 panel
 *    grid for exactly this reason and the fix moved the problem down one section
 *    rather than solving it — Products → WaysToWork was the surviving
 *    grid-then-grid pair, and WaysToWork's three smoked cards are the stronger
 *    use of the device. So this is the one that gives.
 * 2. CommerceOS and MarketingOS have no artwork: both still point at
 *    `hero-aisle.webp` in lib/site.ts, so the section rendered the same
 *    photograph twice, side by side, and it was the hero's photograph. It read as
 *    a bug, and it spent the section's one real asset competing with two copies
 *    of something already seen. They are now type only — the keys stay in
 *    lib/site.ts for the product detail pages, but this section stops asking for
 *    images that do not exist.
 *
 * FrontlineOS takes the only photograph, bleeding off the right page edge, and
 * the other two become a ruled pair beneath it. No border-radius anywhere in the
 * section, no glass, no borders: hairlines are the only structure.
 */
export default function Products() {
  const [frontline, ...rest] = products;

  return (
    <section className="section" aria-label="Products">
      <div className="shell">
        {/* TEMPORARY — the intro sentence ("AI products for where your business
            meets the customer — operations, commerce and marketing.") is removed
            for review, so the heading stands alone.
            It first sat under the heading at `text-lg` on a 56ch measure, which
            stacked a ragged two-line block under a ragged two-line heading and
            spent ~100px on one sentence. If it comes back, it should NOT go back
            there: put it beside the heading in a
            `grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end` row at body size
            on a ~46ch measure. Bottom-aligned it costs nothing, because the h2 is
            128px tall (two lines at 64.1px leading, measured) and the sentence
            needs at most three lines — the row stays exactly as tall as the
            heading alone. The `auto` track matters: the h2 carries its own 18ch
            cap and needs 609px at 1080, where `lg:grid-cols-2` would allow 464px
            and force a third line.

            Not wrapped in `Reveal`, deliberately. WordReveal slides a word down
            inside its own `overflow: hidden` box, and nesting that in a block that
            is itself translating would compound the two transforms. This is the
            Footer's pattern instead — the lead is static and the word that
            carries the section arrives on its own. */}
        <h2 className="max-w-[18ch] text-4xl">
          Production-ready AI <WordReveal delay={0.12}>blueprints.</WordReveal>
        </h2>

        {/* FrontlineOS — the spread. `.bleed-right` is on the GRID CONTAINER, not
            the plate's column: it resolves a percentage against the shell's
            content box, which only holds for a direct child. The derivation is in
            globals.css. Below `lg` it is inert and the plate sits full-width
            inside the shell.

            Copy first in the DOM at every width. At `lg` it is the left column,
            and stacked it sets the plate up rather than following it — which also
            keeps the reading order and the visual order the same, so there is no
            `order` utility to reason about. */}
        <article className="bleed-right mt-14 grid items-center gap-10 lg:mt-16 lg:grid-cols-[0.85fr_1fr] lg:gap-14">
          <Reveal from="left">
            {/* font-normal against the base h3 rule's 500 — the same reasoning the
                new-model beats carry: at display scale Newsreader wants the
                lighter weight, and 500 here would read heavier than the h2 above
                it, which sits at 400. */}
            <h3 className="mt-4 text-3xl font-normal">{frontline.name}</h3>
            <p className="mt-4 max-w-[44ch] text-lg text-[color:var(--text-muted)]">
              {frontline.summary}
            </p>
            <p className="mt-5 font-medium text-[color:var(--heading)]">{frontline.proof}</p>
            {/* The existing `.btn-primary` rather than a new green variant: it is
                already a flat Green fill with a Cream label, so the
                green button the section wants is the one the site already has.
                This is its FIRST use on a light field, though, which is worth
                recording because the note on the class in globals.css states the
                opposite ("every .btn-primary sits on a dark field") — that note is
                now out of date rather than wrong. It still holds up here:
                Green is 8.43:1 against the paper canvas, so the pill reads as
                a shape by its own fill for the first time, and the Chalk label
                stays at the 7.81:1 the class was measured for.
                The pill's radius is the one curve left in the section. Kept
                deliberately: the no-radius rule is about panels and cards, and
                breaking the button system to honour it would cost more than it
                buys — every other CTA on the site is a 999px pill. */}
            <Link href={frontline.href} className="btn btn-primary mt-7">
              Explore the product
            </Link>
          </Reveal>

          {/* The aspect ratio lives on the frame, per PlateReveal's contract.
              5/4 at `lg`: the plate is the tallest thing in the row and drives
              the row height, so a squarer crop keeps the copy optically centred
              against it rather than floating in a letterbox. */}
          <PlateReveal
            src={frontline.image}
            alt="FrontlineOS — a supermarket colleague on a headset handing a bag of produce to a customer in the fruit and vegetable aisle."
            sizes="(max-width: 1024px) 92vw, 50vw"
            className="aspect-[4/3] lg:aspect-[5/4]"
          />
        </article>

        {/* CommerceOS + MarketingOS — one drawn hairline each, and no vertical
            rule between them.
            Reusing `.stat-divide` (the half-height centred divider from the
            copper band) was considered and rejected: it is gated at 40rem to
            match Problem's grid, and this pair has to stay single-column until
            48rem, because MarketingOS's summary is the longest string in the
            section and breaks to seven ragged lines in the ~250px column a 40rem
            split would give it. Matching breakpoints would mean either a cramped
            pair or a near-duplicate class. Two rules side by side read as one
            broken rule across the page, which is the better editorial mark
            anyway, and they animate with the existing DrawRule for free. */}
        <div className="mt-16 grid gap-y-12 md:mt-20 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          {rest.map((product, i) => (
            <article key={product.name}>
              <DrawRule delay={i * 0.1} />
              {/* The copy arrives along the line just drawn, so the delay is a
                  beat behind its own rule rather than a stagger against the
                  other column. */}
              <Reveal from="right" delay={0.12 + i * 0.1} className="pt-6">
                <h3 className="text-2xl">{product.name}</h3>
                <p className="mt-3 text-[color:var(--text-muted)]">{product.summary}</p>
                <p className="mt-4 font-medium text-[color:var(--heading)]">{product.proof}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
