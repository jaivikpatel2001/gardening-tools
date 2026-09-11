import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The 1400px content column with breakpoint-appropriate gutters. Every section
 * uses it, which is what keeps vertical alignment consistent down the page.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}
