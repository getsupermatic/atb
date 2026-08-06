"use client";

import { usePathname } from "next/navigation";

/**
 * Suppresses the marketing chrome on the internal reference routes under
 * /design — the product screens have their own toolbar and their own scroll,
 * and the site's nav, footer, grain plate and Lenis smooth-scroll would all be
 * rendering over and around them.
 *
 * A path guard rather than a route group with a second root layout, which is
 * the other way to do this. The route group would mean moving every marketing
 * route into `app/(site)/` to make room for `app/(design)/` — five routes
 * relocated so one internal page can opt out of a header. This is one file and
 * three wraps in the layout.
 *
 * Whatever is passed in is server-rendered as normal and simply not mounted
 * here, so `Footer` stays a server component.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/design")) return null;
  return <>{children}</>;
}
