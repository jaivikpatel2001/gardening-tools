import { Check } from "lucide-react";
import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Breadcrumbs, type Crumb } from "@/components/sections/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits } from "@/data/benefits";
import { productDetail } from "@/data/products-page";
import {
  formatPowerSource,
  formatProductName,
  getChildren,
  getGallery,
  getGroupTitle,
  getParent,
  getRelatedCategories,
} from "@/lib/catalogue";
import { routes } from "@/lib/routes";
import type { ProductCategory } from "@/types/content";

/**
 * The product category page, rendered from data.
 *
 * One component for every product in the range, and for every product added
 * later. There is no per-product page component and there must never be one: a
 * product appears here the moment it is added to `data/productCategories.ts`.
 *
 * It renders three shapes from the same data. A range that has types listed
 * under it shows them as cards; a type shows its parent in the breadcrumb and
 * its siblings as related; a plain product shows neither. Nothing about the
 * page is branched on a slug.
 *
 * Everything on the page is either editorial copy written for the category or a
 * value derived from the catalogue. No model number, measurement, price, stock
 * level or rating appears, because none of those have been supplied and none of
 * them would be true.
 */
export function ProductCategoryDetail({ category }: { category: ProductCategory }) {
  const parent = getParent(category);
  const children = getChildren(category.slug);
  const items = category.items ?? [];

  const trail: Crumb[] = [
    { name: "Home", path: routes.home },
    { name: "Products", path: routes.products },
    // A type sits under the range it belongs to, so the trail says so.
    ...(parent ? [{ name: parent.title, path: routes.productCategory(parent.slug) }] : []),
    { name: category.title, path: routes.productCategory(category.slug) },
  ];

  const gallery = getGallery(category);
  const related = getRelatedCategories(category.slug);
  const powerLabel =
    category.powerSources && category.powerSources.length > 0
      ? category.powerSources.map(formatPowerSource).join(", ")
      : productDetail.powerManualOnly;

  const specs = [
    { label: productDetail.specLabels.group, value: getGroupTitle(category.group) },
    { label: productDetail.specLabels.types, value: `${items.length || children.length || 1}` },
    { label: productDetail.specLabels.power, value: powerLabel },
    { label: productDetail.specLabels.supply, value: productDetail.supplyValue },
    { label: productDetail.specLabels.served, value: productDetail.servedValue },
  ];

  return (
    <>
      {/* Hero */}
      <Section
        id="product-hero"
        tone="warm"
        size="none"
        labelledBy="product-hero-heading"
        className="pb-16 pt-28 lg:pb-24 lg:pt-36"
      >
        <Container>
          <Reveal>
            <Breadcrumbs trail={trail} />
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Eyebrow>{getGroupTitle(category.group)}</Eyebrow>
              <h1 id="product-hero-heading" className="mt-5 text-display-xl text-ink">
                {category.title}
              </h1>
              <p className="mt-6 max-w-xl text-body-lg text-body">{category.description}</p>
              <p className="mt-5 max-w-xl text-body-md text-muted">{category.intro}</p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={routes.contact} size="lg">
                  Enquire About This Range
                </Button>
                <Button href={routes.products} size="lg" variant="secondary">
                  All Products
                </Button>
              </div>

              <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-hairline pt-7 sm:grid-cols-3">
                {specs.slice(0, 3).map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-eyebrow uppercase text-muted">{spec.label}</dt>
                    <dd className="mt-1.5 font-heading text-title-sm text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="lg:col-span-6">
              {gallery.length > 0 ? (
                <ProductGallery images={gallery} title={category.title} />
              ) : (
                // Not photographed yet. A typographic plate is honest; a stock
                // photograph of something else would not be.
                <div className="flex aspect-[4/3] flex-col justify-between rounded-xl border border-hairline bg-surface p-8">
                  <p className="text-eyebrow uppercase text-brand-soft">
                    {getGroupTitle(category.group)}
                  </p>
                  <div>
                    <p className="font-heading text-display-lg leading-none text-hairline-strong">
                      {String(items.length || children.length || 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-body-sm text-muted">
                      Product types in this range. Photography for this product is on its way.
                    </p>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The types listed under this range, each its own page */}
      {children.length > 0 ? (
        <Section id="types" tone="surface" size="lg" labelledBy="types-heading">
          <Container>
            <Reveal className="max-w-2xl">
              <SectionHeading
                id="types-heading"
                eyebrow="Choose a type"
                title={`${category.title} by Type`}
                description="Each one is a different machine with a different job. Open the one that matches the lawn."
              />
            </Reveal>

            <Reveal as="ul" stagger={0.06} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
                <li key={child.slug} className="flex">
                  <Link
                    href={routes.productCategory(child.slug)}
                    {...cursorIntent("view")}
                    className="group flex h-full w-full flex-col rounded-lg border border-hairline-soft bg-canvas p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 hover:shadow-hover"
                  >
                    <h3 className="text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
                      {child.title}
                    </h3>
                    <p className="mt-2 flex-1 text-body-sm text-muted">{child.description}</p>
                    <span className="mt-4 text-caption text-brand-soft">
                      {child.powerSources?.map(formatPowerSource).join(" · ")}
                    </span>
                  </Link>
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* What is in this range */}
      {items.length > 0 ? (
      <Section id="range" tone={children.length > 0 ? "canvas" : "surface"} size="lg" labelledBy="range-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading
              id="range-heading"
              eyebrow={productDetail.overviewEyebrow}
              title={productDetail.rangeHeading}
              description={productDetail.rangeBody}
            />
          </Reveal>

          <Reveal as="ul" stagger={0.04} className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.name}
                className="flex items-start gap-3 border-b border-hairline py-4 text-body-md text-ink"
              >
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                {formatProductName(item)}
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
      ) : null}

      {/* Features and applications */}
      <Section
        id="features"
        tone={items.length > 0 && children.length === 0 ? "canvas" : "surface"}
        size="lg"
        labelledBy="features-heading"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>{productDetail.overviewEyebrow}</Eyebrow>
              <h2 id="features-heading" className="mt-4 text-display-sm text-ink">
                {productDetail.featuresHeading}
              </h2>
              <ul className="mt-7 flex flex-col gap-4 border-t border-hairline pt-6">
                {category.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-body-md text-body">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <Eyebrow>Applications</Eyebrow>
              <h2 className="mt-4 text-display-sm text-ink">{productDetail.applicationsHeading}</h2>
              <ul className="mt-7 grid gap-3 border-t border-hairline pt-6 sm:grid-cols-2">
                {category.applications.map((application) => (
                  <li
                    key={application}
                    className="rounded-lg border border-hairline-soft bg-surface p-4 text-body-sm text-body"
                  >
                    {application}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Specifications */}
      <Section id="specifications" tone="elevated" size="lg" labelledBy="specifications-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading
              id="specifications-heading"
              eyebrow="Specification"
              title={productDetail.specificationsHeading}
              description="Counted from the catalogue, not from a data sheet. Sizes, capacities and model details are confirmed against the actual product when you enquire."
            />
          </Reveal>

          <Reveal as="dl" stagger={0.05} className="mt-12 grid border-t border-hairline sm:grid-cols-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-6 border-b border-hairline py-5 sm:[&:nth-child(even)]:sm:border-l sm:[&:nth-child(even)]:sm:pl-8 sm:[&:nth-child(odd)]:sm:pr-8"
              >
                <dt className="text-body-sm text-muted">{spec.label}</dt>
                <dd className="text-right font-heading text-title-sm text-ink">{spec.value}</dd>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Benefits */}
      <Section id="benefits" tone="soft" size="lg" labelledBy="benefits-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading
              id="benefits-heading"
              eyebrow="Build quality"
              title={productDetail.benefitsHeading}
              description={productDetail.benefitsBody}
            />
          </Reveal>

          <Reveal as="ol" stagger={0.07} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <li key={benefit.index} className="border-t border-hairline pt-6">
                <p aria-hidden="true" className="font-heading text-title-lg text-brand-soft">
                  {benefit.index}
                </p>
                <h3 className="mt-3 text-title-md text-ink">{benefit.title}</h3>
                <p className="mt-2 text-body-sm text-muted">{benefit.description}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Related categories */}
      <Section id="related" tone="canvas" size="lg" labelledBy="related-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading
              id="related-heading"
              eyebrow="Also worth seeing"
              title={productDetail.relatedHeading}
              description={productDetail.relatedBody}
            />
          </Reveal>

          <Reveal as="ul" stagger={0.07} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <li key={entry.slug} className="flex">
                <Link
                  href={routes.productCategory(entry.slug)}
                  {...cursorIntent("view")}
                  className="group flex h-full w-full flex-col rounded-lg border border-hairline-soft bg-surface p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 hover:shadow-hover"
                >
                  <p className="text-eyebrow uppercase text-muted">{getGroupTitle(entry.group)}</p>
                  <h3 className="mt-3 text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
                    {entry.title}
                  </h3>
                  <p className="mt-2 flex-1 text-body-sm text-muted">{entry.description}</p>
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        id="enquire"
        eyebrow={productDetail.cta.eyebrow}
        heading={productDetail.cta.heading}
        body={productDetail.cta.body}
        primaryCta={{ label: "Get in Touch", href: routes.contact }}
        secondaryCta={{ label: "All Products", href: routes.products }}
      />
    </>
  );
}
