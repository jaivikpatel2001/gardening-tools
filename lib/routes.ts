/**
 * Every internal URL shape in one place.
 *
 * Cards, navigation, the range index and the 404 page all build links through
 * here, so renaming a route is one edit and a link can never be assembled with
 * a stray or missing slash.
 *
 * The public vocabulary is "products", matching the client's own catalogue and
 * navigation. There is no Tools route, no Services route and no Resources
 * route: the range is Products, service content is carried contextually on
 * About and Contact, and credibility content lives under Clients.
 */
export const routes = {
  home: "/",
  about: "/about",
  products: "/products",
  /** A product category detail page, for example `productCategory("lawn-mowers")`. */
  productCategory: (slug: string) => `/products/${slug}`,
  clients: "/clients",
  contact: "/contact",
  /** A section anchor on the Home page, for example `homeSection("complete-range")`. */
  homeSection: (id: string) => `/#${id}`,
  /**
   * Alternative Home design variants, presented for review beside the live Home
   * page. The live Home page keeps `/`; variants 1 to 5 live here.
   */
  variant: (n: 1 | 2 | 3 | 4 | 5) => `/variant${n}`,
} as const;
