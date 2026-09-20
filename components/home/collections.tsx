import { IndustryCard } from "@/components/cards/IndustryCard";
import { ProductCategoryCard } from "@/components/cards/ProductCategoryCard";
import { ProductShowcaseCard } from "@/components/cards/ProductShowcaseCard";
import { RangeTeaserCard } from "@/components/cards/RangeTeaserCard";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { CategoryIndex } from "@/components/sections/CategoryIndex";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { industries } from "@/data/clients";
import { sectionCopy } from "@/data/home";
import { featuredProducts } from "@/data/products";
import { solutions } from "@/data/solutions";
import { testimonials } from "@/data/testimonials";
import { getCategoriesInGroup, getGroupedCategories, getHomeCategoryCards } from "@/lib/catalogue";

/**
 * The five collection-backed Home sections.
 *
 * Each is a thin binding of copy, data and card to the shared
 * `CollectionSection`. They live together in one file because that is all they
 * are: five configurations, not five components. Any of them can be dropped
 * onto an interior page unchanged, and the Products, Clients and About pages
 * do exactly that.
 */

/**
 * Product categories carry the whole range story: photographed hand-tool
 * categories as cards, a teaser card that turns the reader toward the
 * machinery half, and the complete typographic index beneath, which lists
 * every category whether or not it has been photographed yet.
 */
export function ProductCategories() {
  const copy = sectionCopy.productCategories;
  const machineryTitles = getCategoriesInGroup("machinery").map((category) => category.shortTitle);

  return (
    <CollectionSection
      id="categories"
      tone="canvas"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      cta={copy.cta}
      items={getHomeCategoryCards()}
      getKey={(category) => category.slug}
      renderItem={(category) => <ProductCategoryCard category={category} />}
      trailing={
        <RangeTeaserCard
          eyebrow={copy.teaser.eyebrow}
          title={copy.teaser.title}
          items={machineryTitles}
          cta={copy.teaser.cta}
        />
      }
      footer={
        <CategoryIndex
          id="complete-range"
          eyebrow={copy.index.eyebrow}
          heading={copy.index.heading}
          description={copy.index.description}
          groups={getGroupedCategories()}
        />
      }
      columns={3}
      gap="editorial"
      mobileLayout="scroll"
    />
  );
}

export function FeaturedProducts() {
  const copy = sectionCopy.featuredProducts;
  return (
    <CollectionSection
      id="featured"
      tone="surface"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      cta={copy.cta}
      items={featuredProducts}
      getKey={(product) => product.slug}
      renderItem={(product) => <ProductShowcaseCard product={product} />}
      columns={4}
    />
  );
}

export function SolutionsPreview() {
  const copy = sectionCopy.solutions;
  return (
    <CollectionSection
      id="solutions"
      tone="elevated"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      align="center"
      items={solutions}
      getKey={(solution) => solution.slug}
      renderItem={(solution) => <SolutionCard solution={solution} />}
      columns={4}
      stagger={0.07}
    />
  );
}

/**
 * Clients replaced the Resources preview. Six kinds of customer rather than
 * three guides, which is what a supplier with a twenty-eight year clientele
 * should be leading with.
 */
export function ClientsPreview() {
  const copy = sectionCopy.clients;
  return (
    <CollectionSection
      id="clients"
      tone="soft"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      cta={copy.cta}
      items={industries}
      getKey={(industry) => industry.title}
      renderItem={(industry) => <IndustryCard industry={industry} />}
      columns={3}
      stagger={0.07}
    />
  );
}

export function Testimonials() {
  const copy = sectionCopy.testimonials;
  return (
    <CollectionSection
      id="testimonials"
      tone="canvas"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      align="center"
      items={testimonials}
      getKey={(testimonial) => testimonial.name}
      renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
      columns={3}
      stagger={0.08}
    />
  );
}
