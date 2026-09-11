/**
 * Media queries shared across the site.
 *
 * Plain constants with no client directive, so server components, client
 * components, hooks and `gsap.matchMedia()` all read the same strings. A
 * breakpoint or input-capability change is then one edit, not a hunt.
 */
export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  /** A mouse or trackpad: hover exists and the pointer is precise. */
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 1128px) and (prefers-reduced-motion: no-preference)",
  belowDesktop: "(max-width: 1127px) and (prefers-reduced-motion: no-preference)",
} as const;
