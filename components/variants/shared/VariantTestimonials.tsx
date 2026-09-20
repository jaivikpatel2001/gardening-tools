import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { cn } from "@/lib/cn";

/**
 * The testimonials band, for the Home variants that had none.
 *
 * Quiet by design, exactly as the live Home page is: no hover lift, no shadow
 * escalation and no verified badges, because the design system is explicit that
 * this section must not read as e-commerce reviews.
 */

type Layout = "rows" | "columns" | "plates";

interface VariantTestimonialsProps {
  variant: VariantId;
  layout?: Layout;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}

export function VariantTestimonials({
  variant,
  layout = "rows",
  tone = "canvas",
  id,
}: VariantTestimonialsProps) {
  const copy = variantSectionCopy[variant].testimonials;
  const sectionId = id ?? `variant${variant}-testimonials`;
  const headingId = `${sectionId}-heading`;

  return (
    <Section id={sectionId} tone={tone} labelledBy={headingId}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id={headingId} className="mt-4 text-display-md text-ink">
            {copy.heading}
          </h2>
          <p className="mt-4 text-body-md text-body">{variantSectionBody.testimonials}</p>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.08}
          className={cn(
            "mt-12",
            layout === "rows" && "flex flex-col border-t border-hairline",
            layout === "columns" && "grid gap-10 lg:grid-cols-3",
            layout === "plates" && "grid gap-6 lg:grid-cols-3",
          )}
        >
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className={cn(
                layout === "rows" && "border-b border-hairline py-8",
                layout === "plates" && "rounded-lg border border-hairline-soft bg-surface p-6",
              )}
            >
              <figure className={cn(layout === "rows" && "lg:grid lg:grid-cols-12 lg:gap-10")}>
                <div className={cn(layout === "rows" && "lg:col-span-8")}>
                  <StarRating value={testimonial.rating} />
                  <blockquote className="mt-4 text-body-md text-body">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption
                  className={cn(
                    "flex items-center gap-3.5",
                    layout === "rows"
                      ? "mt-6 lg:col-span-4 lg:mt-0"
                      : "mt-6 border-t border-hairline-soft pt-5",
                  )}
                >
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
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
