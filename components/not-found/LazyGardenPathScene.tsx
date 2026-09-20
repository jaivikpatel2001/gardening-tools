"use client";

import dynamic from "next/dynamic";

/**
 * Loads the 404 illustration in the browser, and only on the 404 page.
 *
 * Next.js serialises the `not-found` boundary into the payload of **every**
 * route, so that a client-side navigation to a missing page can render without
 * a round trip. Drawn on the server, this scene is several hundred SVG nodes,
 * and it measured at roughly 9 KB of every single page's HTML, plus the class
 * map for its stylesheet, for an illustration almost nobody sees.
 *
 * Importing it through `next/dynamic` with `ssr: false` leaves a reference in
 * that payload instead of the drawing. The scene is fetched in the browser when
 * someone actually lands on a 404.
 *
 * The placeholder reserves the same 600 by 560 box the scene occupies, so the
 * layout is identical before and after it arrives and nothing shifts. It is
 * written as a utility rather than borrowed from the scene's own stylesheet on
 * purpose: importing that CSS module here would put its class-name map back into
 * every page, which is most of what this split was for.
 *
 * `ssr: false` is only legal inside a client component, which is the whole
 * reason this wrapper exists.
 */
const GardenPathScene = dynamic(
  () => import("./GardenPathScene").then((mod) => mod.GardenPathScene),
  {
    ssr: false,
    loading: () => <div className="block aspect-[600/560] w-full" aria-hidden="true" />,
  },
);

export function LazyGardenPathScene() {
  return <GardenPathScene />;
}
