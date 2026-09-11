import { useCallback, useSyncExternalStore } from "react";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * `true` once the page has scrolled further than `threshold` pixels.
 *
 * Built on `useSyncExternalStore` rather than a scroll effect that writes state.
 * The snapshot is a boolean, so React re-renders only on the frame the
 * threshold is actually crossed, however many scroll events fire in between.
 * Shared by the header and the scroll-to-top control.
 */
export function useScrollThreshold(threshold: number): boolean {
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribeToScroll, getSnapshot, () => false);
}
