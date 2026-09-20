import Image from "next/image";
import Link from "next/link";

import { BRAND_LOGO } from "@/config/brand";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * The client's JIVA logo, exactly as supplied: it is never recoloured.
 *
 * Its wordmark is dark green, so on a deep band (`on-band`) and in the dark
 * theme it sits on a small white plate rather than being knocked out to white.
 * The link carries the accessible name, so the image itself is decorative.
 */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "on-band" }) {
  return (
    <Link
      href={routes.home}
      aria-label="Jiva Greens home"
      className={cn(
        "inline-flex items-center rounded-sm transition-colors duration-300",
        tone === "on-band" ? "bg-white px-2.5 py-1.5" : "dark:bg-white dark:px-2.5 dark:py-1.5",
        className,
      )}
    >
      <Image
        src={BRAND_LOGO.src}
        alt=""
        width={BRAND_LOGO.width}
        height={BRAND_LOGO.height}
        quality={90}
        preload
        // No `sizes`: this is a fixed-size image, not a responsive one, so Next
        // emits a 1x/2x srcset from `width`. With `sizes` it was treated as
        // responsive and the preload tag carried the full width ladder up to
        // 3840w, about 1.4 KB of markup on every page, for artwork whose source
        // is 273px wide and which never renders wider than about 140.
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
