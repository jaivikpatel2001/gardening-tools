import { cn } from "@/lib/cn";

/**
 * The single arrow glyph used by every CTA on the site.
 *
 * It exists as a component because the same inline SVG was previously pasted
 * into four call sites — hero, final CTA, newsletter, arrow links — and one of
 * those copies had already drifted in stroke weight.
 *
 * Always decorative: the surrounding button or link carries the label.
 */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
