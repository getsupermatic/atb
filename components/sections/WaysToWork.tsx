import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

/**
 * Icons built from the brand's orbit + lime-node motif — one per engagement
 * model. Cream shapes on the dark section, with the lime node as the accent.
 */
const stroke = { fill: "none", stroke: "var(--color-cream)", strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const node = { fill: "var(--color-lime)" };

// Subscribe & Deploy — a node in orbit: plug into the system that's already running.
function DeployIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="13" {...stroke} />
      <circle cx="33" cy="15" r="5" {...node} />
    </svg>
  );
}

// Forward Deploy — carried forward to your frontline.
function ForwardIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
      <circle cx="9" cy="24" r="5" {...node} />
      <path d="M19 13 L30 24 L19 35" {...stroke} />
      <path d="M30 13 L41 24 L30 35" {...stroke} />
    </svg>
  );
}

// Frontier Advisory — reaching up to the node at the edge.
function FrontierIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden>
      <path d="M9 34 L24 18 L39 34" {...stroke} />
      <circle cx="24" cy="12" r="5" {...node} />
    </svg>
  );
}

const ways = [
  {
    Icon: DeployIcon,
    name: "Subscribe & Deploy",
    kicker: "AI Blueprints",
    body: "Immediate access to production-grade frontline AI. We host and run it; you deploy from day one.",
  },
  {
    Icon: ForwardIcon,
    name: "Customise & Accelerate",
    kicker: "Forward Deploy",
    body: "Our Blueprints, shaped to your brand, workflows and systems. Leading practice, live fast.",
  },
  {
    Icon: FrontierIcon,
    name: "Co-Innovate & Pioneer",
    kicker: "Frontier Advisory",
    body: "New capabilities built with your team at the edge of what AI can do.",
  },
];

export default function WaysToWork() {
  return (
    <section className="theme-dark section relative overflow-hidden" aria-label="Three ways to work with us">
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/orbit-planet.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,46,51,0.92) 0%, rgba(15,46,51,0.78) 42%, rgba(15,46,51,0.55) 100%)",
        }}
      />
      <div className="shell relative z-10">
        <Reveal>
          <h2 className="max-w-[18ch]" style={{ fontSize: "var(--text-4xl)" }}>
            Three ways to work with us.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[color:var(--color-aqua)]" style={{ fontSize: "var(--text-lg)" }}>
            Subscribe to a ready-made Blueprint, customise one to your exact needs, or co-create
            something entirely new at the frontier.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {ways.map((way, i) => (
            <Reveal as="li" key={way.name} delay={i * 0.14} distance={56} className="material-smoked flex flex-col rounded-3xl p-8">
              <way.Icon />
              <p className="mt-6 text-sm text-[color:var(--color-aqua)]">{way.kicker}</p>
              <h3 className="mt-1 text-[color:var(--color-cream)]" style={{ fontSize: "var(--text-2xl)" }}>
                {way.name}
              </h3>
              <p className="mt-3 flex-1 text-[color:var(--color-aqua)]">{way.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <Link
            href="/how-we-work"
            className="mt-10 inline-block font-medium text-[color:var(--color-lime)] underline underline-offset-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How we work
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
