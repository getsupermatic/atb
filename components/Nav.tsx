"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { primaryNav } from "@/lib/site";
import Logo from "./brand/Logo";

/**
 * Scroll-aware navigation (§4.1, behaviour target: Valliance). Three states:
 *
 *   top     — at the very top: no container at all; logo, links and CTA sit
 *             bare over the hero
 *   hidden  — scrolling down: the nav slides up and away, and stays away for
 *             as long as you keep going down
 *   docked  — scrolling back up: it returns as a full-width glass bar
 *
 * Because the header is fully off-screen in `hidden`, the Warm Chalk → Ink Black
 * foreground flip happens out of sight — no contrast flash mid-transition.
 * On first load the logo writes out "at the beyond." and collapses to "ATB." in
 * place, then the links fade in. Mobile → the same bar plus a dropdown panel.
 */
type Mode = "top" | "hidden" | "docked";

export default function Nav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [mode, setMode] = useState<Mode>("top");
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"full" | "mono">("full");
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const showFull = phase === "full" || hovered;

  useEffect(() => {
    if (reduce || sessionStorage.getItem("atb-intro")) {
      setPhase("mono");
      setRevealed(true);
      return;
    }
    const t1 = setTimeout(() => setPhase("mono"), 780);
    const t2 = setTimeout(() => {
      setRevealed(true);
      sessionStorage.setItem("atb-intro", "1");
    }, 1040);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  // A reload can restore a mid-page scroll position, where the bare Warm Chalk
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

  const revealStyle = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(-4px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
    pointerEvents: (revealed ? "auto" : "none") as "auto" | "none",
  };

  return (
    <motion.header
      className={`nav-bar fixed inset-x-0 top-0 z-50 ${docked ? "nav-scrolled" : ""}`}
      animate={{ y: mode === "hidden" ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Full-width glass bar — absent at the top of the page, slides in when docked */}
      <div aria-hidden className="nav-pane" />

      <nav aria-label="Primary">
        {/* .shell keeps the row aligned with the page content either side */}
        <div className="nav-row shell relative flex items-center justify-between">
          <Link
            href="/"
            className="nav-fg relative flex items-center py-1"
            aria-label="ATB — home"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            {/* The monogram carries more optical size than the lockup at the
                same height, so it runs a few px taller — the two never show at
                once, they crossfade. */}
            <Logo
              variant="mono"
              style={{ height: 31, opacity: showFull ? 0 : 1, transition: "opacity 0.35s ease" }}
            />
            <AnimatePresence>
              {showFull && (
                <motion.span
                  key="full"
                  aria-hidden
                  className="absolute left-0 whitespace-nowrap"
                  initial={{ opacity: 0, filter: "blur(3px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.3 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Logo variant="full" style={{ height: 26 }} />
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex" style={revealStyle}>
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

          <div className="flex items-center gap-2" style={revealStyle}>
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
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
