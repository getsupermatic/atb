import Reveal from "@/components/motion/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import { roles } from "@/lib/careers";

/**
 * Open roles — rendered from `roles` in lib/careers.ts, so adding or removing one
 * is a data edit (brief §7.7).
 *
 * Hairlines only, like `TheCompany` and `Products`: no cards and no glass, which
 * keeps the longest reading passage on the page as plain editorial type. Lists are
 * ruled rather than bulleted — the site has no list-marker style, and the hairline
 * is the vocabulary the rest of the page already uses.
 *
 * A summary rail sits sticky beside the spec, so the Apply button stays reachable
 * through a long read. The sticky element is a CHILD of the grid item rather than
 * the item itself — the same trap documented on `NewModel`: a sticky box travels
 * inside its parent's box, so the parent has to be the tall one, which grid items
 * are by default because they stretch to the row height. `top-28` clears the
 * docked nav. Nothing in the ancestor chain sets `overflow: hidden`, which would
 * silently stop sticky resolving.
 *
 * The rail deliberately holds only the title, the meta, the package and the
 * button. Location and application detail stay in the reading column so the rail
 * cannot grow taller than a short viewport, which is the one thing that breaks a
 * sticky rail.
 */

/**
 * Ruled list — one hairline between items, none above the first or below the last.
 * No marker, so the hairline does the separating: the site has no list-marker
 * style, and Copper is the only palette colour a dot would plausibly use, which
 * only reaches 3.14:1 on the paper canvas.
 */
function RuledList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`divide-y divide-[color:var(--border)] ${className}`}>
      {items.map((item) => (
        <li key={item} className="py-3 text-[color:var(--text-muted)] first:pt-0 last:pb-0">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function OpenRoles() {
  if (roles.length === 0) return null;

  return (
    /* scroll-mt-6 clears the fixed nav when the hero's "See open roles" link lands
       here, and it governs BOTH scroll paths: Lenis reads a target's
       scroll-margin-top, and so does the native path — see the note on `anchors` in
       SmoothScroll. Small, like the homepage anchor targets, because `.section`
       already opens with 72–144px of its own top padding for the bar to sit over. */
    <section id="open-roles" className="section scroll-mt-6" aria-label="Open roles">
      <div className="shell">
        <Reveal>
          {/* Always plural. It is the name of the section rather than a count of
              what is in it, and it matches the hero's "See open roles". */}
          <h2 className="text-4xl">Open roles.</h2>
        </Reveal>

        {roles.map((role) => (
          <article key={role.id} className="mt-12">
            <DrawRule />
            <div className="grid gap-10 pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* Summary rail */}
              <div>
                <div className="lg:sticky lg:top-28">
                  <Reveal from="left">
                    {/* font-normal against the base h3 rule's 500 — at display
                        scale Newsreader wants the lighter weight, and 500 here
                        would read heavier than the h2 above it, which is at 400.
                        The same call `NewModel` and `Products` make. */}
                    <h3 className="text-3xl font-normal">{role.title}</h3>
                    {/* The separators are aria-hidden: the list already conveys
                        that these are separate items, and reading them out gives
                        "London middot Hybrid middot Client-facing". */}
                    <ul className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[color:var(--text-muted)]">
                      {role.meta.map((item, i) => (
                        <li key={item} className="flex items-center gap-2.5">
                          {i > 0 && <span aria-hidden>&middot;</span>}
                          {item}
                        </li>
                      ))}
                    </ul>

                    <h4 className="eyebrow mt-8">Package</h4>
                    <RuledList items={role.package} className="mt-3" />

                    {/* A real <a>, not next/link: this is a mailto, which is an
                        external protocol handler rather than a route to
                        prefetch. */}
                    <a href={role.href} className="btn btn-primary mt-8">
                      {role.cta}
                    </a>
                  </Reveal>
                </div>
              </div>

              {/* The spec */}
              <Reveal from="right" delay={0.12} className="space-y-10">
                <div>
                  <h4 className="eyebrow">About the role</h4>
                  <p className="mt-3 text-lg text-[color:var(--text-muted)]">{role.about}</p>
                </div>

                <div>
                  <h4 className="eyebrow">What you&rsquo;ll do</h4>
                  <RuledList items={role.responsibilities} className="mt-3" />
                </div>

                <div>
                  <h4 className="eyebrow">What good looks like</h4>
                  <div className="mt-4 grid gap-8 sm:grid-cols-2 sm:gap-10">
                    {role.criteria.map((group) => (
                      <div key={group.heading}>
                        <h5 className="text-xl">{group.heading}</h5>
                        <RuledList items={group.points} className="mt-3 text-[0.95rem]" />
                      </div>
                    ))}
                  </div>
                  {/* Not muted: this line is the counterweight to the list above
                      it, and it matters more than the criteria it qualifies. */}
                  <p className="mt-6 max-w-[52ch] font-medium text-[color:var(--heading)]">
                    {role.criteriaNote}
                  </p>
                </div>

                <div>
                  <h4 className="eyebrow">Location</h4>
                  <p className="mt-3 text-[color:var(--text-muted)]">{role.locationNote}</p>
                </div>

                <div>
                  <h4 className="eyebrow">Application</h4>
                  <p className="mt-3 text-[color:var(--text-muted)]">{role.application}</p>
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
