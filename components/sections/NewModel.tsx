import Reveal from "@/components/motion/Reveal";

// One shared iridescent asset, zoomed in and panned to a different region per
// card so each reads as its own background.
const pillars = [
  {
    title: "Products, not seats.",
    body: "Rebuild the SaaS you rent as a product that's truly yours — just the features you need, customised to how you work, without the per-seat bill.",
    position: "16% 28%",
  },
  {
    title: "Shaped to your reality.",
    body: "We start from our IP and customise to how your business actually runs — accelerating delivery, not starting from scratch.",
    position: "70% 22%",
  },
  {
    title: "Frontier, in weeks.",
    body: "We co-create new capabilities at the edge of what's possible — without the quarter-long discovery phase.",
    position: "90% 82%",
  },
  {
    title: "Outcomes, not hours.",
    body: "Commercial models tied to the value we create, not people multiplied by rates. We succeed when you do.",
    position: "44% 92%",
  },
];

export default function NewModel() {
  return (
    <section className="section" aria-label="A new model">
      <div className="shell">
        <Reveal>
          <h2 className="max-w-[16ch]" style={{ fontSize: "var(--text-4xl)" }}>
            A new model for a changed world.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={(i % 2) * 0.08}
              from={i % 2 === 0 ? "left" : "right"}
              className="relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-3xl p-8"
            >
              {/* Distinct crop of the shared iridescent background */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/card-modern.webp')",
                  backgroundSize: "260%",
                  backgroundPosition: pillar.position,
                }}
              />
              {/* Legibility scrim */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,46,51,0.05) 0%, rgba(15,46,51,0.15) 35%, rgba(15,46,51,0.6) 70%, rgba(15,46,51,0.92) 100%)",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-[color:var(--color-cream)]" style={{ fontSize: "var(--text-xl)" }}>
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[color:var(--color-aqua)]">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
