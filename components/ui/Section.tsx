import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "canvas" | "surface" | "warm" | "elevated" | "soft" | "band" | "band-soft";

const TONE_CLASS: Record<Tone, string> = {
  canvas: "bg-canvas text-body",
  surface: "bg-surface text-body",
  warm: "bg-surface-warm text-body",
  elevated: "bg-surface-elevated text-body",
  soft: "bg-surface-soft text-body",
  band: "bg-band text-on-band",
  "band-soft": "bg-band-soft text-on-band-soft",
};

/**
 * Section shell. `tone` is the only way a section sets its background, which is
 * what keeps the alternating rhythm down the page auditable in one place
 * (see `app/page.tsx`) rather than scattered across twelve components.
 */
export function Section({
  children,
  id,
  tone = "canvas",
  size = "default",
  className,
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  size?: "default" | "lg" | "none";
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate",
        TONE_CLASS[tone],
        size === "default" && "section-y",
        size === "lg" && "section-y-lg",
        className,
      )}
    >
      {children}
    </section>
  );
}
