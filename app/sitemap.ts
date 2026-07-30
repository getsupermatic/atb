import type { MetadataRoute } from "next";
import { policies } from "@/lib/legal";
import { site } from "@/lib/site";

/**
 * Built pages only. Future routes register here as they ship so the sitemap stays
 * the single crawl index — /insights is deliberately absent while it is still a
 * stub carrying the closing band alone.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.domain,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.domain}/careers`,
      lastModified: new Date(),
      // Roles come and go; the principles around them do not.
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // The policies, from lib/legal.ts — the same register the routes and the
    // sibling links are built from, so a new policy registers itself here.
    ...policies.map(({ slug }) => ({
      url: `${site.domain}/legal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
