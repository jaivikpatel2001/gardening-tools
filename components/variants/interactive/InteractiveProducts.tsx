import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ProductRail, type RailItem } from "@/components/variants/interactive/ProductRail";
import { interactiveRail } from "@/data/variants/interactive";
import { featuredProducts } from "@/data/products";
import { routes } from "@/lib/routes";

/**
 * Server binding for the horizontal product rail: the featured tools joined to
 * their spec lines and reduced to plain props before they cross into the client
 * component that handles dragging.
 */
export function InteractiveProducts() {
  const { eyebrow, heading, body, dragHint, specs } = interactiveRail;

  const items: RailItem[] = featuredProducts.map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    category: tool.category,
    description: tool.description,
    href: routes.productCategory(tool.categorySlug),
    image: tool.image,
    specs: specs[tool.slug] ?? [],
  }));

  return (
    <section aria-labelledby="interactive-products" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="interactive-products" className="mt-5 text-display-md text-ink">
              {heading}
            </h2>
          </div>
          <p className="font-body text-caption uppercase tracking-[0.16em] text-muted md:pb-2">
            {body}
          </p>
        </Reveal>
      </Container>

      {/* The rail runs to the right edge of the screen on purpose: a track that
          stops inside the column looks like a grid that failed to wrap. */}
      <div className="mt-12 pl-4 sm:pl-6 lg:mt-16 lg:pl-[calc((100vw-min(100vw,1464px))/2+2rem)]">
        <Reveal distance={24}>
          <ProductRail items={items} dragHint={dragHint} />
        </Reveal>
      </div>
    </section>
  );
}
