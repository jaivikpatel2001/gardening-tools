"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

export interface OrbitItem {
  slug: string;
  label: string;
  description: string;
  href: string;
  image: ImageAsset;
}

/**
 * Variant 3 categories: names arranged around one arched photograph, which
 * changes to whichever name the reader is on.
 *
 * The arrangement is a three column grid with staggered vertical offsets rather
 * than elements placed by trigonometry: it reads as a loose ring on a wide
 * screen, and it collapses to a legible two column list on a phone without any
 * of the positions having to be undone.
 */
export function CategoryOrbit({ items }: { items: readonly OrbitItem[] }) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const active = items.find((item) => item.slug === activeSlug) ?? items[0];

  const left = items.filter((_, index) => index % 2 === 0);
  const right = items.filter((_, index) => index % 2 === 1);

  function label(item: OrbitItem, align: "left" | "right") {
    const isActive = item.slug === active?.slug;

    return (
      <li key={item.slug} className={align === "right" ? "lg:text-right" : undefined}>
        <Link
          href={item.href}
          onMouseEnter={() => setActiveSlug(item.slug)}
          onFocus={() => setActiveSlug(item.slug)}
          className="group inline-flex flex-col gap-1.5"
          {...cursorIntent("view")}
        >
          <span
            className={cn(
              "font-heading text-[clamp(1.25rem,2.4vw,1.875rem)] font-extrabold leading-tight tracking-[-0.02em] transition-colors duration-300",
              isActive ? "text-brand" : "text-ink group-hover:text-brand",
            )}
          >
            {item.label}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-full origin-left bg-brand transition-transform duration-500 ease-[var(--ease-organic)]",
              align === "right" && "lg:origin-right",
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            )}
          />
        </Link>
      </li>
    );
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
      <ul className="order-2 flex flex-col gap-7 max-lg:hidden lg:order-1 lg:col-span-3 lg:gap-14 lg:pb-16">
        {left.map((item) => label(item, "left"))}
      </ul>

      <div className="order-1 lg:order-2 lg:col-span-6">
        {/* The arch: a full half-round at the top, square-ish at the foot, so
            the photograph reads as a window into a garden. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-t-arch rounded-b-xl bg-surface-soft lg:max-w-[30rem]">
          {items.map((item) => (
            <Image
              key={item.slug}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 1127px) 92vw, 30vw"
              quality={80}
              className={cn(
                "object-cover transition-opacity duration-700 ease-[var(--ease-organic)]",
                item.slug === active?.slug ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <p
          aria-live="polite"
          className="mx-auto mt-7 min-h-[4.5rem] max-w-[34rem] text-center text-body-md text-body"
        >
          {active?.description}
        </p>
      </div>

      <ul className="order-3 flex flex-col gap-7 max-lg:hidden lg:col-span-3 lg:gap-14 lg:pt-16">
        {right.map((item) => label(item, "right"))}
      </ul>

      {/* Below the desktop breakpoint the ring becomes an honest list, with the
          arch above it doing the illustrating. */}
      <ul className="order-4 grid grid-cols-2 gap-x-6 gap-y-5 lg:hidden">
        {items.map((item) => label(item, "left"))}
      </ul>
    </div>
  );
}
