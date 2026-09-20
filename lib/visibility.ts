import { env } from "@/config/env";
import { pageVisibility, type PageKey } from "@/config/pageVisibility";
import { routes } from "@/lib/routes";
import type { NavItem } from "@/types/content";

/**
 * One place where "is this page released?" is answered.
 *
 * Nothing else reads `pageVisibility` directly, so the environment rule cannot
 * drift between the header, the footer, the sitemap and the routes.
 *
 * Development and staging serve every implemented page regardless of the flags:
 * developers keep working on unreleased pages and internal reviewers keep
 * seeing them. Only production enforces the switchboard.
 *
 * Deliberately free of server-only imports. The edge proxy loads this module,
 * so it must stay plain logic over a path string and two constants.
 */
export function isPageVisible(key: PageKey): boolean {
  if (env.appEnv !== "production") return true;
  return pageVisibility[key];
}

/**
 * Which page a root-relative path belongs to, or `null` for paths that are not
 * gated (assets, metadata routes, the 404 itself).
 */
export function pageKeyForPath(pathname: string): PageKey | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (path === routes.home) return "home";
  if (path === routes.about) return "about";
  if (path === routes.products || path.startsWith(`${routes.products}/`)) return "products";
  if (path === routes.clients) return "clients";
  if (path === routes.contact) return "contact";
  if (/^\/variant[1-5]$/.test(path)) return "variants";
  return null;
}

/** Filters any list of links down to the pages that are actually released. */
export function visibleLinks(items: readonly NavItem[]): NavItem[] {
  return items.filter((item) => {
    if (!item.href.startsWith("/")) return true;
    const key = pageKeyForPath(item.href);
    return key === null || isPageVisible(key);
  });
}
