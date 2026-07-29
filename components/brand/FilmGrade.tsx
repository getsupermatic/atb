/**
 * The film grade as an SVG filter, referenced by `.grade-film` in globals.css.
 *
 * The recipe — neutral monochrome, shadows lifted a fraction warm:
 *   saturation  −100%
 *   gamma       1.12
 *   black point #121110
 *   white point #F4EEE4
 *
 * At saturation 0 the only colour left in the frame is what the two endpoints
 * put there, which is what keeps it reading neutral: measured over the hero
 * plate, mean per-pixel channel spread is 3.9 against the copper grade's 21.8.
 * Contrast comes from the tone curve rather than from saturation — luminance
 * std 42.6, up from the copper grade's 38.3.
 *
 * It lives in SVG rather than in a CSS `filter:` shorthand because two of those
 * four lines have no CSS equivalent:
 *
 * - **Gamma is a power curve**, not a contrast pivot. `contrast()` is linear
 *   around mid-grey; `x^1.12` bends the whole curve, weighting the shadows
 *   without flattening the highlights.
 * - **The endpoints are a remap, not a clamp.** Doing it with `lighten` and
 *   `darken` blend layers only raises the floor and caps the ceiling — every
 *   value in between is left exactly as it was, so the midtones never pick up
 *   the warmth. `feComponentTransfer type="linear"` maps 0 → black point and
 *   1 → white point and interpolates everything between, so the lift carries
 *   right through the frame.
 *
 * `color-interpolation-filters="sRGB"` is required, not optional: SVG filters
 * default to linearRGB, and the slope/intercept below are sRGB values. Without
 * it the endpoints land somewhere else entirely.
 *
 * Rendered once in the root layout — a `filter: url(#…)` reference has to
 * resolve in the same document.
 */

/** intercept = black point, slope = white − black, per channel, as 0–1 sRGB. */
const blackPoint = [0x12, 0x11, 0x10];
const whitePoint = [0xf4, 0xee, 0xe4];
const channel = (i: number) => ({
  intercept: (blackPoint[i] / 255).toFixed(5),
  slope: ((whitePoint[i] - blackPoint[i]) / 255).toFixed(5),
});

export default function FilmGrade() {
  const [r, g, b] = [0, 1, 2].map(channel);

  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <filter id="film-grade" colorInterpolationFilters="sRGB">
        {/* −100% saturation — fully neutral before the endpoints tint it */}
        <feColorMatrix type="saturate" values="0" />
        {/* Gamma 1.12. Before the endpoint remap: the curve wants the full 0–1
            range to bend across, not the compressed black→white one. */}
        <feComponentTransfer>
          <feFuncR type="gamma" exponent="1.12" />
          <feFuncG type="gamma" exponent="1.12" />
          <feFuncB type="gamma" exponent="1.12" />
        </feComponentTransfer>
        {/* Endpoints: 0 → #121110, 1 → #F4EEE4 */}
        <feComponentTransfer>
          <feFuncR type="linear" slope={r.slope} intercept={r.intercept} />
          <feFuncG type="linear" slope={g.slope} intercept={g.intercept} />
          <feFuncB type="linear" slope={b.slope} intercept={b.intercept} />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
