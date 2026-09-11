import type Lenis from "lenis";

import { MEDIA } from "@/lib/media";

/**
 * The page's single Lenis instance, when there is one.
 *
 * `SmoothScrollProvider` owns its lifecycle. Anything that needs to move the
 * scroll position (scroll-to-top, in-page anchors) goes through here instead of
 * calling `window.scrollTo` directly, which Lenis would otherwise fight.
 * `null` whenever Lenis is not running, including under reduced motion.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Offset that keeps anchored content clear of the fixed header. */
export const HEADER_SCROLL_OFFSET = -96;

/**
 * Scrolls to the top of the page. Smooth through Lenis when it is running,
 * smooth natively otherwise, and instant when the visitor prefers reduced
 * motion.
 */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.1 });
    return;
  }

  const reduced = window.matchMedia(MEDIA.reduced).matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}
