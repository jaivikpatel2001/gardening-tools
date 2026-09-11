"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { MEDIA } from "@/lib/media";

import { ScrollTrigger, gsap } from "./gsap";
import { HEADER_SCROLL_OFFSET, setLenis } from "./scroll-controller";

/**
 * Lenis owns smooth scrolling and nothing else: no element is ever animated from
 * here. It is driven by GSAP's ticker rather than its own rAF loop, so scroll
 * position and ScrollTrigger stay in the same frame.
 *
 * The instance is registered with `scroll-controller`, which is how the
 * scroll-to-top control moves the page without fighting Lenis. In-page anchor
 * links are handled by Lenis too, and stop clear of the fixed header.
 *
 * Under `prefers-reduced-motion: reduce` Lenis is never constructed; native
 * scrolling is left completely alone.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia(MEDIA.reduced).matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle exponential ease-out: calm rather than floaty.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than anything we can emulate.
      syncTouch: false,
      anchors: { offset: HEADER_SCROLL_OFFSET },
    });

    setLenis(lenis);

    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
