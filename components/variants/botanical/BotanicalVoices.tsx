import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { botanicalVoices } from "@/data/variants/botanical";
import { testimonials } from "@/data/testimonials";

/**
 * Variant 3 testimonials: one quotation given the weight of a pull quote, the
 * other two set quietly beside it. Three equal cards would flatten them into a
 * review widget, which is the one thing a brand page must not look like.
 */
export function BotanicalVoices() {
  const { eyebrow, heading } = botanicalVoices;
  const [featured, ...rest] = testimonials;

  return (
    <section aria-labelledby="botanical-voices" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="botanical-voices" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <figure className="rounded-2xl rounded-tl-organic bg-surface-soft p-8 lg:p-12">
              <StarRating value={featured.rating} />
              <blockquote className="mt-6 font-heading text-display-sm font-bold leading-[1.3] text-ink">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface">
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    sizes="56px"
                    quality={80}
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block font-body text-body-md font-semibold text-ink">
                    {featured.name}
                  </span>
                  <span className="block font-body text-caption text-muted">
                    {featured.role}, {featured.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal as="ul" className="flex flex-col gap-8 lg:col-span-5" stagger={0.08}>
            {rest.map((testimonial) => (
              <li key={testimonial.name} className="border-t border-hairline pt-8 first:border-t-0 first:pt-0">
                <StarRating value={testimonial.rating} />
                <blockquote className="mt-4 text-body-md text-body">{testimonial.quote}</blockquote>
                <div className="mt-5 flex items-center gap-3">
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
        </div>
      </Container>
    </section>
  );
}
