import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { cinematicVoices } from "@/data/variants/cinematic";
import { testimonials } from "@/data/testimonials";

/**
 * Variant 1 testimonials: three columns separated by rules, in the way a
 * magazine sets three short interviews across a spread. No cards, no shadows,
 * no rounded containers; the quotation carries itself.
 */
export function EditorialVoices() {
  const { eyebrow, heading } = cinematicVoices;

  return (
    <section aria-labelledby="cinematic-voices" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="cinematic-voices" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-12 grid gap-10 border-t border-hairline pt-10 md:grid-cols-3 md:gap-0"
          stagger={0.08}
        >
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="md:border-l md:border-hairline md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <StarRating value={testimonial.rating} />

              <blockquote className="mt-5 font-heading text-title-lg font-bold leading-[1.45] text-ink">
                {testimonial.quote}
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface-soft">
                  <Image
                    src={testimonial.image.src}
                    alt={testimonial.image.alt}
                    fill
                    sizes="44px"
                    quality={80}
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="font-body text-body-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="font-body text-caption text-muted">
                    {testimonial.role}, {testimonial.location}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
