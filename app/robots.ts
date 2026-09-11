import type { MetadataRoute } from "next";

import { isIndexable } from "@/config/env";
import { site } from "@/config/site";

/**
 * Production allows crawling and advertises the sitemap. Every other deployment
 * disallows everything, so a staging or preview build cannot be crawled even if
 * its URL leaks. The switch is `NEXT_PUBLIC_APP_ENV` (see `.env.example`).
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
