/**
 * The production page switchboard.
 *
 * Pages are built and developed normally, then released to the client one at a
 * time by flipping a flag here. This file is the only thing that has to change
 * to release or withdraw a page: navigation, the footer, the sitemap and the
 * routes themselves all read from it.
 *
 * `true` means the page is live in production. `false` means production returns
 * the 404 page for it, whether it is reached from a link or by typing the URL.
 *
 * Development and staging ignore the flags entirely and serve every implemented
 * page, so unreleased work stays reviewable internally. See `lib/visibility.ts`
 * for that rule and `.env.example` for the environment switch.
 */

export const PAGE_KEYS = ["home", "about", "products", "clients", "contact", "variants"] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

/**
 * Release state for each page.
 *
 * `products` covers the listing and every `/products/[slug]` detail page.
 * `variants` covers the five alternative Home designs, which are review
 * material and should stay closed in production.
 */
export const pageVisibility: Record<PageKey, boolean> = {
  home: true,
  about: false,
  products: false,
  clients: false,
  contact: false,
  variants: true,
};
