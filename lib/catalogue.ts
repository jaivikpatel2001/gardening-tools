import { site } from "@/config/site";
import { powerSourceLabels, productCategories, productGroups } from "@/data/productCategories";
import { productGallery } from "@/data/productGallery";
import { routes } from "@/lib/routes";
import type {
  ImageAsset,
  NavItem,
  ProductMenuLink,
  PhotographedProductCategory,
  PowerSource,
  ProductCategory,
  ProductCategoryGroup,
  ProductGroupId,
  ProductItem,
  ProductListRow,
} from "@/types/content";

/**
 * Read-only selectors and formatters over the product range.
 *
 * `data/productCategories.ts` stays a plain list. Every derived view the site
 * needs (Home cards, the grouped index, the Products page, footer links,
 * display names, counts) is computed here, so no component repeats the same
 * filtering logic or imports the data itself.
 *
 * Server-side only in practice: nothing under a `"use client"` boundary should
 * import this module, or the whole catalogue would ship to the browser. The
 * Products page works around that by computing its rows on the server and
 * handing the client component a small, flat list.
 */

/** "Khurpi (hand hoe and weeder)" when a product has an Indian name, "Loppers" when it does not. */
export function formatProductName(item: ProductItem): string {
  return item.localName ? `${item.localName} (${item.name})` : item.name;
}

export function formatPowerSource(source: PowerSource): string {
  return powerSourceLabels[source];
}

function isPhotographed(category: ProductCategory): category is PhotographedProductCategory {
  return category.image !== undefined;
}

/** Products that can render as image cards on the Home page, in catalogue order. */
export function getHomeCategoryCards(): PhotographedProductCategory[] {
  return topLevelProducts().filter(isPhotographed).filter((category) => category.featured === true);
}

export function getCategoriesInGroup(group: ProductGroupId): ProductCategory[] {
  return topLevelProducts().filter((category) => category.group === group);
}

/** Products that are not a type of something else, in catalogue order. */
export function topLevelProducts(): ProductCategory[] {
  return productCategories.filter((product) => product.parent === undefined);
}

/** The types listed under a product, in catalogue order. Empty for a leaf. */
export function getChildren(slug: string): ProductCategory[] {
  return productCategories.filter((product) => product.parent === slug);
}

/**
 * Every photograph for a product, lead image first.
 *
 * The lead is the commissioned garden photograph where one exists; the rest are
 * the client's own catalogue shots from `data/productGallery.ts`. A product
 * with neither returns an empty array, and the page falls back to its
 * typographic plate.
 */
export function getGallery(product: ProductCategory): ImageAsset[] {
  const shots = productGallery[product.slug] ?? [];
  return product.image ? [product.image, ...shots] : [...shots];
}

/** The product this one is a type of, if any. */
export function getParent(product: ProductCategory): ProductCategory | undefined {
  return product.parent ? getCategory(product.parent) : undefined;
}

/** Both groups with their categories, ready for the complete range index. */
export function getGroupedCategories(): ProductCategoryGroup[] {
  return productGroups.map((group) => ({ ...group, categories: getCategoriesInGroup(group.id) }));
}

/** The label for a group id, for breadcrumbs, chips and filter controls. */
export function getGroupTitle(group: ProductGroupId): string {
  const match = productGroups.find((entry) => entry.id === group);
  if (!match) {
    throw new Error(`Unknown product group: "${group}"`);
  }
  return match.title;
}

/**
 * Looks a category up by slug. Throws on an unknown slug, so a typo in a curated
 * list (the footer, for example) fails the build instead of shipping a dead link.
 */
export function getCategory(slug: string): ProductCategory {
  const category = productCategories.find((entry) => entry.slug === slug);
  if (!category) {
    throw new Error(`Unknown product category slug: "${slug}"`);
  }
  return category;
}

/** The same lookup for request-time routing, where an unknown slug is a 404, not a bug. */
export function findCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((entry) => entry.slug === slug);
}

/**
 * The Products dropdown, resolved from the catalogue.
 *
 * The menu lives inside a client component, which must never import this module
 * or the catalogue, so the root layout resolves it on the server and hands the
 * header plain labels and hrefs.
 *
 * Every slug is checked against the catalogue here, so a typo in the menu fails
 * the build rather than shipping a dead link. Child entries land on the parent
 * category page at its range list, which is where that product type is named.
 */
export function getProductMenu(): ProductMenuLink[] {
  return topLevelProducts().map((product) => {
    const children = getChildren(product.slug);
    return {
      label: product.shortTitle,
      href: routes.productCategory(product.slug),
      ...(children.length > 0
        ? {
            children: children.map((child) => ({
              label: child.shortTitle,
              href: routes.productCategory(child.slug),
            })),
          }
        : {}),
    };
  });
}

/**
 * Resolves a curated list of slugs to products, in order, **without repeats**.
 *
 * Curated lists are written by hand, and a rename that collapses two slugs into
 * one silently turns a list into a list with a duplicate. Every component that
 * renders one of these keys its rows on the slug, so that duplicate becomes a
 * React key collision rather than a visible mistake. Dropping repeats here
 * means no caller has to remember.
 */
export function resolveCategories(slugs: readonly string[]): ProductCategory[] {
  const seen = new Set<string>();
  const resolved: ProductCategory[] = [];

  for (const slug of slugs) {
    const category = getCategory(slug);
    if (seen.has(category.slug)) continue;
    seen.add(category.slug);
    resolved.push(category);
  }

  return resolved;
}

/** Navigation links for a curated list of category slugs, labelled with each short title. */
export function getCategoryLinks(slugs: readonly string[]): NavItem[] {
  return resolveCategories(slugs).map((category) => ({
    label: category.shortTitle,
    href: routes.productCategory(category.slug),
  }));
}

/**
 * Other products worth seeing from a product page.
 *
 * A type shows its siblings first, because someone looking at a roller mower is
 * most likely comparing it with the other mowers. Everything else shows the
 * rest of its own group, then the other group. Deterministic, so the same
 * product always suggests the same neighbours.
 */
export function getRelatedCategories(slug: string, limit = 3): ProductCategory[] {
  const current = getCategory(slug);
  const siblings = current.parent
    ? getChildren(current.parent).filter((entry) => entry.slug !== slug)
    : [];
  const sameGroup = getCategoriesInGroup(current.group).filter(
    (entry) => entry.slug !== slug && entry.slug !== current.parent,
  );
  const otherGroup = topLevelProducts().filter(
    (entry) => entry.group !== current.group && entry.slug !== slug,
  );
  return [...siblings, ...sameGroup, ...otherGroup].slice(0, limit);
}

/**
 * Figures for the highlights band and the About page.
 *
 * Counted from the catalogue and derived from the founding year, never typed by
 * hand. `years` moves on its own at each build, which is the point.
 */
export function getRangeCounts() {
  const categories = topLevelProducts().length;
  const productTypes = productCategories.reduce(
    (total, category) => total + (category.items?.length ?? 0) + (category.parent ? 1 : 0),
    0,
  );
  const years = new Date().getFullYear() - Number(site.founded);

  return { categories, productTypes, groups: productGroups.length, years };
}

/**
 * Flattens the catalogue into the rows the Products page hands its client-side
 * browser.
 *
 * Computed on the server so the filtering, search and sort on that page cost a
 * few kilobytes of plain values rather than the whole catalogue module. The
 * search text is joined here for the same reason: the client should not have to
 * walk nested product lists on every keystroke.
 */
export function getProductListRows(): ProductListRow[] {
  return topLevelProducts().map((category) => ({
    slug: category.slug,
    title: category.title,
    description: category.description,
    group: category.group,
    groupTitle: getGroupTitle(category.group),
    ...(category.image ? { image: category.image } : {}),
    itemCount: category.items?.length ?? getChildren(category.slug).length,
    powerSources: category.powerSources ?? [],
    keywords: [
      category.title,
      category.shortTitle,
      category.description,
      ...(category.items ?? []).map(formatProductName),
      ...getChildren(category.slug).map((child) => child.title),
    ]
      .join(" ")
      .toLowerCase(),
  }));
}
