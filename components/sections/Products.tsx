import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import WordReveal from "@/components/motion/WordReveal";
import PlateReveal from "@/components/motion/PlateReveal";
import { products } from "@/lib/site";

/**
 * Production-ready AI blueprints — an editorial spread.
 *
 * FrontlineOS takes the only photograph, bleeding off the right page edge, and
 * the other two are a ruled pair beneath it. No border-radius anywhere in the
 * section, no glass, no borders: hairlines are the only structure. That keeps it
 * distinct from WaysToWork's smoked-card grid, which follows it.
 *
 * CommerceOS and MarketingOS are type only because they have no artwork — see
 * the note on `products` in lib/site.ts. The spread reads the optional `image`
 * key, so either gains a plate automatically once one exists.
 */
export default function Products() {
  const [frontline, ...rest] = products;

  return (
    /* #what-we-do is the primary nav's target — see `primaryNav` in lib/site.ts.
       scroll-mt-6 for the same reason as NewModel: `.section`'s own top padding is
       the nav clearance, and this is just the safety margin at the narrow end. */
    <section id="what-we-do" className="section scroll-mt-6" aria-label="Products">
      <div className="shell">
        {/* The heading stands alone — there is no intro sentence. If one is ever
            added it should go BESIDE the heading, in a
            `grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end` row at body size
            on a ~46ch measure, not under it: bottom-aligned it costs no vertical
            space, because the h2 is 128px tall (two lines at 64.1px leading,
            measured) and the sentence needs at most three lines, so the row stays
            exactly as tall as the heading alone. The `auto` track matters — the h2
            carries its own 18ch cap and needs 609px at 1080, where
            `lg:grid-cols-2` would allow 464px and force a third line.

            Not wrapped in `Reveal`, deliberately. WordReveal slides a word down
            inside its own `overflow: hidden` box, and nesting that in a block that
            is itself translating would compound the two transforms. This follows
            the Footer's pattern instead — the lead is static and the word that
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
        <article
          className={`bleed-right mt-14 grid items-center gap-10 lg:mt-16 lg:gap-14 ${
            frontline.image ? "lg:grid-cols-[0.85fr_1fr]" : ""
          }`}
        >
          <Reveal from="left">
            {/* font-normal against the base h3 rule's 500 — at display scale
                Newsreader wants the lighter weight, and 500 here would read
                heavier than the h2 above it, which sits at 400. */}
            <h3 className="mt-4 text-3xl font-normal">{frontline.name}</h3>
            <p className="mt-4 max-w-[44ch] text-lg text-[color:var(--text-muted)]">
              {frontline.summary}
            </p>
            <p className="mt-5 font-medium text-[color:var(--heading)]">{frontline.proof}</p>
            {/* `.btn-primary` unchanged rather than a new green variant — it is
                already a flat Green fill with a Cream label. This is its only use
                on a LIGHT field, and it holds: Green is 8.43:1 against the paper
                canvas, so here the pill reads as a shape by its own fill rather
                than by its label, and the Cream label stays at the 7.81:1 the
                class was measured for.
                The pill's radius is the one curve left in the section, kept
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
              against it rather than floating in a letterbox.
              Conditional because `image` is optional — if FrontlineOS ever loses
              its artwork the copy takes the full width instead of leaving a hole,
              which is also what makes the grid-cols class above conditional. */}
          {frontline.image && (
            <PlateReveal
              src={frontline.image}
              alt="FrontlineOS — a supermarket colleague on a headset handing a bag of produce to a customer in the fruit and vegetable aisle."
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="aspect-[4/3] lg:aspect-[5/4]"
            />
          )}
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
