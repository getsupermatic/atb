# ATB. Marketing Website — Project Plan

**Scope (this phase):** Home page only, built on a foundation that the rest of the site can extend later.
**Source of truth:** `briefs/ATB-website-design-brief.md` (design/build) + `briefs/documents/ATB-Website-Master-Copy-Deck.md` (copy).
**Status:** Awaiting sign-off before build begins.

---

## 1. Objective

Build a clean, beautiful, editorial home page for ATB. (*At The Beyond*) — an AI-native product company for the customer frontline. Personality comes through restrained, meaningful motion (systems in motion / beyond the frame), not decoration. SEO and LLM visibility are first-class concerns from day one.

---

## 2. Technology stack (recommendation)

The brief (§8) is prescriptive and its choices are sound and SEO-friendly, so I recommend following it:

- **Framework:** Next.js (App Router) + React + TypeScript. Static-first (SSG) for fast, crawlable marketing pages.
- **Styling:** Tailwind CSS v4 with brand tokens wired into the theme + CSS custom properties for the light/dark section remapping.
- **Motion (layered, all with `prefers-reduced-motion` fallbacks):**
  - **Lenis** — single smooth/inertia scroll source.
  - **GSAP + ScrollTrigger** — scroll-linked sequences (feature morph, parallax panels, grain parallax).
  - **Framer Motion** — component enter/exit, nav show/hide, micro-interactions.
- **Fonts (per your steer):** **Manrope** for headings, a **serif for body**. Recommend **Source Serif 4** (or Newsreader) for the body — literary, legible, matches the "70s science magazine" register. **IBM Plex Mono** for the tracked-uppercase eyebrow labels. All self-hosted via `next/font` (no layout shift, no external calls).
- **Content/forms (this phase):** Email sign-up + contact are stubbed as accessible, validated UI with success/error states; wiring to a real provider is a later phase.
- **Deploy:** Vercel-ready (not deployed until you ask).

> Decision needed: confirm this stack (or tell me to swap anything). Everything below assumes it.

---

## 3. Design foundation (build first — powers every section)

- [ ] **Design tokens** — colour (`--color-teal/cream/petrol/aqua/powder/sage/lime`), semantic aliases (`--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--accent`, `--border`), type scale (`--text-xs`…`--text-6xl`), spacing, radii, and **motion tokens** (`--dur-fast/base/slow`, easings, parallax depth multipliers). Lime accent-only; contrast-safe pairings baked in.
- [ ] **Tailwind theme** wired to the tokens; light cream default + dark petrol section remap.
- [ ] **Material utilities** as reusable components/classes: duotone halftone, print grain, iridescent glass, smoked glass.
- [ ] **Placeholder logo** — ATB. wordmark + monogram as inline SVG (lime accent dot), swappable when you supply finals.
- [ ] **Orbit motif** SVG (elliptical ring + lime node) for loader/favicon/accents.
- [ ] Optimised, tileable **print-grain texture** asset from `imagery/background texture.png`.

---

## 4. Home page sections (copy from Copy Deck §2.1)

Order per brief §7.1 / copy deck §2.1:

- [ ] **Logo load animation** — "at the beyond." writes out → reduces to **ATB.** monogram in nav. Once per session; reduced-motion/no-JS fallback.
- [ ] **Glassy scroll-aware nav** — contained, floating, backdrop blur; hides on scroll down / reveals on scroll up; logo + nav (Who we are · What we do · How we work · Insights · Careers) + lime **Contact us** pill; mobile hamburger → full-height glassy panel, 44px targets.
- [ ] **Hero** — eyebrow "An AI-native product company"; H1 *"AI-native products. For the customer frontline."*; subhead; dual CTA (lime pill *Talk to us* + outline *See how we work*); rolling keyword strip; trusted-by logo bar (placeholder marks). Duotone orbital hero image (`hand reaching.png` / `planet orbit.png`). **Feeds the feature morph.**
- [ ] **Feature morph** — a rounded contained card that expands edge-to-edge on scroll (corners straighten, margins collapse), reversing on scroll back. Scroll-linked.
- [ ] **The problem** — "why now" pull line, H2, narrative body, **stat band** (100M+ · ~1% · $4.4T), closing pull line. Parallax panels in from left/right.
- [ ] **A new model** — 4-pillar module (Products not seats · Shaped to your reality · Frontier in weeks · Outcomes not hours).
- [ ] **Three ways to work** — 3 engagement cards (Subscribe & Deploy · Forward Deploy · Frontier Advisory) + "How we work →".
- [ ] **Products** — FrontlineOS spotlight (*Live* tag, proof) + CommerceOS + MarketingOS cards, using product imagery. Alternating parallax entry.
- [ ] **Closing band** — *"Wherever you meet your customers, that's where we build."* + CTA.
- [ ] **Deep super-footer** (petrol/smoked glass) — statement quote, insight sign-up (validated, success/error), nav columns (Company/Products/More/Legal), LinkedIn + X, monogram, copyright. Legal links point to placeholder routes for now.
- [ ] **Cream grain parallax background** — subtle, transform-based, GPU-friendly; reduced/disabled on low-power + reduced-motion.

---

## 5. SEO & LLM visibility (first-class)

- [ ] Semantic HTML5 landmarks + correct heading hierarchy (single H1).
- [ ] Metadata via Next.js Metadata API: title, description, canonical, Open Graph, Twitter card.
- [ ] **JSON-LD structured data**: `Organization` (name "ATB." / At The Beyond, logo, sameAs LinkedIn+X), `WebSite`, and `Product` entries for the three Blueprints.
- [ ] `robots.txt` + `sitemap.xml` (Next.js generated).
- [ ] **LLM-friendly**: clean prose, descriptive alt text, a `/llms.txt` summary of the company + offer (from the boilerplate), fast static HTML so crawlers get full content without JS.
- [ ] `next/image` for all imagery; lazy-load below-the-fold; explicit dimensions (no CLS).

---

## 6. Quality bar (brief §9)

- [ ] Lighthouse ≥ 90 (Perf/A11y/Best-Practices/SEO) on the home page.
- [ ] WCAG 2.1 AA — keyboard operable, visible focus, contrast verified (lime never as text), full functionality with motion off.
- [ ] Responsive at 360 / 768 / 1024 / 1440+; heavy parallax reduced on small/low-power devices.
- [ ] Core Web Vitals in "good" band.

---

## 7. Out of scope (this phase)

Other pages (Who we are, What we do, product detail, How we work, Insights, Careers, Contact), CMS/MDX Insights pipeline + .md round-trip, live form provider wiring, real logos/fonts licensing, deployment. The foundation is built so these slot in later.

---

## 8. Decisions (confirmed)

1. **Stack** ✓ Next.js (App Router) + TypeScript + Tailwind + GSAP/ScrollTrigger + Lenis + Framer Motion.
2. **Body serif** ✓ Source Serif 4 (headings Manrope, labels IBM Plex Mono).
3. **Trusted-by logos** ✓ Neutral greyed placeholder marks until clearance confirmed.
4. **Contact/sign-up** ✓ Stub the UI (accessible, validated, success/error states) — no backend this phase.

---

## Review

**Built:** A complete, responsive, accessible home page for ATB. on a reusable Next.js foundation. `next build` passes with every route prerendered as static HTML.

**Stack delivered:** Next.js 16 (App Router) + React 19 + TypeScript, Tailwind v4 (tokens in `@theme`), GSAP/ScrollTrigger + Lenis + Framer Motion, fonts Manrope / Source Serif 4 / IBM Plex Mono via `next/font` (self-hosted, no layout shift).

**Foundation (`app/globals.css`):** full brand token system (colour, fluid type scale, motion tokens), semantic aliases remapped by a `.theme-dark` class for dark sections, and the four material families (iridescent glass, smoked glass, print grain, halftone) as reusable utilities. Base element styles are in `@layer base` and component classes in `@layer components` so Tailwind utilities can still override them.

**Signature motion (all with reduced-motion / no-JS fallbacks):**
- Logo write-out → ATB. reduction on load, once per session (`LogoLoader`).
- Glassy, contained, scroll-aware nav — hides on scroll down, reveals on scroll up + mobile glassy panel (`Nav`).
- Feature panel morph: rounded contained card expands edge-to-edge on scroll, scrubbed and reversible (`FeatureMorph`).
- Panels reveal/parallax in from left & right; section fade/slide-ups (`Reveal`).
- Cream print-grain parallax background on a transform (`GrainBackground`).
- Lenis is the single scroll source feeding GSAP ScrollTrigger (`SmoothScroll`).

**Home sections (copy from deck §2.1/§2.8):** hero (eyebrow, H1, dual CTA, rolling keyword strip, greyed trusted-by bar) → feature morph (why-now line) → problem + stat band → new-model pillars → three engagement models (dark) → products (FrontlineOS spotlight + trio) → closing band → deep super-footer (statement, sign-up, nav columns, LinkedIn/X, legal).

**SEO / LLM:** Metadata API (title/description/canonical/OG/Twitter), JSON-LD (`Organization`, `WebSite`, product `ItemList`), generated `sitemap.xml` + `robots.txt`, `public/llms.txt`, orbit-motif favicon (`app/icon.svg`), semantic landmarks, skip-link, `next/image` throughout.

**Verified in-browser:** desktop (1440) and mobile (390) — hero, morph, all sections, mobile menu panel, and footer render correctly; no console errors. SEO endpoints return valid output.

**One fix during build:** the closing-band/footer headings first rendered in the wrong colour — an unlayered global `h2` rule was beating Tailwind's layered `text-[…]` utilities. Resolved by moving base element styles into `@layer base`. Also corrected a `max-w-[22ch]` that was measured against the wrong font size in the footer statement.

### Notes / follow-ups (not this phase)
- **Placeholders:** logo is a text placeholder (swap for supplied SVGs); trusted-by marks are greyed boxes pending client-logo clearance (copy deck open item).
- **Forms** (footer sign-up, and Contact) are accessible/validated UI stubs — not wired to a provider yet.
- **Other pages** (Who we are, What we do, product detail, How we work, Insights, Careers, Contact, legal) are linked but not built; the foundation is ready for them.
- **Domain** assumed `atbeyond.com` (metadataBase/JSON-LD) — confirm before launch.
- Source imagery is heavy PNG; `next/image` re-encodes to sized WebP on request, so delivery stays lean. Pre-optimising the source files further would trim the repo.

### Refinement round (client feedback)
- **Logo intro:** removed the full-screen overlay loader; the nav logo now writes out "at the beyond." and collapses to "ATB." in place (Anthropic-style), then nav links fade in. Once/session, reduced-motion safe.
- **Hero:** rebuilt as a full-width image (the reaching hand + orbit + lime node) sitting behind the headline and intro copy, with a cream scrim for legibility. Removed the separate top-left orbit animation (the image now carries the motif).
- **Eyebrows:** dropped the tracked-uppercase treatment (read as a templated AI pattern) — now sentence-case Manrope kickers with a small lime node.
- **Nav:** more translucent/glassy (`.glass-nav`, heavier blur, lower opacity).
- **Stats:** count up (0 → 100M+ / ~1% / $4.4T) on scroll into view; reduced-motion shows final values.
- **Footer:** sign-up renamed **Insights** and moved to the right of the "Let's build what's next" statement; removed the orbit icon by the logo and the tagline line; base row now carries logo + LinkedIn/X **icons** on the left and the copyright on the right.
- **Dots:** removed the lime node dot from all button labels (Talk to us, Contact us, Start a conversation). Kept the small node only where it's meaningful — the pillar markers and the "Live" status badge.

### Refinement round 2 (client feedback)
- **Hero header graphic morph:** the hero now opens full-screen (edge-to-edge, square corners) and, on scroll, wraps into a rounded contained panel — the reverse of the Why-now morph, so the two bookend the page (`HeroMorph`, scroll-scrubbed, reduced-motion = static full-screen).
- **Headline:** reduced from `text-6xl` → `text-5xl` so it's less tall; the trailing full stop now matches the heading colour (was lime).
- **Eyebrows:** removed the leading node dot entirely (kept sentence case).
- **Nav (Valliance-style):** bare over the hero at the very top; the glassy panel **builds in on first scroll**. Corners softened to a rounded rectangle (1.5rem, matching the panels) instead of a full pill. Glass re-tuned to a light cream frost so it stays legible over dark sections (fixes nav-invisible-on-dark).
- **Trusted-by logos:** placeholders replaced with cleared client logos (Burger King, PepsiCo, John Lewis, Nestlé, Diageo) in `public/images/clients/`. Rendered grayscale at a lighter unselected opacity (colour on hover), with per-logo heights tuned for balance (John Lewis + PepsiCo up, Diageo down).

### Refinement round 3 (client feedback)
- **Trusted-by logos:** scaled up ~20%.
- **Hero panel spacing:** content was crowding the panel edges — widened/tightened the subhead (fewer lines), reduced gaps, and raised the morph end-height (82vh → 88vh) so the eyebrow (top) and CTAs (bottom) have breathing room.
- **Engagement icons:** replaced the 01/02/03 numbers on "Three ways to work" with geometric icons built from the brand's orbit + lime-node motif — orbit+node (Subscribe & Deploy), forward chevrons+node (Forward Deploy), ascending peak+node (Frontier Advisory).
- **Footer social:** moved LinkedIn/X icons up into the footer navigation panel (under the More column) so they aren't lost in the compliance row; the base row is now just logo + copyright.

### Refinement round 4 (client feedback)
- **Footer statement:** removed the "The technology is ready" eyebrow; replaced the em dash with a comma ("Let's build what's next, right where you meet your customer.").
- **Gap section alignment:** moved the "The gap" eyebrow above the two-column row so the body copy now aligns with the headline, not the eyebrow.
- **Gap hero statement:** wrapped the closing line in quotation marks and enlarged it (text-4xl) so it reads as a hero statement.
- **Gap background:** set the section on the iridescent-glass image (`public/images/iridescent.png`) under a cream veil for legibility; stat cells are now frosted glass on that field.

### Refinement round 5 (final logo + polish)
- **Logo artwork:** replaced the text placeholder with the supplied final SVGs, both inlined in `components/brand/Logo.tsx` as `currentColor` paths so they theme teal on cream / cream on dark. `variant="mono"` = ATB monogram; `variant="full"` = the "at the beyond." lockup (used by the nav write-out intro). The full stop is part of both marks and renders in the **same colour as the logo** (no longer lime), per direction.
- **Nav:** the glassy pill is visible again over the header image at the top (removed the scroll-in fade); soft shadow still appears once scrolled. "Contact us" CTA relabelled **"Get started."**
- **Body links:** the in-content text links ("How we work", "See the live product") are now underlined with the trailing → removed.
- **Nav transition:** slowed the hide/reveal to 0.7s ease-in-out so it reads smoothly alongside the scroll-linked header morph.
- **How we work background:** set the section on `planet orbit.png` with a left-weighted petrol scrim (cream headline/cards stay legible; the planet + lime orbital nodes read on the right) — reinforcing the orbit motif.
- **Grain texture:** raised the persistent print-grain from 0.14 → 0.22 opacity so it reads a little more on the cream sections.
- **FrontlineOS spotlight:** image now fills its panel flush (padding moved to the text side) to match the CommerceOS / MarketingOS cards.
- **Cream background:** swapped the persistent background to `background-cream.png` (warm cream texture, 75% normal blend) so the cream reads through, replacing the cooler teal grain.
- **Logo hover:** hovering the nav logo reveals the "at the beyond." lockup (mirrors the load intro); fixed the expanded wordmark to render at the same height as the monogram so letter sizes match.
- **How we work cards:** stronger staggered entrance transition (56px rise, 0.14s stagger); added an optional `distance` prop to `Reveal`.

### Runbook
`npm run dev` (localhost:3000) · `npm run build` · `npm run start`. Shared content (nav, products, footer, metadata) lives in `lib/site.ts`. Brand tokens live in `app/globals.css`.

---

## Review — footer full-stop animation, replaying stats & copy edits (2026-07-20)

**Footer "running full stop" (`components/brand/FooterLogo.tsx`, new):**
- The mono logo's period is rendered as a separate lime dot that, each time the footer scrolls into view, waits at the far-right edge of the base row then glides the full width of the foot along the baseline to dock as the `.` next to the B. A short lime comet trail + glow sells the motion; the resting dot is the brand cream mark colour.
- Landing is pixel-perfect: the dot's home position is derived directly from the SVG geometry (viewBox `600 690 332 120`, period `cx 909 / cy 789 / r 12`), so spacing matches the static mark at any height.
- `Logo` gained a `hideDot` prop so the letters render without the built-in full stop. Under reduced motion the intact mark renders statically.
- Replays on every scroll-in (`useInView` without `once`); resets off-screen to the right edge on scroll-out.

**Stat count-up now replays (`components/motion/CountUp.tsx`):**
- Dropped `once: true`; the figure animates 0 → value on scroll-in and value → 0 on scroll-out, so transiting the "The gap" section re-triggers the effect each time. (A mid-count freeze seen only under headless automation is a hidden-tab `requestAnimationFrame` throttle, not a code issue.)

**Copy / layout:**
- Removed the decorative `OrbitMark` background graphic from the top-right of the footer (`components/Footer.tsx`).
- Products: "See the live product" → "Explore the product" (`components/sections/Products.tsx`). *(Interpreted the request's "Ecplore" as a typo for "Explore".)*
- FrontlineOS proof trimmed to "40%+ frontline productivity." — dropped "Live with Burger King UK." (`lib/site.ts`). The green "Live" status badge is unchanged.

---

## Review — image optimisation & perf warnings (2026-07-20)

**Images: PNG → WebP.** All heavy, referenced photographic images were re-encoded to WebP (cwebp q80) and references updated (`.png` → `.webp`) across `globals.css` (grain overlay), `HeroMorph`, `FeatureMorph`, `Problem`, `WaysToWork`, `ClosingBand`, and `lib/site.ts`. Per-file savings ran 87–98%:

| image | before | after |
|---|---|---|
| background-cream | 3.4 MB | 120 KB |
| orbit-planet | 3.76 MB | 488 KB |
| glass-planes | 2.77 MB | 183 KB |
| hero-hand | 3.47 MB | 402 KB |
| product-frontline / commerce / marketing | ~3 MB ea | ~260–300 KB ea |
| teal-tunnel | 1.69 MB | 30 KB |
| iridescent | 359 KB | 8 KB |

`background-cream` was the biggest real win — it's a CSS `background-image`, so it was served raw (unoptimised by `next/image`) at 3.4 MB. Client logos left as-is (already small; crisp transparency).

**Cleanup.** Deleted the 9 replaced PNG originals plus 4 unreferenced PNGs (blueprint, structure, child-face, grain). `public/images` went from ~38 MB → **2.3 MB**.

**Perf warnings.**
- Added `data-scroll-behavior="smooth"` to `<html>` (`app/layout.tsx`) — clears the Next.js smooth-scroll route-transition warning.
- LCP warning for `orbit-planet`: left lazy (it's section 5, below the fold; the above-the-fold hero already has `priority`). The warning came from reloading while scrolled down; shrinking the image to 488 KB is the substantive fix.

Verified in-browser: hero, feature-morph and grain textures render crisply at q80; no broken images, no `.png` 404s, no LCP/scroll-behavior warnings after reload.
