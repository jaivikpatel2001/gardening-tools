import { routes } from "@/lib/routes";
import type { NavItem } from "@/types/content";

/**
 * Navigation for the header, the mobile sheet and the footer.
 *
 * This module is imported by client components (the header and mobile menu),
 * so it must stay light: plain data and route helpers only, never the tool
 * catalogue. Footer tool links are resolved from the slugs below on the server.
 *
 * There is deliberately no Blog or Journal entry anywhere in this file, and none
 * should ever be added. Editorial content belongs under Resources.
 */

export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Tools", href: routes.tools },
  { label: "Services", href: routes.services },
  { label: "Resources", href: routes.resources },
  { label: "Contact", href: routes.contact },
];

/**
 * A curated cross-section of the range for the footer: the everyday hand tools
 * people look for first, plus the machinery categories in most demand. Labels
 * come from the catalogue, so a renamed category updates here automatically, and
 * an unknown slug fails the build.
 */
export const footerToolCategorySlugs = [
  "hand-tools",
  "digging-tools",
  "pruning-tools",
  "lawn-mowers",
  "brush-cutters",
  "sprayers",
  "irrigation",
] as const;

export const footerServiceLinks: NavItem[] = [
  { label: "Tool Selection", href: routes.service("tool-selection") },
  { label: "Garden Setup", href: routes.service("garden-setup") },
  { label: "Maintenance", href: routes.service("tool-care") },
  { label: "Professional Support", href: routes.service("professional-support") },
];

export const footerResourceLinks: NavItem[] = [
  { label: "Gardening Guides", href: routes.resource("gardening-guides") },
  { label: "Tool Guides", href: routes.resource("tool-guides") },
  { label: "How-To Articles", href: routes.resource("how-to") },
  { label: "Seasonal Tips", href: routes.resource("seasonal-tips") },
  { label: "FAQ", href: routes.faq },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
];
