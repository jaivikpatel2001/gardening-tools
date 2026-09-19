import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductStage } from "@/components/variants/interactive/ProductStage";
import { ConceptIntro } from "@/components/variants/shared/ConceptIntro";
import { interactiveHero } from "@/data/variants/interactive";

/**
 * Variant 2 hero: a single tool under examination.
 *
 * Where variant 1 opens on a landscape, this opens on an object: the tool is
 * raised on a white plate over the warm canvas, lit by one soft sage pool, with
 * the four things worth knowing about it marked on the photograph itself.
 *
 * The copy is server rendered here and the interaction lives in `ProductStage`,
 * which receives plain props, so the client bundle carries the behaviour and
 * not the text.
 */
export function InteractiveHero() {
  const { eyebrow, product, headingLines, body, cta, scrollCue, hint, image, hotspots, specs } =
    interactiveHero;

  return (
    <ConceptIntro>
      <section
        aria-labelledby="interactive-hero-heading"
        className="relative isolate overflow-hidden bg-canvas pb-16 pt-28 lg:pb-24 lg:pt-32"
      >
        {/* One soft pool of light behind the object, so the composition has a
            centre. Radial gradient, no image, no cost. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[58%] top-1/2 -z-10 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--surface-soft),transparent_62%)]"
        />

        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div data-v-fade>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <p data-v-fade className="mt-6 font-body text-caption uppercase tracking-[0.2em] text-muted">
              {product}
            </p>

            <h1 id="interactive-hero-heading" className="mt-4 text-display-xl text-ink">
              {headingLines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span data-v-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p data-v-fade className="mt-6 max-w-[34rem] text-body-lg text-body">
              {body}
            </p>

            <div data-v-fade className="mt-9">
              <Button href={cta.href} size="lg">
                {cta.label}
                <ArrowIcon />
              </Button>
            </div>

            <p
              data-v-fade
              className="mt-12 flex items-center gap-3 font-body text-caption uppercase tracking-[0.16em] text-muted"
            >
              <span aria-hidden="true" className="h-px w-12 bg-hairline-strong" />
              {scrollCue}
            </p>
          </div>

          <div data-v-fade className="lg:col-span-7">
            <ProductStage image={image} hotspots={hotspots} specs={specs} hint={hint} />
          </div>
        </Container>
      </section>
    </ConceptIntro>
  );
}
