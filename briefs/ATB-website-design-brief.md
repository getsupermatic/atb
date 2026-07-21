# ATB — Website Design & Build Brief

**Client:** ATB · *at the beyond.*
**Project:** Marketing website (design + front-end build)
**Prepared for:** Agentic development team
**Version:** 1.0 · Date: 20 July 2026
**Status:** Ready for build. Final copy supplied separately (see §10).

---

## 0. How to read this brief

This document is written to be executed by an autonomous/agentic development team. It is intentionally specific about **look, feel, behaviour and structure**, and prescriptive about the stack (§8). Where a value is a design token, use the token — do not hard-code hexes or magic numbers in components. Where a section says **must**, treat it as acceptance criteria. Where it says **should**, treat it as strong preference with room for judgement.

Reference sites are cited throughout as behavioural targets, not visual ones. We want the *interaction quality* of those sites expressed through the ATB brand — never a clone.

---

## 1. The company, in one paragraph

ATB (*at the beyond.*) is an **AI-native product studio**. We build intelligent products and systems that operate *beyond the obvious* — where technology, creativity and human impact move forward together. Founded 2025, global, focused on AI-native systems. The website exists to establish authority, communicate the offer, showcase the products (FrontlineOS, CommerceOS, MarketingOS), explain how we engage, publish editorial insight, and generate qualified enquiries.

**Positioning line (hero):** *Intelligent systems. Human impact. Beyond.*

**Voice:** intelligent, human, tactile, restrained. Premium 1970s science/technology magazine reinterpreted for a contemporary AI studio — not glossy, not cinematic, not cyberpunk.

---

## 2. Brand foundations

### 2.1 Logo & wordmark

- Full wordmark: **ATB** monogram + lockup **“at the beyond.”** with a **lime accent dot** (the full stop / node).
- On load, the logo animates from the fully written-out name to the monogram (see §5.1).
- Maintain clear space around the logo equal to the cap-height of the “A”. Never recolour outside the approved palette (teal on cream, cream on teal/petrol).
- **Brand icon idea (secondary mark / favicon / loader):** *an orbit in motion* — an elliptical ring with a lime node at the centre and small nodes travelling the ring. Concept: systems in balance, intelligence at the centre, progress beyond the frame. Use this motif for the loader, favicon, and as a subtle recurring graphic device.

### 2.2 Colour system

Primary palette carries the brand; secondary tones are **soft supports** for diagrams, materials, UI states and photographic treatments. Target usage ratio across the site is roughly **60% primary base (cream + teal) / 30% secondary supports / 10% lime accent**. Lime is an accent only — never a background field, never body text.

| Token | Hex | Name | Use |
|---|---|---|---|
| `--color-teal` | `#295F66` | Deep teal / primary | Primary brand, headings, dark UI base, authority |
| `--color-cream` | `#F5F1E8` | Cream / canvas | Default page background, warm editorial base |
| `--color-petrol` | `#163F45` | Dark petrol | Dark-mode base, super-footer, deep sections |
| `--color-aqua` | `#A9CFCA` | Pale aqua | Soft support, diagram fills, hover tints |
| `--color-powder` | `#9CB9CC` | Powder blue | Soft support, diagram fills, glass tints |
| `--color-sage` | `#B7C5AE` | Soft sage | Soft support, diagram fills |
| `--color-lime` | `#C6D64D` | Lime accent | CTAs, active states, the logo dot, orbital nodes, key stats |

Define these as CSS custom properties / Tailwind theme tokens and derive tints/shades programmatically. Provide semantic aliases (`--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--accent`, `--border`) mapped to the raw tokens so dark sections can remap cleanly.

### 2.3 Material families

Four reusable visual “materials”. Build each as a component/utility so it can be applied consistently.

1. **Duotone halftone** — printed dot pattern rendered between teal, cream and lime. Used on photography and hero treatments.
2. **Print grain** — loose, tactile texture over cream fields. This is the subtle **parallax background texture** (see §5.4).
3. **Iridescent glass** — soft, luminous, frosted surfaces in restrained tones (aqua/powder/sage). Used for cards, layered “blueprint” visuals, and glassy nav.
4. **Smoked glass** — darker translucent material for dark-mode sections and the super-footer.

### 2.4 Photography / imagery direction

**Style:** *Retro-computational editorial.* Duotone editorial photography with visible halftone grain, archival print texture and subtle orbital graphics. Human, architectural and technical subjects, tightly cropped, treated in a restrained teal-and-cream palette with small lime accents for a future-retro scientific feel.

- Subjects: close crops of **faces, hands, architecture and machinery** — technology as part of human and physical environments.
- One main subject in focus, tightly cropped, quiet background, no unnecessary secondary elements.
- **Avoid:** generic office stock, humanoid robots, obvious AI clichés, glossy/cinematic/cyberpunk looks.
- All imagery passes through the duotone/halftone treatment for consistency. Provide an image-treatment guideline in the design system so future images match.

### 2.5 Typography

*(If a typeface is not yet locked, use this as the intent and confirm licences before build.)*

- **Display / headings:** a clean, slightly condensed geometric/grotesque sans (matches the “The colour scheme” / “Material Families” headings). Tight leading, sentence case, generous size jumps.
- **Body:** a highly legible humanist sans at comfortable measure (60–75 characters).
- **Mono / labels:** a monospace or tracked-out uppercase sans for the small “01 IDENTITY / BRAND OVERVIEW” eyebrow labels — this tracked-uppercase micro-label is a signature device; use it for section eyebrows.
- Establish a modular type scale as tokens (`--text-xs` … `--text-6xl`). Headings in teal on cream; cream on dark sections.

---

## 3. Design principles (the bar to hit)

1. **Restrained, editorial, premium.** Lots of cream breathing room. Type and imagery do the work. Resist decoration.
2. **Tactile, not digital-slick.** Grain, halftone and print texture keep it human.
3. **Motion with meaning.** Every animation should reinforce the idea of *systems in motion / beyond the frame* — never gratuitous.
4. **Fast and accessible first.** Motion is an enhancement layered on a solid, accessible, performant base (§8–9).

---

## 4. Global layout & navigation

### 4.1 Navigation bar — behaviour target: **Valliance** (valliance.ai)

- A **contained, glassy nav bar** (iridescent-glass material, backdrop blur, subtle border, floating with margin from the viewport edges — not full-bleed edge-to-edge).
- **Scroll-aware:** hides on scroll **down**, reveals on scroll **up** (with a small threshold and easing so it doesn’t flicker). Always visible at the very top of the page.
- Contents: logo (left), primary nav (centre/right), a single lime **“Contact us”** CTA pill (right) with the lime node dot.
- **Mobile:** collapse to logo + hamburger; nav opens as a full-height glassy panel/overlay with large tap targets and the same scroll-aware show/hide logic. Confirm 44px minimum touch targets.

### 4.2 Primary navigation (aligned to sitemap in §7)

`Who we are` · `What we do` · `How we work` · `Insights` · `Careers` — plus the persistent **Contact us** CTA. “What we do” may expose a lightweight dropdown/mega-panel to the three products (FrontlineOS · CommerceOS · MarketingOS).

### 4.3 Page shell

- Default background: **cream** with the subtle parallax print-grain texture (§5.4).
- Consistent max content width (e.g. ~1200–1280px) with generous gutters; full-bleed allowed for hero, feature panels and the super-footer.
- Dark sections (petrol/smoked glass) used intentionally to punctuate the scroll rhythm.

---

## 5. Motion & interaction specification

This is the heart of the brief. Build motion as a **layer**: everything must be usable and legible with motion disabled. Honour `prefers-reduced-motion` (§9). Recommended tooling in §8.

### 5.1 Logo load animation — behaviour target: **Anthropic** (anthropic.com)

- On initial page load, the logo appears **fully written out — “at the beyond.”** — then **quickly reduces to the “ATB” monogram** that lives in the nav.
- Smooth, quick, confident (target ~0.8–1.2s total, with the reduction happening in the back half). Easing: ease-out / custom cubic-bezier, not linear.
- Runs once per session (not on every route change). Provide a non-animated fallback for reduced-motion and for no-JS.
- Consider tying the lime dot to the orbit-icon motif as the pivot of the animation.

### 5.2 Feature panel morph on scroll — behaviour target: **Anthropic**

- A hero/feature block that begins as a **rounded-corner contained card** and, on scroll, **expands to a full-width (edge-to-edge) rectangle** — corners straightening, margins collapsing, as it becomes the focal panel. Reverse gracefully on scroll back.
- Scroll-linked (progress-driven), not just a triggered play-once. Keep it buttery on mid-range hardware.

### 5.3 Parallax panels — behaviour target: **Reflow** (reflow.ai)

- Content **panels/cards scroll in from the left and right** as they enter the viewport (opposing directions create the layered, kinetic editorial feel), settling into place with easing.
- Use for: the “Blueprints”, the layered “blueprint / layered intelligence” visual, product feature rows, engagement models. Alternate entry direction down the page for rhythm.
- Depth via **layered speeds** — foreground elements move slightly faster than background texture.

### 5.4 Cream textured parallax background

- The **cream background carries the print-grain / halftone texture**, moving as a **subtle parallax** as the user scrolls down the page. Must be *quiet* — texture and movement both understated; it should register as atmosphere, not decoration.
- Implement performantly (transform-based, GPU-friendly; avoid repaint-heavy background-position animation). Reduce or disable on low-power devices and under reduced-motion.

### 5.5 General scroll behaviour

- Smooth, inertia-style scrolling (e.g. Lenis) tying the parallax and scroll-linked animations to a single scroll source for consistency.
- Section reveals: gentle fade/slide-up on enter (staggered for groups). Subtle, editorial — not bouncy.
- Optional: orbital-node accents (the brand icon motif) drifting subtly in hero/section backgrounds using the lime accent.

### 5.6 Motion tokens

Define shared tokens so motion feels like one system: durations (`--dur-fast` 150ms, `--dur-base` 300ms, `--dur-slow` 600ms), easings (standard, entrance, exit), and parallax depth multipliers. Reuse everywhere.

---

## 6. Signature components

- **Glassy scroll-aware nav** (§4.1).
- **Hero** — headline “Intelligent systems. Human impact. *Beyond.*”, sub-copy, dual CTA (primary lime pill + secondary outline), stat cards, trusted-by logo strip (e.g. Heathrow, Coca-Cola, Unilever, Toyota + partners), duotone orbital hero image. Feeds the §5.2 morph.
- **Stat cards** — large figure + label (e.g. *23 projects delivered · 99.9% uptime · 4.8/5 satisfaction*). Lime used for emphasis.
- **Blueprint / layered-intelligence visual** — stacked iridescent-glass layers (Experience / Intelligence / Data / Foundation) with connector lines and labels; animates via §5.3.
- **Product cards** (FrontlineOS · CommerceOS · MarketingOS) — icon, name, one-liner, status/tag, link to product detail.
- **Engagement-model cards** (Subscribe & Deploy · Forward Deploy · Frontier Advisory).
- **Insight/article card** — duotone thumbnail, eyebrow label, title, meta; article pages support **Share** and **Download .md** (§7).
- **Email capture / insight sign-up** — used mid-page and in the super-footer.
- **Chatbot-style enquiry** input for Contact (§7).

---

## 7. Sitemap, information architecture & page specs

Full multi-page site. Copy supplied separately (§10); build the structure below and slot copy in.

### 7.1 Home
Hero (§6) → what-we-do summary (the offer) → Blueprints → FrontlineOS spotlight → product trio → how-we-work summary → selected insights → trusted-by / stats → super-footer. This is the showcase page for the §5 motion set.

### 7.2 Who we are
Beliefs / principles; the team (support **two states: “stealth” and “full”** team reveals — build so profiles can be hidden/blurred or shown per a flag); track record; platform partners.

### 7.3 What we do
The offer, framed as **Build & Deploy** and **Partner & Transform**; the **Blueprints**; **FrontlineOS spotlight**.

### 7.4 Product detail pages
Dedicated pages for **FrontlineOS**, **CommerceOS**, **MarketingOS** — consistent template: hero, problem/solution, capabilities, layered-intelligence visual, proof, CTA.

### 7.5 How we work
The three engagement models — **Subscribe & Deploy**, **Forward Deploy**, **Frontier Advisory** — and **ATBOS**. Comparison/selector component helps users find the right model.

### 7.6 Insights
Editorial index (filterable) + article template. Articles support **Share** and **Download .md**. Email **sign-up** present on index and articles.

### 7.7 Careers
Principles + open roles (role list → role detail). Structure roles as data so they’re easy to add/remove.

### 7.8 Contact
**Chatbot-style enquiry** interface + email capture. Clear routing/expectations; accessible form semantics; spam protection.

### 7.9 Footer / Legal
Super-footer (§7.10) plus legal pages: **Responsible AI · AI Transparency Policy · Privacy · Terms · Cookies** (+ cookie consent mechanism).

### 7.10 Super-footer (deep, statement footer)

A **deep, dark super-footer** (petrol / smoked-glass material) that acts as a closing statement:

- **Statement quote** — large, editorial brand statement (e.g. a “beyond the obvious” line).
- **Insight sign-up** — email capture with clear value prop and success/error states.
- **Footer navigation** — grouped links to all primary sections + product pages + legal.
- **Social links** — **LinkedIn** and **X**.
- Logo (monogram), copyright, and legal links (Responsible AI, AI Transparency Policy, Privacy, Terms, Cookies).
- Optional subtle orbital motif / lime accents; keep it calm and premium.

---

## 8. Technical stack & architecture

- **Framework:** Next.js (App Router) + React + TypeScript. SSR/SSG for marketing pages; static-first with incremental regeneration for Insights.
- **Styling:** Tailwind CSS with the brand tokens (§2.2) wired into the theme, plus CSS custom properties for runtime theming (light cream default; dark petrol sections).
- **Animation:**
  - **GSAP + ScrollTrigger** for scroll-linked sequences (§5.2 morph, §5.3 parallax panels, pinning).
  - **Lenis** for smooth/inertia scroll as the single scroll source (§5.5).
  - **Framer Motion** for component-level enter/exit, nav show/hide, and micro-interactions.
  - Choose one primary scroll library and keep GSAP/Framer responsibilities cleanly separated to avoid jank.
- **Content:** model Insights, roles, products and team as structured content (headless CMS or MDX/Markdown in-repo). Insights must round-trip to **.md** to support the Download-.md feature.
- **Forms:** Contact + email sign-up via a serverless route + provider (e.g. an ESP for sign-ups, an inbox/CRM for enquiries). Include validation, honeypot/rate-limit, success/error states.
- **Hosting/deploy:** Vercel or equivalent; preview deployments per PR.
- **Assets:** `next/image` for all imagery; pre-generate duotone/halftone treatments where possible; provide the print-grain texture as an optimised, tileable asset.

---

## 9. Performance, accessibility & quality bar

**Performance (must):** Lighthouse ≥ 90 across Performance/Accessibility/Best-Practices/SEO on the homepage. Core Web Vitals in the “good” band (LCP < 2.5s, CLS < 0.1, INP < 200ms). Motion must not degrade scroll performance below ~60fps on mid-range devices. Lazy-load below-the-fold media; keep JS payload lean (defer/segment animation libs).

**Accessibility (must):** WCAG 2.1 AA. Honour `prefers-reduced-motion` — disable parallax, scroll-linked morphs and the logo animation, keeping full functionality. Verify colour contrast (note: **lime on cream and lime on white fail contrast for text** — lime is for accents/graphics/large non-text UI only; never body copy). Full keyboard operability, visible focus states, semantic landmarks, alt text on all imagery, accessible forms and the chatbot-style enquiry.

**Responsive (must):** mobile-first; verify at 360 / 768 / 1024 / 1440+. Nav, parallax and the feature-morph all have defined mobile behaviours (§4.1, §5). Reduce/disable heavy parallax on small/low-power devices.

**Browser support:** current Chrome, Safari, Firefox, Edge; iOS/Android Safari & Chrome.

---

## 10. Copy, assets & handoff

- **Copy:** full website copy is being supplied to the development team separately. Build to the structure in §7 and slot supplied copy per section. Where copy is pending, use the mockup lines as placeholders (e.g. hero: *“Intelligent systems. Human impact. Beyond.”*) and mark clearly.
- **Assets to be provided by ATB:** logo files (SVG, incl. monogram + full lockup), brand icon/orbit mark, print-grain & halftone texture sources, approved photography (or art-direction to source), typeface licences, partner/trusted-by logos.
- **Deliverables from the dev team:**
  1. Design tokens + Tailwind theme + documented component library.
  2. Fully built, responsive, accessible Next.js site per §7.
  3. Motion implemented per §5 with reduced-motion fallbacks.
  4. CMS/content models + Insights .md round-trip.
  5. Working forms (contact + sign-up) wired to providers.
  6. Deployment with preview environments + a short README/runbook.

---

## 11. Reference sites (behaviour, not visuals)

- **Anthropic** (anthropic.com) — logo write-out → reduce animation (§5.1); rounded card → full-width rectangle morph on scroll (§5.2).
- **Valliance** (valliance.ai) — contained glassy nav, scroll-aware hide/reveal, mobile treatment (§4.1).
- **Reflow** (reflow.ai) — parallax panels sliding in from left/right (§5.3).

Express all of the above through the ATB brand (§2) — restrained, editorial, tactile. Never clone.

---

## 12. Acceptance checklist

- [ ] Logo write-out → ATB reduction on load, once per session, reduced-motion fallback.
- [ ] Glassy, contained, scroll-aware nav (hide down / reveal up) + mobile panel.
- [ ] Feature block morphs rounded-card → full-width rectangle on scroll.
- [ ] Panels parallax in from left/right; layered depth speeds.
- [ ] Cream background carries subtle print-grain parallax texture.
- [ ] Deep super-footer: statement quote + insight sign-up + footer nav + LinkedIn & X + legal.
- [ ] All pages in §7 built with supplied copy; Insights support Share + Download .md.
- [ ] Contact chatbot-style enquiry + email capture working.
- [ ] Palette/tokens applied; lime used as accent only; contrast verified.
- [ ] Lighthouse ≥ 90; WCAG 2.1 AA; `prefers-reduced-motion` honoured; responsive at all breakpoints.
