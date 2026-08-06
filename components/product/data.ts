/**
 * Demo content for the reference screens.
 *
 * Written rather than lorem'd, because half of what makes a screen read as
 * designed is whether the copy could have come from the business. These are
 * real grocery-retail tasks and real HQ comms, in the register a store
 * colleague would actually see — and the empty states have a voice, which the
 * app's current "Nothing in the next 90 minutes." does not.
 */

export type Status = "urgent" | "high" | "due" | "done" | "info";

export const user = {
  name: "Emma Thompson",
  initials: "ET",
  role: "Team leader",
  shift: "07:00 – 15:30",
  shiftState: "On shift",
} as const;

export const org = {
  name: "Grocery Co",
  store: "Cambridge Central",
  storeRef: "Store 1042",
} as const;

export const stores = [
  { ref: "1042", name: "Cambridge Central", current: true },
  { ref: "1188", name: "Cambridge Retail Park", current: false },
  { ref: "0917", name: "Ely High Street", current: false },
] as const;

/** What the colleague is on next. The app has no equivalent today. */
export const nextUp = {
  label: "Now — until 10:20",
  title: "Temperature checks: all chilled cabinets",
  meta: "Store-wide · 20 min · logged to Compliance",
} as const;

export type Message = {
  id: string;
  title: string;
  from: string;
  when: string;
  status: Status;
  statusLabel: string;
};

export const messages: Message[] = [
  {
    id: "m1",
    title: "New allergen labelling procedure — effective immediately",
    from: "Compliance, HQ",
    when: "10:50",
    status: "urgent",
    statusLabel: "Urgent",
  },
  {
    id: "m2",
    title: "Chilled aisle temperature logging requirement",
    from: "Operations, HQ",
    when: "08:52",
    status: "high",
    statusLabel: "High",
  },
  {
    id: "m3",
    title: "Bank holiday trading hours confirmed",
    from: "Store Support",
    when: "Yesterday",
    status: "info",
    statusLabel: "FYI",
  },
];

/** The toolbar's notification queue — the acknowledge-or-block set. */
export const alerts = [
  {
    id: "a1",
    title: "New allergen labelling procedure",
    body: "FSA update: printed allergen labels required for loose bakery. Templates are on the shared drive.",
    when: "Today, 10:50",
    status: "urgent" as Status,
    statusLabel: "Urgent",
  },
  {
    id: "a2",
    title: "Chilled aisle temperature logging",
    body: "Log every chilled cabinet at 07:00, 12:00 and 17:00 from today.",
    when: "Today, 08:52",
    status: "high" as Status,
    statusLabel: "High",
  },
];

export type Task = {
  id: string;
  title: string;
  when: string;
  area: string;
  mins: number;
  status: Status;
  statusLabel: string;
};

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Click & collect orders",
    when: "14:30",
    area: "Store-wide",
    mins: 30,
    status: "due",
    statusLabel: "Next",
  },
  {
    id: "t2",
    title: "Ambient aisle face-up & tidy",
    when: "15:00",
    area: "Ambient",
    mins: 25,
    status: "due",
    statusLabel: "Later",
  },
  {
    id: "t3",
    title: "Midday floor walk",
    when: "13:10",
    area: "Store-wide",
    mins: 25,
    status: "done",
    statusLabel: "Done",
  },
];

export const team = [
  { initials: "ET", name: "Emma Thompson", self: true },
  { initials: "RJ", name: "Ruth Jarvis", self: false },
  { initials: "PA", name: "Priya Anand", self: false },
  { initials: "MK", name: "Marek Kowalski", self: false },
  { initials: "DO", name: "Dele Okafor", self: false },
  { initials: "JL", name: "Jack Lowe", self: false },
] as const;
