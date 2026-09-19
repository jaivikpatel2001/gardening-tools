import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

type Ratio = "16/9" | "16/10" | "4/3" | "3/4" | "1/1" | "3/2" | "4/5" | "21/9";

const RATIO_CLASS: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "21/9": "aspect-[21/9]",
};

// Written out in full rather than interpolated — Tailwind only sees literal
// class names, so `rounded-${radius}` would silently produce no CSS.
// The level follows the plate's size (see the radius scale in globals.css):
// `sm` for thumbnails up to 64px, `md` up to ~200px, `lg` for card and body
// imagery, `xl` for hero and feature media. `none` is only for a plate clipped
// by a rounded parent card.
const RADIUS_CLASS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  none: "",
} as const;

interface ImagePlateProps {
  /** Source and alt text travel together, so a plate can never lose its alt. */
  image: ImageAsset;
  ratio?: Ratio;
  /** Required: without it `fill` images only get a 1x/2x srcset. */
  sizes: string;
  className?: string;
  imageClassName?: string;
  radius?: keyof typeof RADIUS_CLASS;
  /** Above-the-fold imagery only. Replaces Next 16's deprecated `priority`. */
  preload?: boolean;
  zoomOnHover?: boolean;
  quality?: number;
  children?: ReactNode;
}

/**
 * Every photograph on the site goes through here: a fixed aspect ratio so
 * nothing shifts as images load, the design system's corner radius, and one
 * shared 1.03 hover scale that cards opt into via `group-hover`.
 *
 * Taking an `ImageAsset` rather than separate `src`/`alt` props is deliberate —
 * it makes it structurally impossible to add an image without its alt text.
 */
export function ImagePlate({
  image,
  ratio = "4/3",
  sizes,
  className,
  imageClassName,
  radius = "lg",
  preload = false,
  zoomOnHover = true,
  quality = 80,
  children,
}: ImagePlateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-soft",
        RATIO_CLASS[ratio],
        RADIUS_CLASS[radius],
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        className={cn(
          "object-cover",
          zoomOnHover &&
            "transition-transform duration-500 ease-[var(--ease-organic)] group-hover:scale-[1.03]",
          imageClassName,
        )}
      />
      {children}
    </div>
  );
}
