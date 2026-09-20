import { NextResponse, type NextRequest } from "next/server";

import { isPageVisible, pageKeyForPath } from "@/lib/visibility";

/**
 * Edge-level enforcement of the production page switchboard in
 * `config/pageVisibility.ts`.
 *
 * The routes themselves also call `enforcePageVisibility`, which is what
 * produces the 404 page and its status. This runs first and stops a withdrawn
 * page from being rendered at all, so nothing about it can leak through a
 * direct URL, a prefetch or a client-side navigation.
 *
 * `middleware.ts` is deprecated in Next 16; `proxy.ts` is the current name for
 * the same convention.
 */
export function proxy(request: NextRequest) {
  const key = pageKeyForPath(request.nextUrl.pathname);

  if (key !== null && !isPageVisible(key)) {
    // Rewriting to a path no route matches hands the request to the app's
    // not-found page with a 404 status, which is exactly what an unknown URL
    // does. A redirect would instead advertise that the page exists.
    return NextResponse.rewrite(new URL("/_unreleased", request.url));
  }

  return NextResponse.next();
}

export const config = {
  /** Everything except Next's own assets, the public folder and metadata routes. */
  matcher: [
    "/((?!_next/static|_next/image|images|icons|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
