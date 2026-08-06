"use client";

import { useState } from "react";
import Logo from "@/components/brand/Logo";
import ProductMark from "@/components/product/ProductMark";
import Menu from "@/components/product/Menu";
import { useTheme, type Mode } from "@/components/product/theme";
import { alerts as seedAlerts, org, stores, user } from "@/components/product/data";
import {
  IconBell,
  IconCheck,
  IconChevronDown,
  IconGlobe,
  IconHeadset,
  IconHelp,
  IconMonitor,
  IconMoon,
  IconSearch,
  IconSettings,
  IconSignOut,
  IconStore,
  IconSun,
} from "@/components/product/Icons";

/**
 * The application toolbar.
 *
 * The current app's bar carries a logo, a demo badge and two dead-looking
 * buttons. This is the version that does the job a SaaS toolbar is supposed to
 * do — identity, context, search, live state, alerts, appearance and account —
 * with every control actually working.
 *
 * Left to right:
 *
 *   product mark      the lockup; the endorsement replaces the caption
 *   store switcher    org + store as a CONTROL. A frontline colleague covers
 *                     more than one site; the app states the org in dead text
 *                     and offers no way to change it
 *   command trigger   ⌘K. The single most reliable signal that a tool is a tool
 *   environment       demo/staging, stated quietly — see .p-env
 *   headset           a three-state toggle, not a button. The state is on the
 *                     control, so "am I live?" is answered without a click
 *   notifications     the acknowledge queue, as a panel rather than the modal
 *                     that currently blocks the whole screen on arrival
 *   appearance        light / dark / system
 *   account           who, where, which shift — then settings and sign-out
 *
 * `dense` is a real prop rather than a media query because these screens are
 * rendered inside fixed-width frames on the reference route: a viewport
 * breakpoint would report the page's width, not the frame's. In the product it
 * maps to the handset breakpoint.
 */
type HeadsetState = "live" | "muted" | "off";

const HEADSET: Record<HeadsetState, { label: string; hint: string }> = {
  live: { label: "Live", hint: "Headset connected — tap to mute" },
  muted: { label: "Muted", hint: "Headset muted — tap to go offline" },
  off: { label: "Offline", hint: "Headset offline — tap to connect" },
};

const THEMES: { mode: Mode; label: string; Icon: typeof IconSun }[] = [
  { mode: "light", label: "Light", Icon: IconSun },
  { mode: "dark", label: "Dark", Icon: IconMoon },
  { mode: "system", label: "System", Icon: IconMonitor },
];

export default function AppBar({
  product = "Frontline",
  dense = false,
  env = "Demo",
}: {
  product?: string;
  dense?: boolean;
  env?: string | null;
}) {
  const { mode, setMode } = useTheme();
  const [headset, setHeadset] = useState<HeadsetState>("live");
  const [alerts, setAlerts] = useState(seedAlerts);
  // Annotated, because `stores` is `as const` and the initialiser would
  // otherwise narrow the state to the literal type of the default store.
  const [storeRef, setStoreRef] = useState<string>(stores.find((s) => s.current)!.ref);

  const store = stores.find((s) => s.ref === storeRef)!;
  const cycleHeadset = () =>
    setHeadset((s) => (s === "live" ? "muted" : s === "muted" ? "off" : "live"));

  return (
    <header className="p-bar">
      {/* Identity. Compact drops the atb mark rather than shrinking it — see
          ProductMark's note on the variants. */}
      <ProductMark
        name={product}
        size={dense ? 17 : 19}
        variant={dense ? "compact" : "full"}
        className="ml-1 mr-1 shrink-0"
      />

      {/* The rule between identity and context. Dropped on dense along with the
          switcher's own store icon: the two together are 33px of decoration in
          a bar where the store number needs every one of them. */}
      {!dense && (
        <span aria-hidden className="mx-1 h-5 w-px shrink-0" style={{ background: "var(--border)" }} />
      )}

      {/* Store switcher */}
      <Menu
        align="start"
        label="Switch store"
        /* Dense has no spacer, so the switcher is what absorbs the slack —
           `flex-1`, not just `shrink`, or the bar's free space goes nowhere and
           the store name stays at its collapsed width. */
        wrapperClassName={dense ? "min-w-0 flex-1" : "min-w-0 shrink"}
        button={(p) => (
          <button {...p} type="button" className="p-switcher w-full">
            {!dense && <IconStore size={16} />}
            {/* Dense shows the store NUMBER, not the name. A handset bar has
                about 100px here once the mark and three controls have taken
                theirs, and "Cambridge Central" truncates to "Cambri…" — which
                is worse than useless when two of this org's stores start with
                "Cambridge". The number is unambiguous, always short, and it is
                what a store is called on a delivery note anyway. The full name
                is one tap away, in the menu this button opens. */}
            <span className="min-w-0">
              <span className="p-switcher-name block truncate">
                {dense ? `Store ${store.ref}` : store.name}
              </span>
              {!dense && (
                <span className="p-switcher-sub block truncate">
                  {org.name} · Store {store.ref}
                </span>
              )}
            </span>
            <IconChevronDown size={14} />
          </button>
        )}
      >
        {(close) => (
          <>
            <div className="p-menu-label">{org.name}</div>
            {stores.map((s) => (
              <button
                key={s.ref}
                type="button"
                role="menuitemradio"
                aria-checked={s.ref === storeRef}
                className="p-menu-item"
                onClick={() => {
                  setStoreRef(s.ref);
                  close();
                }}
              >
                <IconStore size={16} />
                <span>
                  {s.name}
                  <span className="p-switcher-sub block">Store {s.ref}</span>
                </span>
                {s.ref === storeRef && (
                  <span className="p-menu-trail">
                    <IconCheck size={15} />
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </Menu>

      {!dense && <div className="flex-1" />}

      {/* Command trigger. Not wired to a palette on the reference route — the
          palette is a screen of its own and out of this round's scope — but it
          is present because its absence is what makes an operations tool feel
          like a website. */}
      {!dense && (
        <button type="button" className="p-command mr-1">
          <IconSearch size={15} />
          <span>Search or run a command</span>
          <kbd className="p-kbd">⌘K</kbd>
        </button>
      )}

      {env && !dense && (
        <span className="p-env mr-1" title="Demo data — not a live store">
          <span className="p-dot" style={{ color: "var(--st-high)" }} />
          {env}
        </span>
      )}

      {/* Headset. Icon-only when dense: the dot keeps the state, and the label
          moves to the accessible name. */}
      <button
        type="button"
        onClick={cycleHeadset}
        className={dense ? "p-icon-btn" : "p-headset"}
        data-state={dense ? undefined : headset}
        style={
          dense
            ? {
                color:
                  headset === "live"
                    ? "var(--st-done)"
                    : headset === "muted"
                      ? "var(--st-high)"
                      : "var(--text-muted)",
              }
            : undefined
        }
        aria-label={HEADSET[headset].hint}
        title={HEADSET[headset].hint}
      >
        <IconHeadset size={dense ? 19 : 16} />
        {!dense && (
          <>
            <span>{HEADSET[headset].label}</span>
            <span
              className="p-dot"
              style={{
                color:
                  headset === "live"
                    ? "var(--st-done)"
                    : headset === "muted"
                      ? "var(--st-high)"
                      : "var(--text-muted)",
              }}
            />
          </>
        )}
      </button>

      {/* Notifications. A panel, not the full-screen modal the app throws up on
          arrival — a blocking dialog for routine comms is why people acknowledge
          without reading. Acknowledging here removes the item. */}
      <Menu
        label="Notifications"
        panelClassName="w-[21rem]"
        button={(p) => (
          <button
            {...p}
            type="button"
            className="p-icon-btn"
            aria-label={`Notifications — ${alerts.length} to acknowledge`}
          >
            <IconBell size={19} />
            {alerts.length > 0 && <span className="p-count p-count-alert">{alerts.length}</span>}
          </button>
        )}
      >
        {() => (
          <>
            <div className="p-menu-label">
              To acknowledge {alerts.length > 0 && `· ${alerts.length}`}
            </div>
            {alerts.length === 0 ? (
              <div className="p-menu-item" style={{ color: "var(--text-muted)" }}>
                <IconCheck size={16} />
                All caught up.
              </div>
            ) : (
              alerts.map((a) => (
                <article
                  key={a.id}
                  className="p-alert"
                  style={{ ["--row-status" as string]: `var(--st-${a.status})` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="p-chip p-chip-status">{a.statusLabel}</span>
                    <span className="p-menu-trail">{a.when}</span>
                  </div>
                  <h3 className="p-row-title mt-1.5 text-[0.875rem]">{a.title}</h3>
                  <p className="p-muted mt-1 text-[0.8125rem] leading-snug">{a.body}</p>
                  <button
                    type="button"
                    className="p-btn p-btn-quiet mt-2 w-full"
                    onClick={() => setAlerts((list) => list.filter((x) => x.id !== a.id))}
                  >
                    <IconCheck size={15} />
                    Acknowledge
                  </button>
                </article>
              ))
            )}
          </>
        )}
      </Menu>

      {/* Appearance. Its own control from `sm` up; on a handset it moves into
          the account menu below. Four 44px icon buttons plus the mark leave the
          store switcher about 80px, which truncated "Cambridge Central" to a
          single "C" — and of the two, knowing which store you are in beats
          reaching the theme in one tap. */}
      {!dense && (
      <Menu
        label="Appearance"
        button={(p) => (
          <button {...p} type="button" className="p-icon-btn" aria-label="Appearance">
            {mode === "dark" ? <IconMoon size={18} /> : mode === "light" ? <IconSun size={18} /> : <IconMonitor size={18} />}
          </button>
        )}
      >
        {(close) => (
          <>
            <div className="p-menu-label">Appearance</div>
            {THEMES.map(({ mode: m, label, Icon }) => (
              <button
                key={m}
                type="button"
                role="menuitemradio"
                aria-checked={mode === m}
                className="p-menu-item"
                onClick={() => {
                  setMode(m);
                  close();
                }}
              >
                <Icon size={16} />
                {label}
                {mode === m && (
                  <span className="p-menu-trail">
                    <IconCheck size={15} />
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </Menu>
      )}

      {/* Account */}
      <Menu
        label="Account"
        panelClassName="w-[17rem]"
        button={(p) => (
          <button
            {...p}
            type="button"
            className="p-icon-btn"
            aria-label={`Account — ${user.name}`}
          >
            <span className="p-avatar">{user.initials}</span>
          </button>
        )}
      >
        {(close) => (
          <>
            <div className="p-menu-head">
              <span className="p-avatar p-avatar-lg">{user.initials}</span>
              <span className="min-w-0">
                <span className="p-strong block truncate text-[0.875rem]">{user.name}</span>
                <span className="p-switcher-sub block truncate">
                  {user.role} · {org.name}
                </span>
              </span>
            </div>

            {/* Shift state. Frontline-specific and worth the space: it is the
                one fact that decides whether the rest of the screen applies to
                you right now. */}
            <div className="p-menu-item" style={{ cursor: "default" }}>
              <span className="p-dot" style={{ color: "var(--st-done)" }} />
              <span>
                {user.shiftState}
                <span className="p-switcher-sub block">
                  {user.shift} · {store.name}
                </span>
              </span>
            </div>

            {/* Appearance lives here on a handset — see the note on the
                standalone control above. */}
            {dense && (
              <>
                <div className="p-menu-sep" />
                <div className="p-menu-label">Appearance</div>
                {THEMES.map(({ mode: m, label, Icon }) => (
                  <button
                    key={m}
                    type="button"
                    role="menuitemradio"
                    aria-checked={mode === m}
                    className="p-menu-item"
                    onClick={() => setMode(m)}
                  >
                    <Icon size={16} />
                    {label}
                    {mode === m && (
                      <span className="p-menu-trail">
                        <IconCheck size={15} />
                      </span>
                    )}
                  </button>
                ))}
              </>
            )}

            <div className="p-menu-sep" />

            <button type="button" className="p-menu-item" onClick={close}>
              <IconSettings size={16} />
              Settings
              <span className="p-menu-trail">⌘,</span>
            </button>
            <button type="button" className="p-menu-item" onClick={close}>
              <IconBell size={16} />
              Notification preferences
            </button>
            <button type="button" className="p-menu-item" onClick={close}>
              <IconGlobe size={16} />
              Language
              <span className="p-menu-trail">English (UK)</span>
            </button>
            <button type="button" className="p-menu-item" onClick={close}>
              <IconHelp size={16} />
              Help &amp; shortcuts
              <span className="p-menu-trail">?</span>
            </button>

            <div className="p-menu-sep" />

            <button type="button" className="p-menu-item p-menu-item-danger" onClick={close}>
              <IconSignOut size={16} />
              Sign out
            </button>

            {/* The endorsement, once, at the foot of the account menu — which is
                what lets the app bar's compact mark drop the atb logo without
                the product losing its parentage. */}
            <div className="p-menu-sep" />
            <div className="flex items-center gap-2 px-3 pb-2 pt-1">
              {/* No `label`, so Logo hides itself from the tree — the sentence
                  beside it already names the company. */}
              <Logo height={13} />
              <span className="p-switcher-sub">an At The Beyond product</span>
            </div>
          </>
        )}
      </Menu>
    </header>
  );
}
