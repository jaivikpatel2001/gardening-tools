"use client";

import { useRef, type ReactNode } from "react";

import { EASE, MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

/**
 * Behaviour-only wrapper around the hero. Every piece of hero copy and imagery
 * stays a server component and is passed through as `children`, so the client
 * bundle carries the timeline and nothing else.
 *
 * Two independent things happen here:
 *
 *  1. A single entrance timeline, staggered top to bottom, ending on the image
 *     plate's clip reveal.
 *  2. A scrubbed parallax, desktop only, on separate elements from the entrance
 *     so the two never write to the same property.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // Targets are resolved to real elements up front rather than passed as
      // selector strings. `gsap.matchMedia()` does not inherit the scope that
      // `useGSAP` sets, so selector text inside its callbacks silently matches
      // nothing and the whole timeline becomes a no-op.
      const pick = <T extends HTMLElement>(selector: string) =>
        Array.from(root.querySelectorAll<T>(selector));

      const fades = pick("[data-hero-fade]");
      const lines = pick("[data-hero-line]");
      const pops = pick("[data-hero-pop]");
      const zooms = pick("[data-hero-zoom]");
      const plateInner = pick("[data-hero-plate-inner]");
      const plate = pick("[data-hero-plate]");
      const text = pick("[data-hero-text]");

      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const willChangeTarget = plateInner[0];

        const tl = gsap.timeline({
          defaults: { ease: EASE.organic, duration: 0.85 },
          // Give the variable fonts a beat to settle so the line reveal does
          // not animate a fallback face.
          delay: 0.12,
          onStart: () => {
            if (willChangeTarget) willChangeTarget.style.willChange = "clip-path, opacity";
          },
          onComplete: () => {
            if (willChangeTarget) willChangeTarget.style.willChange = "auto";
          },
        });

        tl.to(fades, { opacity: 1, y: 0, duration: 0.7, stagger: 0.075 }, 0)
          .to(lines, { opacity: 1, y: "0%", duration: 0.95, stagger: 0.09 }, 0.1)
          .to(plateInner, { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1 }, 0.25)
          .fromTo(zooms, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 0.25)
          .to(pops, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 }, 0.95);

        return () => tl.kill();
      });

      // Parallax is desktop-only: on a phone it competes with the scroll the
      // reader is already doing, and the plate is full-width there anyway.
      media.add(MEDIA.desktop, () => {
        const scrub = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        });

        scrub
          .to(plate, { yPercent: 7, ease: "none" }, 0)
          .to(text, { y: -34, opacity: 0.6, ease: "none" }, 0);

        return () => scrub.kill();
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  // A real element, not `display: contents` — ScrollTrigger measures this node,
  // and a contents box has no rect to measure.
  return <div ref={ref}>{children}</div>;
}
