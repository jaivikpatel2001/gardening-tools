"use client";

import { useRef, type ReactNode } from "react";

import { EASE, MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

/**
 * Wraps a CTA so it leans a few pixels toward the cursor. Used sparingly, on the
 * hero's primary action and the 404 page's way home, where the effect earns its
 * place.
 *
 * Pointer handlers are wrapped in `contextSafe` so the tweens they create are
 * registered with the GSAP context and torn down on unmount. Without that, the
 * animations created inside the listeners would outlive the component.
 */
export function MagneticButton({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;

      // Fine pointers only: the effect is meaningless on touch and would fight taps.
      if (!window.matchMedia(`${MEDIA.finePointer} and ${MEDIA.motion}`).matches) return;

      const onMove = contextSafe((event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        gsap.to(el, {
          x: (event.clientX - (rect.left + rect.width / 2)) * strength,
          y: (event.clientY - (rect.top + rect.height / 2)) * strength,
          duration: 0.5,
          ease: EASE.organic,
        });
      }) as (event: PointerEvent) => void;

      const onLeave = contextSafe(() => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      }) as () => void;

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
