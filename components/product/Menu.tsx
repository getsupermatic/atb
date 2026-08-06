"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * The popover behind every toolbar control that opens something — the store
 * switcher, notifications, theme and the account menu.
 *
 * One primitive rather than four, because the behaviour a menu has to get right
 * is the same in all four cases and is easy to get wrong once per copy:
 *
 *   · Escape closes it and returns focus to the trigger. Without the return,
 *     a keyboard user who opens and dismisses a menu is dropped at the top of
 *     the document.
 *   · A pointer press outside closes it — on `pointerdown`, not `click`, so the
 *     menu is gone before the press lands on whatever is underneath.
 *   · Only one menu is open at a time. They are siblings in a toolbar and
 *     nothing else coordinates them, so opening one broadcasts on a shared
 *     event and the others stand down.
 *   · The trigger carries `aria-expanded` and `aria-haspopup`, and the panel is
 *     labelled by it.
 *
 * The trigger is a render prop so each control keeps its own shape — an icon
 * button, a switcher, an avatar — while the wiring stays here. The panel is
 * positioned by `.p-menu`, absolutely, against the wrapper.
 */
const CLOSE_OTHERS = "p-menu:close-others";

type TriggerProps = {
  id: string;
  "aria-expanded": boolean;
  "aria-haspopup": "menu";
  "aria-controls": string;
  onClick: () => void;
};

export default function Menu({
  align = "end",
  label,
  button,
  children,
  panelClassName,
  wrapperClassName = "shrink-0",
}: {
  align?: "start" | "end";
  /** Accessible name for the panel. */
  label: string;
  button: (props: TriggerProps) => React.ReactNode;
  /** Given `close` so an item can dismiss the menu when it acts. */
  children: (close: () => void) => React.ReactNode;
  panelClassName?: string;
  /**
   * The wrapper is the positioning context for the panel, which means it — not
   * the trigger — is the flex item when a Menu sits in the toolbar. It
   * therefore has to carry the shrink behaviour: the default holds the control
   * at its natural width, and the store switcher overrides it with
   * `min-w-0 shrink` so it is the one thing in the bar that gives way.
   */
  wrapperClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const uid = useId();
  const triggerId = `${uid}-t`;
  const panelId = `${uid}-p`;

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      // Focus goes back to the trigger, not to the body.
      wrap.current?.querySelector<HTMLElement>(`#${CSS.escape(triggerId)}`)?.focus();
    };
    // Another menu opened. `detail` is the id of the one that opened, so this
    // one can tell "somebody else" from its own broadcast.
    const onOthers = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== panelId) close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener(CLOSE_OTHERS, onOthers);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener(CLOSE_OTHERS, onOthers);
    };
  }, [open, panelId, triggerId]);

  const toggle = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        document.dispatchEvent(new CustomEvent(CLOSE_OTHERS, { detail: panelId }));
      }
      return !wasOpen;
    });
  };

  return (
    <div ref={wrap} className={`relative ${wrapperClassName}`}>
      {button({
        id: triggerId,
        "aria-expanded": open,
        "aria-haspopup": "menu",
        "aria-controls": panelId,
        onClick: toggle,
      })}
      {open && (
        <div
          id={panelId}
          role="menu"
          aria-label={label}
          className={`p-menu ${align === "end" ? "p-menu-end" : "p-menu-start"} ${panelClassName ?? ""}`}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
}
