# ATB. — marketing website

Marketing site for **ATB.** (*At The Beyond*), an AI-native product company for the customer frontline. This phase delivers the **home page** plus a reusable design/motion foundation.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript — static-first for SEO.
- **Tailwind CSS v4** — brand tokens in `@theme`; semantic aliases remapped per-section.
- **Motion** — Lenis (single smooth-scroll source) → GSAP/ScrollTrigger (scroll-linked morph & pinned panels) + Framer Motion (component enter/exit, nav). All honour `prefers-reduced-motion`.
- **Fonts** — Manrope (display), Source Serif 4 (body), IBM Plex Mono (labels), self-hosted via `next/font`.

## Commands

```bash
npm install     # install dependencies
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | Design tokens, semantic aliases, material utilities, keyframes |
| `app/layout.tsx` | Fonts, metadata, JSON-LD, nav/footer, motion providers |
| `app/page.tsx` | Home page composition + product JSON-LD |
| `app/sitemap.ts`, `app/robots.ts` | Generated `sitemap.xml` and `robots.txt` |
| `lib/site.ts` | Shared content: nav, products, footer links, metadata |
| `components/Nav.tsx`, `components/Footer.tsx` | Site chrome |
| `components/SignupForm.tsx` | Insights sign-up (validated UI stub) |
| `components/brand/` | `Logo`, `FooterLogo`, `OrbitMark` |
| `components/motion/` | `SmoothScroll`, `Reveal`, `FeatureMorph`, `CountUp`, `GrainBackground` |
| `components/sections/` | `Hero`, `Problem`, `NewModel`, `WaysToWork`, `Products`, `ATBOS`, `ClosingBand` |
| `public/images/` | Duotone imagery (WebP) |
| `public/llms.txt` | LLM-readable company summary |

## Home page order

`Hero` → `FeatureMorph` (scroll-morphing "why now" panel) → `Problem` → `NewModel` → `WaysToWork` → `Products` → `ATBOS` (scroll-pinned operating-system panel) → `ClosingBand` → footer.

## Status / placeholders

- Logo is a **text placeholder** — swap for supplied SVGs in `components/brand/Logo.tsx`.
- Trusted-by marks are **greyed placeholders** pending client-logo clearance.
- Sign-up + contact are **validated UI stubs** — not wired to a provider.
- Other pages (Who we are, What we do, products, How we work, Insights, Careers, Contact, legal) are linked but not yet built.

See `PROJECTPLAN.md` for the full plan and review.
