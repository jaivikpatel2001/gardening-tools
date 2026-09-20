import { routes } from "@/lib/routes";

/**
 * Copy for the two error boundaries.
 *
 * `app/error.tsx` catches a failure inside a route while the header, footer and
 * navigation still stand, so it can offer the rest of the site as a way out.
 * `app/global-error.tsx` replaces the root layout, which means nothing is left
 * to navigate with; its copy assumes the visitor has only the two links on the
 * page itself.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */
export const errorContent = {
  eyebrow: "Something went wrong",
  heading: "This page did not load",
  body: "A part of this page failed while it was being put together. Trying again usually clears it, and nothing you were doing has been lost.",
  retryLabel: "Try again",
  homeCta: { label: "Back to Home", href: routes.home },
  contactCta: { label: "tell us what you were looking for", href: routes.contact },
  helpLabel: "If it keeps happening,",
} as const;

/**
 * The root boundary renders without the layout, the design tokens or the fonts,
 * so its copy is short and its styling is inline. Everything here has to make
 * sense on a bare page.
 */
export const globalErrorContent = {
  title: "Jiva Greens",
  heading: "The site failed to load",
  body: "Something went wrong before the page could be built. Reloading usually fixes it.",
  retryLabel: "Try again",
  homeLabel: "Back to Home",
} as const;
