import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

const stats = [
  {
    value: 100,
    suffix: "M+",
    label:
      "frontline workers in the US alone — the largest, most underserved workforce for AI-driven productivity.",
  },
  {
    value: 1,
    prefix: "~",
    suffix: "%",
    label:
      "of enterprise software investment has reached the store floor. Without purpose-built products, AI repeats the mistake.",
  },
  {
    value: 4.4,
    decimals: 1,
    prefix: "$",
    suffix: "T",
    label:
      "long-term AI productivity opportunity (McKinsey) — yet 60%+ of companies see no significant impact today.",
  },
];

export default function Problem() {
  return (
    <section className="section relative overflow-hidden" aria-label="The problem">
      {/* Iridescent-glass background */}
      <div aria-hidden className="duotone absolute inset-0">
        <Image src="/images/iridescent.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden className="veil-chalk absolute inset-0" />

      <div className="shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal from="left">
            <h2 className="text-4xl">
              AI&rsquo;s potential is enormous. On the customer frontline, almost none of it has
              arrived.
            </h2>
          </Reveal>
          <Reveal from="right" delay={0.08}>
            <div className="space-y-5 text-lg text-[color:var(--text-muted)]">
              <p>
                Every boardroom has an AI strategy. Every consultancy has a transformation deck.
                Every vendor has a demo. But the shop floor, the warehouse and the drive-through are
                running the same software they had five years ago.
              </p>
              <p>
                Frontier capability advances every month. The value reaching frontline teams and
                their customers barely moves. Strategy decks don&rsquo;t close that gap. Only shipped
                products do.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Stat strip — square-edged and full-bleed, ruled off from the copy
          above and below rather than boxed. Sits outside .shell so it runs the
          full width of the section. */}
      <div
        className="material-frost relative z-10 mt-16 grid divide-y border-y divide-[color:var(--border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        style={{ borderColor: "var(--border)" }}
      >
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14"
          >
            <CountUp
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="stat-figure block text-5xl"
            />
            <p className="mt-3 text-[color:var(--text-muted)]">{stat.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="shell relative z-10">
        <Reveal delay={0.1}>
          <p className="statement mx-auto mt-20 max-w-[24ch] text-center text-4xl">
            &ldquo;The technology is ready. The customer frontline is waiting. What&rsquo;s been
            missing is a partner who can actually ship.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
