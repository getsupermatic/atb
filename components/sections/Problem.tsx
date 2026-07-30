import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { stats } from "@/lib/content";

export default function Problem() {
  return (
    <section className="section relative overflow-hidden" aria-label="The problem">
      {/* No section background of its own — the iridescent plate and the Cream veil that used to sit here are both gone, so the page's own
          textured canvas reads straight through this section. */}

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

      {/* Stat strip — a full-bleed copper band. The key lines that used to rule
          it off above and below are gone; the only rule left is a simple
          vertical divider between the figures — half height and centred on the
          cell rather than running the full depth, so it reads as a mark between
          the stats rather than a rule boxing them in. See .stat-divide.
          Below sm the three stats stack, where a vertical divider can't apply, so
          the grid's own divide-y keeps them apart instead.
          The band is full width; the stats themselves sit in .shell so they
          align with the copy. The outer cells drop their edge padding, so the
          first figure starts on the same line as the heading and the last label
          ends flush with it.
          Colour and contrast live in .stat-band — see globals.css. */}
      <div className="stat-band relative z-10 mt-16">
        <div className="shell">
          <div className="stat-divide grid divide-y divide-[color:var(--border)] sm:grid-cols-3 sm:divide-y-0">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className="py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0 lg:px-10 lg:py-14"
              >
                <CountUp
                  value={stat.value}
                  from={stat.from}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="stat-figure block text-5xl"
                />
                <p className="mt-3 text-[color:var(--text-muted)]">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="shell relative z-10">
        <Reveal delay={0.1}>
          {/* Green rather than the Ink that .statement carries via --heading —
              the pull quote is the one place the display accent is used on a
              light field. 8.43:1 on the paper canvas, so it clears AA for body
              text let alone at this size. */}
          <p className="statement mx-auto mt-20 max-w-[24ch] text-center text-4xl text-[color:var(--color-green)]">
            &ldquo;The technology is ready. The customer frontline is waiting. What&rsquo;s been
            missing is a partner who can actually ship.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
