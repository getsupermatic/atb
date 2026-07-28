# ATB. Marketing Website — Project Plan

**Branch:** `v3` — a creative-direction test forked from `v2` at `2637034`.
`v2` is untouched and remains the incumbent.

> **Part 0** below is the live v3 plan. Everything from Part 1 onward is the v2
> record, kept for reference — the tokens, copy sources and quality bar it
> documents still apply, because v3 forks the design system rather than
> replacing it.

---

# Part 0 — V3 direction

**Status:** Awaiting sign-off. No code written yet.
**Trigger:** new hero copy supplied 2026-07-26 (H1 + intro).

## 0.1 The new copy

> **[H1]** The future, put to work.
>
> **[Intro]** We work at the beyond: where emerging technology meets the real
> world. We turn what's next into what's useful, creating intelligent products
> and experiences for the people at the heart of your business. In aisle 14 at
> 6:42am, behind the beauty counter, at the drive-through at midnight. And
> because we've been here before, you don't start from zero.

## 0.2 What changed, and what it asks of the design

| | v2 / copy deck v7 | v3 copy |
|---|---|---|
| H1 | "Frontier AI, built for the real world." (two lines, 6 words) | "The future, put to work." (4 words) |
| Register | Taxonomic — names *what we are* | Declarative, verb-led — names *what we do* |
| Place | A category list: shop floor, drive-through, field, contact centre, app, online store | Three specific moments: aisle 14 at 6:42am, behind the beauty counter, the drive-through at midnight |
| Vocabulary | "AI-native", "forward-deploy", "frontier" | No jargon at all — and no "AI" |
| New claim | — | "because we've been here before, you don't start from zero" |
| "Beyond" | A horizon/orbit metaphor | A **place you work**: "we work at the beyond" |

Three of these drive the design:

1. **Specificity of moment is the strongest hook.** "Aisle 14 at 6:42am" is not
   a category, it's a documentary observation with a timestamp. v2 answers
   abstraction with abstraction — prisms, iridescent glass, orbits. This copy
   asks for real places and real times.
2. **A four-word H1 wants the whole screen.** v2 sets its H1 at `text-5xl`
   inside a 42rem column, left-aligned over a photographic plate. Four words
   don't need a column or a plate to sit on.
3. **Plain speech wants plain composition.** No jargon in the words means the
   layout shouldn't be doing ornamental work either.

## 0.3 Proposed direction — "Field Record"

Documentary and annotated, where v2 is editorial and veiled. The organising
device is **the caption**: small tagged labels (place, time) set against very
large plain type. A field notebook or a shift log, not a magazine spread.

**Kept from v2** — per the "fork and reshape" decision, the design system does
not change: Deep Ink / Warm Chalk / Clay Amber tokens, Newsreader + Inter,
`lib/site.ts`, the copy deck, SEO scaffolding, the nav.

**Changed:**

- **Hero screen one is type only.** "The future, put to work." set very large
  across the full shell width on bare Warm Chalk — no image, no scrim, no
  column. The departure comes from scale and restraint, not new tokens.
- **The three moments become the signature component.** Rather than running
  inline in the paragraph, "aisle 14 at 6:42am" / "behind the beauty counter" /
  "the drive-through at midnight" render as three documentary frames, each
  tagged with its place and time in small Inter. This replaces v2's
  card-to-full-bleed morph as the page's identifying gesture.
- **"You don't start from zero" earns the logo bar.** The client marks stop
  being a generic trust strip and become the evidence for that sentence —
  placed directly beneath it, captioned as such.
- **Motion serves "put to work."** Drop the Anthropic-derived morph. The
  moments arrive in sequence, timestamps settling — a shift ticking over.
  Restrained, and still fully legible under `prefers-reduced-motion`.

**The alternative I did not pick:** keeping a full-bleed image behind the H1 as
v2 does, and treating the moments as captions over it. Faster to build and
closer to the incumbent, but it keeps the thing that most makes v3 look like v2.
Say so if you'd rather see that.

## 0.4 To do

- [ ] Sign off this direction (or redirect)
- [ ] Resolve the four open questions in §0.5
- [ ] Build hero screen one — full-width type, bare Warm Chalk
- [ ] Build the three tagged moment frames
- [ ] Rework the logo bar as proof for "you don't start from zero"
- [ ] New hero motion; remove `HeroMorph`'s scrubbed morph from the v3 hero
- [ ] Re-check contrast, reduced-motion and 360/768/1024/1440 breakpoints
- [ ] Review section at the end of Part 0

## 0.5 Open questions

1. **Rest of the page.** Is new copy coming section by section, or should the
   remaining sections (problem / new model / three ways / products / closing)
   keep the copy-deck wording for now? Building the hero alone is fine — it is
   where direction gets set — but the page will read as two voices until the
   rest follows.
2. **Photography.** "Field Record" needs real frames: a supermarket aisle, a
   beauty counter, a drive-through at night. The current library is abstract
   (prisms, glass, orbits) and is still awaiting re-treatment in the warm-neutral
   palette. Options: source new imagery, hold with type-only frames, or reuse
   the existing plates as obvious placeholders. **Type-only is my
   recommendation for the first pass** — it tests the layout without waiting on
   an asset job.
3. **"AI" is absent from the new copy.** Deliberate? It reads as a confident
   choice, but it moves the positioning away from the copy deck's "AI-native
   product company" and has consequences for the rest of the site and for search.
4. **Copy deck §1.1 bans "the Beyond" in body copy**, while permitting the
   *concept* of "the beyond" to be evoked. "We work at the beyond" sits exactly
   on that line. Your call — flagging it, not blocking on it.

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

---

## Review — reposition hero keyword ticker (2026-07-21)

**Problem:** Below the header, the rolling keyword ticker (§2.1) and the
"Trusted by teams at the world's biggest brands" logo strip were stacked
together and felt awkward in that space.

**Done:** Moved the keyword ticker into the hero graphic itself — pinned to the
bottom edge of the header panel so it stays visible in the viewport. The
trusted-by logo strip now occupies the space directly below the header on its own.

- [x] `components/sections/HeroMorph.tsx` — keyword ticker added as an
      absolutely-positioned strip pinned to the bottom of the hero graphic
      `card` (`absolute inset-x-0 bottom-0`). Frosted-cream gradient +
      `backdrop-blur` + top border so the words read over the photo; clipped by
      the panel's rounding as it morphs (100vh → 88vh). Decorative
      (`aria-hidden`); reuses `.marquee-track` / `.marquee-mask`.
- [x] `components/sections/Hero.tsx` — removed the standalone marquee block and
      its `keywords` array; trusted-by strip now sits directly below the header
      (`mt-16`).

**Verified:** `next build` passes; checked in-browser (1375px) — ticker reads
cleanly over the hero image and stays pinned through the morph; trusted-by strip
sits alone below the header.

### Follow-ups (2026-07-21)
- **Trusted-by label size:** bumped "Trusted by teams at the world's biggest
  brands." from `text-sm` → `text-base` (`components/sections/Hero.tsx`).
- **Closing band relocated:** removed `<ClosingBand />` from the home page
  (`app/page.tsx`) and temporarily placed it on a new `/insights` route
  (`app/insights/page.tsx`) until the Insights page is built out. Home page now
  runs ATBOS → footer. `next build` passes (new static `/insights` route);
  both pages verified in-browser.
- **ATBOS overlap fix:** the statement copy overlapped the progress dots on the
  tallest (third) statement. The reserved height (`copyH`) was measured before
  the Manrope web font loaded (fallback font wraps to fewer lines → height
  under-reported), and the `ResizeObserver` never re-fired because the measuring
  paragraphs are absolutely positioned. Added a `document.fonts.ready` re-measure
  in `components/sections/ATBOS.tsx`. Verified in-browser — third statement now
  clears the dots.
- **Trusted-by strip centring + logo weights (`components/sections/Hero.tsx`):**
  - Top margin `mt-16` → `mt-32` so the strip sits centrally in the band between
    the hero panel and the feature panel (was sitting high / crowding the top).
  - Resting opacities raised for Burger King & John Lewis (0.5 → 0.85) so they
    read at a similar weight to Diageo; PepsiCo set to 0.7 (slightly lighter).
  - Nestlé (pale line-art, opacity can't darken it) gets a `brightness-[0.4]`
    resting filter, and a custom rollover (`hover:brightness-[0.3]
    hover:contrast-[1.5]`, staying monochrome) so it goes crisp/high-contrast on
    hover instead of revealing its faint colour version. Added optional `dim`
    and `hover` fields per logo to support this.
  - Follow-up tuning: John Lewis height 60 → 63 (very slightly larger) and its
    rollover now tints the black mark **gold** (a `brightness(0)…invert…sepia…`
    filter chain). Nestlé lightened (`brightness-[0.4]` → `[0.5]`) and height
    36 → 34 (fractionally smaller). Verified in-browser incl. both rollovers.

---

## ATB V2 — separate creative-direction project (2026-07-25)

This folder (`/Users/robhollands/Cursor/atb-v2`) is a **fork of the ATB project
for exploring an alternate creative direction**. The original project at
`/Users/robhollands/Cursor/atb` has been returned to its last committed state
(`f9250ac`) and is untouched by this work.

### How the split is set up
- **Same GitHub repo** (`getsupermatic/atb.git`), full history preserved — so
  changes can be cherry-picked in either direction.
- **This folder is on branch `v2`**; the original folder stays on `main`. A push
  from here can never overwrite `main`.
- `.vercel/` was **removed here** — V2 is deliberately not linked to the live
  `atb` production project. Run `vercel link` before deploying V2.
- A dormant `v2` branch also exists in the original `atb` folder as a backup of
  this work; it can be deleted once V2 is established.

### What V2 currently changes (commit `9866776`)
| Area | Change |
| --- | --- |
| Hero | Dark navy prism background (`hero-bg-test.png`) replacing the light `hero-hand.webp`; overlay gradients and bottom band inverted to navy; heading and muted text set light-on-dark |
| Accent colour | Lime `#c6d64d` → terracotta `#cc8a55`, carried through buttons, shadows and the footer logo glow |
| Logo | New dotless modern **`atb`** monogram variant added to `components/brand/Logo.tsx`, used in the nav |
| Nav | Links pinned to dark ink `#1B2836` with accent hover; glass nav slightly more translucent and more blurred |

### Known loose ends in V2
- Hero background is still named `hero-bg-test.png` — placeholder artwork,
  needs replacing with final licensed/approved imagery.
- `hero-hand-v2.webp` is committed but currently unused.
- Nav colours are **hardcoded hex** (`#1B2836`, `#f7f1e6`) rather than routed
  through CSS custom properties — should be tokenised in `globals.css` before
  this direction goes any further.
- The terracotta accent is applied by overwriting `--color-lime` rather than
  renaming the token; the variable name is now misleading.
- Only the hero and nav were re-themed — the rest of the page is still built for
  the light/lime direction, so the two halves don't yet cohere.

---

## V2 Rebrand — palette + typography implementation (2026-07-25)

Closes the "known loose ends" above. Two inputs: the **Colour Palette** board
(7 named swatches) and the typeface pair **Newsreader** (headlines) / **Inter**
(body). Goal is to retire the teal/lime system and the inline hex patches, and
land one tokenised system that every component reads from.

### A. Colour system

Raw tokens renamed to the palette's own names — the current `--color-lime`
already *holds* `#cc8a55`, so the old names now actively mislead.

| New token | Hex | Palette name | Replaces | Role |
|---|---|---|---|---|
| `--color-chalk` | `#F7F1E6` | Warm Chalk | `--color-cream` | Page canvas |
| `--color-oat` | `#E5DCCB` | Oat Greige | `--color-cream-soft` | Elevated / glass surfaces on light |
| `--color-stone` | `#CAC6BB` | Warm Stone | `--color-aqua` | Muted text on dark, soft fills |
| `--color-sage` | `#99A08E` | Sage Stone | `--color-sage` (revalued) | Soft support, diagram fills |
| `--color-slate` | `#5E6576` | Warm Slate | `--color-powder` | Muted text on light |
| `--color-ink` | `#1B2836` | Deep Ink | `--color-teal` + `--color-petrol` | Headings, dark base, scrims |
| `--color-amber` | `#CC8A55` | Clay Amber | `--color-lime` | Accent: CTAs, nodes, logo dot |

Derived shades (tints/shades of the above — **not** new brand colours, named so
that stays obvious):

- `--color-ink-soft: #26333F` — Deep Ink lifted toward Warm Slate; dark elevated surfaces.
- `--color-ink-deep: #121C26` — Deep Ink deepened; deepest scrims.
- `--color-amber-deep: #8F5A2C` — Clay Amber darkened for **amber-as-text on light** (see contrast note).

Semantic aliases (components should read these, not raw tokens):

| Alias | Light (`:root`) | Dark (`.theme-dark`) |
|---|---|---|
| `--bg` | chalk | ink |
| `--bg-elevated` | oat | ink-soft |
| `--text` | ink | chalk |
| `--text-muted` | slate | stone |
| `--heading` | ink | chalk |
| `--accent` | amber | amber |
| `--accent-text` | amber-deep | amber |
| `--border` | `ink / 14%` | `chalk / 16%` |

**Contrast (WCAG AA, verified by calculation):**
- Warm Slate on Warm Chalk — **5.1:1** ✅ body text
- Deep Ink on Warm Chalk — **13.3:1** ✅
- Warm Stone on Deep Ink — **8.8:1** ✅
- Deep Ink on Clay Amber (primary button) — **5.2:1** ✅
- Clay Amber on Deep Ink (links on dark) — **5.2:1** ✅
- ⚠️ **Clay Amber on Warm Chalk — 2.6:1 ✗ fails.** Amber must not be text on
  light fields. This is a live regression: `Nav.tsx` hovers links to `--accent`
  on the light glass nav. Fixed by `--accent-text` (amber-deep, 5.1:1) for
  light-mode text; amber stays for fills, dots, focus rings and dark-mode text.

### B. Typography

Flips the pairing from sans-display/serif-body to **serif-display/sans-body**.

- `--font-display` → **Newsreader** (h1–h5, statement copy, large stat numerals)
- `--font-body` → **Inter** (body copy **and all UI**: buttons, nav, eyebrows, marquee, labels)
- **Remove IBM Plex Mono** — `--font-mono` is declared and downloaded but
  referenced by zero components. Dead weight on every page load.

Serif display needs its heading treatment retuned — the current values are
grotesque-sans habits and will look clotted on Newsreader:

| Property | Now (Manrope) | New (Newsreader) |
|---|---|---|
| `font-weight` | 600 | 400 (h1/h2), 500 (h3–h5) |
| `letter-spacing` | −0.02em | −0.01em |
| `line-height` | 1.04 | 1.08 |
| — | — | `font-optical-sizing: auto` (Newsreader has an `opsz` axis) |

The repeated `font-[600]` + inline `fontFamily`/`fontSize`/`letterSpacing`/
`lineHeight` blobs on statement paragraphs (Footer, Problem pull-quote, ATBOS
lines, CountUp) collapse into one `.statement` component class.

### C. Inline styles to retire

| File | What comes out |
|---|---|
| `Nav.tsx` | `color:"#1b2836"` ×2 (Logo already defaults to `--heading`); `text-[#1B2836]` ×2; `fontFamily:var(--font-display)` on links; amber hover → `--accent-text` |
| `HeroMorph.tsx` | `--text-muted:"#cac6bb"` override (now in `.theme-dark`); `color:"#f7f1e6"` on h1; 4 × `rgba(11,26,46,…)`; marquee `fontFamily` |
| `Footer.tsx`, `ClosingBand.tsx`, `NewModel.tsx`, `WaysToWork.tsx`, `FeatureMorph.tsx`, `SignupForm.tsx` | 11 × `rgba(15,46,51,…)` teal scrims → ink-based `.scrim-*` classes |
| `Problem.tsx` | `rgba(245,241,232,0.55)` veil, `bg-[rgba(251,249,244,0.6)]` cells |
| `ATBOS.tsx` | radial cream veil, `rgba(41,95,102,0.28)` progress dot |
| `FooterLogo.tsx` | 6 × `rgba(204,138,85,…)` glow/trail → amber token |
| `OrbitMark.tsx` | teal strokes → ink / sage |
| `app/icon.svg` | `#163f45` / `#f5f1e8` → Deep Ink / Warm Chalk |

### D. Imagery — the one thing code can't fix

The photographic set is **teal + acid-lime** and was made for the retiring
palette. Verified by inspection: `teal-tunnel.webp` is flat deep teal;
`orbit-planet.webp` and `atbos-bg.webp` carry literal `#C6D64D`-ish lime nodes
that fight Clay Amber directly. Affected: `teal-tunnel`, `atbos-bg`,
`orbit-planet`, `iridescent`, `glass-planes`, `glass-planes-footer`,
`card-modern`, `background-cream` (the grain layer), `product-*.webp`.

`hero-bg-test.png` is the exception — navy with warm flares, already consistent
with Deep Ink + Clay Amber.

Retokenising the CSS scrims without addressing this means ink/chalk scrims
sitting over teal photography. Needs a decision (see Open questions).

### To-do

- [x] 1. `globals.css` — new raw tokens, derived shades, semantic aliases, `.theme-dark` remap
- [x] 2. `layout.tsx` — Newsreader + Inter via `next/font/google`; drop IBM Plex Mono
- [x] 3. `globals.css` base — heading weight/tracking/leading for serif; `.statement`; `.eyebrow` + `.btn` to Inter
- [x] 4. `globals.css` components — `.scrim-*` classes; `--accent-text`; glass materials to chalk/oat/ink
- [x] 5. Sweep all raw `--color-*` references to the new names (~70 sites, 14 files)
- [x] 6. Strip the inline styles in §C, file by file
- [x] 7. `app/icon.svg` + `OrbitMark.tsx` to new palette
- [x] 8. Imagery treatment per decision in §D
- [x] 9. Update brief §2.2 / §2.5 so the source of truth matches the build
- [x] 10. `npm run build`; check home + `/insights`, light + dark sections, mobile, reduced-motion, focus states

### Open questions (blocking 8, shaping 1 & 5)

1. **Legacy imagery** — interim CSS duotone treatment to pull the teal assets
   into the new palette, or ship code-correct and accept the clash until new
   artwork exists?
2. **Token renaming** — rename to palette names (recommended, kills the
   `--color-lime`-holds-terracotta trap), or keep old names with new values?


### Review — what was built (2026-07-25)

**Colour.** Palette tokens renamed to the board's own names
(`--color-chalk` / `oat` / `stone` / `sage` / `slate` / `ink` / `amber`) with
three derived shades (`ink-soft`, `ink-deep`, `amber-deep`). Semantic aliases
(`--bg`, `--text`, `--text-muted`, `--heading`, `--accent`, `--accent-text`,
`--border`, `--field-bg`) remap under `.theme-dark`. Every component reads
tokens — the only literals left are `app/icon.svg` (a standalone file that
can't read custom properties) and one documented Framer Motion case.

**Typography.** Newsreader (display, `opsz` axis loaded) + Inter (body and all
UI). IBM Plex Mono removed — it was downloaded on every page and referenced by
nothing. Heading treatment retuned for a serif: weight 400/500, tracking
−0.01em, leading 1.08, `font-optical-sizing: auto`. Repeated inline type blobs
collapsed into `.statement` and `.stat-figure`.

**Inline styles.** All 11 teal `rgba(15,46,51,…)` scrims, the 4 navy
`rgba(11,26,46,…)` hero scrims, both chalk veils and the WIP hex patches are
gone, replaced by `.scrim-*` / `.veil-*` component classes authored from
`--ink-rgb` / `--chalk-rgb` / `--amber-rgb` channel triplets. Every
`style={{fontSize: "var(--text-Nxl)"}}` became a type-scale utility.

**Accessibility.** Contrast verified by calculation: Warm Slate on Warm Chalk
5.1:1, Deep Ink on Warm Chalk 13.3:1, Warm Stone on Deep Ink 8.8:1, Deep Ink on
Oat (buttons) 11:1. Clay Amber on Warm Chalk is only **2.6:1**, so `--accent-text`
(Clay Amber darkened, 5.1:1) carries amber-as-text on light fields; this fixed a
live regression where nav links hovered to full amber on the light glass.

**Bug found and fixed: `backdrop-filter` was dead site-wide.** `globals.css`
declared `backdrop-filter` immediately followed by `-webkit-backdrop-filter`.
Lightning CSS (Tailwind v4) dedupes the pair and keeps the last one, and Chrome
supports the standard property but *not* the `-webkit-` alias — so the glass nav
and all three glass materials had no blur at all and rendered as flat slabs.
Removing the hand-written prefixed lines restored it; the build's own prefixing
handles targets. Verified in the emitted CSS and via `getComputedStyle`.

### Client direction taken during the session

- **Nav** — went through several rounds; see "Nav — final behaviour" below for
  the version that landed. (Interim states — always-on glass pill, then an
  adaptive light/dark pill — were both replaced.)
- **CTA buttons** — Clay Amber → Warm Chalk → **Oat Greige**, Deep Ink label.
- **Hero** — "built for" set in Clay Amber. `sm:max-w-[10ch]` on the h1 holds
  the break at "built for the / real world."; `ch` not `rem` so the constraint
  tracks the clamped display size, and unconstrained below `sm:` where a narrow
  measure would split "Frontier AI,". Intro paragraph settled at `text-lg` /
  `max-w-[48ch]`.
- **Stat band** — now a square-edged, full-bleed strip with ruled dividers,
  moved outside `.shell`; the boxed rounded card is gone.
- **New hero artwork** — supplied PNG (1.9 MB, 1672×941) converted to
  `hero-prism.webp` at q88/m6/sharp_yuv: **57 KB**, PSNR 42.7 dB. Matches the
  dimensions of the other full-bleed plates. Placeholder `hero-bg-test.png`
  deleted.

### Interim: legacy imagery

`.duotone` (for `<img>`) and `.plate-legacy` (for CSS background plates) strip
the retired teal and acid-lime with `grayscale(1)` then re-tint warm with
`sepia(0.5) saturate(1.5)`, landing the plates in Warm Stone / Clay Amber
territory. Applied to `teal-tunnel`, `iridescent`, `orbit-planet`, `atbos-bg`,
`glass-planes`, `glass-planes-footer`, `card-modern` and the `product-*` shots.
The grain plate was also desaturated, warmed and dropped to 0.22 opacity —
greying it had turned its large wave forms into a visible watermark.

**Both classes are temporary.** Delete them (and their usages) when re-treated
artwork lands. `hero-prism.webp` needs neither.

### Still open

- **Re-treat the photographic set** in the new palette so `.duotone` /
  `.plate-legacy` can be removed. This is an asset job, not a code one.
- `hero-hand.webp` and `hero-hand-v2.webp` are now unreferenced — safe to
  delete once the hero direction is signed off.
- Other sections of the brief still reference the retired system in passing
  (§2.3 material families name aqua/powder/sage; §2.4 photography direction
  specifies "restrained teal-and-cream with small lime accents"). §2.2 and §2.5
  have been rewritten to match the build; these two want a pass once the new
  artwork direction is settled.
- The NewModel card scrim was strengthened last (`.scrim-card`, ink at full
  strength by 40% since the copy starts at ~39% of the card). The browser
  connection dropped before this final value could be eyeballed — worth a look.

### Nav — final behaviour (2026-07-25)

The contained glass pill is gone entirely. `Nav.tsx` now runs three states off
scroll position and direction:

| State | Trigger | Appearance |
|---|---|---|
| `top` | `scrollY <= 8` | **No container at all** — logo, links and CTA bare over the hero |
| `hidden` | scrolling **down** | Whole header slides up `-100%` and stays away |
| `docked` | scrolling **up** | Returns as a **full-width** smoked-glass bar |

Detail worth keeping in mind:

- **The bar is Deep Ink, not Warm Chalk.** That means the foreground stays Warm
  Chalk in *both* states, so there is no colour flip to cross-fade and no window
  where the labels are the wrong colour for what sits behind them. An earlier
  light-bar version needed an `--nav-fg` flip and had exactly that problem.
- Pane tint is `ink 0.88 → 0.78`. Thinner than that and the page's Deep-Ink-on-
  Warm-Chalk body copy ghosts through the bar as legible text.
- Direction detection ignores deltas under 4px, or the bar flickers on jitter.
- A mount effect docks immediately if the page loads already scrolled — a reload
  restoring a mid-page position would otherwise show the bare Warm Chalk
  treatment over light content until the first scroll event.
- `prefers-reduced-motion` skips the slide-away entirely and simply stays docked.
- **`.btn-primary` is now flat** — no border, no shadow, no gradient. Because the
  bar is dark, the Oat Greige fill reads as a solid shape both over the hero and
  in the bar, so no per-state override is needed. (A light bar *did* need one:
  Oat on Warm Chalk is ~1.1:1 and the button lost its shape.)
- Removed classes: `.glass-nav`, `.nav-root`, `.is-solid`. New: `.nav-bar`,
  `.nav-pane`, `.nav-panel`, `.nav-fg`.

**Not visually verified.** The Chrome extension disconnected partway through
this round, so the three scroll states were confirmed by type-check, production
build, and inspection of the emitted CSS and server-rendered markup — but not
seen rendering. Worth scrolling through before sign-off. The one thing to watch
is whether `docked` reappearing on any upward scroll feels too eager mid-page.

---

## Plan — Carry the black/green header treatment into the sections (2026-07-28)

### Context

The header now reads: Ink Black field, **cream (Oat Greige) H1**, **Deep Forest
`#2d523d`** button fill with a Warm Chalk label, and an untreated *genuinely
monochrome* photograph (`hero-panels.webp`) under ink scrims.

The sections below still carry two hangovers from the retired palette:

1. **Sepia imagery.** `.duotone` and `.plate-legacy` both run
   `grayscale(1) sepia(0.5) saturate(1.5)`. The `grayscale` strips the old
   teal/lime; the `sepia(0.5) saturate(1.5)` then re-tints it warm — that is
   the brown look. The header image gets none of this.
2. **Clay Amber accents** below the header.

### The one real constraint — RESOLVED (2026-07-28)

Deep Forest inverts across the two fields:

| Field | Contrast | Verdict |
|---|---|---|
| Paper White (light sections) | **8.3:1** | Excellent — better than amber, which needed `--color-amber-deep` |
| Ink Black (dark sections) | **2.2:1** | Fails — unreadable as text, near-invisible as a dot |

**Decision: no new green shade.** Green is used only where it is legible — i.e.
on **light** fields and as a **fill** behind a Warm Chalk label. Anywhere green
would fail (accents on dark sections), **Clay Amber is retained** as the accent,
since it already clears AA on Ink at 6.6:1.

This makes the palette rule simple and worth stating once:

> **Green on light, amber on dark.** Deep Forest is legal as accent *text* on
> light fields and as a *fill* anywhere. Clay Amber remains the accent on Ink
> Black. No second green is introduced.

**Consequence for WaysToWork:** it is a dark section, so its icon nodes and
"How we work" link **stay Clay Amber** — unchanged. Only its background plate
de-sepias. The green request cannot apply there without a second green.

### To-do

- [ ] **1. De-sepia the image treatment.** Drop `sepia()`/`saturate()` from
      `.duotone` and `.plate-legacy`; keep `grayscale(1)` and lift contrast so
      the plates read as punchy neutral B&W like the header shot. Also neutralise
      the warm cast in `.duotone::after` (currently a chalk→ink soft-light).
- [ ] **2. FeatureMorph** — "Capability now advances by the month." Typeface
      unchanged, **Clay Amber accent word retained** (explicitly kept), only the
      background plate changes. Falls out of item 1.
- [ ] **3. NewModel** — the four panels. Images retained, now neutral B&W.
      Falls out of item 1 (`.plate-legacy`).
- [ ] **4. WaysToWork** — background plate to the black style only (falls out
      of item 1). Icon nodes and the "How we work" link **stay Clay Amber** per
      the resolved constraint above — the section is dark, and no second green
      is being introduced.
- [ ] **5. Products** — CommerceOS + MarketingOS both use `/images/hero-aisle.webp`
      as a placeholder, and **drop `.duotone`** from those two cards (the aisle
      shot is already monochrome, same as the spotlight). "Live" badge fill
      amber → `--color-forest` with a Warm Chalk label, matching the header button.
- [ ] **6. Footer** — image retained, de-sepia'd. Falls out of item 1.
- [ ] **7. Build + visual check.**

### Reach beyond the named sections — APPROVED (2026-07-28)

The sepia lives in two shared classes, so fixing it also changes **ATBOS**,
**ClosingBand** and the Products card frames. Confirmed: de-sepia all sections.

### Deliberately NOT in scope

- Cream headings on the other dark sections (WaysToWork, ClosingBand currently
  use Warm Chalk `#f7f1e6`, hero H1 uses Oat Greige `#e5dccb` — very close;
  not touching unless asked)
- Amber in the logo dot, OrbitMark, footer link hovers, nav link hover, skip link
- Any second green shade — explicitly ruled out
- Any section changing from light to dark, or vice versa
