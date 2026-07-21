import Image from "next/image";
import HeroMorph from "./HeroMorph";

// Client logos (cleared). Render heights tuned so marks read at a similar size
// despite differing intrinsic padding/aspect.
// `opacity` is the resting opacity (defaults to 0.5). `dim` is an optional
// resting filter for marks whose artwork is intrinsically pale, and `hover`
// overrides the default "reveal brand colour" rollover. Nestlé's mark is a
// native light-grey line logo, so a brightness filter darkens it to match the
// others, and its rollover keeps it monochrome but crisper (revealing its pale
// colour would read as lower contrast, not higher).
const defaultHover = "hover:opacity-100 hover:grayscale-0 hover:brightness-100";

const clients = [
  { src: "/images/clients/burger-king.png", alt: "Burger King", w: 4000, h: 2400, size: 67, opacity: 0.85 },
  { src: "/images/clients/pepsico.png", alt: "PepsiCo", w: 3840, h: 2160, size: 65, opacity: 0.7 },
  {
    src: "/images/clients/john-lewis.png", alt: "John Lewis & Partners", w: 3840, h: 2160, size: 63,
    opacity: 0.85,
    // Rollover tints the black mark gold rather than revealing its (black) colour.
    hover: "hover:opacity-100 hover:[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(60%)_saturate(520%)_hue-rotate(1deg)_brightness(92%)_contrast(88%)]",
  },
  {
    src: "/images/clients/nestle.webp", alt: "Nestlé", w: 960, h: 276, size: 34,
    opacity: 1, dim: "brightness-[0.5]",
    hover: "hover:opacity-100 hover:brightness-[0.3] hover:contrast-[1.5]",
  },
  { src: "/images/clients/diageo.png", alt: "Diageo", w: 2237, h: 516, size: 24 },
];

export default function Hero() {
  return (
    <>
      <HeroMorph />

      {/* Trusted-by client logos — extra top margin centres the strip in the
          band between the hero panel above and the feature panel below */}
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
                className={`w-auto object-contain opacity-[var(--logo-o)] grayscale ${c.dim ?? ""} transition duration-300 ${c.hover ?? defaultHover}`}
                style={{ height: c.size, "--logo-o": c.opacity ?? 0.5 } as React.CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
