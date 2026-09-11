"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Plugins are registered exactly once, at module scope, on the client only.
 * Every client component that animates imports from here rather than from
 * `gsap` directly, so registration can never be missed.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/** Motion timings lifted from the design system, so nothing is invented ad hoc. */
export const DURATION = {
  fast: 0.18,
  standard: 0.28,
  reveal: 0.7,
  cinematic: 1.1,
} as const;

export const EASE = {
  organic: "power3.out",
  soft: "power2.out",
  inOut: "power2.inOut",
} as const;

/**
 * Media queries live in `lib/media.ts` so non-animation code can share them.
 * Re-exported here for the animation modules that already import from this file.
 */
export { MEDIA } from "@/lib/media";

export { gsap, ScrollTrigger, useGSAP };
