import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Home is the only built page this phase. Future routes register here as they
 * ship so the sitemap stays the single crawl index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.domain,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
