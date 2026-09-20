import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ImagePlate } from "@/components/ui/ImagePlate";
import type { Solution } from "@/types/content";

/**
 * Solution card. The circular icon badge straddles the image edge, which is the
 * design system's organic-geometry cue. It is decorative; the heading carries
 * the meaning.
 *
 * Deliberately not a link. There is no Services page and no service detail
 * route, so the card states what is offered and the section's own call to
 * action carries the visitor to an enquiry. A card that linked nowhere useful
 * would be worse than a card that does not link at all.
 */
export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;

  return (
    <article
      {...cursorIntent("view")}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline-soft bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 hover:shadow-hover"
    >
      <div className="relative">
        <ImagePlate
          image={solution.image}
          ratio="16/10"
          radius="none"
          sizes="(max-width: 743px) 100vw, (max-width: 1127px) 50vw, 25vw"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-6 left-5 grid h-12 w-12 place-items-center rounded-full bg-brand text-on-brand shadow-card transition-colors duration-300 group-hover:bg-brand-hover"
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-9">
        <h3 className="text-title-md text-ink">{solution.title}</h3>
        <p className="mt-2 flex-1 text-body-sm text-muted">{solution.description}</p>
        <p className="mt-5 border-t border-hairline-soft pt-4 text-caption text-muted">
          <span className="text-brand-soft">For</span> {solution.audience}
        </p>
      </div>
    </article>
  );
}
