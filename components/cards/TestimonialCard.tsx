import Image from "next/image";

import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/types/content";

/**
 * Deliberately quiet: no hover lift, no shadow escalation, no verified badges.
 * The design system is explicit that this section must not read as e-commerce
 * reviews.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-hairline-soft bg-surface p-6">
      <StarRating value={testimonial.rating} />

      <blockquote className="mt-5 flex-1 text-body-md text-body">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-hairline-soft pt-5">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-soft">
          <Image
            src={testimonial.image.src}
            alt={testimonial.image.alt}
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0">
          <span className="block font-body text-[0.9375rem] font-semibold text-ink">
            {testimonial.name}
          </span>
          <span className="block text-caption text-muted">
            {testimonial.role} &middot; {testimonial.location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
