"use client";

import { useState } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

/**
 * The product category gallery.
 *
 * One large plate with a row of thumbnails beneath it. With a single
 * photograph, which is where most categories currently stand, it renders that
 * photograph and no thumbnails rather than padding the row with pictures of
 * something else.
 *
 * The thumbnails are real buttons in a tab list, so the gallery is operable
 * from the keyboard and announces which image is shown. Photographs are always
 * rounded, per the visual system.
 */
export function ProductGallery({ images, title }: { images: readonly ImageAsset[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <ImagePlate
        image={current}
        ratio="4/3"
        sizes="(max-width: 1127px) 92vw, 46vw"
        radius="xl"
        preload
        zoomOnHover={false}
      />

      {images.length > 1 ? (
        <div role="tablist" aria-label={`${title} photographs`} className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show photograph ${index + 1} of ${images.length}`}
                onClick={() => setActive(index)}
                {...cursorIntent("view")}
                className={cn(
                  "w-[76px] shrink-0 overflow-hidden rounded-md border-2 transition-colors duration-200 sm:w-[92px]",
                  selected ? "border-brand" : "border-transparent hover:border-hairline-strong",
                )}
              >
                <ImagePlate
                  image={image}
                  ratio="1/1"
                  sizes="92px"
                  radius="none"
                  zoomOnHover={false}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
