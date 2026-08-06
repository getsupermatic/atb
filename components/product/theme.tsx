"use client";

import { createContext, useContext, useMemo, useState } from "react";

/**
 * A theme SCOPE rather than a theme provider.
 *
 * The mode has to be settable on a subtree, not only on the document, for two
 * reasons. The reference route shows a light frame and a dark frame side by
 * side on one page, which a `:root`-only contract cannot express. And in the
 * real product an embedded surface — a kiosk view, a projected board in the
 * back office — may need to run dark inside a light shell.
 *
 * app/styles/product.css is written to match: its variable blocks are attribute
 * selectors, so they apply wherever the attribute is put.
 *
 * "system" is the absence of the attribute, not a third value — that is what
 * lets the `prefers-color-scheme` block in product.css take over. So the
 * wrapper renders no `data-theme` at all in that mode.
 */
export type Mode = "light" | "dark" | "system";

type Ctx = { mode: Mode; setMode: (m: Mode) => void };

const ThemeCtx = createContext<Ctx>({ mode: "system", setMode: () => {} });

export const useTheme = () => useContext(ThemeCtx);

export function ThemeScope({
  initial = "system",
  className,
  style,
  children,
}: {
  initial?: Mode;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>(initial);
  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeCtx.Provider value={value}>
      <div
        data-theme={mode === "system" ? undefined : mode}
        className={className}
        style={style}
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}
