"use client";

import { useState } from "react";
import AppBar from "@/components/product/AppBar";
import {
  IconAlert,
  IconCamera,
  IconChat,
  IconCheck,
  IconChevronRight,
  IconClock,
  IconMail,
  IconMic,
  IconTasks,
} from "@/components/product/Icons";
import { messages, nextUp, org, tasks, team, user } from "@/components/product/data";

/**
 * FrontlineOS — Today.
 *
 * The reference screen. Same information as the app has now, restructured
 * against the product layer:
 *
 *   · One display moment. The greeting is the only Newsreader on the screen.
 *   · A Now strip above everything else. The app currently opens on three
 *     message cards, so "what am I meant to be doing" is below the fold — on
 *     the one screen whose entire job is to answer that.
 *   · Messages as ONE list with hairline dividers, not three floating cards.
 *     Priority reads as a leading rule plus a label, at the start of the row
 *     where a scan begins, rather than as a coloured circle at the far end.
 *   · Sentence-case section labels, and a "View all" in --accent-text rather
 *     than in raw Copper, which fails at 3.14:1 on a light field.
 *   · Neutral counts. Red is spent on the one thing that has to interrupt.
 *
 * `dense` selects the handset composition — see the note in AppBar.
 */
const TABS = [
  { id: "today", label: "Today", Icon: IconClock, count: 0 },
  { id: "tasks", label: "Tasks", Icon: IconTasks, count: 10 },
  { id: "scan", label: "Scan", Icon: IconCamera, count: 0 },
  { id: "chats", label: "Chats", Icon: IconChat, count: 2 },
] as const;

export default function TodayScreen({
  dense = false,
  height = 720,
}: {
  dense?: boolean;
  height?: number | string;
}) {
  const [tab, setTab] = useState<string>("today");
  const [read, setRead] = useState<string[]>([]);

  return (
    <div className="p-app" style={{ height }}>
      <AppBar dense={dense} />

      <div className="p-scroll">
        <div
          className="p-pad"
          style={{
            paddingBlock: "var(--p-5)",
            /* Capped and centred at desktop. Without it the rows run the full
               1040px of the frame and the chevron ends up a hand's width from
               the subject it belongs to — a handset layout stretched, which is
               what the app does today. */
            maxWidth: dense ? undefined : "74rem",
            marginInline: "auto",
          }}
        >
          {/* The context line states the org and the shift, not the store —
              the store lives in the toolbar switcher, and repeating it here
              would be a second copy of a value the user can change. */}
          <p className="p-context">
            {org.name} · {user.shiftState} until {user.shift.slice(-5)}
          </p>
          <h1 className="p-title mt-1.5">Good afternoon, Emma</h1>

          {/* Desktop splits into a main column and a rail; the handset stacks
              the same two groups in the same order. One set of sections, two
              compositions — no duplicated markup, and nothing that only exists
              at one width. */}
          <div
            style={
              dense
                ? { display: "flex", flexDirection: "column", gap: "var(--p-5)", marginTop: "var(--p-4)" }
                : {
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) 21rem",
                    gap: "var(--p-5) var(--p-6)",
                    alignItems: "start",
                    marginTop: "var(--p-4)",
                  }
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--p-5)", minWidth: 0 }}>
          <section aria-label="Now">
            <div className="p-now">
              <p className="p-now-label">{nextUp.label}</p>
              <h2 className="p-now-title">{nextUp.title}</h2>
              <p className="p-now-meta">{nextUp.meta}</p>
              <button
                type="button"
                className="p-btn mt-3"
                style={{
                  background: "var(--color-cream)",
                  color: "var(--color-ink)",
                }}
              >
                Start checks
                <IconChevronRight size={15} />
              </button>
            </div>
          </section>

          {/* Messages */}
          <section aria-label="Messages">
            <div className="p-section-head">
              <h2 className="p-eyebrow">Messages</h2>
              <button type="button" className="p-link">
                View all
              </button>
            </div>
            <div className="p-list">
              {messages.map((m) => {
                const isRead = read.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setRead((r) => (r.includes(m.id) ? r : [...r, m.id]))}
                    className="p-row p-row-rule"
                    style={{
                      ["--row-status" as string]: isRead
                        ? "var(--st-info)"
                        : `var(--st-${m.status})`,
                    }}
                  >
                    <span className="p-plate">
                      {m.status === "urgent" && !isRead ? (
                        <IconAlert size={17} />
                      ) : (
                        <IconMail size={17} />
                      )}
                    </span>
                    <span className="p-row-body">
                      <span
                        className="p-row-title block truncate"
                        style={{ fontWeight: isRead ? 500 : 600 }}
                      >
                        {m.title}
                      </span>
                      <span className="p-row-meta">
                        {!isRead && <span className="p-chip p-chip-status">{m.statusLabel}</span>}
                        <span className="truncate">
                          {m.from} · {m.when}
                        </span>
                      </span>
                    </span>
                    <IconChevronRight size={16} className="p-muted" />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tasks */}
          <section aria-label="My tasks">
            <div className="p-section-head">
              <h2 className="p-eyebrow flex items-center gap-2">
                My tasks
                <span className="p-count">4/10</span>
              </h2>
              <button type="button" className="p-link">
                View all
              </button>
            </div>
            <div className="p-list">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="p-row p-row-rule"
                  style={{ ["--row-status" as string]: `var(--st-${t.status})` }}
                >
                  <span className="p-plate">
                    {t.status === "done" ? <IconCheck size={17} /> : <IconClock size={17} />}
                  </span>
                  <span className="p-row-body">
                    <span
                      className="p-row-title block truncate"
                      style={{
                        opacity: t.status === "done" ? 0.6 : 1,
                        textDecoration: t.status === "done" ? "line-through" : undefined,
                      }}
                    >
                      {t.title}
                    </span>
                    <span className="p-row-meta">
                      <span className="p-chip p-chip-status">{t.statusLabel}</span>
                      <span className="truncate">
                        {t.when} · {t.area} · {t.mins} min
                      </span>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>

            </div>

            {/* The rail. Reference material rather than work: what is already
                done, and who else is on. Both are things you look up, not
                things you act on, which is why neither belongs above Messages
                in the main column. */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--p-5)", minWidth: 0 }}>
          {/* Training — the empty state, which on a shift tool is the GOOD
              state and is written like one. */}
          <section aria-label="Training">
            <div className="p-section-head">
              <h2 className="p-eyebrow">Training</h2>
              <button type="button" className="p-link">
                View all
              </button>
            </div>
            <div className="p-empty">
              <IconCheck size={18} />
              <span>
                <span className="p-strong block">All modules complete.</span>
                Allergen refresher opens Monday — 12 minutes.
              </span>
            </div>
          </section>

          {/* Team on shift. One avatar treatment for everyone, Copper for you —
              against the seven unrelated hues the app uses now, which is the
              screen's loudest generated tell. */}
          <section aria-label="Team on shift">
            <div className="p-section-head">
              <h2 className="p-eyebrow">Team on shift</h2>
              <button type="button" className="p-link">
                Rota
              </button>
            </div>
            <div className="p-card flex items-center gap-3" style={{ padding: "var(--p-3) var(--p-4)" }}>
              <span className="p-avatar-stack flex">
                {team.map((t) => (
                  <span
                    key={t.initials}
                    className={`p-avatar ${t.self ? "p-avatar-self" : ""}`}
                    title={t.name}
                  >
                    {t.initials}
                  </span>
                ))}
              </span>
              <span className="p-muted text-[0.8125rem]">
                <span className="p-strong">You</span>, Ruth, Priya and 3 others
              </span>
            </div>
          </section>
            </div>
          </div>
        </div>
      </div>

      {/* Ask bar */}
      <div className="p-ask">
        <input
          className="p-field-input"
          placeholder={`Ask ${dense ? "Frontline" : "FrontlineOS"}…`}
          aria-label="Ask FrontlineOS"
        />
        <button type="button" className="p-mic" aria-label="Ask by voice">
          <IconMic size={19} />
        </button>
      </div>

      {/* Tabs */}
      <nav className="p-tabs" aria-label="Sections">
        {TABS.map(({ id, label, Icon, count }) => (
          <button
            key={id}
            type="button"
            className="p-tab"
            aria-current={tab === id ? "page" : undefined}
            onClick={() => setTab(id)}
          >
            <span className="relative">
              <Icon size={20} />
              {count > 0 && <span className="p-count">{count}</span>}
            </span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
