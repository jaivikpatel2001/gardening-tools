"use client";

import { useEffect, useRef } from "react";

import { scrollToTop } from "@/components/motion/scroll-controller";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { cn } from "@/lib/cn";

import { floatingControlClassName } from "./styles";

const RING_RADIUS = 22.5;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Floating scroll-to-top control with a scroll-progress ring.
 *
 * Visibility is React state, because it changes once per threshold crossing.
 * The ring is written straight to the DOM from an rAF-throttled listener, so
 * scrolling never re-renders anything. While hidden the control is `inert`:
 * invisible, unfocusable and absent from the accessibility tree.
 */
export function ScrollToTop({ threshold = 640 }: { threshold?: number }) {
  const visible = useScrollThreshold(threshold);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - progress));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function handleClick() {
    scrollToTop();
    // Keyboard users land at the top of the document too, not just the viewport.
    // A mouse click does not trigger :focus-visible, so no ring appears for them.
    document.querySelector<HTMLElement>("header a[href]")?.focus({ preventScroll: true });
  }

  return (
    <div
      inert={!visible}
      className={cn(
        "transition-[opacity,translate] duration-300 ease-[var(--ease-organic)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Scroll back to top"
        className={cn(floatingControlClassName, "bg-surface text-brand")}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        >
          <circle cx="24" cy="24" r={RING_RADIUS} fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE}
          />
        </svg>
        <ArrowIcon className="-rotate-90 transition-[translate] duration-300 ease-[var(--ease-organic)] group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
