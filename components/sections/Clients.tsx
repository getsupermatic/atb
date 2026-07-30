import Image from "next/image";
import { clients, CLIENT_HOVER_DEFAULT } from "@/lib/content";

/**
 * Trusted-by logo strip. Was previously nested inside the Hero component, which
 * made "Hero" mean two unrelated things; it is its own section now and the page
 * composes the two.
 *
 * The marks rest greyscale and partly transparent, and reveal their brand colour
 * on hover. Render heights are tuned per mark rather than shared: the artwork has
 * differing intrinsic padding and aspect, so a single height makes some read half
 * the size of others.
 */
export default function Clients() {
  return (
    /* The generous top margin centres the strip in the band between the hero
       panel above and the Capability-gap panel below. */
    <div className="shell mt-32">
      <p className="text-center text-base text-[color:var(--text-muted)]">
        Trusted by teams at the world&rsquo;s biggest brands.
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {clients.map((c) => (
          <li key={c.src}>
            <Image
              src={c.src}
              alt={c.alt}
              width={c.w}
              height={c.h}
              sizes="200px"
              className={`w-auto object-contain opacity-[var(--logo-o)] grayscale ${c.dim ?? ""} transition duration-300 ${c.hover ?? CLIENT_HOVER_DEFAULT}`}
              style={{ height: c.size, "--logo-o": c.opacity ?? 0.5 } as React.CSSProperties}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
