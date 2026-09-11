import { cn } from "@/lib/cn";

/**
 * Rating row. The numeric value is exposed to assistive technology through a
 * visually hidden label, so the rating is never communicated by colour alone.
 */
export function StarRating({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(value);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="sr-only">{`Rated ${value} out of 5`}</span>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={cn("h-4 w-4", index < rounded ? "text-accent" : "text-hairline-strong")}
          fill="currentColor"
        >
          <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.68L10 14.4l-4.97 2.7 1.03-5.68-4.06-3.9 5.53-.72L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}
