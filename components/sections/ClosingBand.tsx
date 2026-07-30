import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

/**
 * The closing band.
 *
 * The field is `.plate-aisle` under `.scrim-deep`. It replaces the glass-planes
 * photograph, which has been removed from the site — and with it `.duotone`, whose
 * only purpose was stripping the retired teal palette out of that artwork. The
 * measurements for this pairing are recorded on the careers page's closing band,
 * which shares it: worst case is the top of the band at 0.753 combined coverage,
 * where Cream is 7.71:1 and Stone 5.76:1.
 */
export default function ClosingBand() {
  return (
    <section className="theme-dark relative overflow-hidden" aria-label="Work with us">
      <div aria-hidden className="plate plate-aisle absolute inset-0" />
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
