"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the visitor has asked for reduced motion.
 *
 * One hook, replacing the three patterns this codebase had grown: a bare
 * `window.matchMedia(…).matches` read inside an effect, framer-motion's
 * `useReducedMotion()`, and a hand-rolled useState/useEffect pair. They behaved
 * differently at the edges, which is the real problem — not the repetition.
 *
 * Built on `useSyncExternalStore`, which is the primitive for exactly this:
 *
 * - **SSR-safe.** Returns `false` on the server, so the markup React sends is
 *   the animated one and there is no hydration mismatch. Anyone who has asked
 *   for reduced motion gets the static version on the first client render.
 * - **Live.** Subscribes to the media query, so toggling the OS setting updates
 *   the page without a reload. The `matchMedia` read in an effect never did.
 * - **Always a boolean.** framer-motion's hook returns `boolean | null` (null
 *   until it has run on the client), which meant every caller was really
 *   branching on three states while looking like it branched on two.
 *
 * Note the polarity: `false` means "animate". A component that renders a static
 * fallback should read this as `if (reduce) return <plain />`.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

let query: MediaQueryList | null = null;

/** Lazy so the module can be imported during SSR, where `window` is absent. */
function mediaQuery() {
  if (!query) query = window.matchMedia(QUERY);
  return query;
}

function subscribe(onChange: () => void) {
  const mq = mediaQuery();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => mediaQuery().matches;
const getServerSnapshot = () => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
