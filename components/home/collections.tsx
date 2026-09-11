import { RangeTeaserCard } from "@/components/cards/RangeTeaserCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { ToolCategoryCard } from "@/components/cards/ToolCategoryCard";
import { ToolShowcaseCard } from "@/components/cards/ToolShowcaseCard";
import { CategoryIndex } from "@/components/sections/CategoryIndex";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { sectionCopy } from "@/data/home";
import { resources } from "@/data/resources";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { featuredTools } from "@/data/tools";
import { getCategoriesInGroup, getGroupedCategories, getHomeCategoryCards } from "@/lib/catalogue";

/**
 * The five collection-backed Home sections.
 *
 * Each is a thin binding of copy, data and card to the shared
 * `CollectionSection`. They live together in one file because that is all they
 * are: five configurations, not five components. Any of them can be dropped
 * onto a future page unchanged.
 */

/**
 * Tool categories carry the whole range story: photographed hand-tool
 * categories as cards, a teaser card that turns the reader toward the
 * machinery half, and the complete typographic index beneath, which lists
 * every category whether or not it has been photographed yet.
 */
export function ToolCategories() {
  const copy = sectionCopy.toolCategories;
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
      renderItem={(category) => <ToolCategoryCard category={category} />}
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

export function FeaturedTools() {
  const copy = sectionCopy.featuredTools;
  return (
    <CollectionSection
      id="featured"
      tone="surface"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      cta={copy.cta}
      items={featuredTools}
      getKey={(tool) => tool.slug}
      renderItem={(tool) => <ToolShowcaseCard tool={tool} />}
      columns={4}
    />
  );
}

export function ServicesPreview() {
  const copy = sectionCopy.services;
  return (
    <CollectionSection
      id="services"
      tone="elevated"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      align="center"
      items={services}
      getKey={(service) => service.slug}
      renderItem={(service) => <ServiceCard service={service} />}
      columns={4}
      stagger={0.07}
    />
  );
}

export function ResourcesPreview() {
  const copy = sectionCopy.resources;
  return (
    <CollectionSection
      id="resources"
      tone="soft"
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={copy.body}
      cta={copy.cta}
      items={resources}
      getKey={(resource) => resource.slug}
      renderItem={(resource) => <ResourceCard resource={resource} />}
      columns={3}
      gap="editorial"
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
