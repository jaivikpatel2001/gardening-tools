"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { EASE, MEDIA, gsap, useGSAP } from "@/components/motion/gsap";
import { cursorIntent } from "@/components/cursor/cursor-intent";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  detail: string;
}

/**
 * The examined product at the centre of variant 2.
 *
 * The photograph sits on a raised white plate on the page's warm canvas, and
 * four points on the tool can be selected to read what each part is for.
 * Selection, not hover alone: a hover-only hotspot is invisible to a touch
 * screen and to a keyboard, so each point is a real button, hover and focus
 * both preview it, and the detail is rendered in a single live region under the
 * plate rather than in a tooltip that would sit off-screen on a phone.
 *
 * Props are plain and serialisable, passed down from the server component that
 * owns the copy, so no content module crosses the client boundary here.
 */
export function ProductStage({
  image,
  hotspots,
  specs,
  hint,
}: {
  image: ImageAsset;
  hotspots: readonly Hotspot[];
  specs: readonly { label: string; value: string }[];
  hint: string;
}) {
  const [activeId, setActiveId] = useState(hotspots[0]?.id);
  const active = hotspots.find((hotspot) => hotspot.id === activeId) ?? hotspots[0];
  const ref = useRef<HTMLDivElement>(null);

  // A slow drift, so the object reads as suspended rather than pasted on. Six
  // seconds each way is below the threshold at which motion draws attention to
  // itself, and it never runs under reduced motion.
  useGSAP(
    () => {
      const plate = ref.current?.querySelector<HTMLElement>("[data-stage-plate]");
      if (!plate) return;

      const media = gsap.matchMedia();

      media.add(MEDIA.motion, () => {
        const tween = gsap.to(plate, {
          y: -14,
          duration: 6,
          ease: EASE.inOut,
          repeat: -1,
          yoyo: true,
        });
        return () => tween.kill();
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <div data-stage-plate className="relative">
        <div className="relative overflow-hidden rounded-xl bg-surface shadow-float">
          <div className="relative aspect-square">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1127px) 92vw, 46vw"
              quality={80}
              preload
              loading="eager"
              className="object-cover"
            />
          </div>

          {hotspots.map((hotspot) => {
            const isActive = hotspot.id === active?.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => setActiveId(hotspot.id)}
                onMouseEnter={() => setActiveId(hotspot.id)}
                onFocus={() => setActiveId(hotspot.id)}
                aria-pressed={isActive}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                {...cursorIntent("view")}
              >
                <span className="sr-only">{hotspot.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative grid h-4 w-4 place-items-center rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "scale-125 border-white bg-brand"
                      : "border-white bg-[rgba(18,59,28,0.45)] backdrop-blur-[2px]",
                  )}
                >
                  {isActive ? (
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/50" />
                  ) : null}
                </span>
              </button>
            );
          })}

          {/* Specifications, floated over the top right of the plate. */}
          <dl className="absolute right-4 top-4 hidden w-[13.5rem] rounded-md border border-hairline bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-4 shadow-card backdrop-blur-md sm:block">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-3 py-1.5">
                <dt className="font-body text-caption-sm uppercase tracking-[0.12em] text-muted">
                  {spec.label}
                </dt>
                <dd className="text-right font-body text-caption font-semibold text-ink">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* The single detail panel. Live, so a screen reader hears the change. */}
      <div className="mt-5 rounded-lg border border-hairline bg-surface p-5 shadow-card lg:mt-6 lg:p-6">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
          <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">{hint}</p>
        </div>

        <div aria-live="polite" className="mt-3">
          <h3 className="text-title-lg text-ink">{active?.label}</h3>
          <p className="mt-2 max-w-[52ch] text-body-sm text-body">{active?.detail}</p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {hotspots.map((hotspot) => (
            <li key={hotspot.id}>
              <button
                type="button"
                onClick={() => setActiveId(hotspot.id)}
                aria-pressed={hotspot.id === active?.id}
                className={cn(
                  "min-h-9 rounded-full border px-3.5 font-body text-caption font-medium transition-colors duration-200",
                  hotspot.id === active?.id
                    ? "border-brand bg-brand text-on-brand"
                    : "border-hairline-strong text-body hover:border-brand hover:text-brand",
                )}
              >
                {hotspot.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
