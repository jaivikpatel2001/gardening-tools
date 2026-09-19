/**
 * Every internal URL shape in one place.
 *
 * Cards, navigation, the range index and the 404 page all build links through
 * here, so renaming a route is one edit and a link can never be assembled with
 * a stray or missing slash.
 */
export const routes = {
  home: "/",
  about: "/about",
  tools: "/tools",
  toolCategory: (slug: string) => `/tools/${slug}`,
  tool: (categorySlug: string, slug: string) => `/tools/${categorySlug}/${slug}`,
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  resources: "/resources",
  resource: (slug: string) => `/resources/${slug}`,
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy",
  terms: "/terms",
  /** A section anchor on the Home page, for example `homeSection("complete-range")`. */
  homeSection: (id: string) => `/#${id}`,
  /**
   * Alternative Home design variants, presented for review beside the live Home
   * page. The live Home page keeps `/`; variants 1 to 5 live here.
   */
  variant: (n: 1 | 2 | 3 | 4 | 5) => `/variant${n}`,
} as const;
