import Image from "next/image";

import { HeroMotion } from "@/components/home/HeroMotion";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { heroContent } from "@/data/home";

/**
 * The flagship section.
 *
 * It sits in the same `container-page` column as the header and every section
 * below, so the headline and the photograph share their edges with the rest of
 * the page. The desktop split lives in the `hero-grid` utility rather than in
 * Tailwind column fractions; see the comment beside it in `globals.css` for why
 * a fixed text measure beats a fractional column here.
 *
 * Mobile follows the required order: text, then CTAs, then image.
 */
export function Hero() {
  const { eyebrow, headingLines, body, primaryCta, secondaryCta, trustLine, card, image, detailImage } =
    heroContent;

  return (
    <HeroMotion>
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-canvas">
        <div className="container-page hero-grid">
          {/* ---------------------------------------------------------- text */}
          <div data-hero-text className="relative z-10 pb-12 pt-28 lg:pb-24 lg:pr-12 lg:pt-24">
            <div className="max-w-[35rem]">
              <div data-hero-fade>
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>

              <h1 id="hero-heading" className="mt-6 text-display-xl text-ink">
                {headingLines.map((line) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <span data-hero-line className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p data-hero-fade className="mt-6 max-w-[30rem] text-body-lg text-body">
                {body}
              </p>

              <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
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

              <p data-hero-fade className="mt-9 flex items-center gap-3 text-caption text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
                {trustLine}
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------- image */}
          <div data-hero-plate className="pb-16 lg:pb-0">
            <div className="relative">
              {/* Organic plate: a broad arc down the left edge, softer corners on
                  the right, so it reads as a shape rather than a cropped box. */}
              <div
                data-hero-plate-inner
                className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto lg:h-[min(74vh,660px)] lg:rounded-l-organic"
              >
                <Image
                  data-hero-zoom
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1127px) 100vw, (max-width: 1463px) 54vw, 800px"
                  quality={80}
                  preload
                  loading="eager"
                  className="object-cover"
                />
              </div>

              {/* Floating trust card, straddling the plate's left edge. */}
              <div
                data-hero-pop
                className="absolute -left-10 top-12 hidden rounded-lg bg-surface p-5 shadow-float lg:block"
              >
                <p className="text-eyebrow uppercase text-brand-soft">{card.eyebrow}</p>
                <p className="mt-2 font-heading text-[0.9375rem] font-bold text-ink">{card.line}</p>
              </div>

              {/* Overlapping detail plate, hanging off the lower-left corner.
                  Desktop only: on mobile it would crowd a screen that is
                  already carrying a full-width image. */}
              <div
                data-hero-pop
                className="absolute -bottom-10 -left-16 hidden w-[clamp(150px,12vw,204px)] overflow-hidden rounded-lg shadow-float lg:block"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={detailImage.src}
                    alt={detailImage.alt}
                    fill
                    sizes="204px"
                    quality={80}
                    // Not preloaded: it would compete with the hero's LCP image
                    // for early bandwidth, and it is display:none below 1128px,
                    // so lazy keeps it off the wire entirely on mobile. It only
                    // animates in at ~1s, by which point it has long arrived.
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroMotion>
  );
}
