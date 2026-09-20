import { routes } from "@/lib/routes";

/**
 * Copy for the 404 page.
 *
 * Recovery links point at the interior pages now that they exist. They used to
 * point at Home sections, and two of those anchors (#services and #resources)
 * had since been removed from the page, so they scrolled nowhere.
 */
export const notFoundContent = {
  metaTitle: "Page not found",
  metaDescription:
    "This page could not be found. Head back to Jiva Greens to explore garden machinery, hand tools and watering products for Indian gardens.",
  eyebrow: "Error 404",
  heading: "This page wandered off the garden path",
  body: "The page you were looking for has moved, been renamed or never quite took root. Let's get you back on familiar ground.",
  primaryCta: { label: "Back to Home", href: routes.home },
  secondaryCta: { label: "Explore Our Products", href: routes.products },
  trailLabel: "Or pick up the trail",
  links: [
    { label: "Complete product range", href: routes.products },
    { label: "About Jiva Greens", href: routes.about },
    { label: "Who we supply", href: routes.clients },
    { label: "Contact us", href: routes.contact },
  ],
} as const;
