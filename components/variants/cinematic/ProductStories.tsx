import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { cinematicProducts } from "@/data/variants/cinematic";
import { featuredTools } from "@/data/tools";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * Variant 1 products: four long-form spreads instead of a row of cards.
 *
 * Each tool gets a full band of the page, image on one side and a written
 * chapter on the other, and the sides swap every time so the reader's eye
 * crosses the column on every scroll. The photograph takes six columns against
 * the text's five, with an empty column between, so the alternation reads as
 * a spread rather than a two column grid while staying inside the container.
 */
export function ProductStories() {
  const { eyebrow, heading, stories, cta } = cinematicProducts;

  return (
    <section aria-labelledby="cinematic-products" className="bg-surface-warm py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="cinematic-products" className="mt-5 text-display-lg text-ink">
            {heading}
          </h2>
        </Reveal>
      </Container>

      <div className="mt-14 flex flex-col gap-20 lg:mt-20 lg:gap-28">
        {stories.map((story, index) => {
          const tool = featuredTools.find((entry) => entry.slug === story.slug);
          if (!tool) return null;

          const imageRight = index % 2 === 1;

          return (
            <Container key={story.slug}>
              <Reveal
                className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-16"
                distance={28}
              >
                <div
                  className={cn(
                    "md:col-span-6",
                    // Both columns are pinned to the first row. With only a column
                    // start, auto-placement moves the text to a second row
                    // whenever it sits left of the image, stranding it below.
                    "md:row-start-1",
                    imageRight && "md:col-start-7",
                  )}
                >
                  <ImagePlate
                    image={tool.image}
                    ratio="1/1"
                    sizes="(max-width: 899px) 92vw, 46vw"
                    radius="xl"
                    zoomOnHover={false}
                    // Stacked, a full-width square is taller than the screen.
                    className="max-md:aspect-[4/3]"
                  />
                </div>

                <div className={cn("md:col-span-6 md:row-start-1 lg:col-span-5", imageRight ? "md:col-start-1" : "md:col-start-7 lg:col-start-8")}>
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-display-sm font-extrabold text-brand-soft">
                      {story.chapter}
                    </span>
                    <span aria-hidden="true" className="h-px w-12 bg-hairline-strong" />
                    <span className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-display-sm text-ink">{tool.name}</h3>
                  <p className="mt-5 text-body-lg text-body">{story.story}</p>

                  <ul className="mt-8 border-t border-hairline">
                    {story.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-between gap-6 border-b border-hairline py-3.5 font-body text-body-sm text-ink"
                      >
                        {feature}
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-soft/70" />
                      </li>
                    ))}
                  </ul>

                  <ArrowLink href={routes.tool(tool.categorySlug, tool.slug)} className="mt-7">
                    View this tool
                  </ArrowLink>
                </div>
              </Reveal>
            </Container>
          );
        })}
      </div>

      <Container className="mt-16 lg:mt-20">
        <Reveal className="flex justify-center border-t border-hairline pt-10">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
