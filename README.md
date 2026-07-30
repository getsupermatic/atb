# ATB. — marketing website

Marketing site for **ATB.** (*At The Beyond*), an AI-native product company for the customer frontline. This phase delivers the **home page** plus the design and motion system the remaining pages build on.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript — static-first for SEO.
- **Tailwind CSS v4** — brand tokens in `@theme`; semantic aliases remapped per section by `.theme-dark`.
- **Motion** — Lenis (single smooth-scroll source) → GSAP/ScrollTrigger (scroll-linked panel morphs) + Framer Motion (component enter/exit, nav). All honour `prefers-reduced-motion`.
- **Fonts** — **Newsreader** (display and pull quotes) and **Instrument Sans** (everything functional), via `next/font`.

## Commands

```bash
npm install     # install dependencies
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
npm run start   # serve the production build
npm run lint    # ESLint
```

## The design system

**The brand palette is six colours.** Anything else in `tokens.css` is a surface or a derived shade, and is labelled as such.

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#0F1613` | Headings, dark base, scrims |
| `--color-green` | `#2D523D` | Display accent, primary CTA fill, statement panels |
| `--color-copper` | `#C97B45` | Accent: CTAs, the stat band, the logo dot |
| `--color-cream` | `#F5F1E8` | Text on dark, veils, glass |
| `--color-steel` | `#5C665F` | Muted text on light |
| `--color-stone` | `#D8D2C4` | Muted text on dark, soft fills, elevated surfaces on light |

Two contrast rules the system depends on, both measured:

- **Copper is never text on a light field** — 3.14:1 on the canvas. Use `--accent-text`, which resolves to Copper on dark (5.59:1) and `--color-copper-deep` on light (5.16:1).
- **Steel is never text on dark** — 3.08:1 on Ink. Stone is the muted colour there (12.18:1).

Write colours through the semantic aliases (`--text`, `--text-muted`, `--heading`, `--accent`, `--border`) wherever possible, so `.theme-dark` sections remap for free. **Do not hardcode hexes in components.** One exception exists and is commented: `FooterLogo` needs a literal because Framer Motion cannot interpolate a `var()` inside `box-shadow` keyframes.

Veil and scrim strengths are measured against the copy that sits on them, and every value carries the measurement that justifies it. **Do not change one without re-measuring.**

Typography runs light-to-heavy as size falls: Newsreader Light on the `h1`, Regular at `h2` and on pull quotes, Medium from `h3` down.

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | Entry point — imports the six stylesheets below in cascade order |
| `app/styles/tokens.css` | Palette, surfaces, type scale, layout and motion tokens |
| `app/styles/base.css` | Element defaults + display-type primitives |
| `app/styles/layout.css` | `.shell`, section rhythm, `.bleed-right`, nav |
| `app/styles/materials.css` | Surfaces, scrims, plates, film grade, grain |
| `app/styles/ui.css` | Buttons, fields, the copper stat band |
| `app/styles/motion.css` | Keyframes and the reduced-motion contract |
| `app/layout.tsx` | Fonts, metadata, JSON-LD, chrome, motion providers |
| `app/page.tsx` | Home page composition + product JSON-LD |
| `app/sitemap.ts`, `app/robots.ts` | Generated `sitemap.xml` and `robots.txt` |
| `lib/site.ts` | Site-wide facts: nav, products, footer links, metadata |
| `lib/content.ts` | Per-section copy, as data |
| `lib/motion.ts` | Motion tokens for JS — eases, durations, viewport margins |
| `lib/usePrefersReducedMotion.ts` | The single reduced-motion hook |
| `components/layout/` | `Nav`, `Footer`, `SignupForm` |
| `components/sections/` | One file per page section |
| `components/motion/` | `MorphPanel`, `GradedImage`, `Reveal`, `DrawRule`, `WordReveal`, `PlateReveal`, `CountUp`, `SmoothScroll`, `GrainBackground` |
| `components/brand/` | `Logo`, `FooterLogo`, `FilmGrade` |
| `public/images/` | Imagery (WebP). Every asset here is referenced — keep it that way |
| `public/llms.txt` | LLM-readable company summary |

## Home page order

`Hero` → `Clients` → `CapabilityGap` → `Problem` → `NewModel` → `Products` → `WaysToWork` → `ATBOS` → footer.

`Hero`, `CapabilityGap` and `ATBOS` are the three scroll-morph panels (brief §5.2). The first two use `MorphPanel` directly; `ATBOS` shares its geometry and tweens via `morphPanelTweens`, because its morph is the opening beat of a longer timeline that also drives its statements.

## Conventions

- **Reduced motion is not an afterthought.** Every animated component renders a complete static state. Read `usePrefersReducedMotion()` — not `window.matchMedia`, and not framer-motion's own hook.
- **Motion values come from `lib/motion.ts`** (JS) or the `--ease-*` / `--dur-*` tokens (CSS). Don't retype a cubic-bezier.
- **One transform per element.** An animated transform nested inside another compounds, and the inner element's end point moves while it is animating. See the note on `DrawRule`.
- **Comments record the current state and the reasoning, not the history.** If a value is measured, give the measurement.

## Status / placeholders

- **`/insights`** currently renders only `ClosingBand` as a placeholder — the page is not built.
- **Sign-up and contact are validated UI stubs**, not wired to a provider.
- **CommerceOS and MarketingOS have no artwork.** Their `image` key is absent from `lib/site.ts` rather than pointing at a stand-in; the Products spread renders them as type and will pick up a plate automatically when one lands.
- Other pages (Who we are, What we do, product detail, How we work, Careers, Contact, legal) are linked but not built.

See `PROJECTPLAN.md` for the plan and the change record.
