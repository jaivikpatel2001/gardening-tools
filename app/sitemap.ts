import type { MetadataRoute } from "next";

import type { PageKey } from "@/config/pageVisibility";
import { site } from "@/config/site";
import { productCategories } from "@/data/productCategories";
import { routes } from "@/lib/routes";
import { isPageVisible } from "@/lib/visibility";

/**
 * The sitemap is generated from the same page switchboard the routes and the
 * navigation use, so a page that has not been released in production is never
 * advertised here either. Product category pages follow the Products flag.
 *
 * The Home variants are deliberately absent whatever their flag says: they are
 * review material and every one of them is `noindex`.
 *
 * There is no Blog, Journal, Services or Resources route to add.
 */
interface SitemapEntry {
  path: string;
  key: PageKey;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}

const entries: SitemapEntry[] = [
  { path: routes.home, key: "home", priority: 1, changeFrequency: "monthly" },
  { path: routes.about, key: "about", priority: 0.8, changeFrequency: "yearly" },
  { path: routes.products, key: "products", priority: 0.9, changeFrequency: "monthly" },
  ...productCategories.map((category) => ({
    path: routes.productCategory(category.slug),
    key: "products" as const,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: routes.clients, key: "clients", priority: 0.6, changeFrequency: "yearly" },
  { path: routes.contact, key: "contact", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return entries
    .filter((entry) => isPageVisible(entry.key))
    .map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency,
      priority,
    }));
}
