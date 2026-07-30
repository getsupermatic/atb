/**
 * Careers-page copy, as data.
 *
 * The same split as lib/content.ts: site-wide facts stay in lib/site.ts, and this
 * holds one page's content so copy changes don't mean editing JSX.
 *
 * `roles` is an array by requirement rather than by habit — the brief (§7.7) asks
 * for roles structured as data so they are easy to add and remove. The page maps
 * over it, and an empty array is a valid state: the sections above and the
 * general-interest band below both stand on their own, which is the copy deck's
 * documented empty state (§2.6).
 *
 * Copy drawn verbatim from briefs/documents/legal/ATB-v1-careers-copy.md. That
 * file supersedes the Master Copy Deck §2.6 careers block, and it already obeys
 * §2.6's rule — principles only, with the operating mechanics (the 16:24 windows,
 * Life Days, expense mechanics, Impact Score) kept internal. Before adding
 * anything here, read the publication notes at the foot of the copy file: the
 * performance statistics and the unimplemented policies listed there must not
 * appear on this page.
 */

/**
 * Where both careers CTAs go. One value rather than a literal in each component,
 * because the destination is a decision the copy flagged and will likely change
 * once an applicant-tracking system is chosen — at which point this is the only
 * line to edit. Deliberately NOT lib/site.ts's `email`: applications should not
 * land in the general enquiries inbox.
 */
const APPLY_INBOX = "careers@atbeyond.com";

/** A mailto with the subject pre-filled, so an application arrives labelled. */
const applyTo = (subject: string) =>
  `mailto:${APPLY_INBOX}?subject=${encodeURIComponent(subject)}`;

/** Speculative introductions, kept distinguishable from applications to a role. */
export const introduceHref = applyTo("Introduction — general interest");

/** Hero strip. Three short lines, so they read as a set rather than a sentence. */
export const whyJoin = [
  "Build at the frontier.",
  "Work with people who raise your game.",
  "Help shape the company as well as its products.",
] as const;

/** The company we are building — the four ruled beats. */
export const companyBeats = [
  {
    title: "Small teams, amplified",
    body: "We do not believe scale always requires more people, more layers and more process. The future belongs to small pockets of condensed talent with the judgement, technology and shared context to achieve what once took teams many times their size.",
  },
  {
    title: "One team from problem to outcome",
    body: "Engineering, product, customer and operations should not be separate functions passing work between them. We bring the disciplines together around the outcome, shortening the distance between an idea, a decision and its impact in the real world.",
  },
  {
    title: "A system for consistently great work",
    body: "Individual brilliance matters, but it does not scale on its own. We are creating the internal tools, shared intelligence, feedback loops and operating practices that help talented people do better work, more often — without sanding away what makes them exceptional.",
  },
  {
    title: "Build the model with us",
    body: "This is not a finished operating model that you simply step into. It is something you will help create. We want people who are excited by the work and by the opportunity to shape a company around what work can become.",
  },
] as const;

/** Principles for how we work — the six cards. */
export const principles = [
  {
    title: "The “beyond reasonable” standard",
    body: "We favour a clear social contract over a fifty-page handbook: act in the best interest of the mission, use good judgement and make decisions you could explain openly to the whole team. This is not freedom from accountability. It is freedom built on context, transparency and trust.",
  },
  {
    title: "Flow over performative busyness",
    body: "The industrial working week was designed around time and presence. Knowledge work depends on energy, attention and flow. We protect focused, self-directed work and bring people together deliberately for the high-bandwidth human work that benefits from being in the room.",
  },
  {
    title: "Freedom paired with responsibility",
    body: "We want adults to have meaningful control over when, where and how they do their best work. In return, commitments are explicit, outcomes matter and nobody leaves the team carrying a promise they did not make.",
  },
  {
    title: "Rest and life are performance inputs",
    body: "People cannot do clear, creative work when their personal operating system is crashing. Rest, time away and space to deal with life are not indulgences. They are part of sustaining good judgement and high performance over time.",
  },
  {
    title: "Transparency creates trust",
    body: "Policies often grow when context is missing and trust is low. We would rather share the context, make choices visible and let peer accountability do more of the work. Ask for understanding before permission, and be ready to explain the judgement behind a decision.",
  },
  {
    title: "Ambition with responsibility",
    body: "Working at the frontier means raising the standard, not lowering the safeguards. Everyone shares responsibility for building AI that is useful, safe and worthy of the people expected to rely on it.",
  },
] as const;

/**
 * An open role.
 *
 * `datePosted` is here rather than generated because it feeds JobPosting
 * structured data, where the date has to be the real posting date and has to stay
 * put — a `new Date()` would silently re-date the posting on every build and tell
 * search engines the role is always brand new. Set it when the role goes up.
 *
 * `criteria` is a list of groups so the two halves of "what good looks like" stay
 * one field. Two is what the copy has; the render does not assume it.
 */
type Role = {
  /** URL-safe id, used for the in-page anchor and the JSON-LD identifier. */
  id: string;
  title: string;
  location: string;
  /** Meta chips under the heading, in order. */
  meta: readonly string[];
  /** ISO date, YYYY-MM-DD. */
  datePosted: string;
  about: string;
  responsibilities: readonly string[];
  criteria: readonly { heading: string; points: readonly string[] }[];
  /** The line that keeps the criteria from reading as a checklist. */
  criteriaNote: string;
  package: readonly string[];
  locationNote: string;
  application: string;
  cta: string;
  href: string;
};

export const roles: readonly Role[] = [
  {
    id: "applied-ai-solution-engineer",
    title: "Applied AI solution engineer",
    location: "London",
    meta: ["London", "Hybrid", "Client-facing"],
    datePosted: "2026-07-30",
    about:
      "You will work in a small ATB. and client team to design, build and deploy AI products for the customer frontline. The work spans solution design, hands-on engineering, integration, evaluation and deployment — with direct contact with the people who own and use the product.",
    responsibilities: [
      "Turn ambiguous client problems into working AI products.",
      "Build production LLM and agentic systems, retrieval pipelines and integrations.",
      "Design evaluations, observability, testing and responsible-AI controls.",
      "Communicate trade-offs clearly to technical and senior business stakeholders.",
      "Help clients adopt the product, learn from use and improve it continuously.",
    ],
    criteria: [
      {
        heading: "Hands-on",
        points: [
          "You have shipped production AI products or systems end to end.",
          "You are strong in Python and SQL, and comfortable with TypeScript or JavaScript where needed.",
          "You understand LLM application design, tool use, structured outputs, retrieval-augmented generation and agent orchestration.",
          "You use systematic evaluations and observability to make AI systems reliable.",
        ],
      },
      {
        heading: "Front of house",
        points: [
          "You can translate between business problems and technical choices.",
          "You are comfortable challenging clients constructively.",
          "You are self-sufficient, curious and able to adapt to a new stack.",
          "You care about privacy, bias, safety and the societal impact of AI.",
        ],
      },
    ],
    criteriaNote:
      "We do not expect one person to match every line. Apply if the work excites you and your experience covers a strong combination.",
    package: ["Generous holiday entitlement", "Life policy", "Pension"],
    locationNote:
      "London-based with hybrid working. Depending on client and project needs, be willing to work from client offices and travel when it materially helps delivery.",
    application:
      "Tell us what you have built, the part you personally owned and what you want to build next. A CV is useful; evidence of judgement and shipped work is better.",
    cta: "Apply now",
    href: applyTo("Application — Applied AI solution engineer"),
  },
] as const;
