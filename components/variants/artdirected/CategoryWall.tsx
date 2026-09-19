"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

export interface WallItem {
  slug: string;
  index: string;
  label: string;
  description: string;
  href: string;
  image: ImageAsset;
}

/**
 * Variant 4 categories: a wall of type where the whole surrounding image
 * changes as the reader moves down it.
 *
 * Hovering or focusing a row lights that row, dims the others and cross-fades
 * the photograph behind the entire section. Below the desktop breakpoint there
 * is no hover, so nothing dims and each row carries its own crop instead.
 */
export function CategoryWall({ items }: { items: readonly WallItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);

  return (
    <div className="relative isolate">
      {/* Breaks out of the content column to the full width of the screen: the
          point of the wall is that the surroundings change, not a panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 hidden h-full w-screen -translate-x-1/2 lg:block"
      >
        {items.map((item) => (
          <Image
            key={item.slug}
            src={item.image.src}
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className={cn(
              "object-cover transition-opacity duration-700 ease-[var(--ease-organic)]",
              item.slug === activeSlug ? "opacity-30" : "opacity-0",
            )}
          />
        ))}
      </div>

      <ul onMouseLeave={() => setActiveSlug(undefined)}>
        {items.map((item) => {
          const isActive = item.slug === activeSlug;
          const dimmed = activeSlug !== undefined && !isActive;

          return (
            <li key={item.slug} className="border-b border-white/15 first:border-t first:border-white/15">
              <Link
                href={item.href}
                onMouseEnter={() => setActiveSlug(item.slug)}
                onFocus={() => setActiveSlug(item.slug)}
                onBlur={() => setActiveSlug(undefined)}
                className={cn(
                  "group flex items-center gap-5 py-6 transition-opacity duration-500 lg:gap-10 lg:py-8",
                  dimmed ? "opacity-35" : "opacity-100",
                )}
                {...cursorIntent("explore")}
              >
                <span className="font-body text-caption-sm tracking-[0.2em] text-white/50">
                  {item.index}
                </span>

                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-white/10 lg:hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="64px"
                    quality={70}
                    className="object-cover"
                  />
                </span>

                <span
                  className={cn(
                    "min-w-0 flex-1 font-heading text-[clamp(1.5rem,6vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-organic)]",
                    isActive ? "text-on-band lg:translate-x-3" : "text-on-band",
                  )}
                >
                  {item.label}
                </span>

                <span
                  className={cn(
                    "hidden max-w-[24ch] text-right font-body text-caption text-white/65 transition-opacity duration-500 lg:block",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
