import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryOrbit, type OrbitItem } from "@/components/variants/botanical/CategoryOrbit";
import { botanicalNav } from "@/data/variants/botanical";
import { getHomeCategoryCards } from "@/lib/catalogue";
import { routes } from "@/lib/routes";

/** Server binding for the botanical category ring. */
export function BotanicalCategories() {
  const { eyebrow, heading, body, cta } = botanicalNav;

  const items: OrbitItem[] = getHomeCategoryCards().map((category) => ({
    slug: category.slug,
    label: category.shortTitle,
    description: category.description,
    href: routes.toolCategory(category.slug),
    image: category.image,
  }));

  return (
    <section aria-labelledby="botanical-categories" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <h2 id="botanical-categories" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-body-md text-body">{body}</p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" distance={24}>
          <CategoryOrbit items={items} />
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
