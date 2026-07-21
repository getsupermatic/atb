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
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/iridescent.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(245,241,232,0.55)" }} />

      <div className="shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal from="left">
            <h2 style={{ fontSize: "var(--text-4xl)" }}>
              AI&rsquo;s potential is enormous. On the customer frontline, almost none of it has
              arrived.
            </h2>
          </Reveal>
          <Reveal from="right" delay={0.08}>
            <div className="space-y-5 text-[color:var(--text-muted)]" style={{ fontSize: "var(--text-lg)" }}>
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

        {/* Stat band — frosted glass cells on the iridescent field */}
        <div
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-3"
          style={{ borderColor: "var(--border)", background: "var(--border)" }}
        >
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="bg-[rgba(251,249,244,0.6)] p-8 backdrop-blur-md"
            >
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="block font-[600] text-[color:var(--color-teal)]"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", letterSpacing: "-0.03em" }}
              />
              <p className="mt-3 text-[color:var(--text-muted)]">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p
            className="mx-auto mt-20 max-w-[24ch] text-center font-[600] text-[color:var(--heading)]"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", lineHeight: 1.14, letterSpacing: "-0.02em" }}
          >
            &ldquo;The technology is ready. The customer frontline is waiting. What&rsquo;s been
            missing is a partner who can actually ship.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
