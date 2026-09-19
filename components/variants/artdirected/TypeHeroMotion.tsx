"use client";

import { useRef, type ReactNode } from "react";

import { MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

/**
 * The scroll transformation for variant 4's hero.
 *
 * As the page leaves, the two words pull apart horizontally and the photograph
 * between them rises and grows, so the composition comes apart rather than
 * scrolling away intact. Entrance is not handled here: the hero is wrapped in
 * `ConceptIntro` for that, and these two jobs are kept separate because they
 * write to different properties on different elements.
 *
 * Desktop and motion only. On a phone the words are stacked and there is no
 * room for them to travel, and under reduced motion nothing is created at all.
 */
export function TypeHeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const pick = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

      const left = pick("[data-drift='left']");
      const right = pick("[data-drift='right']");
      const rise = pick("[data-drift='rise']");

      const media = gsap.matchMedia();

      media.add(MEDIA.desktop, () => {
        const scrub = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.7 },
        });

        scrub
          .to(left, { xPercent: -14, ease: "none" }, 0)
          .to(right, { xPercent: 14, ease: "none" }, 0)
          .to(rise, { yPercent: -12, scale: 1.08, ease: "none" }, 0);

        return () => scrub.kill();
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
