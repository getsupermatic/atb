import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { engagementModels } from "@/lib/content";

/**
 * Icons built from the brand's orbit + node motif — one per engagement model.
 * Cream shapes on the dark section, with the Copper node as the accent.
 *
 * Presentation, so they live here rather than in lib/content.ts; the copy there
 * names its icon by key and this map resolves it.
 */
const stroke = {
  fill: "none",
  stroke: "var(--color-cream)",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const node = { fill: "var(--color-copper)" };

/** Subscribe & Deploy — a node in orbit: plug into a system already running. */
function DeployIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="13" {...stroke} />
      <circle cx="33" cy="15" r="5" {...node} />
    </svg>
  );
}

/** Forward Deploy — carried forward to your frontline. */
function ForwardIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
      <circle cx="9" cy="24" r="5" {...node} />
      <path d="M19 13 L30 24 L19 35" {...stroke} />
      <path d="M30 13 L41 24 L30 35" {...stroke} />
    </svg>
  );
}

/** Frontier Advisory — reaching up to the node at the edge. */
function FrontierIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
      <path d="M9 34 L24 18 L39 34" {...stroke} />
      <circle cx="24" cy="12" r="5" {...node} />
    </svg>
  );
}

const ICONS = {
  deploy: DeployIcon,
  forward: ForwardIcon,
  frontier: FrontierIcon,
} as const;

export default function WaysToWork() {
  return (
    <section className="theme-dark section relative overflow-hidden" aria-label="Three ways to work with us">
      {/* tex-light-aisle, in place of the orbit-planet plate. No .duotone: the
          supplied asset is already a clean monochrome, so there is no legacy hue
          to strip and the wrapper's soft-light layer would only muddy it.
          No extra veil either, which is worth recording because the plate is a
          bright one — brightest pixel (247,242,233), where Cream alone would
          be 1.01:1. .scrim-side is what covers it: unlike the other scrims it
          never fades out, bottoming at ink 0.58 on the right, and the cards add
          their own smoked glass on top. Measured worst case — Stone at
          text-sm in a card over the plate's brightest pixel — lands at 5.19:1,
          so an additional veil would only bury the texture. See the note on
          .material-smoked for that measurement. */}
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/tex-light-aisle.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden className="scrim-side absolute inset-0" />
      <div className="shell relative z-10">
        <Reveal>
          <h2 className="max-w-[18ch] text-4xl">Three ways to work with us.</h2>
          <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--text-muted)]">
            Subscribe to a ready-made Blueprint, customise one to your exact needs, or co-create
            something entirely new at the frontier.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {engagementModels.map((way, i) => {
            const Icon = ICONS[way.icon];
            return (
              <Reveal
                as="li"
                key={way.name}
                delay={i * 0.14}
                distance={56}
                className="material-smoked flex flex-col rounded-3xl p-8"
              >
                <Icon />
                <p className="mt-6 text-sm text-[color:var(--text-muted)]">{way.kicker}</p>
                <h3 className="mt-1 text-2xl">{way.name}</h3>
                <p className="mt-3 flex-1 text-[color:var(--text-muted)]">{way.body}</p>
              </Reveal>
            );
          })}
        </ol>

        {/* Copper fill rather than the Green .btn-primary, following the
            footer's Subscribe button. The label has to go to Ink: Cream on
            Copper is 2.18:1 and fails normal-size text, where Ink is 5.59:1. */}
        <Reveal delay={0.1}>
          <Link
            href="/contact"
            className="btn btn-primary mt-10 bg-[color:var(--color-copper)] text-[color:var(--color-ink)]"
          >
            Get in Contact
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
