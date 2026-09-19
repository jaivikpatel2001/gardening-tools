"use client";

import { useRef } from "react";

import { EASE, MEDIA, gsap, useGSAP } from "@/components/motion/gsap";

export interface CounterStat {
  key: string;
  value: number;
  /** Rendered immediately after the number, for example "+". */
  suffix?: string;
  label: string;
}

/**
 * Variant 2 trust: four tiles, three of them counted.
 *
 * The numbers are rendered server-side at their final value, so with JavaScript
 * off or reduced motion requested the section is simply a set of figures. Only
 * when motion is allowed are they reset to zero on mount and counted up as the
 * section arrives.
 */
export function TrustCounters({
  stats,
  statement,
}: {
  stats: readonly CounterStat[];
  statement: { value: string; label: string };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const numbers = Array.from(root.querySelectorAll<HTMLElement>("[data-counter]"));
      if (!numbers.length) return;

      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const tweens = numbers.map((node) => {
          const target = Number(node.dataset.counter ?? "0");
          const proxy = { value: 0 };
          node.textContent = "0";

          return gsap.to(proxy, {
            value: target,
            duration: 1.6,
            ease: EASE.organic,
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
            onUpdate: () => {
              node.textContent = String(Math.round(proxy.value));
            },
          });
        });

        return () => tweens.forEach((tween) => tween.kill());
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-px overflow-hidden rounded-xl bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.key} className="bg-band p-6 lg:p-8">
          <p className="font-heading text-display-lg font-extrabold leading-none text-on-band">
            <span data-counter={stat.value}>{stat.value}</span>
            {stat.suffix ? <span>{stat.suffix}</span> : null}
          </p>
          <p className="mt-4 max-w-[20ch] font-body text-body-sm text-on-band-muted">{stat.label}</p>
        </div>
      ))}

      <div className="bg-band p-6 lg:p-8">
        <p className="font-heading text-display-sm font-extrabold leading-none text-on-band-accent">
          {statement.value}
        </p>
        <p className="mt-4 max-w-[20ch] font-body text-body-sm text-on-band-muted">{statement.label}</p>
      </div>
    </div>
  );
}
