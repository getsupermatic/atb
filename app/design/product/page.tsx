import ProductMark from "@/components/product/ProductMark";
import TodayScreen from "@/components/product/TodayScreen";
import { ThemeScope } from "@/components/product/theme";

/**
 * The reference route: the FrontlineOS product system, rendered.
 *
 * Two things are on this page. The screens — the same composition at desktop
 * and handset width, in light and dark — and the sheet the screens are built
 * from, so the system is reviewable as a system and not only as a picture.
 *
 * Each frame is its own ThemeScope, which is why the mode contract in
 * product.css is written as attribute selectors rather than against :root: a
 * light frame and a dark frame have to coexist on one page.
 */

/* ---- the sheet's own data. Contrast figures are measured, not estimated —
   the working is in the status-ramp comment in app/styles/product.css. ---- */

const SURFACES = [
  { name: "Canvas", light: "Cream #f5f1e8", dark: "Ink #0f1613", varName: "--bg" },
  { name: "Surface", light: "Paper #fbfaf6", dark: "Ink soft #1c2320", varName: "--p-surface" },
  { name: "Raised", light: "#ffffff", dark: "#262e2a", varName: "--p-raised" },
  { name: "Hairline", light: "ink / 0.10", dark: "cream / 0.12", varName: "--border" },
];

const STATUS = [
  { name: "Urgent", token: "--st-urgent", light: "#9c3a2c", lightRatio: "6.15:1", dark: "#e0705a", darkRatio: "5.70:1", use: "Blocks the shift. Acknowledge required." },
  { name: "High", token: "--st-high", light: "#975c34", lightRatio: "4.82:1", dark: "#c97b45", darkRatio: "5.50:1", use: "Today, and someone is waiting on it." },
  { name: "Due", token: "--st-due", light: "#5c665f", lightRatio: "5.25:1", dark: "#d8d2c4", darkRatio: "12.2:1", use: "Scheduled. The default state." },
  { name: "Done", token: "--st-done", light: "#2d523d", lightRatio: "7.87:1", dark: "#7fae8e", darkRatio: "7.17:1", use: "Complete, and logged." },
  { name: "Info", token: "--st-info", light: "#5c665f", lightRatio: "5.25:1", dark: "#d8d2c4", darkRatio: "12.2:1", use: "Worth knowing. No action." },
];

const RADII = [
  { token: "--p-r-xs", value: "6px", use: "Chips, badges, icon plates" },
  { token: "--p-r-sm", value: "10px", use: "Rows, inputs, switcher" },
  { token: "--p-r-md", value: "14px", use: "Cards, lists, the Now strip" },
  { token: "--p-r-lg", value: "20px", use: "Menus, sheets, the app frame" },
  { token: "--p-r-pill", value: "999px", use: "Buttons, the Ask field, counts" },
];

function Frame({
  mode,
  width,
  label,
  dense,
}: {
  mode: "light" | "dark";
  width: number;
  label: string;
  dense?: boolean;
}) {
  return (
    <figure className="m-0">
      <figcaption
        className="p-context mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </figcaption>
      <ThemeScope
        initial={mode}
        style={{
          width: "100%",
          maxWidth: width,
          borderRadius: "1.25rem",
          overflow: "hidden",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 60px -30px rgb(var(--ink-rgb) / 0.45)",
        }}
      >
        <TodayScreen dense={dense} height={dense ? 800 : 840} />
      </ThemeScope>
    </figure>
  );
}

function Swatch({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: value,
          border: "1px solid var(--border)",
          flex: "none",
        }}
      />
      <span className="text-[0.8125rem]">{label}</span>
    </div>
  );
}

function Section({
  n,
  title,
  lead,
  children,
}: {
  n: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 border-t pt-8" style={{ borderColor: "var(--border)" }}>
      <p className="p-context">{n}</p>
      <h2 className="mt-2 text-2xl" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {lead && (
        <p className="mt-2 max-w-[62ch] text-[0.9375rem]" style={{ color: "var(--text-muted)" }}>
          {lead}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ProductDesignPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="mx-auto max-w-[72rem] px-6 py-14">
        <header>
          <p className="p-context">Internal reference · not a page of the site</p>
          <h1
            className="mt-3 text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--text)" }}
          >
            The product design system
          </h1>
          <p className="mt-4 max-w-[62ch]" style={{ color: "var(--text-muted)" }}>
            The marketing system, adapted for an operations tool. Three things change on
            the way across: density goes up and motion comes down; the display face is
            rationed to one element per screen; and a status ramp is added, because six
            brand colours cannot carry five operational states. Everything else — the
            palette, the type, the motion tokens — is inherited unchanged from{" "}
            <code>app/styles/tokens.css</code>.
          </p>

          {/* The mark, at the size it is used and at a size you can see. */}
          <div
            className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6 rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--p-surface)" }}
          >
            <div>
              <p className="p-context mb-3">The product mark</p>
              <ProductMark name="Frontline" size={40} />
            </div>
            <div>
              <p className="p-context mb-3">In the toolbar</p>
              <ProductMark name="Frontline" size={19} />
            </div>
            <div>
              <p className="p-context mb-3">Compact</p>
              <ProductMark name="Frontline" size={19} variant="compact" />
            </div>
            <div>
              <p className="p-context mb-3">The rule carries</p>
              <div className="flex flex-col gap-2">
                <ProductMark name="Engage" size={19} />
                <ProductMark name="Commerce" size={19} />
              </div>
            </div>
          </div>
        </header>

        <Section
          n="01"
          title="Today, at desktop width"
          lead="Every control in the toolbar works: switch store, cycle the headset between live, muted and offline, acknowledge a notification, change the appearance, open the account menu. Escape closes any of them and returns focus to its trigger."
        >
          <div className="flex flex-col gap-10">
            <Frame mode="light" width={1040} label="Light" />
            <Frame mode="dark" width={1040} label="Dark" />
          </div>
        </Section>

        <Section
          n="02"
          title="Today, on a handset"
          lead="The same components at the dense composition. The toolbar drops the command trigger and the environment badge, the headset goes to icon-only with the state on its colour, and the mark loses the atb logo rather than shrinking it — the endorsement moves to the foot of the account menu."
        >
          <div className="flex flex-wrap gap-8">
            <Frame mode="light" width={400} label="Light" dense />
            <Frame mode="dark" width={400} label="Dark" dense />
          </div>
        </Section>

        <Section
          n="03"
          title="Surfaces"
          lead="Light runs Cream under Paper: a 2.6-point step in lightness, plus a hairline. Enough for a card to lift, little enough that twelve cards do not become twelve competing rectangles — which is the failure mode in the app as it stands. Pure white is held back for the one raised layer, so 'floating above everything' means something."
        >
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {SURFACES.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-4 border-b pb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-[0.875rem] font-semibold">{s.name}</span>
                <span className="text-[0.8125rem]" style={{ color: "var(--text-muted)" }}>
                  {s.light} / {s.dark}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-6">
            <Swatch value="#f5f1e8" label="Cream — canvas" />
            <Swatch value="#fbfaf6" label="Paper — surface" />
            <Swatch value="#0f1613" label="Ink — dark canvas" />
            <Swatch value="#1c2320" label="Ink soft — dark surface" />
          </div>
        </Section>

        <Section
          n="04"
          title="The status ramp"
          lead="An extension, declared as one and kept out of tokens.css. Built by moving the brand hues rather than importing stock semantics — urgent is Copper rotated from 26° to 9° and deepened; done on dark is a lifted Green, because Green itself is 2.08:1 on Ink. Every status is carried by a label AND a rule AND, where it alerts, an icon: colour is never the only signal."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-[0.8125rem]">
              <thead>
                <tr style={{ color: "var(--text-muted)" }}>
                  <th className="p-context py-2 text-left">State</th>
                  <th className="p-context py-2 text-left">Light</th>
                  <th className="p-context py-2 text-left">On Cream</th>
                  <th className="p-context py-2 text-left">Dark</th>
                  <th className="p-context py-2 text-left">On Ink</th>
                  <th className="p-context py-2 text-left">When</th>
                </tr>
              </thead>
              <tbody>
                {STATUS.map((s) => (
                  <tr key={s.name} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2 font-semibold">
                        <span
                          aria-hidden
                          style={{
                            width: 3,
                            height: 18,
                            borderRadius: 2,
                            background: `var(${s.token})`,
                          }}
                        />
                        {s.name}
                      </span>
                    </td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-muted)" }}>{s.light}</td>
                    <td className="py-3 pr-4 tabular-nums">{s.lightRatio}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--text-muted)" }}>{s.dark}</td>
                    <td className="py-3 pr-4 tabular-nums">{s.darkRatio}</td>
                    <td className="py-3" style={{ color: "var(--text-muted)" }}>{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          n="05"
          title="Type"
          lead="One display element per screen. Newsreader carries the greeting and nothing else — not a card heading, not a stat, not a label. Rationing it is what makes it read as brand rather than as decoration, and it keeps the scan speed an operations tool needs."
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="p-context mb-2">.p-title — Newsreader Light, the one display moment</p>
              <p className="p-title">Good afternoon, Emma</p>
            </div>
            <div>
              <p className="p-context mb-2">.p-context — the identifier above it</p>
              <p className="p-context">Grocery Co · On shift until 15:30</p>
            </div>
            <div>
              <p className="p-context mb-2">.p-eyebrow — the section label, sentence case</p>
              <p className="p-eyebrow">Messages</p>
            </div>
            <div>
              <p className="p-context mb-2">.p-row-title / body — Instrument Sans, 15px</p>
              <p className="p-row-title">Chilled aisle temperature logging requirement</p>
              <p className="p-row-meta">Operations, HQ · 08:52</p>
            </div>
            <div>
              <p className="p-context mb-2">.p-link — accent text, never raw Copper</p>
              <button type="button" className="p-link">
                View all
              </button>
            </div>
          </div>
        </Section>

        <Section
          n="06"
          title="Radius"
          lead="The marketing site has two curves: the 1.75rem panel and the 999px pill. The product needs the steps between them, and tighter — a 1.75rem corner on a 56px row eats the row. The pill survives unchanged."
        >
          <div className="flex flex-wrap gap-4">
            {RADII.map((r) => (
              <div
                key={r.token}
                className="flex min-w-[13rem] flex-1 items-center gap-3 border p-3"
                style={{ borderColor: "var(--border)", borderRadius: `var(${r.token})` }}
              >
                <span className="text-[0.8125rem] font-semibold tabular-nums">{r.value}</span>
                <span className="text-[0.75rem]" style={{ color: "var(--text-muted)" }}>
                  {r.use}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          n="07"
          title="What is deliberately different from the app today"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["The amber is gone.", "It was roughly #f5a623, and not a brand colour. Copper is #c97b45 — browner and quieter."],
              ["Accent is never text on light.", "“View all” was set in the amber at 3.14:1. It now resolves through --accent-text at 4.82:1."],
              ["Three cards became one list.", "Three messages are one object with three parts. Hairlines divide them; elevation does not."],
              ["Priority moved to the start of the row.", "A 3px rule where a scan begins, not a coloured circle at the far end."],
              ["Red costs something now.", "Unread counts are neutral. Red is spent on the one thing that has to interrupt."],
              ["One avatar treatment.", "Stone for everyone, Copper for you. Seven unrelated hues was the loudest generated tell."],
              ["A Now strip, above everything.", "The app opens on three message cards, so “what am I meant to be doing” sits below the fold."],
              ["The empty state has a voice.", "On a shift tool the empty state is the good state, and should read like one."],
            ].map(([head, body]) => (
              <li
                key={head}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--p-surface)" }}
              >
                <p className="text-[0.875rem] font-semibold">{head}</p>
                <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--text-muted)" }}>
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
