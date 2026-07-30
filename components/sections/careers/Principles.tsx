import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { principles } from "@/lib/careers";

/**
 * Principles for how we work — six smoked-glass cards over the light-aisle plate.
 *
 * The material is `WaysToWork`'s, unchanged and for the same reasons: the plate is
 * bright (brightest pixel 247,242,233), `.scrim-side` covers it without ever
 * fading out, and the cards add their own smoked glass on top. The binding case is
 * recorded on `.material-smoked` — Stone at text-sm in a card over that brightest
 * pixel lands 5.19:1 — and this section is more forgiving than the one it was
 * measured for, because its card copy is at body size rather than text-sm.
 *
 * Two columns from md and three from lg, so the six sit as 2×3 rather than a
 * ragged 3+3 on tablet.
 *
 * No icons, unlike `WaysToWork`. Its three models each have a meaning the orbit +
 * node motif can carry; six principles do not, and six invented glyphs would be
 * decoration pretending to be a system.
 */
export default function Principles() {
  return (
    <section
      className="theme-dark section relative overflow-hidden"
      aria-label="Principles for how we work"
    >
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/tex-light-aisle.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div aria-hidden className="scrim-side absolute inset-0" />

      <div className="shell relative z-10">
        <Reveal>
          <h2 className="max-w-[20ch] text-4xl">Principles for how we work.</h2>
          {/* Left-hand column, where .scrim-side sits between 0.94 and 0.8: Stone
              is 6.79:1 there against the plate's brightest pixel. */}
          <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--text-muted)]">
            We are at the beginning of building this model. These are the beliefs guiding it, not a
            claim that every mechanism is finished. The people who join now will help test them,
            challenge them and turn the best of them into durable practice.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal
              as="li"
              key={principle.title}
              /* Staggered by column, not by index: at three columns a flat
                 i * 0.14 would leave the last card arriving nearly a second
                 after the first, which reads as a queue rather than a set. */
              delay={(i % 3) * 0.14}
              distance={56}
              className="material-smoked flex flex-col rounded-3xl p-8"
            >
              <h3 className="text-2xl">{principle.title}</h3>
              <p className="mt-3 flex-1 text-[color:var(--text-muted)]">{principle.body}</p>
            </Reveal>
          ))}
        </ul>

        {/* The closing line, at display size and left-aligned so it stays in the
            strongly scrimmed half of the plate rather than drifting right into the
            0.58 tail. */}
        <Reveal delay={0.1}>
          <p className="statement mt-14 max-w-[40ch] text-3xl">
            The model will evolve. The underlying idea will not: give exceptional people the
            context, systems and trust to do the best work of their lives.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
