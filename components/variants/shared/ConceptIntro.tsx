"use client";

import { useRef, type ReactNode } from "react";

import { EASE, MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

/**
 * The entrance timeline shared by all four variant heroes.
 *
 * Behaviour only: every headline, caption and photograph stays a server
 * component and arrives through `children`, so the client bundle carries the
 * timeline and none of the copy. The hidden start states are CSS, declared once
 * in `globals.css` behind `.js-motion`, which is what keeps a server-rendered
 * hero from painting fully formed and then jumping.
 *
 * Targets, all optional on any given hero:
 *
 *   [data-v-line]      a headline line inside an `overflow-hidden` mask
 *   [data-v-fade]      anything that lifts and fades in
 *   [data-v-mask]      an image plate revealed by a clip-path wipe
 *   [data-v-zoom]      a photograph that settles out of a slow push in
 *   [data-v-parallax]  scrubbed against scroll, desktop only
 *   [data-v-parallax-text]  the same, in the opposite direction
 */
export function ConceptIntro({
  children,
  className,
  /** Seconds before the timeline starts. Lets fonts settle first. */
  delay = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Resolved to elements up front: `gsap.matchMedia()` does not inherit the
      // scope `useGSAP` sets, so selector strings inside its callbacks match
      // nothing and the timeline silently becomes a no-op.
      const pick = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

      const lines = pick("[data-v-line]");
      const fades = pick("[data-v-fade]");
      const masks = pick("[data-v-mask]");
      const zooms = pick("[data-v-zoom]");
      const parallax = pick("[data-v-parallax]");
      const parallaxText = pick("[data-v-parallax-text]");

      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: EASE.organic }, delay });

        if (masks.length) {
          tl.to(masks, { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.15 }, 0);
        }
        if (zooms.length) {
          tl.fromTo(zooms, { scale: 1.12 }, { scale: 1, duration: 1.9, ease: "power2.out" }, 0);
        }
        if (lines.length) {
          tl.to(lines, { opacity: 1, y: "0%", duration: 1, stagger: 0.09 }, 0.22);
        }
        if (fades.length) {
          tl.to(fades, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, 0.34);
        }

        return () => tl.kill();
      });

      // Scrubbed camera move, desktop only. On a phone it competes with the
      // scroll the reader is already doing.
      media.add(MEDIA.desktop, () => {
        if (!parallax.length && !parallaxText.length) return;

        const scrub = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        });

        if (parallax.length) scrub.to(parallax, { yPercent: 8, ease: "none" }, 0);
        if (parallaxText.length) scrub.to(parallaxText, { y: -40, opacity: 0.45, ease: "none" }, 0);

        return () => scrub.kill();
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [delay] },
  );

  // A real element, not `display: contents`: ScrollTrigger measures this node,
  // and a contents box has no rect to measure.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
