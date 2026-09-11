"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { DURATION, EASE, gsap, useGSAP } from "@/components/motion/gsap";

interface RevealProps {
  children: ReactNode;
  /** Rendered element. Sections usually pass `"div"`; lists pass `"ul"`. */
  as?: ElementType;
  className?: string;
  /** Seconds before the tween starts once the trigger fires. */
  delay?: number;
  /** Travel distance in pixels. Kept small — this is a lift, not a slide. */
  distance?: number;
  /**
   * When set, direct children animate individually with this stagger (seconds).
   * When omitted, the wrapper itself animates as one block.
   */
  stagger?: number;
  /** ScrollTrigger start. Defaults to "top 85%". */
  start?: string;
}

/**
 * The single scroll-reveal primitive for the whole site.
 *
 * `children` stay server-rendered — this component only supplies behaviour, so
 * no page copy or imagery is pulled into the client bundle.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  distance = 18,
  stagger,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isGroup = typeof stagger === "number";

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = isGroup ? Array.from(root.children) : root;
        const attribute = isGroup ? "data-reveal-group" : "data-reveal-hidden";

        const tween = gsap.fromTo(
          targets,
          { opacity: 0, y: distance },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.reveal,
            ease: EASE.organic,
            delay,
            stagger: isGroup ? stagger : 0,
            scrollTrigger: { trigger: root, start, once: true },
            // The attribute is dropped as the tween starts, not at the end.
            // `fromTo` has already written the start values inline, so nothing
            // flashes — and if it were left in place, `clearProps` below would
            // strip those inline styles and hand the element straight back to
            // the CSS hidden rule, making it disappear again.
            onStart: () => root.removeAttribute(attribute),
            // Only then is it safe to hand styling back to CSS, so no element
            // is left pinned to an inline transform.
            clearProps: "opacity,transform",
          },
        );

        return () => tween.kill();
      });

      // With reduced motion the CSS never hides anything, so there is nothing
      // to undo — matchMedia simply has no branch for it.
      return () => media.revert();
    },
    { scope: ref },
  );

  const revealAttrs = isGroup ? { "data-reveal-group": "" } : { "data-reveal-hidden": "" };

  return (
    <Tag
      ref={ref}
      className={className}
      style={distance !== 18 ? ({ "--reveal-y": `${distance}px` } as React.CSSProperties) : undefined}
      {...revealAttrs}
    >
      {children}
    </Tag>
  );
}
