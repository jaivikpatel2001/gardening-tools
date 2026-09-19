"use client";

import { useRef, useState } from "react";

import { MEDIA, ScrollTrigger, gsap, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";

export interface DurabilityItem {
  index: string;
  title: string;
  description: string;
}

/**
 * Variant 2 brand story: a sticky photograph on the left, four checks scrolling
 * past it on the right, and the active one lit as it reaches the middle of the
 * screen.
 *
 * The photograph is passed in as `children` so it stays server rendered. Only
 * the highlight is client work, and it is driven by one ScrollTrigger per row
 * rather than by a scroll handler, so nothing runs on frames where nothing
 * changed. Under reduced motion no trigger is created and every row stays at
 * full contrast.
 */
export function DurabilityScroller({
  items,
  children,
}: {
  items: readonly DurabilityItem[];
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-durability-row]"));
      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const triggers = rows.map((row, index) =>
          ScrollTrigger.create({
            trigger: row,
            start: "top 65%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) setActiveIndex(index);
            },
          }),
        );

        return () => triggers.forEach((trigger) => trigger.kill());
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">{children}</div>
      </div>

      <ol className="lg:col-span-7">
        {items.map((item, index) => {
          // Before the first trigger fires nothing is active, so the list reads
          // at full contrast rather than dimmed.
          const lit = activeIndex === null || activeIndex === index;

          return (
            <li
              key={item.index}
              data-durability-row
              className={cn(
                "border-b border-hairline py-8 transition-opacity duration-500 first:border-t first:border-hairline lg:py-10",
                lit ? "opacity-100" : "opacity-35",
              )}
            >
              <div className="flex items-start gap-5 lg:gap-8">
                <span className="font-heading text-caption font-bold tracking-[0.2em] text-muted">
                  {item.index}
                </span>
                <div className="min-w-0">
                  <h3 className="text-title-lg text-ink lg:text-display-sm">{item.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-body-md text-body">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
