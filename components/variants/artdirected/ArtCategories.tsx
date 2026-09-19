import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryWall, type WallItem } from "@/components/variants/artdirected/CategoryWall";
import { artWall } from "@/data/variants/artDirected";
import { getHomeCategoryCards } from "@/lib/catalogue";
import { routes } from "@/lib/routes";

/** Server binding for the typographic category wall. */
export function ArtCategories() {
  const { eyebrow, heading, body, cta } = artWall;

  const items: WallItem[] = getHomeCategoryCards().map((category, index) => ({
    slug: category.slug,
    index: String(index + 1).padStart(2, "0"),
    label: category.shortTitle,
    description: category.description,
    href: routes.toolCategory(category.slug),
    image: category.image,
  }));

  return (
    <section
      aria-labelledby="art-categories"
      className="relative isolate overflow-hidden bg-band-deep py-20 text-on-band lg:py-28"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow tone="on-band">{eyebrow}</Eyebrow>
            <h2 id="art-categories" className="mt-5 text-display-md text-on-band">
              {heading}
            </h2>
          </div>
          <div className="max-w-sm md:pb-1">
            <p className="text-body-md text-on-band-muted">{body}</p>
            <ArrowLink href={cta.href} tone="on-band" className="mt-4">
              {cta.label}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16" distance={22}>
          <CategoryWall items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
