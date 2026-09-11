"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Motion is used for exactly three things on this site — the theme-toggle icon
 * crossfade, the mobile navigation sheet, and the newsletter success state.
 * None of them need layout animations or drag, so shipping the full `motion`
 * component would pay for a lot of unused feature code.
 *
 * `LazyMotion` with the `domAnimation` bundle covers animate / exit / variants /
 * gestures and roughly halves what Motion contributes to the bundle. `strict`
 * makes the saving enforceable: importing `motion.*` anywhere instead of `m.*`
 * throws at runtime rather than silently reintroducing the full bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
