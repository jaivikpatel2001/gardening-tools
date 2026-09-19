import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionFinder, type FinderItem } from "@/components/variants/interactive/SolutionFinder";
import { interactiveFinder } from "@/data/variants/interactive";
import { getCategory } from "@/lib/catalogue";
import { routes } from "@/lib/routes";

/**
 * Server binding for the problem-to-tool finder. Each question names a category
 * slug; the title and the link are resolved from the catalogue here, so a
 * renamed category follows automatically and an unknown slug fails the build.
 */
export function InteractiveSolutions() {
  const { eyebrow, heading, body, items } = interactiveFinder;

  const finderItems: FinderItem[] = items.map((item) => {
    const category = getCategory(item.categorySlug);
    return {
      id: item.id,
      question: item.question,
      answer: item.answer,
      categoryTitle: category.title,
      href: routes.toolCategory(category.slug),
      tools: item.tools,
    };
  });

  return (
    <section aria-labelledby="interactive-solutions" className="bg-surface-soft py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="interactive-solutions" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-body-md text-body">{body}</p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16" distance={24}>
          <SolutionFinder items={finderItems} />
        </Reveal>
      </Container>
    </section>
  );
}
