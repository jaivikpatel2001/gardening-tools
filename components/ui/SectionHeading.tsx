import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * Eyebrow + heading + supporting copy. Every section on the page uses this, so
 * the typographic relationship between the three is identical throughout.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "start",
  tone = "default",
  as: Tag = "h2",
  className,
  action,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "default" | "on-band";
  as?: "h2" | "h3";
  className?: string;
  /** Optional trailing action, e.g. a "View all" link on the desktop right. */
  action?: ReactNode;
}) {
  const onBand = tone === "on-band";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        Boolean(action) && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center")}>
        <Eyebrow tone={onBand ? "on-band" : "brand"}>{eyebrow}</Eyebrow>

        <Tag
          id={id}
          className={cn(
            "text-display-md max-w-2xl",
            onBand ? "text-on-band" : "text-ink",
            align === "center" && "mx-auto",
          )}
        >
          {title}
        </Tag>

        {description ? (
          <p
            className={cn(
              "text-body-md max-w-xl",
              onBand ? "text-on-band-muted" : "text-body",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
    </div>
  );
}
