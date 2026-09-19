import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { catalogueAbout } from "@/data/variants/catalogue";

/**
 * Variant 5 brand story: the catalogue's "about" page.
 *
 * A tall plate, the founding statement set large beside it, two short
 * paragraphs and a fact sheet of four ruled lines. Light and quiet on purpose:
 * the other variants tell this story over a dark photograph, and this one lets
 * the facts carry it.
 */
export function WorkshopFactSheet() {
  const { eyebrow, heading, statement, paragraphs, facts, cta, image, caption } = catalogueAbout;

  return (
    <section
      id="catalogue-about"
      aria-labelledby="catalogue-about-heading"
      className="bg-surface-soft py-20 lg:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="max-lg:max-w-[22rem] lg:col-span-4" distance={24}>
          <ImagePlate
            image={image}
            ratio="3/4"
            sizes="(max-width: 1127px) 92vw, 30vw"
            radius="lg"
            zoomOnHover={false}
          />
          <p className="mt-3 font-body text-caption text-muted">{caption}</p>
        </Reveal>

        <div className="lg:col-span-8 lg:pt-2">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="catalogue-about-heading" className="mt-5 font-body text-caption uppercase tracking-[0.16em] text-muted">
              {heading}
            </h2>
            <p className="mt-6 max-w-[22ch] font-heading text-display-lg text-ink">{statement}</p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            <Reveal className="flex flex-col gap-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-body-md text-body">
                  {paragraph}
                </p>
              ))}
              <ArrowLink href={cta.href} className="mt-2">
                {cta.label}
              </ArrowLink>
            </Reveal>

            <Reveal as="dl" className="border-t-2 border-ink" stagger={0.06}>
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-hairline-strong py-3.5">
                  <dt className="font-body text-caption uppercase tracking-[0.14em] text-muted">{fact.label}</dt>
                  <dd className="font-body text-body-sm font-semibold text-ink">{fact.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
