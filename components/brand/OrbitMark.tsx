/**
 * Orbit motif — the signature brand device (§2.1): an elliptical ring with a
 * lime node at its centre and small nodes travelling the ring. Used for the
 * loader, favicon and as a recurring ambient accent.
 */
type Props = {
  size?: number;
  className?: string;
  /** Animate the nodes travelling the ring (respects reduced-motion via CSS). */
  animated?: boolean;
  title?: string;
};

export default function OrbitMark({
  size = 48,
  className,
  animated = false,
  title,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {/* Two crossed elliptical rings — systems in balance */}
      <ellipse
        cx="50"
        cy="50"
        rx="44"
        ry="20"
        stroke="var(--color-teal)"
        strokeWidth="1.4"
        opacity="0.55"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="20"
        ry="44"
        stroke="var(--color-teal)"
        strokeWidth="1.4"
        opacity="0.35"
        transform="rotate(28 50 50)"
      />
      {/* Central lime node — intelligence at the centre */}
      <circle cx="50" cy="50" r="6" fill="var(--color-lime)" />
      {/* Travelling nodes */}
      <g className={animated ? "orbit-spin" : undefined} style={{ transformOrigin: "50px 50px" }}>
        <circle cx="94" cy="50" r="3" fill="var(--color-lime)" />
        <circle cx="6" cy="50" r="2" fill="var(--color-teal)" />
      </g>
    </svg>
  );
}
