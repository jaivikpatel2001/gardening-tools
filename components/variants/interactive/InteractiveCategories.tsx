import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  CategorySelector,
  type SelectorItem,
} from "@/components/variants/interactive/CategorySelector";
import { interactiveSelector } from "@/data/variants/interactive";
import { getHomeCategoryCards } from "@/lib/catalogue";
import { routes } from "@/lib/routes";

/**
 * Server binding for the category selector. The catalogue is read here and
 * reduced to the five plain fields the interactive list needs, so
 * `lib/catalogue` and `data/toolCategories` never cross the client boundary.
 */
export function InteractiveCategories() {
  const { eyebrow, heading, body, cta } = interactiveSelector;

  const items: SelectorItem[] = getHomeCategoryCards().map((category) => ({
    slug: category.slug,
    label: category.shortTitle,
    description: category.description,
    href: routes.toolCategory(category.slug),
    image: category.image,
  }));

  return (
    <section aria-labelledby="interactive-categories" className="bg-surface-warm py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="interactive-categories" className="mt-5 text-display-md text-ink">
              {heading}
            </h2>
          </div>
          <div className="max-w-sm md:pb-1">
            <p className="text-body-md text-body">{body}</p>
            <ArrowLink href={cta.href} className="mt-4">
              {cta.label}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16" distance={24}>
          <CategorySelector items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
