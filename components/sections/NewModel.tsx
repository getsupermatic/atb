import Reveal from "@/components/motion/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import { pillars } from "@/lib/content";

/**
 * A new model — an editorial ledger. The headline goes sticky and holds against
 * the plate for the whole section while the four pillars scroll past it as a
 * single column of ruled beats, each written along its own drawn hairline.
 *
 * Deliberately not a grid: Products and WaysToWork both follow with grids of
 * their own, and opaque cards here would cover most of .plate-drive, which is the
 * strongest field on the page.
 */
export default function NewModel() {
  return (
    /* .theme-dark remaps the semantic tokens, so the heading and copy pick up
       Cream / Stone without being hardcoded. .plate-drive supplies the
       field: the supplied drive-through plate over the same ink base.

       No `overflow-hidden` here, and that is load-bearing rather than an
       oversight. `overflow: hidden` on any ancestor makes it the scrollport, and
       `position: sticky` then resolves against a box that doesn't scroll — the
       headline below would silently stop sticking. The blocks sliding in from the
       right are contained by the `overflow-x: clip` already on html/body, and
       `clip` (unlike `hidden`) does not create a scrollport, so sticky still
       resolves against the viewport. */
    /* #how-we-work is the primary nav's target — see `primaryNav` in lib/site.ts.
       scroll-mt-6 rather than the nav's full height: `.section` already opens with
       72–144px of its own top padding, so the bar has empty space to sit over, and
       this is only the safety margin for the narrow end of that clamp. Anything
       larger would land far enough back to show the tail of the previous section,
       which is the fault this anchor set was corrected for. It is a scroll margin,
       so it has no layout effect and cannot disturb the sticky headline below. */
    <section
      id="how-we-work"
      className="theme-dark plate plate-drive section scroll-mt-6"
      aria-label="A new model"
    >
      {/* Deepens the plate under the copy column only, leaving it at full strength
          behind the sticky headline. The veil .plate-drive carries was measured for
          the h2 alone; body copy needs more. Numbers and the reason it is a
          gradient rather than a deeper flat veil are in .wash-read (globals.css). */}
      <div aria-hidden className="wash-read absolute inset-0" />

      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* The sticky element is a CHILD of the grid item, not the item itself.
              A sticky box travels inside its parent's box, so the parent has to be
              the tall one — which it is, because grid items stretch to the row
              height by default and the row is as tall as the four beats beside it.
              Putting `sticky` (or `self-start`) on the grid item itself would
              shrink it to its own content and leave the headline nothing to travel
              in, which looks exactly like sticky silently not working.
              top-28 clears the docked nav (~67px) with room to spare. */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="max-w-[16ch] text-4xl">A new model for a changed world.</h2>
              </Reveal>
            </div>
          </div>

          {/* An ordered list because the numerals are visible and the order is
              real. They are `aria-hidden`: the <ol> already conveys position, so
              reading them out gives "1, 01, Products not seats." */}
          <ol className="space-y-14 lg:space-y-20">
            {pillars.map((pillar, i) => (
              <li key={pillar.title}>
                <DrawRule />
                {/* The copy slides in along the line just drawn — hence the delay,
                    which is a beat rather than a stagger. */}
                <Reveal from="right" delay={0.12} className="pt-6">
                  <p aria-hidden className="stat-figure text-2xl text-[color:var(--text-muted)]">
                    {`0${i + 1}`}
                  </p>
                  {/* font-normal against the base h3 rule's 500. At display scale
                      Newsreader wants the lighter weight — the same reasoning the
                      h1 trial follows — and 500 here would also read heavier than
                      the h2 it sits beside, which is at 400. */}
                  <h3 className="mt-3 text-3xl font-normal">{pillar.title}</h3>
                  <p className="mt-4 max-w-[46ch] text-lg text-[color:var(--text-muted)]">
                    {pillar.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
