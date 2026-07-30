import Reveal from "@/components/motion/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import { companyBeats } from "@/lib/careers";

/**
 * The company we are building — the page's first light section.
 *
 * Hairlines only: no cards, no glass, no radius. That is the `Products` register
 * rather than `WaysToWork`'s, and it is chosen so this section reads differently
 * from the smoked-card grid of principles that follows it. Two consecutive card
 * grids would flatten the page.
 *
 * The heading/intro row follows `Problem`'s split — heading left, copy right — so
 * the section opens the same way the homepage's light sections do.
 *
 * The mission closes it as a Green pull quote, the one place the display accent is
 * used on a light field (8.43:1 on the paper canvas). Same device as `Problem`'s
 * quote, but without quote marks: this is a statement of intent, not a quotation.
 */
export default function TheCompany() {
  return (
    <section className="section" aria-label="The company we are building">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal from="left">
            <h2 className="max-w-[16ch] text-4xl">The company we are building.</h2>
          </Reveal>
          <Reveal from="right" delay={0.08}>
            <div className="space-y-5 text-lg text-[color:var(--text-muted)]">
              <p>
                At ATB., we are building that kind of company while helping our clients build their
                own. We are reimagining how engineering, product management, customer work and
                operations come together &mdash; replacing layers and hand-offs with one connected
                system for understanding problems, creating solutions and delivering them in the
                real world.
              </p>
              <p>
                Joining now means more than building ambitious AI products. It means helping create
                the environment, tools and ways of working that make a small group of exceptional
                people capable of extraordinary things.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The four beats, each written along its own drawn hairline. Two columns
            from md up: these bodies are long, and a single column would leave a
            very deep section between the intro and the mission. */}
        <div className="mt-16 grid gap-y-12 md:mt-20 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          {companyBeats.map((beat, i) => (
            <article key={beat.title}>
              {/* The rule staggers by column pair, and the copy arrives a beat
                  behind its own rule rather than against the other column — the
                  pattern `Products` established for its ruled pair. */}
              <DrawRule delay={(i % 2) * 0.1} />
              <Reveal from="right" delay={0.12 + (i % 2) * 0.1} className="pt-6">
                <h3 className="text-2xl">{beat.title}</h3>
                <p className="mt-3 text-[color:var(--text-muted)]">{beat.body}</p>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="eyebrow mt-20 flex justify-center">Our mission</p>
          <p className="statement mx-auto mt-4 max-w-[26ch] text-center text-4xl text-[color:var(--color-green)]">
            To push ourselves and our clients to unlock new levels of performance and value at the
            frontier of technology.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
