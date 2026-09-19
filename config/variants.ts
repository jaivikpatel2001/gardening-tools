import { routes } from "@/lib/routes";

/**
 * The live Home page and the five alternative design variants beside it.
 *
 * The numbering is deliberate: `/` is the existing Home page and is not a
 * numbered variant, so `/variant1` really is variant 1, `/variant5` is variant
 * 5, and the URL never disagrees with the label on the page.
 *
 * This is configuration, not content: it records which routes exist and how the
 * fixed header has to paint over each one's hero. It is imported by the header,
 * which is a client component, so it stays deliberately small and must never
 * reach for the tool catalogue.
 */

/** How the header paints while it sits over a page's hero, before it scrolls. */
export type HeaderScheme = "ink" | "on-band";

export interface HomeVariant {
  /** Short label for the switcher: "Home" for the live page, "01" to "05". */
  chip: string;
  /** The direction in three words or fewer. */
  name: string;
  href: string;
  headerScheme: HeaderScheme;
}

/** The live Home page. Unchanged by any of this, and never renumbered. */
export const originalHome: HomeVariant = {
  chip: "Home",
  name: "Original homepage",
  href: routes.home,
  headerScheme: "ink",
};

export const homeVariants: readonly HomeVariant[] = [
  {
    chip: "01",
    name: "Cinematic Editorial",
    href: routes.variant(1),
    // The only hero of the six that is a full-bleed photograph.
    headerScheme: "on-band",
  },
  { chip: "02", name: "Interactive Product", href: routes.variant(2), headerScheme: "ink" },
  { chip: "03", name: "Indian Botanical", href: routes.variant(3), headerScheme: "ink" },
  { chip: "04", name: "Art Directed", href: routes.variant(4), headerScheme: "ink" },
  { chip: "05", name: "Structured Catalogue", href: routes.variant(5), headerScheme: "ink" },
];

/** The live page followed by the five variants, in switcher order. */
export const allHomeVariants: readonly HomeVariant[] = [originalHome, ...homeVariants];

/**
 * The header scheme for a path. Anything not listed gets the ordinary ink
 * header, so adding a real page never needs an entry here.
 */
export function headerSchemeFor(pathname: string): HeaderScheme {
  return allHomeVariants.find((variant) => variant.href === pathname)?.headerScheme ?? "ink";
}
