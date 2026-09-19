import Image from "next/image";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ConceptIntro } from "@/components/variants/shared/ConceptIntro";
import { catalogueHero } from "@/data/variants/catalogue";
import { getGroupedCategories } from "@/lib/catalogue";

/**
 * Variant 5 hero: a catalogue cover with its own contents page.
 *
 * None of the other variants tells the reader what is on the page before they
 * scroll. This one does: a masthead strip, the title, and a numbered contents
 * list whose entries jump to the sections below, then a single wide plate with
 * a caption under it, the way a printed catalogue opens.
 */
export function CatalogueHero() {
  const { edition, eyebrow, headingLines, body, primaryCta, secondaryCta, meta, contents, image, caption } =
    catalogueHero;

  const categoryCount = getGroupedCategories().reduce(
    (total, group) => total + group.categories.length,
    0,
  );

  const masthead = [
    { label: "Catalogue", value: edition },
    ...meta,
    { label: "Categories", value: String(categoryCount) },
  ];

  return (
    <ConceptIntro>
      <section aria-labelledby="catalogue-hero-heading" className="bg-canvas pb-16 pt-24 lg:pb-24 lg:pt-28">
        <Container>
          {/* Masthead. A ruled strip of facts, set like a catalogue's cover line. */}
          <dl
            data-v-fade
            className="grid grid-cols-2 gap-px border-y border-hairline bg-hairline sm:grid-cols-5"
          >
            {masthead.map((item, index) => (
              <div
                key={item.label}
                className={index === 0 ? "col-span-2 bg-canvas py-3.5 pr-3 sm:col-span-1" : "bg-canvas px-3 py-3.5 sm:px-4"}
              >
                <dt className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                  {item.label}
                </dt>
                <dd className="mt-1 font-heading text-[0.9375rem] font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div data-v-fade>
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>

              <h1 id="catalogue-hero-heading" className="mt-6 text-display-2xl text-ink">
                {headingLines.map((line) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <span data-v-line className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p data-v-fade className="mt-7 max-w-[36rem] text-body-lg text-body">
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
            </div>

            <nav data-v-fade aria-label="On this page" className="lg:col-span-4 lg:pt-2">
              <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">Contents</p>
              <ol className="mt-4 border-t border-ink">
                {contents.map((entry) => (
                  <li key={entry.href} className="border-b border-hairline">
                    <a
                      href={entry.href}
                      className="group flex min-h-12 items-center gap-4 py-2.5 font-body text-body-sm text-ink transition-colors duration-200 hover:text-brand"
                    >
                      <span className="font-heading text-caption font-bold tabular-nums text-muted group-hover:text-brand">
                        {entry.number}
                      </span>
                      <span className="flex-1">{entry.title}</span>
                      <ArrowIcon className="rotate-90 opacity-40 transition-opacity duration-200 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <figure className="mt-14 lg:mt-20">
            {/* Cropped high on purpose: the plate carries small printed labels along
                its foot, and the photography rules allow no text in frame. */}
            <div data-v-mask className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface-soft lg:aspect-[21/9]">
              <Image
                data-v-zoom
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1463px) 100vw, 1400px"
                quality={80}
                preload
                loading="eager"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-4 font-body text-caption text-muted">
              <span>{caption}</span>
              <span className="uppercase tracking-[0.16em]">{edition}</span>
            </figcaption>
          </figure>
        </Container>
      </section>
    </ConceptIntro>
  );
}
