import { notFound } from "next/navigation";

import type { PageKey } from "@/config/pageVisibility";
import { isPageVisible } from "@/lib/visibility";

/**
 * Called at the top of every gated route.
 *
 * A withdrawn page then returns the real 404 response and the site's not-found
 * page, exactly as an unknown URL does, so a direct URL never reveals that the
 * route exists. This is a server-side check inside the route, not a rendering
 * branch: nothing about the page is produced or sent.
 *
 * Kept apart from `lib/visibility.ts` because that module is loaded by the edge
 * proxy and must stay free of server-only imports.
 */
export function enforcePageVisibility(key: PageKey): void {
  if (!isPageVisible(key)) {
    notFound();
  }
}
