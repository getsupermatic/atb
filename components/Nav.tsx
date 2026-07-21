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
 * Contained, scroll-aware navigation (§4.1). At the very top the nav sits
 * bare over the hero; the glassy rounded panel builds in on first scroll
 * (Valliance-style). On first load the logo writes out "at the beyond." and
 * collapses to "ATB." in place, then the links fade in. Hides on scroll down,
 * reveals on scroll up. Mobile → full glassy panel.
 */
export default function Nav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open) return;
    if (y > prev && y > 160) setHidden(true);
    else setHidden(false);
  });

  const revealStyle = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(-4px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
    pointerEvents: (revealed ? "auto" : "none") as "auto" | "none",
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
      animate={{ y: hidden && !reduce ? "-140%" : "0%" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <nav
        className="relative mt-3 w-[min(78rem,calc(100%-1.5rem))] rounded-[1.5rem]"
        aria-label="Primary"
      >
        {/* Glassy panel — always visible, with a soft shadow once scrolled */}
        <div
          aria-hidden
          className="glass-nav absolute inset-0 rounded-[1.5rem]"
          style={{
            boxShadow: scrolled ? "0 18px 45px -30px rgba(22,63,69,0.6)" : "none",
            transition: "box-shadow 0.45s ease",
          }}
        />

        <div className="relative flex items-center justify-between py-2.5 pl-5 pr-2.5">
          <Link
            href="/"
            className="relative flex items-center py-1"
            aria-label="ATB. — home"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <Logo
              variant="mono"
              style={{ height: 26, opacity: showFull ? 0 : 1, transition: "opacity 0.35s ease" }}
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
                  className="text-[0.9rem] font-medium text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--heading)]"
                  style={{ fontFamily: "var(--font-display)" }}
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
                  className="absolute left-0 h-0.5 w-5 rounded bg-[color:var(--heading)] transition-transform"
                  style={{ top: open ? "5px" : 0, transform: open ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-5 rounded bg-[color:var(--heading)] transition-transform"
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
            className="glass-nav fixed inset-x-3 top-20 rounded-[1.5rem] p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center text-lg font-medium text-[color:var(--heading)]"
                    style={{ fontFamily: "var(--font-display)" }}
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
