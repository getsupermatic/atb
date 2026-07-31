/**
 * Generates public/images/og-card.png — the Open Graph / Twitter share card.
 *
 *   node scripts/og-card.mjs
 *
 * Why a generator rather than `app/opengraph-image.tsx`: Satori (what next/og
 * renders with) cannot read the .woff2 files next/font produces, so that route
 * would need a TTF vendored into the repo, and the brand hexes retyped in JSX
 * against the brief's no-hardcoded-hexes rule. This renders the card in Chrome
 * instead — the site's own fonts, at the site's own token values — and commits
 * the result as a static asset. Nothing runs at build or request time.
 *
 * The wordmark is not redrawn here. The <defs> block is read straight out of
 * components/brand/Logo.tsx and the glyphs are placed at their expanded slots
 * using that file's own GLYPHS table, so re-running this after the logo changes
 * picks the change up rather than quietly shipping the old mark.
 *
 * Requires Google Chrome and ImageMagick. Rendered at 2× and downsampled, which
 * is what makes the type read cleanly at 1200×630.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = "public/images/og-card.png";
const W = 1200;
const H = 630;

// Tokens, mirrored from app/styles/tokens.css. This file renders outside the
// stylesheet, so the four it needs are repeated here and nowhere else.
const INK = "#0f1613";
const CREAM = "#f5f1e8";
const COPPER = "#c97b45";
const STONE = "#d8d2c4";

const logo = readFileSync("components/brand/Logo.tsx", "utf8");

/** The <defs> block, verbatim, with JSX's camelCase attributes turned back into SVG's. */
const defs = logo
  .slice(logo.indexOf("<defs>"), logo.indexOf("</defs>") + 7)
  .replace(/fillRule=/g, "fill-rule=");

/** The viewBox and each glyph's expanded slot, read from Logo.tsx's own constants. */
const viewBox = logo.match(/const VIEWBOX = "([^"]+)"/)[1];
const glyphs = [...logo.matchAll(/href: "(#g-[^"]+)", place: "([^"]+)"/g)];
if (glyphs.length !== 12) throw new Error(`expected 12 glyphs, found ${glyphs.length}`);

// 8.71875 — the expanded lockup's aspect ratio, from Logo.tsx's RATIO_EXPANDED.
const markH = 40;
const mark = `<svg viewBox="${viewBox}" width="${markH * 8.71875}" height="${markH}" fill="${CREAM}">
  ${defs}
  ${glyphs.map(([, href, place]) => `<g transform="${place}"><use href="${href}"/></g>`).join("\n  ")}
</svg>`;

const html = `<!doctype html>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300&family=Instrument+Sans:wght@500&display=block">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px; height: ${H}px;
    background: ${INK};
    padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    -webkit-font-smoothing: antialiased;
  }
  /* 1.08 leading and −0.01em tracking are the base h1 rule from styles/base.css,
     so the card's headline sets exactly as the page's does. */
  h1 {
    font: 300 132px/1.08 Newsreader, Georgia, serif;
    letter-spacing: -0.01em;
    font-optical-sizing: auto;
    color: ${CREAM};
  }
  .rule { width: 88px; height: 2px; background: ${COPPER}; margin-bottom: 40px; }
  .foot {
    display: flex; justify-content: flex-end;
    font: 500 21px Instrument Sans, system-ui, sans-serif;
    letter-spacing: -0.005em;
    color: ${STONE};
  }
</style>
<body>
  <div>${mark}</div>
  <div>
    <div class="rule"></div>
    <h1>The future,<br>put to work.</h1>
  </div>
  <div class="foot">atbeyond.com</div>
</body>`;

const dir = mkdtempSync(join(tmpdir(), "og-card-"));
const page = join(dir, "card.html");
const shot = join(dir, "card@2x.png");
writeFileSync(page, html);

execFileSync(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--window-size=${W},${H}`,
  "--force-device-scale-factor=2",
  // Gives the webfonts time to land; `display=block` above keeps Chrome from
  // painting the fallback face in the meantime.
  "--virtual-time-budget=8000",
  `--screenshot=${shot}`,
  `file://${page}`,
], { stdio: "inherit" });

execFileSync("magick", [shot, "-resize", `${W}x${H}`, "-strip", OUT], { stdio: "inherit" });
console.log(`wrote ${OUT}`);
