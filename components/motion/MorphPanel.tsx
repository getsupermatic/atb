"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MORPH_TRIGGER } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Panel morph geometry. Mirrors --gutter and --panel-radius in globals.css; GSAP
 * animates these as inline styles, so it needs the literal values rather than the
 * custom properties. Keep the two in step.
 */
export const PANEL = {
  /** = --gutter. A contained panel sits on the shell's gutter. */
  pad: "clamp(1.25rem, 5vw, 3rem)",
  /** = --panel-radius */
  radius: "1.75rem",
  /** GSAP needs a unit to interpolate against `radius`; a bare 0 will not pair. */
  square: "0rem",
} as const;

/** A dimension to animate. `from` omitted means "start from the current value". */
type Span = { from?: string; to: string };

type MorphOptions = {
  pad: HTMLElement | null;
  card: HTMLElement | null;
  /** true: contained → full-bleed. false: full-bleed → contained. */
  open: boolean;
  /** Length in timeline units. Only the value RELATIVE to other tweens matters,
   *  because ScrollTrigger normalises the timeline across the whole runway. */
  duration?: number;
  position?: number;
  height?: Span;
  minHeight?: Span;
};

/**
 * Adds the pad + card morph to an existing timeline (brief §5.2): a rounded
 * contained card straightening to a full-bleed panel, or the reverse.
 *
 * Exported separately from the component below so ATBOS can put the same morph
 * on the front of its own much longer statement timeline. That matters: a second
 * ScrollTrigger for the morph would let the two drift apart from each other,
 * where one timeline cannot.
 *
 * `ease: "none"` throughout — the easing of a scrubbed timeline is the scroll
 * itself, and a curve on top of it reads as the panel lagging the cursor.
 */
export function morphPanelTweens(
  tl: gsap.core.Timeline,
  { pad, card, open, duration = 1, position = 0, height, minHeight }: MorphOptions,
) {
  const padFrom = open ? PANEL.pad : 0;
  const padTo = open ? 0 : PANEL.pad;
  const radiusFrom = open ? PANEL.radius : PANEL.square;
  const radiusTo = open ? PANEL.square : PANEL.radius;

  tl.fromTo(
    pad,
    { paddingInline: padFrom },
    { paddingInline: padTo, ease: "none", duration },
    position,
  ).fromTo(
    card,
    {
      borderRadius: radiusFrom,
      ...(height?.from ? { height: height.from } : {}),
      ...(minHeight?.from ? { minHeight: minHeight.from } : {}),
    },
    {
      borderRadius: radiusTo,
      ...(height ? { height: height.to } : {}),
      ...(minHeight ? { minHeight: minHeight.to } : {}),
      ease: "none",
      duration,
    },
    position,
  );

  return tl;
}

type Props = {
  /** true: contained → full-bleed. false: full-bleed → contained. */
  open: boolean;
  /**
   * Section height, and therefore the scroll distance the morph is spread over —
   * the extra height above 100vh IS the runway. Dropped entirely under reduced
   * motion, where there is no morph to scroll through and the runway would be
   * dead space below a static card.
   */
  runway: string;
  ariaLabel: string;
  className?: string;
  cardClassName?: string;
  cardStyle?: React.CSSProperties;
  height?: Span;
  minHeight?: Span;
  morphDuration?: number;
  /**
   * Chain extra tweens onto the same timeline — copy arriving partway through the
   * morph, for instance. Receives the timeline with the morph already on it.
   */
  extend?: (tl: gsap.core.Timeline) => void;
  children: ReactNode;
};

/**
 * A section whose panel morphs between contained and full-bleed as it is
 * scrolled through. Scroll-linked and reversible; static under reduced motion.
 *
 * The three-element structure is load-bearing and not incidental nesting:
 *
 *   section  the runway. Taller than the viewport, and its height is the
 *            scroll distance available to the morph.
 *   sticky   holds the panel still and centred while the runway passes.
 *   pad      animates the inline gutter. Separate from the card because
 *            padding on the card itself would inset its own background.
 *   card     animates radius and height. The visible panel.
 *
 * The inline styles on `pad` and `card` carry the morph's STARTING state, which
 * doubles as the resting appearance under reduced motion — so the static
 * fallback needs no separate styling.
 */
export default function MorphPanel({
  open,
  runway,
  ariaLabel,
  className = "",
  cardClassName = "",
  cardStyle,
  height,
  minHeight,
  morphDuration,
  extend,
  children,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const section = useRef<HTMLElement>(null);
  const pad = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, ...MORPH_TRIGGER },
      });
      morphPanelTweens(tl, {
        pad: pad.current,
        card: card.current,
        open,
        duration: morphDuration,
        height,
        minHeight,
      });
      extend?.(tl);
    }, section);

    return () => ctx.revert();
    // `height`/`minHeight`/`extend` are literals and closures defined inline by
    // callers, so they are new objects every render and cannot go in the deps
    // without re-running the timeline on each one. The morph geometry is fixed
    // for the life of a section, so `reduce` and `open` are the real inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, open]);

  return (
    <section
      ref={section}
      className={`relative ${className}`}
      style={reduce ? undefined : { height: runway }}
      aria-label={ariaLabel}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div
          ref={pad}
          className="w-full"
          style={{ paddingInline: open ? PANEL.pad : 0 }}
        >
          <div
            ref={card}
            className={`relative w-full overflow-hidden ${cardClassName}`.trimEnd()}
            style={{
              borderRadius: open ? PANEL.radius : PANEL.square,
              ...(height?.from ? { height: height.from } : {}),
              ...(minHeight?.from ? { minHeight: minHeight.from } : {}),
              ...cardStyle,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
