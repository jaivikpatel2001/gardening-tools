"use client";

import { useRef, type ReactNode } from "react";

import { EASE, MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

/**
 * Reveals `[data-v-line]` elements inside it, one after another, when the block
 * scrolls into view. The hero equivalent of this runs on load; this one runs on
 * arrival, and is used by the closing statements that end two of the variants.
 *
 * Behaviour only: the lines themselves are server rendered and passed through
 * as `children`, each wrapped in its own `overflow-hidden` mask by the caller.
 */
export function ScrollLines({
  children,
  className,
  start = "top 80%",
}: {
  children: ReactNode;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-v-line]"));
      if (!lines.length) return;

      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const tween = gsap.to(lines, {
          opacity: 1,
          y: "0%",
          duration: 1,
          ease: EASE.organic,
          stagger: 0.09,
          scrollTrigger: { trigger: root, start, once: true },
        });

        return () => tween.kill();
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [start] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
