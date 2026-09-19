import Image from "next/image";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ConceptIntro } from "@/components/variants/shared/ConceptIntro";
import { botanicalHero } from "@/data/variants/botanical";

/**
 * Variant 3 hero: a true split screen, cream against garden.
 *
 * The left half is a warm panel that starts at the site's content edge, so the
 * headline still lines up with everything below it; the right half runs off the
 * side of the screen and is cut by a single deep arc. That arc is the whole
 * botanical idea of this concept: an organic boundary drawn in geometry rather
 * than a leaf illustration pasted behind the text.
 */
export function BotanicalHero() {
  const { eyebrow, headingLines, body, primaryCta, secondaryCta, meta, image } = botanicalHero;

  return (
    <ConceptIntro>
      <section
        aria-labelledby="botanical-hero-heading"
        className="relative isolate bg-surface-warm lg:grid lg:min-h-[94svh] lg:grid-cols-2 lg:items-center"
      >
        <div className="px-4 pb-14 pt-32 sm:px-6 lg:py-24 lg:pl-[calc((100vw-min(100vw,1464px))/2+2rem)] lg:pr-16">
          <div className="max-w-[34rem]">
            <p
              data-v-fade
              className="flex items-center gap-3 font-body text-eyebrow uppercase text-brand-soft"
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand-soft/60" />
              {eyebrow}
            </p>

            <h1 id="botanical-hero-heading" className="mt-7 text-display-2xl text-ink">
              {headingLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span
                    data-v-line
                    className={index === 1 ? "block text-brand" : "block"}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p data-v-fade className="mt-7 max-w-[30rem] text-body-lg text-body">
              {body}
            </p>

            <div data-v-fade className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                  <ArrowIcon />
                </Button>
              </MagneticButton>
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </div>

            <dl data-v-fade className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-7">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block font-heading text-display-sm font-extrabold text-ink">
                      {item.value}
                    </span>
                    <span className="mt-1 block max-w-[18ch] font-body text-caption text-muted">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* The photograph keeps to the container's right gutter and starts
            below the header, so the navigation never sits on the image. */}
        <div
          data-v-parallax
          className="relative px-4 pb-6 sm:px-6 lg:h-[94svh] lg:pb-8 lg:pl-0 lg:pr-[calc((100vw-min(100vw,1464px))/2+2rem)] lg:pt-[6.25rem]"
        >
          <div
            data-v-mask
            className="relative h-[62vh] min-h-[24rem] overflow-hidden rounded-xl rounded-tl-arch lg:h-full lg:min-h-0 lg:rounded-bl-organic"
          >
            <Image
              data-v-zoom
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1127px) 100vw, 50vw"
              quality={80}
              preload
              loading="eager"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </ConceptIntro>
  );
}
