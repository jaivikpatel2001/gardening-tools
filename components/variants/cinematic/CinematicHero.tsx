import Image from "next/image";

import { ConceptIntro } from "@/components/variants/shared/ConceptIntro";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cinematicHero } from "@/data/variants/cinematic";

/**
 * Variant 1 hero: one photograph at full viewport, everything else laid over it.
 *
 * The opposite move to the live Home page, where the headline and the
 * photograph sit side by side inside the content column. Here the image is the
 * page and the type is a caption on it, so the entrance is a wipe up the frame
 * rather than a plate sliding into a grid.
 */
export function CinematicHero() {
  const { eyebrow, headingLines, body, cta, secondaryCta, scrollCue, meta, image } = cinematicHero;

  return (
    <ConceptIntro>
      <section
        aria-labelledby="cinematic-hero-heading"
        className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-band-deep text-on-band"
      >
        <div data-v-parallax className="absolute inset-0 -z-10">
          <div data-v-mask className="absolute inset-0">
            <Image
              data-v-zoom
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              quality={80}
              preload
              loading="eager"
              className="object-cover"
            />
          </div>

          {/* Two scrims, not one: the lower keeps the headline readable, the
              upper carries the white header over the bright sky. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[rgba(5,16,9,0.92)] via-[rgba(5,16,9,0.32)] to-[rgba(5,16,9,0.04)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(5,16,9,0.55)] to-transparent"
          />
          {/* And a third from the left, which is what holds the small label and
              body copy at AA over the brightest part of the sky. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[rgba(5,16,9,0.6)] via-[rgba(5,16,9,0.18)] to-transparent"
          />
        </div>

        <Container className="relative pb-24 pt-36 lg:pb-28">
          <div className="max-w-[56rem]">
            <p
              data-v-fade
              className="flex items-center gap-3 font-body text-eyebrow uppercase text-on-band-muted"
            >
              <span aria-hidden="true" className="h-px w-10 bg-white/45" />
              {eyebrow}
            </p>

            <h1 id="cinematic-hero-heading" className="mt-7 text-display-2xl text-on-band">
              {headingLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span data-v-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p data-v-fade className="mt-7 max-w-[30rem] text-body-lg text-on-band-muted">
              {body}
            </p>

            <div data-v-fade className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href={cta.href} variant="inverse" size="lg">
                {cta.label}
                <ArrowIcon />
              </Button>
              <ArrowLink href={secondaryCta.href} tone="on-band">
                {secondaryCta.label}
              </ArrowLink>
            </div>
          </div>

          <div
            data-v-fade
            className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-white/20 pt-6"
          >
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {meta.map((item) => (
                <li key={item} className="font-body text-caption uppercase tracking-[0.14em] text-on-band-muted">
                  {item}
                </li>
              ))}
            </ul>

            {/* Hidden on a phone: the concept switcher sits in that corner
                while the five directions are being reviewed. */}
            <p className="hidden items-center gap-3 font-body text-caption uppercase tracking-[0.14em] text-on-band-muted sm:flex">
              {scrollCue}
              <span aria-hidden="true" className="h-px w-12 bg-white/45" />
            </p>
          </div>
        </Container>
      </section>
    </ConceptIntro>
  );
}
