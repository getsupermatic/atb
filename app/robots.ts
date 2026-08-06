import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /design carries the internal product-system reference. It is not part of
    // the site: absent from the sitemap, unlinked from nav and footer, and its
    // own layout sets `robots: { index: false }`. This is the crawl-level lock.
    rules: { userAgent: "*", allow: "/", disallow: "/design/" },
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
