"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

export interface SelectorItem {
  slug: string;
  /** Set large and uppercase in the list. */
  label: string;
  description: string;
  href: string;
  image: ImageAsset;
}

/**
 * Variant 2 categories: a list you steer rather than a grid you scan.
 *
 * Each row is a real link, so it navigates on click and reaches the keyboard;
 * hovering or focusing one previews it in the panel alongside. The panel is a
 * stack of images that cross-fade, which keeps the transition to opacity alone
 * and off the layout.
 *
 * Below the desktop breakpoint there is no hover to steer with, so each row
 * carries its own thumbnail and the panel shows the first category.
 */
export function CategorySelector({ items }: { items: readonly SelectorItem[] }) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const active = items.find((item) => item.slug === activeSlug) ?? items[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      <ul className="lg:col-span-7">
        {items.map((item, index) => {
          const isActive = item.slug === active?.slug;
          return (
            <li key={item.slug} className="border-b border-hairline first:border-t first:border-hairline">
              <Link
                href={item.href}
                onMouseEnter={() => setActiveSlug(item.slug)}
                onFocus={() => setActiveSlug(item.slug)}
                className="group flex items-center gap-5 py-5 lg:py-7"
                {...cursorIntent("view")}
              >
                <span className="font-body text-caption-sm tracking-[0.2em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Thumbnail is the mobile substitute for the hover panel. */}
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-surface-soft lg:hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="56px"
                    quality={70}
                    className="object-cover"
                  />
                </span>

                <span
                  className={cn(
                    "min-w-0 flex-1 font-heading text-[clamp(1.375rem,4.4vw,2.5rem)] font-extrabold uppercase leading-[1.1] tracking-[-0.02em] transition-colors duration-300",
                    isActive ? "text-brand" : "text-ink/60 group-hover:text-brand",
                  )}
                >
                  {item.label}
                </span>

                <ArrowIcon
                  className={cn(
                    "h-4 w-4 transition-all duration-300 ease-[var(--ease-organic)]",
                    isActive ? "translate-x-0 text-brand opacity-100" : "-translate-x-2 opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface shadow-card">
          {items.map((item) => (
            <Image
              key={item.slug}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="38vw"
              quality={80}
              className={cn(
                "object-cover transition-opacity duration-700 ease-[var(--ease-organic)]",
                item.slug === active?.slug ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <p aria-live="polite" className="mt-6 min-h-[4.5rem] max-w-[42ch] text-body-md text-body">
          {active?.description}
        </p>
      </div>
    </div>
  );
}
