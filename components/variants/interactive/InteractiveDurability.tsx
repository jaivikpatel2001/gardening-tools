import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import {
  DurabilityScroller,
  type DurabilityItem,
} from "@/components/variants/interactive/DurabilityScroller";
import { benefits } from "@/data/benefits";
import { interactiveDurability } from "@/data/variants/interactive";

/**
 * Server binding for the sticky durability section. The photograph is handed
 * down as `children`, so the image stays a server component and the client
 * bundle carries only the scroll highlight.
 */
export function InteractiveDurability() {
  const { eyebrow, heading, body, image } = interactiveDurability;

  const items: DurabilityItem[] = benefits.map((benefit) => ({
    index: benefit.index,
    title: benefit.title,
    description: benefit.description,
  }));

  return (
    <section aria-labelledby="interactive-durability" className="bg-surface-elevated py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="interactive-durability" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-body-md text-body">{body}</p>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <DurabilityScroller items={items}>
            <ImagePlate
              image={image}
              ratio="3/4"
              sizes="(max-width: 1127px) 92vw, 38vw"
              radius="xl"
              zoomOnHover={false}
              className="bg-surface-soft"
            />
          </DurabilityScroller>
        </div>
      </Container>
    </section>
  );
}
