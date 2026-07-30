"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { primaryNav } from "@/lib/site";
import { EASE } from "@/lib/motion";
import Logo from "@/components/brand/Logo";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Scroll-aware navigation (§4.1, behaviour target: Valliance). Three states:
 *
 *   top     — at the very top: no container at all; logo, links and CTA sit
 *             bare over the hero
 *   hidden  — scrolling down: the nav slides up and away, and stays away for
 *             as long as you keep going down
 *   docked  — scrolling back up: it returns as a full-width glass bar
 *
 * Because the header is fully off-screen in `hidden`, the Cream → Ink
 * foreground flip happens out of sight — no contrast flash mid-transition.
 * On load the logo holds "at the beyond." written out, then collapses to "atb." —
 * see HOLD_MS. The links and CTA are present throughout and slide left with the
 * collapse. Mobile → the same bar plus a dropdown panel.
 */
type Mode = "top" | "hidden" | "docked";

/**
 * How long the lockup sits fully written out before it collapses. The collapse
 * itself then takes 520ms (Logo's own transition), and the links ride that same
 * 520ms leftward because the logo is in flow — see the row below.
 *
 * It plays on every full page load, deliberately, and NOT once per session. A
 * sessionStorage gate cannot work here: the value is unreadable during SSR, so
 * the server always renders the lockup expanded, and on a gated load the page
 * painted written-out and then snapped shut the instant the effect hydrated —
 * the hold never ran and the collapse read as a flash. Client-side route changes
 * don't remount it, because the header lives in the layout.
 */
const HOLD_MS = 2000;

/**
 * The current-page marker: a hairline under the label in the nav's own foreground
 * colour, plus `aria-current="page"`.
 *
 * Deliberately NOT a colour change to Copper, which is what hover uses. The bar is
 * transparent at the top of a page and the careers hero it sits over is a Green
 * field, where Copper is 2.73:1 — the one label that must be legible would be the
 * least legible thing in the row. An underline in `currentColor` inherits whatever
 * the bar has resolved its foreground to, so it cannot be wrong on any field.
 */
const ACTIVE_LINK = "underline decoration-1 underline-offset-[6px]";

export default function Nav() {
  const reduce = usePrefersReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  /**
   * Prefix match, not equality, so a nested route marks its section — /insights/an
   * -article lights "Insights". The trailing slash is what stops /careers-of-old
   * matching /careers. Product pages live at /products/… rather than under
   * /what-we-do, so they mark nothing; give them a `section` on the nav data if
   * they should ever light it.
   *
   * Anchor items never light. Most of the nav points into the homepage while the
   * dedicated pages are unbuilt, and marking all three "current" the moment you are
   * on the homepage would say nothing. Tracking which section is in view would mean
   * a scroll-spy, which is a real feature rather than a fallback — and it should
   * arrive with those pages, not before them.
   */
  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  /**
   * On the homepage, a `/#section` item is rewritten to a bare `#section` so Lenis's
   * `anchors` handling takes the click (see SmoothScroll). Left as `/#section` it is
   * a Next.js navigation to the route you are already on, which sets the scroll
   * position itself — and that fights Lenis's own animation, the exact problem the
   * `anchors` option exists to solve. Off the homepage it stays a real href, so it
   * navigates home and lands on the section.
   */
  const resolveHref = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;
  const [mode, setMode] = useState<Mode>("top");
  const [open, setOpen] = useState(false);
  /** True while the opening hold is still running — see HOLD_MS. */
  const [holding, setHolding] = useState(true);
  const [hovered, setHovered] = useState(false);
  /**
   * Derived rather than stored. Under reduced motion the lockup starts collapsed
   * instead of the effect below immediately setting it that way, which would be a
   * synchronous setState in an effect — a cascading render, and the reason React's
   * lint flags the pattern. Hover still expands it either way; Logo's own
   * transition is 0ms under reduced motion, so it snaps rather than animating.
   */
  const showFull = (holding && !reduce) || hovered;

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setHolding(false), HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // Landing mid-page has to dock the bar. Bare, the treatment is Cream with no pane
  // behind it, which is invisible over the light sections — and there are two ways
  // to arrive mid-page: a reload restoring a scroll position, and a cross-page
  // anchor like /#what-we-think from the careers page.
  //
  // This covers the case where the position is already set by the time React
  // hydrates. The case where it lands AFTER hydration is handled in the scroll
  // handler below, which cannot tell a positional jump from a gesture on its own.
  //
  // This genuinely has to be an effect: window.scrollY does not exist during SSR,
  // so it cannot seed useState. It runs once on mount and is exactly the
  // "synchronise with an external system" case the rule exists to allow — but the
  // rule cannot tell that apart, so it is suppressed here rather than worked around.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.scrollY > 8) setMode("docked");
  }, []);

  /**
   * Whether a scroll position has been OBSERVED yet. Not the same as "has scrolled":
   * see the first-event guard in the handler below.
   */
  const observed = useRef(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) return; // don't move the bar out from under an open menu
    if (y <= 8) {
      observed.current = true;
      return setMode("top"); // back at the top → bare again
    }
    // Under reduced motion, skip the slide-away entirely and just stay docked.
    if (reduce) return setMode("docked");

    // The FIRST observed event on a page that is already scrolled well down did not
    // get there by scrolling: it is a reload restoring a position, or a /#section
    // arrival whose fragment scroll landed after hydration. `getPrevious()` is 0
    // simply because nothing has been observed yet, so the delta below would read as
    // one enormous downward scroll and hide the bar on arrival. Dock instead.
    //
    // Both conditions are needed. A real scroll from the top also has no previous
    // value, but its first event is a few pixels in, not a full viewport — so the
    // height test is what tells a jump from a gesture, and scrolling down from the
    // top still hides the bar as it should.
    if (!observed.current) {
      observed.current = true;
      if ((scrollY.getPrevious() ?? 0) === 0 && y > window.innerHeight) {
        return setMode("docked");
      }
    }

    const dy = y - (scrollY.getPrevious() ?? 0);
    if (Math.abs(dy) < 4) return; // ignore jitter, or the bar flickers
    setMode(dy < 0 ? "docked" : "hidden"); // reveal only on scrolling up
  });

  // The menu can only open from the docked bar (or pin it solid at the top).
  const docked = mode === "docked" || open;

  return (
    <motion.header
      className={`nav-bar fixed inset-x-0 top-0 z-50 ${docked ? "nav-scrolled" : ""}`}
      animate={{ y: mode === "hidden" ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: EASE.nav }}
    >
      {/* Full-width glass bar — absent at the top of the page, slides in when docked */}
      <div aria-hidden className="nav-pane" />

      <nav aria-label="Primary">
        {/* .shell keeps the row aligned with the page content either side */}
        <div className="nav-row shell relative flex items-center justify-between">
          <Link
            href="/"
            className="nav-fg relative flex shrink-0 items-center py-1"
            aria-label="ATB — home"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            {/* One logo carrying both states in a single set of paths, animating
                between them — not two wordmarks crossfading, which cannot read as
                letters expanding. The wrapper's width animates with it, so the
                link's own hover area grows to cover the revealed letters instead
                of collapsing the moment the cursor moves right.

                In flow, deliberately: the logo's own width transition IS the nav's
                layout animation. As the lockup writes out, the anchor grows and
                the links and CTA slide right; as it collapses they ride the same
                520ms back. Taking it out of flow (a fixed-width span with the logo
                absolute) would avoid the reflow but kill that gesture. The links
                shrink-wrap and the row is justify-between, so the movement is
                absorbed by the gaps — hence min-w-0 on the list. */}
            <Logo height={31} expanded={showFull} />
          </Link>

          <ul className="hidden min-w-0 items-center gap-7 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={resolveHref(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`nav-fg text-[0.9rem] font-medium transition-colors hover:text-[color:var(--accent-text)] ${
                    isActive(item.href) ? ACTIVE_LINK : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
              Get started
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span
                  className="absolute left-0 h-0.5 w-5 rounded bg-[color:var(--nav-fg)] transition-transform"
                  style={{ top: open ? "5px" : 0, transform: open ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-5 rounded bg-[color:var(--nav-fg)] transition-transform"
                  style={{ bottom: open ? "5px" : 0, transform: open ? "rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE.entrance }}
            className="nav-panel fixed inset-x-3 top-[5.25rem] rounded-[1.75rem] p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={resolveHref(item.href)}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`nav-fg flex min-h-[44px] items-center text-lg font-medium ${
                      isActive(item.href) ? ACTIVE_LINK : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4 w-full justify-center"
            >
              Get started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
