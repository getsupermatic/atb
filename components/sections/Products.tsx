import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { products } from "@/lib/site";

export default function Products() {
  const [frontline, ...rest] = products;

  return (
    <section className="section" aria-label="Products">
      <div className="shell">
        <Reveal>
          <h2 className="max-w-[18ch] text-4xl">Production-ready AI blueprints.</h2>
          <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--text-muted)]">
            AI products for where your business meets the customer — operations, commerce and
            marketing.
          </p>
        </Reveal>

        {/* FrontlineOS spotlight */}
        <Reveal from="left" className="mt-12">
          <article className="material-glass grid overflow-hidden rounded-[1.75rem] lg:grid-cols-2">
            {/* No .duotone here — the aisle shot is already monochrome and is
                shown untreated, exactly as it appears in the header. The two
                cards below keep .duotone because their plates are legacy
                teal/lime artwork that still needs remapping. */}
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src={frontline.image}
                alt="FrontlineOS — a supermarket colleague in the chilled aisle before opening, checking a handheld device beside a stock cart."
                fill
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-10">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl">{frontline.name}</h3>
                {/* Deep Forest fill with a Warm Chalk label, matching the header
                    CTA. Chalk on this green is 7.7:1; Ink would be 2.2:1. */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-forest)] px-3 py-1 text-xs font-medium text-[color:var(--color-chalk)]">
                  <span className="node-dot bg-[color:var(--color-chalk)]" />
                  {frontline.status}
                </span>
              </div>
              <p className="mt-4 text-lg text-[color:var(--text-muted)]">{frontline.summary}</p>
              <p className="mt-4 font-medium text-[color:var(--heading)]">{frontline.proof}</p>
              <Link
                href={frontline.href}
                className="mt-6 inline-block font-medium text-[color:var(--heading)] underline underline-offset-4"
              >
                Explore the product
              </Link>
            </div>
          </article>
        </Reveal>

        {/* CommerceOS + MarketingOS */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((product, i) => (
            <Reveal
              key={product.name}
              from={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.08}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border" style={{ borderColor: "var(--border)" }}>
                {/* No .duotone — these now carry the same already-monochrome
                    aisle shot as the spotlight and the header, so there is no
                    legacy hue left to strip. Restore it if bespoke artwork
                    lands that needs remapping. */}
                <div className="img-frame aspect-[16/9] rounded-none border-0">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl">{product.name}</h3>
                  <p className="mt-3 flex-1 text-[color:var(--text-muted)]">{product.summary}</p>
                  <p className="mt-4 font-medium text-[color:var(--heading)]">{product.proof}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
