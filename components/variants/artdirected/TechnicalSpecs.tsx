import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { artTechnical } from "@/data/variants/artDirected";

/**
 * Variant 4 features: a specification sheet.
 *
 * One macro photograph held at the top of the screen while six technical notes
 * pass it, set as a two column table rather than as six icon cards. The
 * photograph does the persuading and the type does the explaining, which is the
 * division of labour this whole concept runs on.
 */
export function TechnicalSpecs() {
  const { eyebrow, heading, body, image, items } = artTechnical;

  return (
    <section aria-labelledby="art-technical" className="bg-surface-warm py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 id="art-technical" className="mt-5 text-display-md text-ink">
                  {heading}
                </h2>
                <p className="mt-5 max-w-sm text-body-md text-body">{body}</p>
              </Reveal>

              <Reveal className="mt-8" distance={24}>
                <ImagePlate
                  image={image}
                  ratio="4/5"
                  sizes="(max-width: 1127px) 92vw, 38vw"
                  radius="lg"
                  zoomOnHover={false}
                />
              </Reveal>
            </div>
          </div>

          <Reveal
            as="ol"
            className="grid gap-px overflow-hidden bg-hairline lg:col-span-7 lg:grid-cols-2"
            stagger={0.07}
          >
            {items.map((item) => (
              <li key={item.index} className="bg-surface-warm p-6 lg:p-8">
                <p className="font-heading text-caption font-bold tracking-[0.2em] text-brand-soft">
                  {item.index}
                </p>
                <h3 className="mt-4 text-title-lg text-ink">{item.title}</h3>
                <p className="mt-3 text-body-sm text-body">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
