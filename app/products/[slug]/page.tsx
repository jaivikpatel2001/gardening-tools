import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCategoryDetail } from "@/components/products/ProductCategoryDetail";
import { productCategories } from "@/data/productCategories";
import { findCategory } from "@/lib/catalogue";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/**
 * Product category detail, for every category in the range.
 *
 * One route and one reusable component, driven entirely by
 * `data/productCategories.ts`. Adding a category to that file publishes its
 * page; there is no per-product page component anywhere and there should never
 * be one.
 *
 * `params` is a Promise in Next 16, with no synchronous fallback.
 */
export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);

  if (!category) {
    return buildMetadata({ title: "Product not found", path: routes.products, noIndex: true });
  }

  // The share card stays the site-wide JPEG. Category photographs are WebP,
  // which several social crawlers still handle unreliably, and a card that
  // fails to render costs far more than a more specific picture gains.
  return buildMetadata({
    title: category.title,
    description: category.description,
    path: routes.productCategory(category.slug),
  });
}

export default async function ProductCategoryPage({ params }: PageProps<"/products/[slug]">) {
  enforcePageVisibility("products");

  const { slug } = await params;
  const category = findCategory(slug);

  if (!category) {
    notFound();
  }

  const trail = [
    { name: "Home", path: routes.home },
    { name: "Products", path: routes.products },
    { name: category.title, path: routes.productCategory(category.slug) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
      />
      <ProductCategoryDetail category={category} />
    </>
  );
}
