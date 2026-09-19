import { routes } from "@/lib/routes";

/**
 * Copy for the 404 page.
 *
 * Recovery links point at Home page sections, which exist today, rather than at
 * interior routes that are still future scope and would lead straight back to
 * this page. Repoint them once those pages are built.
 */
export const notFoundContent = {
  metaTitle: "Page not found",
  metaDescription:
    "This page could not be found. Head back to Jiva Greens to explore gardening tools, services and practical guides for Indian gardens.",
  eyebrow: "Error 404",
  heading: "This page wandered off the garden path",
  body: "The page you were looking for has moved, been renamed or never quite took root. Let's get you back on familiar ground.",
  primaryCta: { label: "Back to Home", href: routes.home },
  secondaryCta: { label: "Explore Gardening Tools", href: routes.homeSection("categories") },
  trailLabel: "Or pick up the trail",
  links: [
    { label: "Complete tool range", href: routes.homeSection("complete-range") },
    { label: "Services", href: routes.homeSection("services") },
    { label: "Resources", href: routes.homeSection("resources") },
  ],
} as const;
