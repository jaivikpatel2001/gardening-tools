"use client";

import { useRef, type ReactNode } from "react";

import { MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

/**
 * Scrubs a single layer against the scroll position of the section it sits in.
 * Used for the community-story backdrop, where the movement should feel like
 * camera motion rather than an element animating.
 *
 * Deliberately `transform`-only, and inert under reduced motion.
 */
export function ParallaxLayer({
  children,
  className,
  /** Starting scale. 1 disables the zoom. */
  scaleFrom = 1,
  /** Vertical travel across the section, as a percentage of the layer height. */
  yPercent = 0,
  /** CSS selector for the element whose scroll range drives the scrub. */
  triggerSelector,
}: {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  yPercent?: number;
  triggerSelector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const trigger = triggerSelector ? el.closest(triggerSelector) ?? el : el.parentElement ?? el;
      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const tween = gsap.fromTo(
          el,
          { scale: scaleFrom, yPercent: yPercent === 0 ? 0 : -yPercent / 2 },
          {
            scale: 1,
            yPercent: yPercent === 0 ? 0 : yPercent / 2,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );

        return () => tween.kill();
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [scaleFrom, yPercent, triggerSelector] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
