import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function ClosingBand() {
  return (
    <section className="theme-dark relative overflow-hidden" aria-label="Work with us">
      <div aria-hidden className="duotone absolute inset-0">
        <Image src="/images/glass-planes.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden className="scrim-deep absolute inset-0" />
      <div className="shell relative z-10 py-28 lg:py-36">
        <Reveal>
          <h2 className="max-w-[20ch] text-5xl">
            Wherever you meet your customers, that&rsquo;s where we build.
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg text-[color:var(--text-muted)]">
            Your competitors are already exploring AI for exactly these moments. Let&rsquo;s make sure
            you move first — with products that ship, not decks that sit.
          </p>
          <Link href="/contact" className="btn btn-primary mt-9">
            Start a conversation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
