import Logo from "@/components/brand/Logo";

/**
 * The product mark — one rule for every product in the family.
 *
 *     [atb mark]  Frontline OS
 *                  ^display face  ^lifted, cap-aligned
 *
 * This is the ATBOS lockup (components/sections/ATBOS.tsx) generalised. There,
 * the atb mark and a lifted "OS" compose the company's own operating system;
 * here the product name sits between them, and the mark becomes the
 * endorsement. Which is why the "an At The Beyond product" line under the
 * current app's logo can go: the mark already says it, and a wordmark that
 * needs a caption explaining who made it is not doing its job.
 *
 * It also retires the waveform icon. That icon is not in the brand's
 * vocabulary, it duplicates what the mark is for, and it is the last place the
 * off-brand amber was hiding.
 *
 * ── The geometry ──
 * Everything scales off the container's font-size, so the lockup is set by
 * `size` alone and the parts cannot drift apart.
 *
 * MARK_SCALE  The mark's box is 1em tall but its ascender fills only ~80.6% of
 *             it (measured in ATBOS: a 58px ascender at a 72px box). Newsreader's
 *             caps are ~70% of its em. 0.87 puts the mark's ascender at
 *             0.87 × 0.806 ≈ 0.70em — level with the F of the product name.
 * MARK_DROP   Logo's wrapper is an `overflow: hidden` inline-block, so its
 *             baseline is its bottom edge, not the glyphs' baseline. The box
 *             carries 38 of its 384 viewBox units below the baseline (9.9%), so
 *             the mark has to be lowered by 0.099 × MARK_SCALE to sit on the
 *             text baseline.
 * OS_SCALE    Half the product name's cap height, as in ATBOS — a lifted
 *             secondary mark, not a true superscript.
 * OS_RAISE    To level the cap TOPS, the smaller box's baseline rises by
 *             (1 − OS_SCALE) × cap. In `vertical-align` the length resolves
 *             against the OS span's own font-size, hence the division.
 *
 * Verified on render at 20px and 44px; the numbers are geometry, not taste, so
 * they hold at any size.
 */
const CAP = 0.7; // Newsreader cap height, as a fraction of the em
const MARK_SCALE = 0.87;
const MARK_DROP = 0.099 * MARK_SCALE;
const OS_SCALE = 0.6;
const OS_RAISE = ((1 - OS_SCALE) * CAP) / OS_SCALE;

type Props = {
  /** Product name without the OS — "Frontline", "Engage", "Commerce". */
  name: string;
  /** Rendered type size. The whole lockup scales from it. */
  size?: number | string;
  /**
   * `full` carries the atb mark; `compact` drops it for the name and OS alone.
   *
   * Compact is not a smaller full — the mark is removed rather than shrunk. A
   * handset app bar has ~180px for a wordmark, and the full lockup at a size
   * that fits leaves the mark's counters filled in. Use compact wherever the
   * atb mark already appears in the surrounding chrome (it is in the account
   * menu), and full everywhere the product introduces itself: sign-in, splash,
   * the about sheet, and any width from `sm` up.
   */
  variant?: "full" | "compact";
  className?: string;
};

export default function ProductMark({
  name,
  size = 20,
  variant = "full",
  className,
}: Props) {
  return (
    <span
      className={className}
      /* inline-block, NOT inline-flex. The two lifts below are `vertical-align`,
         which is inline-layout only — flex items ignore it, and the lockup
         would come out flat-baselined with the OS sitting on the line. */
      style={{
        display: "inline-block",
        fontSize: typeof size === "number" ? `${size}px` : size,
        lineHeight: 1,
        color: "inherit",
        whiteSpace: "nowrap",
      }}
    >
      {/* The accessible name is the composed one — "FrontlineOS", as it is
          written everywhere else in the system. The parts are hidden from the
          tree so it is not read as "atb Frontline OS". */}
      <span className="sr-only">{name}OS</span>

      {variant === "full" && (
        <Logo
          height={`${MARK_SCALE}em`}
          hideDot
          style={{
            verticalAlign: `${-MARK_DROP}em`,
            /* The gap between endorsement and product name. Wider than the
               letter gaps inside either, so the lockup reads as two things —
               a maker and a product — rather than as one long word. */
            marginRight: "0.42em",
          }}
        />
      )}

      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          letterSpacing: "-0.012em",
        }}
      >
        {name}
      </span>

      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: `${OS_SCALE}em`,
          verticalAlign: `${OS_RAISE}em`,
          letterSpacing: "-0.01em",
          /* Tight against the name: "FrontlineOS" is one word, and the lift is
             what separates the OS, not a space. */
          marginLeft: "0.04em",
        }}
      >
        OS
      </span>
    </span>
  );
}
