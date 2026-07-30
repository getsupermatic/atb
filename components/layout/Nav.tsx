"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
 * How long the lockup sits fully written out before it collapses; the collapse
 * itself then takes 520ms (Logo's own transition), and the links ride that same
 * 520ms leftward because the logo is in flow — see the row below.
 *
 * This runs on every page load, not once per session. It used to be gated on an
 * `atb-intro` sessionStorage key, but the gate is unreadable during SSR: the
 * server always rendered the lockup expanded, so on a gated load it painted
 * written-out and then snapped shut the moment the effect below hydrated — the
 * hold never ran and the collapse read as an instant flash. Playing it every
 * time is the honest version of the same gesture. Only full document loads
 * trigger it; the header lives in the layout, so client-side route changes don't
 * remount it.
 */
const HOLD_MS = 2000;

export default function Nav() {
  const reduce = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const [mode, setMode] = useState<Mode>("top");
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"full" | "mono">("full");
  const [hovered, setHovered] = useState(false);
  const showFull = phase === "full" || hovered;

  useEffect(() => {
    if (reduce) {
      setPhase("mono");
      return;
    }
    const t = setTimeout(() => setPhase("mono"), HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // A reload can restore a mid-page scroll position, where the bare Cream
  // treatment would be invisible over light content. Dock immediately in that
  // case rather than waiting for the first scroll event.
  useEffect(() => {
    if (window.scrollY > 8) setMode("docked");
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) return; // don't move the bar out from under an open menu
    if (y <= 8) return setMode("top"); // back at the top → bare again
    // Under reduced motion, skip the slide-away entirely and just stay docked.
    if (reduce) return setMode("docked");
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
            {/* One logo, not two. This used to crossfade a `mono` monogram
                against a `full` lockup — and the two were different typefaces in
                different cases (lowercase `atb.` against uppercase
                "AT THE BEYOND."), at different heights, dissolving through a
                blur. Nothing about that could read as the letters expanding.
                Logo now carries both states in one set of paths and animates
                between them; the wrapper's width animates with it, so the link's
                own hover area grows to cover the revealed letters instead of
                collapsing the moment the cursor moves right. */}
            {/* In flow, deliberately: the logo's own width transition is the
                nav's layout animation. As the lockup writes out the anchor grows
                and the links and CTA slide right; as it collapses they ride the
                same 520ms back. Taking it out of flow (a fixed-width span with
                the logo absolute) avoids the reflow but kills that gesture. The
                links shrink-wrap and the row is justify-between, so the movement
                is absorbed by the gaps — see min-w-0 on the list. */}
            <Logo height={31} expanded={showFull} />
          </Link>

          <ul className="hidden min-w-0 items-center gap-7 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-fg text-[0.9rem] font-medium transition-colors hover:text-[color:var(--accent-text)]"
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
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="nav-fg flex min-h-[44px] items-center text-lg font-medium"
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
