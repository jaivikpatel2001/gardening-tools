import Image from "next/image";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TypeHeroMotion } from "@/components/variants/artdirected/TypeHeroMotion";
import { ConceptIntro } from "@/components/variants/shared/ConceptIntro";
import { artHero } from "@/data/variants/artDirected";

/**
 * Variant 4 hero: type as the image.
 *
 * Two words at display size with a cropped photograph standing between them,
 * one word behind the photograph and one in front, which is what gives a flat
 * page depth without a single shadow. Everything else in the frame is deliberate
 * emptiness.
 *
 * The photograph's centring lives on its wrapper and the scroll transform lives
 * on the element inside it: a GSAP transform and a Tailwind `-translate-x-1/2`
 * on the same element would fight over the same property.
 */
export function TypeHero() {
  const { eyebrow, words, body, cta, meta, scrollCue, image } = artHero;
  const [first, second] = words;

  return (
    <ConceptIntro>
      <TypeHeroMotion>
        <section
          aria-labelledby="art-hero-heading"
          // Extra room at the foot on a phone: the concept switcher sits in
          // that corner while the five directions are being reviewed.
          className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-canvas pb-24 pt-28 sm:pb-20 lg:pb-24"
        >
          <Container>
            <p
              data-v-fade
              className="flex items-center gap-3 font-body text-eyebrow uppercase text-brand-soft"
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand-soft/60" />
              {eyebrow}
            </p>
          </Container>

          <Container className="relative flex-1">
            <div className="relative flex h-full min-h-[52vh] flex-col justify-center py-10 lg:min-h-0">
              <h1 id="art-hero-heading" className="relative">
                <span className="relative z-10 block overflow-hidden pb-[0.04em]">
                  <span data-v-line data-drift="left" className="block text-display-3xl text-ink">
                    {first}
                  </span>
                </span>

                {/* The object, cropped and centred between the two words. On a
                    phone the words fill the width, so the photograph drops into
                    the flow between them instead of covering their letters. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none relative z-20 my-5 flex justify-center lg:absolute lg:inset-x-0 lg:top-1/2 lg:my-0 lg:-translate-y-1/2"
                >
                  <span
                    data-drift="rise"
                    className="block w-[clamp(9rem,22vw,20rem)]"
                  >
                    <span
                      data-v-mask
                      className="relative block aspect-[3/4] overflow-hidden rounded-md bg-surface-soft"
                    >
                      <Image
                        data-v-zoom
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 1127px) 40vw, 22vw"
                        quality={80}
                        preload
                        loading="eager"
                        className="object-cover"
                      />
                    </span>
                  </span>
                </span>

                <span className="relative z-30 block overflow-hidden pb-[0.04em] text-right">
                  <span data-v-line data-drift="right" className="block text-display-3xl text-ink">
                    {second}
                  </span>
                </span>
              </h1>
            </div>
          </Container>

          <Container>
            <div
              data-v-fade
              className="flex flex-col gap-8 border-t border-hairline pt-7 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-[26rem]">
                <p className="text-body-md text-body">{body}</p>
                <MagneticButton className="mt-6">
                  <Button href={cta.href} size="lg">
                    {cta.label}
                    <ArrowIcon />
                  </Button>
                </MagneticButton>
              </div>

              <div className="flex items-end gap-10">
                <dl className="flex gap-10">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-heading text-display-sm font-extrabold text-ink">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="hidden items-center gap-3 font-body text-caption uppercase tracking-[0.16em] text-muted sm:flex">
                  {scrollCue}
                  <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
                </p>
              </div>
            </div>
          </Container>
        </section>
      </TypeHeroMotion>
    </ConceptIntro>
  );
}
