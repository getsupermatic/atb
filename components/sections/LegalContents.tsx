"use client";

import { useEffect, useState } from "react";

export type Heading = { id: string; label: string; level: 2 | 3 };

/**
 * The rail beside a legal document — its own contents, not a way to other
 * policies (the footer's Legal column carries those). Each entry anchors to a
 * section, and the section you are reading is marked as you scroll.
 *
 * Anchor jumps are handled globally: Lenis intercepts `href="#id"` and offsets
 * by 112px, mirrored by the `scroll-margin-top` on `.prose h2` for the
 * reduced-motion path where Lenis is not running. See SmoothScroll.
 */
export default function LegalContents({ headings }: { headings: readonly Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  const [open, setOpen] = useState(false);

  // Which section is being read = the last heading whose top has passed under
  // the docked nav. Measured rather than observed: an IntersectionObserver only
  // fires at the edges of its band, so a section taller than the viewport leaves
  // nothing intersecting and the rail would go blank mid-section.
  // One rAF-throttled pass over a handful of elements, only while scrolling.
  useEffect(() => {
    const targets = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      // 240px, measured rather than picked: an anchored heading lands at 224px
      // (Lenis's -112 offset plus the matching `scroll-margin-top`), and the
      // section you just clicked has to read as the current one when it gets
      // there. Anything below this and the rail marks the section above.
      let current = targets[0].id;
      for (const target of targets) {
        if (target.getBoundingClientRect().top > 240) break;
        current = target.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  return (
    <nav
      className="border-b pb-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto lg:border-b-0 lg:pb-0"
      style={{ borderColor: "var(--border)" }}
      aria-label="On this page"
    >
      {/* Below lg the rail is not a rail — it is a block above the document, and
          eighteen sections' worth of it would bury the opening. So it collapses
          there and is always open from lg up, where it has its own column. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="eyebrow flex w-full items-center justify-between lg:hidden"
      >
        On this page
        <span aria-hidden className="text-base leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      <p className="eyebrow hidden lg:block">On this page</p>

      <ul
        className={`${open ? "flex" : "hidden"} mt-4 flex-col gap-0.5 border-l lg:flex`}
        style={{ borderColor: "var(--border)" }}
      >
        {headings.map((heading) => {
          const current = heading.id === active;
          return (
            <li key={heading.id} className="-ml-px">
              <a
                href={`#${heading.id}`}
                aria-current={current ? "location" : undefined}
                className={`block border-l-2 py-1 text-[0.85rem] leading-snug transition-colors ${
                  heading.level === 3 ? "pl-7" : "pl-4"
                } ${
                  current
                    ? "border-[color:var(--color-copper)] text-[color:var(--accent-text)]"
                    : "border-transparent text-[color:var(--text-muted)] hover:text-[color:var(--heading)]"
                }`}
              >
                {heading.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
