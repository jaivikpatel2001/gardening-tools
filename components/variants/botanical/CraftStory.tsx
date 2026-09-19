import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { botanicalStory } from "@/data/variants/botanical";
import { cn } from "@/lib/cn";

/**
 * Variant 3 brand story: four chapters, four arches, stepped down the page so
 * the pair never sits as a tidy two-by-two.
 *
 * The arch is used at four different heights here, which is what keeps a
 * repeated shape from reading as a template.
 */
const CHAPTER_SHAPE = [
  { ratio: "4/5", radius: "rounded-t-arch rounded-b-lg", offset: "" },
  { ratio: "1/1", radius: "rounded-lg", offset: "lg:mt-20" },
  { ratio: "3/4", radius: "rounded-b-arch rounded-t-lg", offset: "lg:-mt-10" },
  { ratio: "4/5", radius: "rounded-t-arch rounded-b-lg", offset: "lg:mt-10" },
] as const;

export function CraftStory() {
  const { eyebrow, heading, body, cta, chapters } = botanicalStory;

  return (
    <section aria-labelledby="botanical-story" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="botanical-story" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-body-md text-body">{body}</p>
            <ArrowLink href={cta.href} className="mt-4">
              {cta.label}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8"
          stagger={0.09}
        >
          {chapters.map((chapter, index) => {
            const shape = CHAPTER_SHAPE[index];
            return (
              <li key={chapter.key} className={cn("group", shape.offset)}>
                <ImagePlate
                  image={chapter.image}
                  ratio={shape.ratio}
                  sizes="(max-width: 743px) 92vw, (max-width: 1127px) 46vw, 23vw"
                  radius="none"
                  className={shape.radius}
                />
                <h3 className="mt-6 font-heading text-title-lg text-ink">{chapter.title}</h3>
                <p className="mt-3 text-body-sm text-body">{chapter.body}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
