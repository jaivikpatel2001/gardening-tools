import { routes } from "@/lib/routes";
import type { NavItem } from "@/types/content";

/**
 * Navigation for the header, the mobile sheet and the footer.
 *
 * This module is imported by client components (the header and mobile menu),
 * so it must stay light: plain data and route helpers only, never the product
 * catalogue. Footer product links are resolved from the slugs below on the
 * server.
 *
 * There is deliberately no Blog, Journal, Services or Resources entry anywhere
 * in this file, and none should be added. The range is Products, credibility is
 * Clients, and service content is carried contextually on About and Contact.
 *
 * Nothing here is filtered for release state. The header and footer pass these
 * lists through `visibleLinks` in `lib/visibility.ts`, so an unreleased page
 * disappears from every menu at once.
 */

export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Products", href: routes.products },
  { label: "Clients", href: routes.clients },
  { label: "Contact", href: routes.contact },
];

/**
 * A curated cross-section of the range for the footer: the everyday hand tools
 * people look for first, and the machinery categories in most demand. Labels
 * come from the catalogue, so a renamed category updates here automatically,
 * and an unknown slug fails the build.
 */
export const footerHandCategorySlugs = [
  "hand-tools",
  "cutting-tools",
  "watering-solutions",
  "plastic-planters-and-stands",
  "garden-solar-lights",
] as const;

export const footerMachineryCategorySlugs = [
  "lawn-mowers",
  "brush-cutters",
  "hedge-trimmers",
  "chain-saws",
  "spray-pumps",
  "sprinklers",
] as const;

export const footerCompanyLinks: NavItem[] = [
  { label: "About Us", href: routes.about },
  { label: "Our Clients", href: routes.clients },
  { label: "All Products", href: routes.products },
  { label: "Contact", href: routes.contact },
];
