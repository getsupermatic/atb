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

- [x] **1. De-sepia the image treatment.** Drop `sepia()`/`saturate()` from
      `.duotone` and `.plate-legacy`; keep `grayscale(1)` and lift contrast so
      the plates read as punchy neutral B&W like the header shot. Also neutralise
      the warm cast in `.duotone::after` (currently a chalk→ink soft-light).
- [x] **2. FeatureMorph** — "Capability now advances by the month." Typeface
      unchanged, **Clay Amber accent word retained** (explicitly kept), only the
      background plate changes. Falls out of item 1.
- [x] **3. NewModel** — the four panels. Images retained, now neutral B&W.
      Falls out of item 1 (`.plate-legacy`).
- [x] **4. WaysToWork** — background plate to the black style only (falls out
      of item 1). Icon nodes and the "How we work" link **stay Clay Amber** per
      the resolved constraint above — the section is dark, and no second green
      is being introduced.
- [x] **5. Products** — CommerceOS + MarketingOS both use `/images/hero-aisle.webp`
      as a placeholder, and **drop `.duotone`** from those two cards (the aisle
      shot is already monochrome, same as the spotlight). "Live" badge fill
      amber → `--color-forest` with a Warm Chalk label, matching the header button.
- [x] **6. Footer** — image retained, de-sepia'd. Falls out of item 1.
- [x] **7. Build + visual check.**

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


### Review (2026-07-28)

All seven items done. Verified against the **deployed** CSS on the v3 preview,
not just a local build.

**One change did most of the work.** The sepia was not per-section — it lived in
two shared classes. Removing `sepia(0.5) saturate(1.5)` from `.duotone` and
`.plate-legacy` de-sepia'd FeatureMorph, NewModel, WaysToWork, ATBOS,
ClosingBand, the Footer and the Products card frames in one edit.

| File | Change |
|---|---|
| `app/globals.css` | `--color-lime` → `--color-forest: #2d523d`; `.btn-primary` label to Warm Chalk; `.duotone` + `.plate-legacy` de-sepia'd; `.duotone::after` chalk → neutral white |
| `components/sections/HeroMorph.tsx` | H1 accent span removed (now Oat Greige throughout); eyebrow → "At the Beyond" |
| `components/sections/Products.tsx` | "Live" badge → Deep Forest fill, Chalk label; `.duotone` dropped from the two cards |
| `lib/site.ts` | CommerceOS + MarketingOS → `hero-aisle.webp` placeholder |

**Two things worth knowing:**

1. **`.duotone::after` was quietly re-warming the plates.** Its top stop was
   Warm Chalk (`#f7f1e6` — a warm cream) at `soft-light`. Removing the filter
   sepia alone would have left a warm cast behind. Now neutral white.
2. **`.grain-overlay` still carries `sepia(0.16)`** — left deliberately. It is
   the page-wide print-grain texture, not a section plate, and at 0.16 it is
   the warm note the brand palette wants rather than the brown the plates had.
   Trivially removable if the page should read fully cold-neutral.

**Not visually verified.** Confirmed by production build and by grepping the
CSS actually served from the preview deployment — `--color-forest:#2d523d`
present, `c7e85b` gone, `sepia(0.5)` gone, `.btn-primary` correct. But not seen
rendering in a browser.

### Deploy

Branch `v3` pushed to `getsupermatic/atb`; Vercel project `tactico/atb` builds
it automatically as a preview.

**https://atb-git-v3-tactico.vercel.app** — stable alias, re-points at the
newest v3 build on every push.

Note: a literal `atbeyond.com/v3` path is not practical for this branch. The
work is almost entirely global design tokens in `globals.css`, so one Next app
cannot serve v2 at `/` and v3 at `/v3` without the tokens colliding. That would
need either `basePath` or a second Vercel project plus a rewrite.

---

## Round 4 — New primary logo (bold squarish `atb.` mark)

Three candidates were supplied in turn; the third is what shipped:

| Attempt | Artwork | Outcome |
|---|---|---|
| 1 | `file.svg` — light geometric lowercase `atb`, arrow-apex `t` | superseded |
| 2 | `file (2).svg` — light geometric uppercase `ATB` | superseded |
| 3 | `file (3).svg` — bold squarish lowercase `atb` | **shipped** |

### What changed

- [x] **`components/brand/Logo.tsx`** — `variant="mono"` now carries the bold
      squarish `atb` artwork. The export shipped an opaque `#FCFCFC` background
      plus a mid-grey anti-alias ring behind each glyph; only the four core
      shapes are kept (`#080808` / `#050505` / `#040404` ×2), so the mark fills
      with `currentColor` and its counters read as true holes on any ground.
- [x] **Re-added the brand full stop.** None of the three source files carried
      one, and the `ATB.` device plus the footer's amber comet both depend on it.
      Drawn as a `<circle>` at r 27 — a shade over the 47-unit stem — sitting on
      the baseline one letter-gap clear of the `b`.
- [x] **viewBox normalised, not just cropped.** `-12 -3 949 384` crops to the
      ink (x 13–808 / y 22–346) and then re-pads it to the same ink-to-box ratio
      as the `full` "at the beyond." lockup (103/122). That puts the monogram's
      ascenders on the lockup's cap height, so a single `height` prop renders
      both marks at matching optical size and the nav's mono→full crossfade
      stays aligned. Every existing call site keeps working unchanged.
- [x] **`components/brand/FooterLogo.tsx`** — dot geometry re-derived from the
      new viewBox (`s = height / 384`, diameter 54·s, home 860·s / 295·s). The
      comet still departs from the right edge of the footer rule and docks where
      the static period sits.
- [x] **Dropped the dead `variant="atb"`** test artwork and its `Props` union
      member — nothing referenced it.
- [x] **`app/icon.svg`** — favicon now uses the new `a` letterform rather than
      the old lockup's `A`. Its 47-unit stem lands at ~2px in a 16px tile, so it
      needs no optical thickening (the light attempts 1 and 2 did).

### Size

The mark renders a touch larger than the old one: `height` 26 → 31 in both the
nav (`components/Nav.tsx`) and the footer (`components/Footer.tsx`). The `full`
lockup stays at 26 — the two never show simultaneously, they crossfade, and a
three-letter monogram carries more optical weight than a full lockup at equal
height.

### Verification

`npx tsc --noEmit` and `npx next build` both clean. The mark, the full stop's
placement and the favicon were checked by rasterising the composed SVG at large
size, at nav size (31px) and at 16px. **Not checked in a running browser** — the
user is verifying the nav, the crossfade and the footer comet animation
themselves.

### Left alone

`public/images/atbos-logo.svg` (the ATBOS product mark) is untouched — it is a
separate lockup, not the company logo.

---

## Round: solid black footer

The super-footer's `glass-planes-footer.webp` background is gone. `components/Footer.tsx`
now paints the `<footer>` `var(--color-ink-deep)` (`#000`) and drops the `duotone`
image layer, the `scrim-deep` overlay and the now-unused `next/image` import. The
`theme-dark` class stays, so all foreground tokens (`--text`, `--text-muted`,
`--border`) are unchanged and the type/nav/base rows read as before.

The image file itself is left in `public/images/` — nothing else references it,
but it's cheap to keep in case the background comes back.

**Verification:** `npx tsc --noEmit` and `npx next build` clean. Not checked in a
browser.

### Tried and reverted: Deep Ink `#202329`

Swapped every black on the site for an inky `#202329` — a four-line change, since
it all resolves from `--color-ink` and the `--ink-rgb` channel triplet — then
reverted it on direction. Black stays.

Worth keeping from the attempt, if it comes up again:

- Only four values need to move: `--color-ink`, `--ink-rgb`, `--color-ink-soft`
  and `--color-ink-deep`. Nothing else in the codebase hardcodes a dark hex, so
  the scrims, nav pane, glass materials, borders and halftone plate all follow.
- Lifting the base costs contrast against Deep Forest, which is already the
  weakest pairing: `--accent-display` and the `.btn-primary` fill go 2.2:1 → 1.8:1.
- The brief (§2.2) specifies `--color-ink` as `#1B2836` "Deep Ink"; the code uses
  `#111111`. `app/icon.svg` paints its favicon tile the brief's `#1B2836`, so the
  favicon and the site's dark base already differ slightly. Untouched.

---

## Round: hero eyebrow removed

`components/sections/HeroMorph.tsx` — dropped the `At the Beyond` eyebrow. The
`<h1>`, body paragraph and both CTAs are unchanged, so the hero copy block now
opens on the heading.

- [x] Removed the eyebrow `motion.p`.
- [x] Renumbered the `stagger()` indices — h1 `0`, paragraph `1`, button row `2`,
      so the entrance sequence doesn't open with a dead 0.16s gap.
- [x] Dropped `mt-7` from the `<h1>`, which was spacing it off the eyebrow and is
      now the block's first element.

**Verification:** `npx tsc --noEmit` and `npx next build` clean. Not checked in a
browser — the hero copy is vertically centred, so losing the eyebrow re-centres
the block slightly; that's the thing to eyeball.

---

## Round: FrontlineOS artwork + Capability Now panel spacing

Two small, unrelated fixes.

- [x] **FrontlineOS product image.** The spotlight panel in the Production-ready
      AI blueprints section was borrowing `hero-aisle.webp`; it now has its own
      photograph — a colleague on a headset serving a customer in the produce
      aisle. Source PNG re-encoded to WebP per the project convention
      (`cwebp -q 80`, 1536×1024, 67 KB) as `public/images/product-frontline-os.webp`,
      `lib/site.ts` repointed, and the spotlight `alt` rewritten to describe the
      new shot. CommerceOS and MarketingOS still borrow `hero-aisle.webp` as
      placeholders; the comment on the two cards was corrected to say so.
- [x] **"Capability now" sat tight to the top of its panel.** `FeatureMorph`'s
      card was a fixed `h-[62vh]` with the copy absolutely positioned and
      bottom-anchored, so whenever the heading plus sub-paragraph were taller
      than 62vh — short windows, or any window at browser zoom — the text
      overflowed the card's top edge instead of the card growing. The card is now
      `min-h-[62vh]` with the copy block in flow (`flex h-full min-h-[62vh]
      flex-col justify-end`), so tall copy pushes the card out; `h-full` keeps it
      bottom-anchored once the scroll morph sets the card to `100vh`. Added
      `pt-[8vh]` so the heading can never kiss the top edge. The GSAP timeline is
      untouched — it reads the card's computed height as the tween's start value.

**Verification:** `npx tsc --noEmit` clean; dev server renders the homepage 200
with the new markup and the WebP served 200. Not checked in a browser — the
Chrome extension wasn't connected. Worth eyeballing: the panel at a short window
height (~600px) and at 125–150% zoom, which is where the clipping showed.

---

## Round: Deep Pine base + a batch of type/colour trials

**Blacks switched to Deep Pine `#0f1613`.** A green-black in the Deep Forest
family, replacing the neutral `#111111`. As the earlier Deep Ink attempt
documented, only four values move and everything else follows from them:

- [x] `--color-ink` → `#0f1613`, `--ink-rgb` → `15 22 19`.
- [x] `--color-ink-soft` → `#1c2320`, `--color-ink-deep` → `#070b09` — both
      carried into the same green cast rather than left neutral, since they meet
      `--color-ink` inside gradients and a neutral black beside a green-black
      reads as a mismatch.
- [x] Comments updated where they quoted figures or the old name: Clay Amber on
      the base 6.6:1 → 6.4:1, Deep Forest on the base 2.2:1 → 2.1:1, and "Ink
      Black" → "Deep Pine" throughout `globals.css`, `Nav.tsx`, `Logo.tsx`.

Contrast effects: headings on paper 18.3:1 → 17.8:1 and Chalk on the base
16.8:1 → 16.3:1, both far above AA. Deep Forest as the dark display accent
loses a hair (2.2:1 → 2.1:1) — already decorative-not-legible by direction, so
no behaviour change, but it is the pairing that a lifted base costs most.

**Trials, each scoped and commented `TRIAL` so they revert in a line or two:**

- [x] Instrument Sans regular on the hero intro paragraph only — registered via
      `next/font` at `weight: ["400"]`, exposed as `--font-intro`.
- [x] Newsreader Light (`font-weight: 300`) on the `h1`. The hero is the only
      `h1` on the site; `h2`–`h5` unchanged.
- [x] `#C97B45` in place of `--color-amber` on FeatureMorph's second line
      (5.8:1 on the panel, clears large-text contrast).

**Other changes:**

- [x] Hero intro copy: "…creating intelligent, AI-powered solutions for the
      people at the heart of your business."
- [x] Stat strip in `Problem` — rules stay full-bleed, stats moved inside
      `.shell` so they align with the copy, outer cells zeroed at the edges.
- [x] Footer Subscribe button → `#c97b45` fill with an Ink label. Chalk on that
      amber is 2.9:1 and fails normal-size text; Ink is 5.8:1.
- [x] `.field` min-height 48px → 44px. The Subscribe button stretches to the
      field in the `sm:flex-row` signup row, which is why it read ~7px taller
      than every other `.btn`; 44px closes it to ~3px and holds the 44px touch
      target. `.field` styles exactly one element on the site.

**Verification:** `npx tsc --noEmit` clean; compiled CSS carries all four new
token values; homepage 200. Not checked in a browser — the Chrome extension is
disconnected, so the footer and closing band are the things to eyeball.

**Unrelated, pre-existing:** only `/` and `/insights` are routed. `/contact`,
`/how-we-work` and the `/products/*` links in the nav, hero CTAs and footer all
404 today.

## Round: header film grade (supplied recipe)

Recipe as given, and how each line lands in CSS (`.grade-film`, `app/globals.css`):

| Spec | Implementation |
| --- | --- |
| Saturation −92% | `saturate(0.08)` on the `<img>` |
| Contrast +18, crushed blacks | `contrast(1.18)` — pivots on mid-grey, so it pulls the shadows harder than it lifts the highlights |
| Shadow tint `#16110D` | full-bleed fill, `mix-blend-mode: lighten` → raises the black floor |
| Highlight `#EED6C0` | full-bleed fill, `mix-blend-mode: darken` → caps the white ceiling |
| Grain, fine 8–12% | inline `feTurbulence` SVG, desaturated, `overlay` at `opacity: 0.1` |
| Vignette −15% | radial gradient, transparent to 45%, `rgb(var(--ink-rgb) / 0.15)` at the corners |

Notes:

- [x] `lighten` + `darken` are channel-wise max/min, so the pair clamps the frame
      into `#16110D → #EED6C0` regardless of order. That is the whole split-tone —
      no duotone gradient or extra tint layer needed.
- [x] The wrapper carries `isolation: isolate`, so the blends can't reach the
      page behind the hero card or the `.scrim-hero` / `.scrim-top` stacked on
      top. It wraps the image **only** — a node with copy inside would have the
      tone map blend against the text.
- [x] The pseudo-elements need `z-index: 1` (and the grain/vignette divs `2`):
      `next/image` with `fill` is absolutely positioned and later in DOM order,
      so without it `::before` would paint underneath the photograph.
- [x] Grain uses `feTurbulence` rather than `background-cream.webp` (the plate
      `.grain-overlay` reuses) — that plate carries large wave forms and the
      recipe asks for fine grain. Self-contained data URI, no new asset.
- [x] `HeroMorph.tsx`: the `<Image>` moved inside `<div className="grade-film">`
      with the two texture divs; the scrims, copy and keyword strip are untouched.

**Verification:** `npx tsc --noEmit` clean. Eyeballed at 1400×864 in Chrome —
the frame reads warm-neutral with genuinely crushed blacks, and the pylon sky
picks up the `#EED6C0` cap as a cream rather than white. Grain and vignette are
subtle by design and largely invisible through JPEG screenshot compression, so
they're worth judging on-screen.

## Round: FrontlineOS plate re-shot, graded to match the header

- [x] `FrontlineOS-mono.png` (1536×1024, supplied clean monochrome) converted at
      `cwebp -q 82 -metadata none` → `public/images/product-frontline-os-mono.webp`
      (82 KB). Same frame as the plate it replaces, without the cool teal glow
      the old version carried in the bottom-right.
- [x] New filename rather than overwriting `product-frontline-os.webp`, so the
      swap can't serve a cached URL — the problem the `HeroMorph.tsx` comment
      records. One line in `lib/site.ts`.
- [x] `Products.tsx`: the spotlight `<Image>` wrapped in `.grade-film`, so the
      FrontlineOS panel now carries the same grade as the header. No `.duotone` —
      the plate is already clean mono, so there is no legacy hue to strip.
- [x] `.grade-film` gained `background: #16110d`. Below the fold the image
      lazy-loads, and until it lands the tone map has nothing to blend against —
      the panel read as a flat grey-brown block. The shadow tint doubles as the
      placeholder, so the empty state reads as the graded black instead. The
      image paints over it, so the loaded state is unchanged (the header was
      never affected: `priority`, so it loads eagerly).

**Verification:** `npx tsc --noEmit` clean; asset serves 200. Eyeballed in
Chrome at 1400×864 — crushed blacks, the `#EED6C0` cap showing as warm cream on
the shelf edges and the name badge, vignette visible in the corners, and the
panel now sits in the same grade as the hero.

**Left alone:** `public/images/product-frontline-os.webp` is now unreferenced.
Untracked, so deleting it isn't recoverable — say the word and it goes.

## Round: Capability-now field flattened and re-greened

Diagnosed by sampling both images rather than by eye. The rendered panel ramped
`rgb(72,96,83)` at the top to `rgb(29,38,33)` at the foot; the Option B
"structural field" board is flat at `rgb(48,71,55)` throughout.

- [x] **The black gradient was `.scrim-panel`** — 0.2 → 0.78 ink, bottom-weighted.
      Removed from `FeatureMorph.tsx`; the copy never needed it (figures below).
      Both `.scrim-panel` and `.plate-ridge-forest` were used only here, so the
      change is contained to this panel.
- [x] **The green.** New token `--color-forest-field: #304737`, sampled off the
      board — the same hue as `--color-forest` with the green channel ~11 lower.
      `--color-forest` is untouched, so CTA fills and the display accent are
      unaffected. Field-only; never a fill or a text colour.
- [x] **The real cause of the wash.** `.plate-ridge-forest::before` carried
      `brightness(0.94)`, but the ridge plate means 219/255 after `grayscale(1)`
      and 236 after `contrast(1.18)` — near-white, so at `soft-light` it could
      only ever lift. It was holding the whole field +36 levels above its own
      base colour and contributing a 30-level ramp of its own, which is why the
      first two dials (drop the scrim, change the base) barely moved it.
      `127.5/236 = 0.54` centres the plate on mid-grey, so soft-light now shades
      as much as it lifts.

**Measured result:** flat `#2e4636` mean with a 3–4 level spread top-to-bottom
and edge-to-edge, against the board's `#304737`. Within a level or two.

**Contrast on the unscrimmed field** — Warm Chalk 8.95:1, Warm Stone 5.91:1,
both clear of AA unaided, which is why dropping the scrim is safe.

**One thing to look at:** the `#C97B45` amber trial measured 5.8:1 against the
old scrimmed panel; on the flat field it is **3.08:1**. It still clears the 3:1
large-text minimum (the line is 2.45rem+), but only just, and the token
`--color-amber` would be 3.52:1. Left as-is — the trial is a direction call, not
a compliance one — but it's the figure that moved most in this round.

## Round: header grade corrected — real gamma, real split-tone

The first pass missed the style for a reason worth recording: two of the four
tone lines have no CSS-filter equivalent, and the approximations I used changed
what the recipe actually does.

**Corrected values:** shadow `#16110D` → `#1A0F08`, highlight `#EED6C0` →
`#F8E2C6`, and `contrast +18` → `gamma 1.28`.

- [x] **Gamma is a power curve, not a contrast pivot.** `contrast(1.18)` is
      linear around mid-grey; `x^1.28` bends the whole transfer curve, which is
      what crushes the blacks while leaving the highlights near where they were.
      Now `feComponentTransfer type="gamma" exponent="1.28"`.
- [x] **The tint pair is a remap, not a clamp.** The `lighten`/`darken` blend
      pair only raised the floor and capped the ceiling — every value between
      was left exactly as it was, so the midtones never picked up any copper.
      This is the main reason the frame read as plain desaturated mono. Now
      `feComponentTransfer type="linear"`, mapping 0 → shadow and 1 → highlight
      per channel: `intercept = shadow`, `slope = highlight − shadow`.
- [x] Both live in `components/brand/FilmGrade.tsx` — an inline SVG filter def
      (`#film-grade`), rendered once in the root layout, since `filter: url(#…)`
      only resolves against the same document. `.grade-film :where(img)` is now
      a one-line `filter: url(#film-grade)`, and the two blend pseudo-elements
      are gone.
- [x] `color-interpolation-filters="sRGB"` on the filter. Not optional: SVG
      filters default to linearRGB, and the slope/intercept values are sRGB, so
      without it the endpoints land somewhere else entirely.
- [x] Placeholder background moved `#16110d` → `#1a0f08` to match the new floor.
- [x] Grain and vignette unchanged, and still applied after the grade — the
      order the recipe lists them in.

**Verification:** simulated the exact chain in Python over `hero-panels.webp`
first — darkest pixel lands on `(26,15,8)` and brightest on `(248,226,198)`,
i.e. the two hexes exactly. In the browser the unscrimmed right side measures
brightest `(233,212,195)` and darkest `(20,2,0)`; both sit inside the spec
endpoints because the grain and the −15% vignette apply on top of the grade,
which is the intended order. `npx tsc --noEmit` clean.

**Worth a look now:** the FrontlineOS spotlight is graded but the CommerceOS and
MarketingOS cards directly below it are still untreated mono, so the copper stops
abruptly mid-section. They borrow the hero aisle shot as a placeholder — wrapping
them in `.grade-film` too is a two-line change if you want the section unified.

## Round: New-model section onto solid ink, section link removed

- [x] `NewModel.tsx` — section is now `theme-dark section`, i.e. solid Deep Pine.
      `.theme-dark` paints `--bg` and remaps the semantic tokens, so the heading
      and card copy pick up Warm Chalk / Warm Stone without hardcoding: the
      per-card `text-[color:var(--color-chalk)]` and `--color-stone` classes are
      gone in favour of the defaults and `--text-muted`.
- [x] The four cards were crops of the legacy iridescent plate under a
      `.scrim-card`. A translucent card has nothing to sit over on a solid field,
      so they are `--bg-elevated` (Deep Pine lifted, `#1c2320`) with a
      `--border` hairline. 1.15:1 against the field — reads as lifted without
      becoming a second colour. Chalk on it is 14.2:1, Warm Stone 9.4:1.
- [x] The `position` crop coordinates in the `pillars` array went with the
      plates, along with the wrapper's `relative`/`overflow-hidden` and the inner
      `relative z-10`.
- [x] `WaysToWork.tsx` — removed the standalone `link-accent` "How we work" link
      at the foot of the section, and the now-unused `next/link` import with it.

**Now unreferenced** (left in place, all trivially restorable):
`.plate-legacy` and `.scrim-card` in `globals.css`, and the
`public/images/card-modern.webp` asset. `.plate-legacy` was one of the two
INTERIM duotone helpers written to be deleted once treated artwork landed —
`.duotone` is still in use, so only its sibling is now dead.

**Worth a look:** the cards keep `min-h-[16rem]` with `justify-end`, which
existed to give the plate crops room to show above the copy. With the imagery
gone that reads as ~7rem of empty space at the top of each card. Dropping the
min-height (or switching to `justify-start`) tightens it up — one class either
way, but it changes the section's vertical rhythm, so it's your call.

**Verification:** `npx tsc --noEmit` clean; eyeballed in Chrome at 1400×864.

## Round: Capability panel onto the supplied tex-ridge-ink plate

The reconstruction the previous round tuned is no longer needed — the brand
asset is already treated and already in the green.

- [x] `tex-ridge-ink.png` (1600×899) → `public/images/tex-ridge-ink.webp`, 19 KB.
      Its last pixel column was semi-transparent for all 899 rows, which
      `background-size: cover` would have stretched into a faint right-edge
      seam, so the column is cropped and the image flattened to RGB.
- [x] `.plate-ridge-forest` is now four lines: the image, `cover`, `center`, and
      a `background-color` fallback. Gone with the rewrite: the
      `background-cream.webp` source, `grayscale(1) contrast(1.18)
      brightness(0.54)`, `mix-blend-mode: soft-light`, `opacity: 0.85`,
      `isolation: isolate`, the `::before` pseudo-element, and the whole
      measured-brightness derivation that existed only to stop a near-white
      cream scan washing the panel out.
- [x] `--color-forest-field` re-pointed `#304737` → `#284836`, the supplied
      texture's own mean, so the flat fallback matches the plate above it.
- [x] `background-cream.webp` is still in use by `.grain-overlay`; only this
      panel stops borrowing it.

**Measurement note, worth knowing for future rounds:** browser screenshots come
back tagged with a Skia display profile, while the source assets are untagged
sRGB — so comparing screenshot pixel values directly against a source hex
carries a colour-space offset (here it read as a spurious +5.5 red). Converting
the capture to sRGB first brings the plate to within 2–3 levels of the asset's
own mean, i.e. it renders faithfully. The earlier field match against the Option
B board was screenshot-against-screenshot from the same pipeline, so that
comparison was sound.

**Also in that assets folder**, unused so far and likely to supersede more of the
interim artwork: `tex-lightfield`, `tex-ridge-cream-strong`, `tex-wave-cream`,
`duo-copper`, `duo-green`, and four `atb-mark` variants (plain/ink/green/copper).
`.duotone` and the borrowed hero-aisle placeholders are the obvious candidates.

**Verification:** `npx tsc --noEmit` clean; eyeballed and sampled in Chrome.

## Round: New-model section onto the supplied tex-lightfield plate

- [x] `tex-lightfield.png` (1400×790, fully opaque, no edge artifact) →
      `public/images/tex-lightfield.webp` at `-q 88`, 53 KB.
- [x] New `.plate-lightfield`, applied alongside `theme-dark` on the section.
      Replaces last round's flat ink field.
- [x] **It needed a veil, unlike the ridge plate.** `tex-ridge-ink` is flat
      (std 2–4), so it carries copy bare. This one is a defocused bokeh with real
      range — std 37, brightest pixel `(205,184,162)` — and Warm Chalk over it
      raw falls to **1.8:1** on the brightest bokeh and 2.5:1 across the top 5%.
      A flat ink veil at **0.5** is the floor that works: Warm Chalk lands at
      4.96:1 against the single brightest pixel in the plate, so the heading
      clears AA wherever `cover` crops. 0.45 reads a shade lighter but drops the
      worst case to 4.39:1, just under. Folded in as a `linear-gradient`
      background layer rather than a second element.

**The thing to decide:** the cards now read as recessed rather than elevated.
`--bg-elevated` (`#1c2320`) was picked last round to lift off *flat ink*
(`#0f1613`); the veiled texture field sits lighter than that, so measured in the
render the card interiors come out **10 luminance levels darker than the field**
around them. Two ways out, both one line, and it's a look decision rather than a
correctness one:

1. Cards back to translucent — `.material-smoked` is exactly "dark translucent
   for dark sections", and the texture would read through them, which is
   probably the point of putting a texture there.
2. Keep them solid but lift the fill above the field value, so they read as
   panels floating on the texture rather than holes cut into it.

I've left them solid and unchanged, since going translucent would undo the call
from last round.

**Verification:** `npx tsc --noEmit` clean; measured and eyeballed in Chrome at
1400×864.

## Round: grade switched to neutral monochrome; badge removed; copper stat band

### Grade — neutral, shadows lifted a fraction warm

Same filter architecture as the copper grade, new constants only. This is what
`FilmGrade.tsx` was built for: `blackPoint` / `whitePoint` / the gamma exponent /
the saturate value, and nothing structural.

| Spec | Before (copper) | Now |
| --- | --- | --- |
| Saturation | −92% (`saturate 0.08`) | −100% (`saturate 0`) |
| Gamma | 1.28 | 1.12 |
| Black point | `#1A0F08` | `#121110` |
| White point | `#F8E2C6` | `#F4EEE4` |
| Grain | 10% | 8% (recipe band moved 8–12% → 6–10%) |
| Vignette | −15% | −15%, unchanged |

- [x] Simulated over `hero-panels.webp` before wiring: darkest pixel lands on
      `(18,17,16)` and brightest on `(244,238,228)` — both hexes exactly.
- [x] **"Contrast up, not colour" is measurable.** Mean per-pixel channel spread
      drops 21.8 → 3.9 (at saturation 0 the only colour left is what the two
      endpoints put there), while luminance std rises 38.3 → 42.6. So the frame
      is more neutral *and* higher contrast than the grade it replaces.
- [x] Placeholder background follows the black point, `#1a0f08` → `#121110`.
- [x] **Scope taken as all four product images**, per "header image and
      FrontlineOS/product images": the CommerceOS and MarketingOS cards are now
      wrapped in `.grade-film` too, closing the gap flagged two rounds ago. The
      scale-on-hover stays on the image alone — the grain and vignette are
      siblings, and a vignette that zoomed with the picture would pull its own
      edges into frame.
- [x] Removed the stale recipe hexes quoted in `Products.tsx` — they still named
      the *first* recipe and had been wrong since the copper correction. The
      recipe now lives in one place so the two can't drift again.

### Live badge

- [x] Removed the Deep Forest "Live" pill beside the FrontlineOS heading, and the
      `flex items-center gap-3` wrapper that existed only to sit it next to the
      h3. `products[].status` is still in `lib/site.ts` but is no longer rendered
      anywhere — left in the data rather than ripped out.

### Copper stat band

- [x] New `.stat-band`: a full-bleed Clay Amber strip. The `border-y` key lines
      that framed the figures are gone; the only rule left is the vertical
      divider between them.
- [x] It re-points the semantic tokens locally rather than recolouring each
      element — the same mechanism `.theme-dark` uses — so the markup keeps using
      `--text-muted` / `--border` and `.stat-figure` keeps resolving through
      `--heading`.
- [x] **That indirection is doing real work, because copper is a hostile field.**
      Deep Pine is the only palette colour that reads on it (6.4:1). Warm Slate —
      the muted body colour the labels would otherwise have inherited — is
      **2.0:1**, and Warm Chalk 2.5:1. Both fail outright. Labels sit at ink/0.85
      (5.2:1): still softer than the figures, with margin over AA. ink/0.75 would
      read better as hierarchy but lands at 4.3:1, just under.
- [x] `--border` re-pointed as well: at the light theme's ink/0.14 the divider is
      1.27:1 against the copper and all but invisible; 0.25 gives 1.56:1.
- [x] Below `sm` the three stats stack, where a vertical divider can't apply, so
      the existing `divide-y sm:divide-x sm:divide-y-0` idiom is kept — the same
      divider lies down as a horizontal one rather than the figures running
      together.

**Verification:** `npx tsc --noEmit` clean throughout; each section eyeballed in
Chrome at 1400×864.

## Round: Get-in-Contact button + heading leading fix

### Get in Contact

- [x] Copper `.btn` at the foot of `WaysToWork`, where the removed "How we work"
      link used to sit. Clay Amber fill rather than the Deep Forest
      `.btn-primary`, following the footer's Subscribe button. Label goes to Ink:
      Chalk on this copper is 2.5:1 and fails normal-size text, Ink is 6.4:1.
- [x] Uses the `--color-amber` token rather than the hardcoded `#C97B45` the two
      other copper elements carry, so if that trial is adopted this follows
      automatically.
- [x] `href="/contact"` — still unrouted, along with the rest of the nav targets.

### Panel heading leading — a systemic bug, not a local one

The card headings were computing to **1.333** line-height, not the 1.08 the base
heading rule sets. Cause: `@theme` defines `--text-xs … --text-6xl` as font sizes
with no paired `--text-*--line-height`, so Tailwind's `text-*` utilities supply
their own default leading — and because utilities sit in a later cascade layer
than `@layer base`, they beat the `line-height: 1.08` on `h1–h5`.

Measured across the homepage: **17 of 21 headings** were overridden, landing on
five different ratios (1, 1.111, 1.2, 1.333, 1.4). The smaller the step, the
looser the leading, which is why the card headings were the most visibly wrong.

- [x] Fixed at the token level for the step in question: `--text-2xl--line-height:
      1.08`. Verified — all six `text-2xl` headings now compute 1.080 (the three
      Ways-to-work cards, CommerceOS, MarketingOS, and the footer's Insights h2).
- [x] Safe to pair at the token level because every `text-2xl` on the site is a
      heading.

**Deliberately not fixed yet, and worth a decision:**

- The shared steps (`xs`–`xl`) can't be paired the same way. `text-xl` is used by
  NewModel's h3s **and** by FeatureMorph's body paragraph — 1.08 leading on a
  paragraph would be unreadable. Those four h3s are still at 1.4 and want an
  explicit `leading-[1.08]` instead.
- `text-3xl` (1.2) and `text-4xl` (1.111) are heading-only and could be paired
  exactly as `2xl` was — that would bring the remaining h2s to 1.08.
- `text-5xl` is shared with `.stat-figure`, which sets its own `line-height: 1`;
  pairing it would loosen the stat figures, so it needs the same explicit-class
  treatment.
- `text-6xl` (the hero h1) and FeatureMorph's arbitrary `text-[2.45rem]` both
  compute to 1, i.e. tighter than the 1.08 intent. Pairing would *loosen* them,
  which at those display sizes may not be wanted — a look call.

**Verification:** `npx tsc --noEmit` clean; line-heights and button colours read
back from the live DOM rather than eyeballed.

## Review: supplied "at the beyond." SVG for the nav logo hover

Reviewed `~/Downloads/file (4).svg` against the existing nav mark. Findings are
measured, not eyeballed — renders normalised to a common x-height and compared.

**1. The file is "at the beyond." in lowercase, not "ATBOS".** Which fits the
described gesture: a·t·b are the initials of *at the beyond*.

**2. It is a raster auto-trace, not vector artwork.** 294 `<path>` elements, 3813
Bézier curves, and — the giveaway — **zero straight-line commands** in a typeface
built almost entirely from straight stems. 22 distinct fill colours forming a grey
ramp (`#010101` … `#FDFDFD`): quantised anti-aliasing. Plus a full-canvas white
plate with the letterforms knocked out of it. 290 KB.

**3. Cleanup works but only goes so far.** Keeping the 159 near-black paths and
dropping the white plate and grey bands renders the lockup correctly and removes
the halo: 290 KB → 150 KB. But that is still ~12 paths per glyph, against the
hand-cleaned mono mark's 1 path per glyph (6.8 KB for all four shapes).

**4. The a/t/b are not identical to the closed mark, and cleanup can't fix it.**
IoU after normalising to a common x-height: **a 0.811, t 0.571, b 0.831** (1.000
would be pixel-identical). Root cause for the t: the supplied lockup's ascenders
are **5.5% shorter** relative to x-height (1.313 vs the mono mark's 1.389). Weight
is fine — stem/x-height 0.201 vs 0.193, within 4%, both matching the 47/236 that
`Logo.tsx` records. So: right typeface, right weight, wrong optical proportions,
plus trace noise.

**5. The current hover cannot feel like expansion, for a bigger reason than the
artwork.** `Nav.tsx` crossfades `variant="mono"` against `variant="full"` — and
`variant="full"` is **uppercase "AT THE BEYOND."** in a different, wider face. So
the hover currently dissolves lowercase into uppercase across two unrelated
typefaces, at two different heights (31px vs 26px), with an opacity+blur
crossfade. The supplied lowercase artwork is the right direction precisely
because it fixes the case and face mismatch.

**6. `atb.` is the word "at" + b(eyond), not three letterspaced initials.**
Measured side-bearings, normalised to x-height: the closed mark's a→t gap is
0.163 against the lockup's 0.199 for the same pair, while its t→b gap is 0.232 —
noticeably wider. The a-t pair is set as a tight word pair and the b sits apart.
That determines the animation: "at" travels as a unit, " the " reveals after it,
and b translates out with "eyond" following.

### Recommended approach — identity by construction, not by correction

Reuse the existing mono `a`, `t`, `b` and dot **path data verbatim** in the
expanded lockup, and take only the genuinely new glyphs (`the`, `eyond`) from the
cleaned trace. Then the three letters are identical because they are the same
path data, not because two traces were matched. One SVG, one set of paths, no
crossfade: the anchors animate their x-positions from closed to lockup spacing
while the new glyphs wipe in from the anchor they belong to.

**Status:** review only, no code changed. Awaiting a decision on how to source the
new glyph artwork before rebuilding.

### Implemented — one logo that expands, replacing the crossfade

- [x] **`Logo.tsx` rewritten.** One SVG, one set of paths, `expanded` boolean.
      The a, t, b and full stop are `<use>` references to the *same* path data in
      both states, so they are identical by construction. Only h, e, y, o, n, d
      are new; t and e are each used twice.
- [x] **The six new glyphs rebuilt, not just cleaned.** Stripped the white plate
      and the 22-step grey ramp, then re-contoured each glyph off a supersampled
      raster and simplified with Douglas–Peucker. **64.8 KB → 10.3 KB**, worst-case
      IoU **0.9936** against the trace. They are polygons, so their curves are
      dense-polygonal rather than true Béziers — invisible at 31px, and swappable
      for proper vector artwork without touching the animation.
      Two bugs worth recording from that work: Douglas–Peucker degenerates on a
      *closed* ring (first and last point coincide, so the anchor line is
      zero-length and everything collapses to 2 points) — fixed by splitting at
      the farthest point and simplifying two open chains; and ImageMagick does
      not honour an SVG's explicit width/height, so the raster scale has to be
      measured off the bitmap rather than assumed (assuming it put every glyph
      out by 8/6 and dropped IoU to 0.14).
- [x] **Layout derived from the lockup's own side-bearings**, not absolute
      positions, so each glyph's true width is respected — the mono a is 5% wider
      than the traced one it replaces. Travel on expand: a +0, t +8.7, b +1048.6,
      full stop +2419.3 units. The a and t barely moving is the "at" reading
      paying off.
- [x] **Nested transforms rather than one.** The outer `<g transform>` places a
      glyph at its expanded slot and never changes; an inner group carries the
      closed offset and animates. CSS `transform` and the SVG `transform`
      attribute are the same property, so they cannot both drive one element.
- [x] **`RATIO_CLOSED` is 949/384**, the original mono viewBox including its right
      padding, not the ink bounds. `FooterLogo` derives its travelling full stop
      from that geometry (`homeLeft = 860 * height/384`), so cropping to the ink
      would have moved the dock point. Footer verified unchanged.
- [x] `hideDot` kept for `FooterLogo`, whose two call sites moved from
      `variant="mono" style={{height}}` to the new `height` prop. (`FooterLogo`
      does import Logo — an early grep of mine wrongly filtered it out.)
- [x] **Nav keeps its layout.** The link reserves the *closed* width and the
      lockup is taken out of flow, overhanging into the gap before the first nav
      link. Verified: the nav items hold position exactly on hover. Because the
      lockup is still a descendant of the anchor, hovering the revealed letters
      keeps it open — which the old absolutely-positioned crossfade did not do.
- [x] Reduced motion: transitions off, states swap instantly.

**Still open:** the new glyphs are polygonal. If clean vector artwork for h, e, y,
o, n, d arrives, it drops into the `<defs>` and nothing else changes.

### Round: longer first-load hold on the expanded lockup

- [x] The intro hold went **780ms → 1250ms** (+470ms, ~60% longer) before the
      lockup collapses. The 520ms collapse itself is unchanged (it is Logo's own
      transition), as is the 260ms gap before the nav links fade in — that gap
      deliberately starts them partway through the collapse so the two overlap
      rather than queue, so the links now begin at 1510ms.
- [x] Both values pulled out as `HOLD_MS` / `LINKS_GAP_MS` at the top of
      `Nav.tsx` with the reasoning, rather than sitting as bare numbers inside the
      effect — this is a feel value that will get dialled again.
- [x] Unchanged: the intro is session-gated on the `atb-intro` sessionStorage key,
      so it plays once per session, and reduced motion skips it entirely.

**Verification:** caught the intro mid-hold in a capture immediately after
navigation (lockup written out), and confirmed the wrapper settles back to 77px —
the closed width — once it elapses. Precise in-page timing wasn't measurable:
tool-call latency spans the intro window, so the hold is asserted from the literal
constant rather than measured.

Two things that looked like bugs during verification and were not: the logo
appeared to vanish from a fixed-region capture (the browser window had resized,
moving the logo out of the crop), and the lockup refused to collapse across a
whole reload (the cursor was parked at x=190, which is inside the *expanded*
lockup's box — incidentally a good confirmation that the enlarged hover area
works as intended).

## Round: longer intro hold, footer word build-in, colour audit

### Intro hold, again

- [x] `HOLD_MS` 1250 → **2000ms**. The full name now sits written out for two
      seconds before collapsing. Everything downstream is derived, so this stayed
      a one-line change.

### Footer — "Operations. Commerce. Marketing." build in

- [x] New `components/motion/WordReveal.tsx`: each word sits in a clipped box and
      slides down into it, so it reads as being drawn in from the top edge of its
      own space rather than fading up the way `Reveal` does everywhere else.
      Staggered 0.05 / 0.22 / 0.39s as the footer arrives. The lead sentence stays
      static — animating all of it would bury the effect.
- [x] **The observer has to be on the wrapper, not the moving span.** First
      attempt used `whileInView` on the inner span and the words never appeared at
      all — they held layout height and rendered nothing. IntersectionObserver
      accounts for clipping ancestors, and the inner span starts translated fully
      outside its `overflow: hidden` parent, so its visible area is zero: it could
      never register as in view, and sat hidden forever waiting for itself.
      Rewritten to `useInView` on the wrapper, which is always visible, driving
      the inner span's `animate`.
- [x] The `paddingBottom: 0.22em` / `marginBottom: -0.22em` pair is load-bearing.
      `overflow: hidden` clips to the line box and `.statement` runs line-height
      1.14 in Newsreader, tighter than the face's descender depth — without it the
      p of "Operations" and the g of "Marketing" get sliced off at rest. The
      negative margin takes the space back out so the paragraph's metrics are
      unchanged. Verified in the browser: both descenders intact.

### Colour audit — is dark type ink or 100% black?

Asked and answered: **all ink, never pure black.**

- `--text` and `--heading` both resolve to `--color-ink` = **`#0f1613`**, Deep
  Pine — a green-black, so not neutral black either.
- Muted body copy is `--color-slate` `#5e6576` (Warm Slate); amber-as-text on
  light is `--color-amber-deep` `#8f5a2c`. Neither is black.
- On the copper stat band, `.stat-band` re-points `--text-muted` to
  `rgb(var(--ink-rgb) / 0.85)` and the figures resolve through `--heading` — so
  ink there too, at 85% for the labels.
- The **only** literal `#000` in the codebase is the marquee's
  `mask-image: linear-gradient(90deg, transparent, #000 12%, …)` in `globals.css`,
  where only the alpha channel is read — the colour is arbitrary. Every other
  "black" match is prose in a comment.
- Separately: the image grade's black point is `#121110`, a deliberately warm
  near-black. That's imagery, not type.

### ATBOS wordmark — composed from the atb mark + OS in Newsreader

Replaces `public/images/atbos-logo.svg`, which was the old uppercase grotesque
"ATBos" set in `#50727c` — a **retired palette teal**, so the section had been
carrying a dead brand colour.

- [x] `ATBOS.tsx` now composes the wordmark: `<Logo hideDot />` for the mark
      itself — the same paths as the nav, full stop suppressed — followed by "OS"
      in `--font-display` (Newsreader).
- [x] `Logo` gained support for a CSS-length `height` (width then comes from
      `aspect-ratio` rather than a px multiplication), so the mark keeps the
      section's fluid `clamp(40px, 5.5vw, 72px)`. Numeric heights are unchanged,
      which is what the nav's width transition needs — noted in the prop docs that
      a string height shouldn't be combined with `expanded` toggling.
- [x] The GSAP `logo` ref moved from `HTMLImageElement` to `HTMLDivElement`; the
      rise-on-arrival tween is untouched.
- [x] **Both alignment nudges sit on the mark, not the OS**, because the mark
      inherits the container's font-size so 1em there is unambiguous — an em on
      the OS span would resolve against its own larger font-size.
      `marginBottom: 0.1926em` aligns the baselines (the OS box bottom sits below
      its baseline by the font's descent, the mark's by 9.9% of its height, and
      the two don't agree), and `marginRight: -0.278em` cancels the trailing
      padding the closed box carries after the b.
- [x] `fontSize: 1.12em` on the OS puts its caps on the mark's ascender height.

**Measured result** at the 72px cap of the clamp: ascender 57px vs cap 57px
(exact), baselines within 1px (the O's round overshoot, which is correct), and the
b→O gap 10px against the mark's own letter gaps of 8px (a–t) and 11px (t–b) — so
the join sits inside the mark's existing spacing rather than reading as two
elements pushed together.

**Left in place:** `public/images/atbos-logo.svg` is now unreferenced. Tracked, so
it is recoverable — say the word and it goes.

**Note on the earlier plan:** the drawn-`s` approach was abandoned mid-way on your
call. Worth keeping the measurements it produced, since they characterise the
face: stem **47.3** units, horizontal bar **43.7** (bars run ~8% lighter than
stems), outer corner radius **70.5**, x-height 237, and the `o` is 238.0 × 237.3.

### Round: OS raised and halved

- [x] The OS moved from baseline-aligned at full ascender height to **half the
      ascender height, cap-top aligned** — a lifted secondary mark rather than a
      true superscript. Container switched from `items-end` to `items-start`, the
      mark's `marginBottom` nudge dropped (it existed to reconcile baselines and
      is meaningless under top alignment), `marginRight` kept.
- [x] `fontSize: 0.59em` and `marginTop: 0.078em` on the OS, both measured off the
      render rather than derived: the OS box top is *not* its cap top, because
      half-leading and the font's ascent sit above it, so the offset can't be
      reasoned from the font-size alone.

**Measured result:** OS cap 29px against the mark's 57px ascender — **0.509**, i.e.
half. Cap tops level to within 1px, which is the O's round overshoot plus
antialiasing; a round letter *should* sit slightly proud of the cap line. b→O gap
7px, against the mark's own 8px (a–t) and 11px (t–b) — a touch tighter, which is
right for a raised, smaller element.

Took three measure-and-correct passes: the first landed the cap ratio at 0.474 and
the cap top 4px high, the second at 0.500 and 1.5px high.

## Round: tex-light-aisle behind Three-ways, panels opened up

### Background

- [x] `tex-light-aisle.png` (1280×720, fully opaque) → `public/images/tex-light-aisle.webp`
      at `-q 86`, 38 KB. Replaces the `orbit-planet.webp` plate.
- [x] Despite the filename, "light" means *lights* — it's a dark, heavily blurred
      aisle with bright bokeh, so the section stays `theme-dark`. No theme flip.
- [x] **No `.duotone`** — the asset is already clean monochrome, so there's no
      legacy hue to strip and the wrapper's soft-light layer would only muddy it.
- [x] **No extra veil**, which is the non-obvious part. The plate is bright
      (brightest pixel `(247,242,233)`, where Warm Chalk alone is **1.01:1**), so
      the instinct is to veil it like `.plate-lightfield`. But `.scrim-side` is
      unlike the other scrims in that it never fades out — it bottoms at ink 0.58
      on the right rather than reaching 0 — and the cards add their own smoked
      glass. Measured worst case clears 6:1, so a veil would only bury the plate.
- [x] `orbit-planet.webp` is now unreferenced. Left in place.

### Panels — more transparency

- [x] `.material-smoked` opened from `0.55 → 0.78` to **`0.38 → 0.60`**, blur
      16px → 20px, edge chalk 0.14 → 0.18.
- [x] **0.38 is a measured floor, not a preference.** The third card sits where
      `.scrim-side` has bottomed out at ink 0.58, and the weakest text there is
      Warm Stone at text-sm (kicker and body), needing 4.5:1. At a combined 0.740
      coverage that lands **4.86:1** against the plate's brightest pixel and
      6.12:1 against its p95 patch. 0.32 drops the worst case to 4.45:1 — under.
- [x] Blur up because it averages more of the backdrop, which both helps the worst
      case and reads as more glass as the fill lightens; edge up because a lighter
      fill leans harder on its border to define the card.

**Two verification traps worth recording:**

1. I measured the section as a flat ink field and concluded the plate wasn't
   rendering. It was: `next/image` lazy-loads (no `priority` on a background
   plate), and it simply hadn't arrived when I sampled. The "texture" I thought I
   saw on the left was the chalk heading. Sampling a lazy-loaded background needs
   an explicit wait on `img.complete`, not just a scroll-and-shoot.
2. Diagnosing it, I set `display: none` on the scrim **via JavaScript in the live
   tab** — which is the same tab the user is watching, so it changed what they
   were looking at and read as an unexplained design change. Reloading reverted
   it (no code was touched). Live-DOM probes on a shared tab need undoing
   immediately, or doing somewhere else.

**Verified:** the browser extension dropped mid-check and then reconnected —
eyeballed at 1286×852 with the plate loaded. The bokeh reads through the panels and
the card text holds. Asset serves 200, `npx tsc --noEmit` clean.

### Round: section order swapped

- [x] `Products` and `WaysToWork` swapped in `app/page.tsx` — "Production-ready AI
      blueprints." now precedes "Three ways to work with us." Confirmed in the
      rendered HTML's section order.
- [x] Side effect worth noting: this fixes the light/dark rhythm rather than
      disturbing it. The old order ran Problem (light) → NewModel (dark) →
      WaysToWork (dark) → Products (light) → ATBOS (light), i.e. two darks then two
      lights. It now alternates cleanly: light → dark → light → dark → light.

## Round: plates redistributed, ATBOS panelised, copper textured

### Capability-now → the aisle plate (`.plate-aisle`)

- [x] Replaces the Deep Forest ridge field, which has moved to ATBOS.
- [x] **`.scrim-panel` is back, and this time it earns its place.** It was removed
      two rounds ago as "a black gradient artefact" over a flat green field. Over
      this plate it is required, for a reason worth recording: the panel's
      highlighted line is Clay Amber, and **amber is a mid-tone**, so veiling the
      field darker moves it *toward* the type rather than away. Measured, amber
      cannot reach 3:1 on this plate by veiling alone — even a 0.75 flat veil
      leaves it at 2.62:1. What fixes it is depth where the copy actually is: the
      copy is bottom-anchored, the scrim ramps to ink 0.78 there, and a 0.35 plate
      veil combines to 0.857 → amber **3.79:1**, Chalk 11.0:1, Stone 7.3:1. At the
      panel top the scrim is only 0.2, so the bokeh still reads.

### New-model → the drive plate (`.plate-drive`)

- [x] Veil 0.55. Only the h2 (Warm Chalk, text-4xl = large) sits on the plate; the
      four cards are opaque `--bg-elevated`. 0.55 gives 4.05:1 against the plate's
      brightest pixel (241,236,227), clear of the 3:1 large-text minimum.
- [x] Resolves an earlier flag for free: this plate is much darker than the
      `tex-lightfield` it replaces (mean 29 vs 64), so `--bg-elevated` now reads as
      *lifted* off the field rather than recessed into it.

### ATBOS → green ridge field + panel morph + centred

- [x] `.plate-ridge-forest` (the Capability-now green) with `theme-dark`, so the
      wordmark, statements and dots all resolve through `--heading`/`--text` rather
      than hardcoding chalk.
- [x] The FeatureMorph gesture: contained rounded panel on arrival, opening to
      full-bleed as you scroll. Added to ATBOS's **existing** scrubbed timeline
      rather than a second ScrollTrigger, so the morph can't drift from the
      statements — 1.5 units against its 12.5-unit runway.
- [x] `items-center` on the card centres the wordmark/statements/dots as one group
      while the panel's min-height morphs 82vh → 100vh. Without it the group sat
      top-aligned and drifted as the panel grew.

### Copper stat band → the same ridge texture

- [x] It can't be used as an image: `tex-ridge-ink` is a *green field*, so dropping
      it on copper would replace the colour rather than texture it. It goes through
      `soft-light`, which transfers only light and shade.
- [x] **Filter order is load-bearing and the values are measured.** The plate greys
      out at mean 60 with a standard deviation of just 2.9, so `brightness` must
      come FIRST to lift the mean onto mid-grey (127.5/60 = 2.125) — soft-light
      against a layer that dark could only ever darken. `contrast(3)` then
      amplifies what's left, ~2.9 → ~18 of deviation: enough to read, little enough
      to leave the copper's hue alone. Contrast first would drive the mean
      *negative* (the pivot is 127.5, the plate sits far below it) and the texture
      would come out black.

### Icon build-in, slowed

- [x] `DRAW` 0.75s → **1.6s**, stagger 0.14s → **0.9s**, trigger margin −15% →
      −30%. At the old timings the three finished within half a second of each
      other, which read as one burst of movement rather than three icons building.
- [x] Chevron sub-delays made proportional to `DRAW` so they scale with it.

**Now unreferenced:** `tex-wave-cream.webp` (converted, then superseded within the
round), `tex-lightfield.webp`, `orbit-planet.webp`, `atbos-bg.webp`,
`atbos-logo.svg`.

**Worth your eye:** `tex-light-aisle` is now the plate for **two** sections —
Three-ways and Capability-now. Deliberate on my part only in the sense that you
asked for each; if the repetition isn't wanted, `tex-light-store` or
`tex-light-grocery` from the same folder would differentiate them.

**Not verified in motion:** the icon draw. Chrome restores scroll position on
reload, so the icons animated during hydration before any of my four measurement
attempts could sample them — I confirmed the mechanism (framer-motion is driving
`pathLength`) and the end state, but never caught it mid-draw. The timing change is
reasoned from your description, not measured.

## Round: sequential icons, half-height stat rules, green quote, count-down

### Icons — strictly sequential

- [x] Each icon now starts only once the previous has **finished**, rather than on a
      fixed stagger.
- [x] **A single stagger couldn't do this**, which is why the schedule is derived:
      the three icons are not the same length. `forward` has two chevrons, the
      second starting a third of the way in, so it runs ~2.14s against `deploy`'s
      ~1.78s and `frontier`'s ~1.86s. Any one stagger value would either cut the
      long one short or leave dead air after the short ones.
- [x] `WayIcon` now exports `ICON_DURATION` per kind, computed from the same `AT`
      offsets the render uses, so the schedule can't drift from the animation.
      `WaysToWork` accumulates it. The spring's contribution (`POP`) is *derived*,
      not set — a spring has no duration, so it comes from stiffness 520 / damping
      17 → settling time ≈ 4/(0.37·22.8) ≈ 0.47s, rounded to 0.5.
- [x] Resulting timeline: deploy 0.30→2.08s, forward 2.20→4.34s, frontier
      4.46→6.32s. **The full sequence is 6.3s** — long for a scroll reveal, and the
      dial is `DRAW` (1.6s) if that's too slow to sit through.

### Stat rules — half height, centred

- [x] Tailwind's `divide-x` sets `border-left` on the cell, and a border always
      spans the full cell height — it cannot be shortened or centred. So the rule
      is a pseudo-element now: `top: 25%; height: 50%`. Verified in the browser —
      cell 318px, divider 158.79px (49.9%) at 79.39px (24.96%).
- [x] Scoped to `sm`+ only. Below that the stats stack into one column, where a
      vertical rule has nothing to divide; the grid's own `divide-y` covers it.

### Closing quote in Deep Forest

- [x] `TRIAL` — `--color-forest` on the Problem section's closing quote, overriding
      the Deep Pine that `.statement` carries via `--heading`. **8.43:1** on the
      paper canvas (against Deep Pine's 17.57:1), so still clear of AA for body text
      let alone this size. Uses the token rather than a hardcoded hex, unlike the
      other trials, so the quote follows if the green moves.

### The ~1% stat counts down

- [x] `CountUp` gained a `from` prop (default 0), so it counts *between* two values
      and reverses to `from` on leaving rather than always resting at 0.
- [x] The ~1% figure runs **100 → 1**. The stat is about how little of the spend
      reached the floor, so the fall is the point. Verified live: ~100% → ~63% →
      ~21% → ~4% while the other two count up alongside.

### Panels a shade more transparent

- [x] `.material-smoked` 0.38 → **0.34** at the top of the gradient (0.60 → 0.56 at
      the foot). **Close to the hard floor:** Warm Stone lands 4.59:1 against the
      plate's brightest pixel where AA needs 4.5:1; 0.33 gives 4.52:1 and 0.32
      fails at 4.45:1. Roughly one more hundredth is available and no more, unless
      `.scrim-side` deepens or the plate changes. The binding case is one bright
      bokeh spot behind small type — against the plate's p95 patch there is ~6:1.

### Reverted: the icon draw-on animation

Removed entirely at your call — the icons were rendering broken. `WayIcon.tsx` is
deleted and `WaysToWork.tsx` is back to the three local `DeployIcon` /
`ForwardIcon` / `FrontierIcon` components with their shared `stroke`/`node` consts,
rendered as `<way.Icon />`. Verified: `grep` for every name the module exported
returns nothing, and the DOM shows 44×44 icons with the original 2 / 3 / 2 shape
counts.

**Two likely culprits, if it's ever retried** — worth recording rather than
rediscovering:

1. `originX` / `originY` given as px strings on `motion.circle`. framer-motion
   expects 0–1 fractions or unitless numbers there, and SVG's `transform-box` /
   `transform-origin` handling differs from HTML — a springing `scale` about a
   mis-resolved origin throws the shape well off its intended position, which
   would look exactly like a broken icon.
2. `pathLength` on `<circle>`. framer-motion drives it via `stroke-dasharray` /
   `stroke-dashoffset`, which needs the element's own `pathLength` attribute to
   normalise against; support for that on `<circle>` is less reliable than on
   `<path>`. Drawing the orbit as a `<path>` arc instead would avoid it.

Also worth noting: every attempt I made to verify the animation mid-flight failed
because Chrome restores scroll position on reload, so the icons animated during
hydration before any sampling could start. I confirmed the mechanism and the end
state but never actually observed the motion — which is why a visibly broken result
got past me. For scroll-triggered motion, the check needs a genuinely unseen
element, not a reload plus a scroll.

---

# A new model — from a 2×2 panel grid to an editorial ledger

## The problem with what's there now

`NewModel.tsx` is four opaque `--bg-elevated` cards in a 2×2 grid. Three issues:

1. **It's the third grid in a row.** Products (spotlight + 2-col) and Ways to Work
   (3-col smoked cards) both follow it. By the time you reach the third the page
   has stopped making an argument and started listing things.
2. **The cards fight the plate.** `.plate-drive` is the strongest field on the
   page, and four opaque rectangles sit on top of it hiding most of it. The one
   thing that reads beautifully — the headline over the drive-through bokeh — gets
   about two seconds of screen time before the cards cover the rest.
3. **The copy has no argument shape.** Four title/body pairs of equal weight,
   read in whatever order your eye lands. Nothing tells you these are four
   *rejections* of an old model.

## The concept — a sticky headline and four crossed-out beats

Two columns, no cards, no grid.

**Left column:** the h2 goes `lg:sticky`, so "A new model for a changed world."
holds against the drive plate for the entire length of the section rather than
scrolling out after a second. This is the thing you said looks beautiful, so the
design's job is to keep it on screen.

**Right column:** the four pillars become a single scrolling column of ruled
beats, each arriving in two moves past the fixed headline:

```
────────────────────────────────  ← rule draws left to right
01                                ← Warm Stone, display face
Products, not seats.              ← was text-xl, now text-3xl
Rebuild the SaaS you rent as a product that's truly
yours — just the features you need, customised to how
you work, without the per-seat bill.
```

1. **The rule draws itself** across the column, left to right (`scaleX`, origin
   left). A line ruled across the page before anything is written on it.
2. **The copy slides in from the right** a beat behind it, along the line just
   drawn.

Two effects, one per element — a single choreographed arrival rather than a pile of
animations. The transforms are deliberately kept on separate elements: the rule
scales, the copy translates, so neither compounds the other.

Generous spacing between the beats (`space-y-14 lg:space-y-20`) so they arrive one
at a time. That's what makes them read as four separate arguments rather than a
list — your ask for "individual sections that slide in".

## Copy — unchanged

All four title/body pairs stay exactly as they are. No lines added, none reworded.
The layout does the work instead:

- The **titles go from `text-xl` to `text-3xl`** — the pillars stop being card
  headings and become display statements, which is most of the reason the section
  will read differently.
- The **`01`–`04` numerals** are the only thing added, and they aren't copy —
  they're the structure, telling you there are four beats and where you are in
  them. In the display face, Warm Stone.

## The contrast problem this creates, and the fix

Losing the opaque cards puts small body copy directly on the plate for the first
time, and `.plate-drive`'s 0.55 veil was measured for *one* thing: the h2, in Warm
Chalk, at large-text sizes. Measured against the plate's brightest pixel
(241,236,227):

| Field | Warm Chalk | Warm Stone | Clay Amber |
|---|---|---|---|
| plate at 0.55 (today) | 4.05:1 | **2.68:1** | **1.60:1** |
| plate + 0.40 reading wash | 7.30:1 | 4.83:1 | **2.88:1** |

So the body copy needs a deeper field, but deepening the whole plate to ~0.72
would dim the bokeh everywhere — including behind the headline, which is the part
worth keeping.

**New `.wash-read` class:** a feathered horizontal wash that is fully transparent
over the left column and reaches ink/0.40 by 46% of the viewport, holding it
across the copy column. The plate stays at its original 0.55 behind the sticky
headline and deepens only where you actually read. 46% is measured, not guessed —
the copy column starts at 48–49% of the viewport at every width from the `lg`
breakpoint to 1920px, because `.shell` caps at 78rem and centres. Below `lg` the
columns stack, so it degrades to a flat ink/0.40.

**One consequence to record:** Clay Amber cannot be used as text anywhere in this
section — it's a mid-tone, so deepening the field moves it *toward* the type, and
it fails even the 3:1 large-text bar at 2.88:1. So the index numerals are Warm
Stone rather than the amber they'd naturally want to be. Amber is still available
as a non-text mark (`.node-dot`) if the numerals want company.

**No `overflow-hidden` on this section.** `overflow: hidden` on any ancestor makes
it the scrollport, and `position: sticky` then resolves against a container that
doesn't scroll — the headline would silently stop sticking. The global
`overflow-x: clip` on html/body already contains the slide-in, and `clip` does not
create a scrollport, so it's safe.

## To do

- [x] Add `.wash-read` to `globals.css` with the measured reasoning above
- [x] Rewrite `NewModel.tsx`: sticky h2 column + `<ol>` of four ruled beats
- [x] Add the drawn rule — `components/motion/DrawRule.tsx`, `scaleX` from the
      left, static under reduced motion
- [x] Reframe `.plate-drive` onto the server rather than the car (added mid-round,
      see below)
- [x] Verify in the browser: headline sticks and clears the docked nav, beats
      arrive one at a time, wash lands under the copy column
- [x] Confirm the section still reads as distinct from ATBOS (which owns the
      pinned/scrubbed right-to-left grammar — this one is unpinned and unscrubbed)

## Deliberately not doing

- **Not pinning the section.** ATBOS already pins and scrubs statements in from
  the right. A second pinned scroll-jacked panel two sections earlier would read
  as a tic rather than a device.
- **Not four full-height chapters.** It would repeat the headline four times and
  add roughly three screens of scroll to a page that already has two morphs.
- **Not reusing `WordReveal`** on the pillar titles. The title is already moving —
  it's inside the block that slides in — so masking it as well is motion on top of
  motion. Easy to add later if the beats want more.
- **Not adding copy.** The old-way / new-way struck-line treatment from §1.6 of the
  copy deck was the first draft of this section and is recorded in the git history
  of this plan if it's ever wanted. Ruled out at your call: the layout carries it.

## Review — what shipped

**`components/sections/NewModel.tsx`** — rewritten. The 2×2 grid of opaque
`--bg-elevated` cards is gone. In its place: a two-column `.shell` grid, the h2 in
a `lg:sticky` wrapper on the left, and an `<ol>` of four ruled beats on the right.
Copy is byte-for-byte what it was; the titles moved `text-xl` → `text-3xl` and
`font-normal` (against the base h3 rule's 500 — at display scale Newsreader wants
the lighter weight, and 500 read heavier than the h2 beside it at 400).

**`components/motion/DrawRule.tsx`** — new. A hairline that scales in from
`origin-left` when it enters view, matching `Reveal`'s duration, easing and
viewport margin so the rule and the copy behind it read as one arrival. `scaleX`
rather than an animated `width`, so it composites instead of relaying out.

**`.wash-read` in `globals.css`** — new. Feathered horizontal wash that deepens the
plate under the copy column only. Full reasoning and the measured table are in the
class comment; the short version is that `.plate-drive`'s 0.55 veil was measured for
the h2 alone, small copy on it is 2.68:1, and deepening the whole plate to fix that
would dim the bokeh behind the headline — the one thing the section is built around.

**`.plate-drive` reframed** — `background-position: center` → `78% center`, added
mid-round at your request to favour the server over the car. The geometry is in the
class comment. Worth knowing: only 790 of the source's 1280 pixels are ever on
screen at desktop, and centred that window sliced the server's shoulder off. It
helps most at narrow widths, where the visible window is ~200 source pixels and
centred it was landing on the dead gap between car and server.

### Verified

- Sticky engages at exactly `top: 112px` (measured `h2Top: 112` mid-section),
  clearing the docked nav's ~67px.
- The copy column's left edge sits at 48.4% of the viewport, so the wash is at full
  strength before its first character — which is what the 46% stop was chosen for.
- Rules draw to the full 598px column width; beats arrive independently (caught 03
  mid-draw with 04 still untriggered).
- The single-column stack below `lg` renders correctly.
- Contrast, measured against the plate's brightest pixel with the wash applied:
  Warm Chalk 7.30:1, Warm Stone 4.83:1. Both clear AA for their sizes.

### Two things to know

**Verifying scroll motion needs the tab genuinely visible.** The first pass looked
like a total failure — rules stuck at 40% width, copy at opacity 0 — and the cause
was `document.visibilityState === 'hidden'`, which pauses `requestAnimationFrame`
and freezes framer-motion mid-tween. Nothing was wrong with the code. This is the
same trap recorded under the reverted icon animation above, in a new costume: that
time it was scroll restoration, this time tab visibility. Check
`document.visibilityState` before concluding anything about motion.

**Lenis owns the scroll position.** `window.scrollTo` fights it — a programmatic
scroll gets reverted to Lenis's internal target a moment later, which produced
wildly inconsistent measurements (a section reported at three different offsets in
as many calls). Drive the page with real wheel events when verifying anything
scroll-dependent.

### Open

- The reframed crop puts the server behind the copy column, where the wash is at
  full strength — he reads as a silhouette rather than a subject, and his reaching
  arm lands in the lighter gap between the two columns, which is the part that
  actually carries. If he ever wants to be in the *bright* half, the only lever is
  mirroring the plate (`scaleX(-1)`), since that is simply where he stands in the
  photograph. Not done: flipping a photograph of a person is a real intervention,
  not a crop tweak.
- `.plate-aisle` / `.plate-drive` / `.plate-lightfield` are now three classes
  differing only in URL, veil and position, and `.wash-read` is a fourth veil
  mechanism beside them. The note under `.plate-drive` about factoring these into
  one class driven by custom properties is now overdue.

## Round: the intro hold that was never running

Reported as "the logo collapses really quickly on first load, I need a couple of
seconds". `HOLD_MS` was **already 2000** — the round above set it. Raising it again
would have changed nothing.

### The gate was the bug, not the duration

- [x] Removed the `atb-intro` **sessionStorage gate** from `components/Nav.tsx`.
      The gate can only be read on the client, so the server always rendered the
      lockup **expanded**. On any load where the key was already set — i.e. every
      load after the first in a tab — the page painted the full name and then the
      hydration effect flipped `phase` to `mono` in the same tick. Result: the
      lockup flashes and collapses immediately, with the 2s hold never running at
      all. That is the "instant collapse", and it is the state you hit on every
      reload while reviewing. The intro now plays on every full document load; the
      header lives in the layout, so client-side route changes don't re-trigger it.
- Worth keeping in mind as a class of bug: **an SSR'd component cannot gate its
  first paint on client-only storage.** The gate silently inverts — it suppresses
  the animation's *timing* while leaving its *starting state* in the HTML.

### Links and CTA stay, and ride the collapse

- [x] The logo is back **in flow**: dropped the fixed-width span that reserved the
      closed size and the `position: absolute` on `Logo`. `Logo` already animates
      its own wrapper width (that is what the numeric `height` prop is for), so the
      anchor now grows with the lockup and the links + Get started slide right as
      it opens and left as it closes, over the same 520ms. That push is what had
      gone missing.
- [x] Deleted `revealed` / `revealStyle` / `LINKS_GAP_MS` entirely. The links and
      CTA used to sit at `opacity: 0` for the whole hold, which is why Get started
      looked *removed* — with a 2s hold the header stood empty but for the logo.
      Everything is now present from first paint and only the logo animates.

### Measured, at the tightest desktop width

At 1024px (the `lg` breakpoint, so the narrowest width where the links show) the
**expanded** row measures logo `48→318`, links `352→820`, Get started `854→976`:
34px of clearance either side of the list, single-line, `scrollWidth == clientWidth`.
No reflow risk at any desktop width. Verified at 1024 / 1100 / 1152 / 1280 / 1440.

### Open

- Reduced motion still paints the expanded lockup for one frame before snapping
  shut, because the skip path is an effect and the SSR'd HTML is expanded — the
  same inversion as the gate, one layer down. Pre-existing, not a regression from
  this round. A real fix means rendering the closed state on the server, which
  would break the intro for everyone else; leaving it deliberately.
- The 2s hold itself is **not stopwatch-verified in the browser**. The automation
  tab runs `visibilityState: hidden`, and Chrome throttles it hard enough that
  React never finishes hydrating in there — the collapse never fires, so the probe
  reads 270px forever. Same trap as the two notes above, third costume: this time
  it blocks hydration rather than a tween. Layout measurements are unaffected
  (pure layout, no rAF), which is why the 1024px numbers are trustworthy.

## Review — slow the footer word reveal (2026-07-29)

The three disciplines in the footer statement built in too fast to catch when you
were still scrolling into the section. Two changes, both timing only:

- `components/motion/WordReveal.tsx`: duration 0.72s → 1.05s, and the ease moved
  off expo-out `[0.16, 1, 0.3, 1]` to cubic-out `[0.33, 1, 0.68, 1]`. The ease was
  the bigger culprit — expo-out covers ~90% of the travel in the first third of
  the duration, so lengthening the duration alone would have kept the snap and
  just added a longer tail on nothing.
- `components/Footer.tsx`: stagger widened from ~0.17s to ~0.32s (delays
  0.1 / 0.42 / 0.74) so the three words stay legibly separate over the longer
  duration instead of overlapping into one movement. Full sequence now runs
  ~1.8s.

No change to the observer, the clip geometry, or the reduced-motion path. `tsc
--noEmit` clean. Not yet checked in the browser — the animation is scroll-
triggered and needs a real scroll-in to judge.

## Round: Blueprints section off the three-panel grid — editorial spread + type pair

**Status:** Plan written, awaiting sign-off. No code yet.
**Trigger:** "not a massive fan of the design of that section and would prefer it
not to use the three rounded-edge panels… prioritise FrontlineOS as the primary
product." Direction chosen: **editorial spread + type-only pair**, with a
**scroll-linked parallax** on the photograph.

### Why the current section fails, beyond taste

Three separate diagnoses, and each one independently argues for the same change:

1. **It is the third card grid in a row.** NewModel was rebuilt off a 2×2 panel
   grid precisely because "Products and Ways-to-Work both follow with grids of
   their own, so this was the third in a row" (see the header comment in
   `NewModel.tsx`). That fix moved the problem down one section rather than
   solving it: Products → WaysToWork is now the surviving grid-then-grid pair,
   and WaysToWork's three rounded smoked-glass cards are the stronger of the two
   uses. So Products is the one that gives.
2. **The placeholder images actively damage the hierarchy.** CommerceOS and
   MarketingOS both point at `/images/hero-aisle.webp` in `lib/site.ts`. The
   section therefore renders *the same photograph twice, side by side*, and it is
   the hero's photograph at that. It reads as a bug, and it spends the section's
   only real asset — the FrontlineOS plate — competing against two copies of
   something already seen twice on the page.
3. **`status` is fetched and never used.** `products[0].status === "Live"` has
   been in `lib/site.ts` the whole time and `Products.tsx` never renders it. The
   brief's product-card component (§6) explicitly lists "status/tag". The one
   piece of data that would mark FrontlineOS as the shipped product is being
   dropped on the floor.

### The layout

Section stays on the light paper canvas and keeps `.section` rhythm — it is the
only light punctuation between the dark NewModel above and the dark WaysToWork
below, so it must not go dark.

```
┌── viewport ────────────────────────────────┐
│ shell                                      │
│  Production-ready AI blueprints.           │
│  AI products for where your business…      │
│                                            │
│  ● Live            ████████████████████████╡ bleeds
│  FrontlineOS       ███  the graded      ███╡ off the
│  An AI-native      ███  frontline plate ███╡ right
│  operating layer…  ████████████████████████╡ edge
│  40%+ frontline productivity.              │
│  Explore the product →                     │
│                                            │
│  ────────────────────  ──────────────────   ← two drawn rules
│  CommerceOS            MarketingOS         │
│  AI-native commerce…   A unified marketing…│
│  15–25% revenue uplift 50%+ cost reduction │
└────────────────────────────────────────────┘
```

No `border-radius` anywhere in the section, no `.material-glass`, no
`.img-frame`, no `border`. One photograph. Hairlines are the only structure.

**The bleed is exact, not approximate.** `margin-right: calc(50% - 50vw)` on a
direct child of `.shell` lands precisely on the viewport's right edge, and this
is worth deriving once rather than tuning by eye. With the shell at outer width
`W` (capped at 78rem, centred) and inline padding `P`, a child's `50%` resolves
against the shell's *content* box, so it is `(W − 2P)/2`. The distance we need to
travel is the auto margin plus the padding: `(100vw − W)/2 + P`. Setting
`margin-right = (W − 2P)/2 − 50vw` gives `W/2 − P − 50vw`, and the negated target
is `W/2 − P − 50vw`. They are the same expression — no magic number, and it holds
at every width because both sides are functions of the same two variables.

- Applied to the **grid container**, not the image column, so the percentage
  resolves against the shell's content box rather than a grid area.
- Gated at `min-width: 64rem` in `globals.css` alongside the other measured
  classes. Below that the columns stack and the image sits full-width *inside*
  the shell, where the copy needs its right padding back.
- `100vw` includes the classic scrollbar, so on desktop Chrome the grid overruns
  the visible viewport by the scrollbar width. Harmless and invisible here — the
  image is bleeding off the edge by design, and `html`/`body` already carry
  `overflow-x: clip`, so nothing gains a horizontal scrollbar.

**The two secondary products get one drawn hairline each, and no vertical
rule.** Considered reusing `.stat-divide` (the half-height centred pseudo-element
divider from the copper band) for a vertical rule between them, and rejected it:
that class is gated at `40rem` to match Problem's grid, and this pair wants to
stay one column until `48rem` — MarketingOS's summary is the longest string in
the section and breaks to seven ragged lines in a 250px column. Matching the
breakpoints would mean either a cramped pair or a near-duplicate CSS class.
Two side-by-side rules read as one broken rule across the page, which is the
better editorial detail anyway, and they animate for free with the existing
`DrawRule`. No new CSS, no new breakpoint to keep in sync.

### The motion

Three layers, each on its own element — following `DrawRule`'s rule that a
transform should never be nested inside another animating transform.

| What | How | Notes |
|---|---|---|
| Heading | `WordReveal` on `blueprints.` only | Footer's pattern: lead static, the key word slides in from the top of its own box. |
| Photograph, entrance | `clip-path` inset wipe, gutter → bleed edge | framer-motion, in-view once, ~0.9s on `--ease-entrance`. On the **frame**. |
| Photograph, drift | GSAP `ScrollTrigger`, scrubbed, **not pinned** | `yPercent` ≈ −8 → 8 on an over-sized wrapper **inside** `.grade-film`. |
| Rules + copy | existing `DrawRule` + `Reveal`, staggered | Unchanged vocabulary. |

**Not pinned, deliberately.** `FeatureMorph` and `ATBOS` both own the pinned
card→full-bleed morph, and a third pin on one page reads as a tic. A scrubbed
trigger with no `pin` also needs no scroll runway, so it cannot collide with
either of their sticky sections — and the `overflow: hidden` trap documented in
`NewModel.tsx` does not apply, because nothing here sticks.

**The drift goes on a wrapper inside `.grade-film`, not on the image.**
`.grade-film` is already `position: absolute; inset: 0; overflow: hidden`, so it
is the containing frame. The parallax wrapper sits inside it at roughly
`-inset-y-[10%]` so there is travel to spend without pulling an empty edge into
frame. The grain and vignette stay siblings and stay still — the same reasoning
already recorded on the hover-scale in `Products.tsx`: a vignette that moved with
the picture would drag its own edges through the frame.

**Reduced motion:** early return before `gsap.registerPlugin`, as `FeatureMorph`
does. `Reveal`, `DrawRule` and `WordReveal` all already render statically, and
the wipe must resolve to `inset(0 0 0 0)` rather than staying clipped.

### To do

- [ ] `.bleed-right` in `globals.css` — the derivation above as the comment,
      gated at `64rem`.
- [ ] Rebuild `Products.tsx`: header (unchanged copy) → FrontlineOS spread →
      two ruled type columns. Delete the `rounded-[1.75rem]`, `material-glass`,
      `img-frame` and `border` usages; keep `.grade-film` + grain + vignette.
- [ ] Surface `frontline.status` as a `.node-dot` + "Live" marker. Existing data,
      existing class, no new copy.
- [ ] Drop the two placeholder `<Image>`s. `lib/site.ts` keeps the `image` keys —
      the product detail pages will want them — but the home section stops asking
      for artwork that does not exist.
- [ ] Client component for the parallax (`"use client"`), or a small
      `ImageParallax` motion component if it wants reuse later. Prefer keeping it
      in the section until there is a second caller.
- [ ] Verify with the tab **genuinely visible** — `document.visibilityState`
      throttling has now cost three rounds (icon animation, new-model rules, the
      intro hold). Drive with real wheel events; Lenis owns the scroll position
      and fights `window.scrollTo`.
- [ ] Check the bleed at 1024 / 1280 / 1440 / 1920 and confirm no horizontal
      scrollbar appears at any of them.

### Decisions taken, so they are not re-litigated

- **Copy is unchanged.** Section heading, intro, all three summaries and proofs
  stay exactly as they are in `lib/site.ts`. The only new text is the word "Live",
  which is existing data.
- **CommerceOS and MarketingOS stay unlinked**, as they are today. Their `href`s
  exist and the footer already points at them, so linking would not be new dead
  ground — but it is a separate decision from this layout change.
- **Section stays light.** See above: it is the only light punctuation in a
  dark→light→dark run.

## Review — footer word reveal now replays on scroll-out (2026-07-29)

The three disciplines now un-reveal when the footer leaves view, so scrolling back
in replays the build. Consistent with the rest of the site's motion: `CountUp` and
the footer's full-stop dot already reverse on scroll-out.

Both changes in `components/motion/WordReveal.tsx`:

- Dropped `once: true` from `useInView`. `animate` was already written as
  `y: inView ? "0%" : "-105%"`, so the reverse branch existed but was dead code —
  `once` latched `inView` permanently true. Removing it activated it.
- Made the transition direction-aware, which is the part that actually needed
  thought. framer-motion's `delay` is direction-agnostic, so reusing the entry
  transition would have each word wait out its stagger and then take another
  second to leave — ~1.8s of un-revealing playing behind you as you scroll up, and
  a scroll back in sooner than that catching words mid-flight, so the re-reveal
  starts from partial positions with the stagger smeared. Exit is now 0.4s,
  accelerating (`[0.4, 0, 1, 1]`), no stagger: a quick uniform retreat that parks
  every word before a plausible re-entry.

The observer stays on the wrapper, and that matters more now than before: the
inner span returns to fully-clipped on exit, so an observer on it would be
permanently unobservable after the first exit — the trap the component's comment
already warned about. Clip geometry and reduced-motion path untouched.

`tsc --noEmit` clean. **Not browser-verified** — replay is scroll-triggered in
both directions and needs a real scroll down-up-down past the footer to judge,
particularly whether the 0.4s exit reads as tidy or as a snatch. Two things to
watch there: the exit ease is a guess, and `once: false` means the threshold can
flip repeatedly if a scroll parks right on it (same exposure `CountUp` already
carries, but three words sliding is louder than a number ticking).

### Built

- [x] `.bleed-right` in `globals.css`, gated at `64rem`, with the derivation as
      its comment.
- [x] `components/motion/PlateReveal.tsx` — new. Owns the wipe, the drift and the
      `.grade-film` markup for one photographic plate.
- [x] `Products.tsx` rebuilt. All `border-radius`, `.material-glass`, `.img-frame`
      and `border` usages gone from the section; both placeholder `<Image>`s gone.
- [x] Two `DrawRule` hairlines instead of a vertical divider, as planned.

### Changed during review, on request

- **The "Live" badge came out.** It went in as a `.node-dot` + `.eyebrow` marker
      (finding 3 in the original diagnosis) and was removed on sight. `status`
      stays in `lib/site.ts`, unrendered, as it was before.
- **"Explore the product" is now a green button** — `.btn btn-primary`, not a new
      class: that class is *already* a flat Deep Forest fill with a Warm Chalk
      label, so the green button the section wanted is the one the site had.
      This is its first use on a **light** field, which makes the note on the class
      in `globals.css` ("every `.btn-primary` sits on a dark field") out of date.
      It still holds up: Deep Forest is 8.3:1 on the paper canvas, so for the first
      time the pill reads as a shape by its own fill rather than by its label, and
      the label keeps the 7.7:1 the class was measured for. Verified computed:
      `rgb(45, 82, 61)` on `rgb(245, 241, 232)`.
      The pill's radius is now the only curve in a section whose whole premise is
      square corners. Kept deliberately — the no-radius rule is about panels, and
      breaking the button system to honour it would cost more than it buys.
- **The intro sentence is removed, temporarily.** It was reported as messy and
      space-hungry. Measured: the h2 is 128px (two lines at 64.1px leading) and the
      sentence added ~100px beneath it — a ragged two-line block under a ragged
      two-line heading. It was first moved *beside* the heading as a bottom-aligned
      standfirst, which measured **128px for the whole row** — the sentence cost
      nothing — and then pulled entirely on request. The masthead recipe is
      recorded in a comment in `Products.tsx` so restoring it is one step, and the
      note explains why the track has to be `auto` rather than `1fr`.
- The heading itself was left alone: "AI blueprints." orphaning to line two was
      confirmed as wanted.

### Verified

- **The bleed identity holds on both branches.** At the real viewport (1080, where
  the shell is viewport-wide and the auto margin is 0) `margin-right` computes to
  exactly `-48px` and the grid's right edge lands on 1080 — `gapToEdge: 0.00`.
  The auto-margin branch — the one that governs every viewport above 1248px — was
  exercised by capping `.shell` narrower at the real viewport, which keeps `%` and
  `vw` in the same coordinate space: at caps of 50/40/34rem the predicted
  `-(autoMargin + P)` came out −188 / −268 / −316 and the computed
  `margin-right` matched **exactly**, with `gapToEdge: 0.00` every time.
- Square corners: computed `border-radius` is `0px` on every `article`, the
  `.grade-film` wrapper and the `<img>`. The button keeps its pill.
- The two hairlines measure 460px each at x=48 and x=572 — 460 + 64 gap + 460 =
  984, the full shell content width, symmetric.
- No horizontal overflow introduced. The only element past the viewport edge is
  the hero's pre-existing `.marquee-track` (`w-max`), which is why
  `body.scrollWidth` reads 16px over; nothing in Products contributes.
- Plate geometry: 528×422 at 1080 (5/4 at `lg`), right edge exactly on 1080.

### Not verified, and why

**The motion timing has not been observed running.** The automation tab reports
`visibilityState: hidden` and **rAF is completely dead — 0 frames in 1200ms**,
measured, so Lenis cannot scroll and no tween can advance. React does hydrate
(the h1 has text), which is a new wrinkle: this is the *fourth* costume of the
trap already recorded three times in this document, and it now presents as
"hydrated but frozen" rather than "not hydrated".

Two new details worth keeping, because they cost real time here:

1. **Forcing tweens must happen AFTER scrolling, not before.** framer-motion's
   `whileInView` uses IntersectionObserver, which fires on scroll *without* rAF.
   Forcing the end state and then scrolling let IO re-write every opening keyframe
   and start tweens that can never advance — which renders as washed-out copy, a
   sage-coloured button (Deep Forest at partial opacity) and a 23%-revealed plate.
   All three look exactly like layout bugs and are not.
2. **Inline styles lose to framer-motion; `!important` wins.** v12 drives
   opacity/transform/clip-path through the **Web Animations API**, whose effect
   stack overrides inline style — so `el.style.opacity = '1'` silently does
   nothing. `document.getAnimations().forEach(a => a.finish())` works, and an
   `!important` author declaration outranks animations in the cascade. Note
   `cancel()` is NOT the same: it drops the effect and reverts to the `initial`
   keyframe, i.e. it *hides* a `Reveal`.

Also learned, as a dead end to not repeat: **CSS `zoom` cannot simulate a wider
viewport.** `100vw` does not respond to it in this Chrome (verified with a `100vw`
probe as a control), so a zoom test compares a zoomed `%` against an unzoomed
`vw` and reports a positive `margin-right` — a convincing false failure. Real page
zoom does scale the layout viewport, so there is no product implication.

### Open

- The animation set — the clip-path wipe, the `WordReveal`, the drift's direction
  and amount — needs one pass in a real, visible browser. Everything static about
  the section is measured; nothing about its timing is.
- `resize_window` reports success but does not change `innerWidth` (the window has
  `outerWidth: 0`, i.e. it is not a foreground window), so per-width visual checks
  at 1280/1440/1920 were done by computation rather than by eye.
- `.bleed-right` assumes `%` and `vw` share a coordinate space. True for real
  viewports and for page zoom; not true under a CSS `zoom` on an ancestor. Nobody
  is likely to hit this, but the class is now a shared utility, so it is written
  down.
- The note on `.btn-primary` in `globals.css` still says every use sits on a dark
  field. Left as-is rather than rewritten mid-round; it wants updating next time
  that file is open.
