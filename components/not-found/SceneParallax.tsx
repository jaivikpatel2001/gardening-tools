"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { MEDIA } from "@/lib/media";

/**
 * Feeds the pointer position, normalised to the range -1 to 1, into `--px` and
 * `--py`. Each layer of the scene multiplies those by its own `--depth`, so
 * near layers drift further than far ones.
 *
 * The values ease toward the pointer on an rAF loop that stops once settled, so
 * an idle page does no work. Fine pointers only, and inert under reduced motion.
 */
export function SceneParallax({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia(`${MEDIA.finePointer} and ${MEDIA.motion}`).matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      element.style.setProperty("--px", current.x.toFixed(4));
      element.style.setProperty("--py", current.y.toFixed(4));

      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      frame = settled ? 0 : window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
