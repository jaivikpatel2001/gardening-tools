"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

interface Marker {
  id: string;
  x: number;
  y: number;
  name: string;
  category: string;
  feature: string;
  href: string;
}

/**
 * Variant 3 products: one garden photograph with the tools in it marked, rather
 * than four tools lifted out onto a white grid.
 *
 * Each marker is a button, so it works by tap and by keyboard as well as by
 * hover, and the panel it fills is a single element: floated over the corner of
 * the photograph on a desktop, and sitting under it on a phone where an overlay
 * would cover the thing it is describing.
 */
export function GardenScene({
  image,
  markers,
  hint,
}: {
  image: ImageAsset;
  markers: readonly Marker[];
  hint: string;
}) {
  const [activeId, setActiveId] = useState(markers[0]?.id);
  const active = markers.find((marker) => marker.id === activeId) ?? markers[0];

  return (
    <div className="lg:relative">
      <div className="relative overflow-hidden rounded-xl bg-surface-soft">
        <div className="relative aspect-[4/3] sm:aspect-[3/2]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1127px) 92vw, 1400px"
            quality={80}
            className="object-cover"
          />
        </div>

        {markers.map((marker, index) => {
          const isActive = marker.id === active?.id;
          return (
            <button
              key={marker.id}
              type="button"
              onClick={() => setActiveId(marker.id)}
              onMouseEnter={() => setActiveId(marker.id)}
              onFocus={() => setActiveId(marker.id)}
              aria-pressed={isActive}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              {...cursorIntent("view")}
            >
              <span className="sr-only">{marker.name}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "relative grid h-7 w-7 place-items-center rounded-full border font-body text-[0.625rem] font-bold transition-all duration-300",
                  isActive
                    ? "scale-110 border-white bg-white text-[var(--green-800)]"
                    : "border-white/70 bg-[rgba(5,16,9,0.45)] text-white backdrop-blur-[2px]",
                )}
              >
                {String(index + 1).padStart(2, "0")}
                {isActive ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/45" />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="mt-5 rounded-lg bg-surface p-6 shadow-float lg:absolute lg:bottom-7 lg:left-7 lg:mt-0 lg:w-[23rem]"
      >
        <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-brand-soft">
          {active?.category}
        </p>
        <h3 className="mt-2 text-title-lg text-ink">{active?.name}</h3>
        <p className="mt-3 text-body-sm text-body">{active?.feature}</p>

        <Link
          href={active?.href ?? "#"}
          className="group/link mt-5 inline-flex items-center gap-2 font-body text-[0.875rem] font-semibold text-brand"
        >
          View category
          <ArrowIcon className="transition-transform duration-300 ease-[var(--ease-organic)] group-hover/link:translate-x-1" />
        </Link>
      </div>

      <p className="mt-4 font-body text-caption uppercase tracking-[0.16em] text-muted lg:absolute lg:right-7 lg:top-7 lg:mt-0 lg:rounded-full lg:bg-[rgba(5,16,9,0.45)] lg:px-4 lg:py-2 lg:text-white lg:backdrop-blur-[2px]">
        {hint}
      </p>
    </div>
  );
}
