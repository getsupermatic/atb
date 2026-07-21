import Image from "next/image";
import HeroMorph from "./HeroMorph";

const keywords = [
  "AI-native products",
  "Frontline innovation",
  "Voice-first UX",
  "Generative commerce",
  "Marketing intelligence",
];

// Client logos (cleared). Render heights tuned so marks read at a similar size
// despite differing intrinsic padding/aspect.
// `opacity` is the resting opacity (defaults to 0.5). Nestlé's mark is a native
// light-grey line logo, so it needs a higher resting value to read at the same
// visual weight as the darker marks under the shared grayscale treatment.
const clients = [
  { src: "/images/clients/burger-king.png", alt: "Burger King", w: 4000, h: 2400, size: 67 },
  { src: "/images/clients/pepsico.png", alt: "PepsiCo", w: 3840, h: 2160, size: 65 },
  { src: "/images/clients/john-lewis.png", alt: "John Lewis & Partners", w: 3840, h: 2160, size: 60 },
  { src: "/images/clients/nestle.webp", alt: "Nestlé", w: 960, h: 276, size: 36, opacity: 0.9 },
  { src: "/images/clients/diageo.png", alt: "Diageo", w: 2237, h: 516, size: 24 },
];

export default function Hero() {
  return (
    <>
      <HeroMorph />

      {/* Rolling keyword strip (§2.1) */}
      <div className="marquee-mask mt-4 overflow-hidden border-y py-4" style={{ borderColor: "var(--border)" }} aria-hidden>
        <div className="marquee-track flex w-max gap-10 pr-10">
          {[...keywords, ...keywords, ...keywords, ...keywords].map((k, i) => (
            <span
              key={i}
              className="text-sm font-medium text-[color:var(--text-muted)]"
              style={{ fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Trusted-by client logos */}
      <div className="shell mt-14">
        <p className="text-center text-sm text-[color:var(--text-muted)]">
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
                className="w-auto object-contain opacity-[var(--logo-o)] grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                style={{ height: c.size, "--logo-o": c.opacity ?? 0.5 } as React.CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
