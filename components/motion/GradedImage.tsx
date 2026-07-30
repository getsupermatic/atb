import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

/**
 * A photograph under the house film grade — the tone map plus its grain and
 * vignette overlays.
 *
 * The three layers always travel together, so they live in one place. The grade
 * itself (saturation, gamma, black/white points) is an SVG filter referenced by
 * `.grade-film`; the recipe and the reasoning are in components/brand/FilmGrade.tsx.
 *
 * The wrapper must contain the image and NOTHING ELSE with text in it: the grain
 * blends in `overlay` and the vignette sits above, so any copy inside would be
 * graded and veiled along with the picture. Scrims and copy belong outside, as
 * siblings of this component.
 *
 * `children` exists for the one caller that needs a layer between the grade and
 * the image — PlateReveal wraps the image in its own over-sized panning box.
 */
type Props = {
  /** Omitted when `children` supplies the image instead. */
  src?: ImageProps["src"];
  alt?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
};

export default function GradedImage({ src, alt = "", sizes, priority, children }: Props) {
  return (
    <div className="grade-film">
      {children ??
        (src ? (
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ) : null)}
      <div aria-hidden className="grade-film-grain" />
      <div aria-hidden className="grade-film-vignette" />
    </div>
  );
}
