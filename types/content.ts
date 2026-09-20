import type { LucideIcon } from "lucide-react";

/**
 * Shared content domain types.
 *
 * These live outside `data/` so that components can depend on the shape of the
 * content without importing the content itself. A page that renders a tool
 * card should not pull the whole catalogue into its module graph just to type a
 * prop.
 */

/** A photograph together with the alt text that belongs to it. */
export interface ImageAsset {
  /** Root-relative path under `public/`. */
  src: string;
  /** Describes the photograph, never the slot it sits in. */
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/**
 * One row of the Products dropdown, resolved to real hrefs.
 *
 * Built on the server from `data/productMenu.ts` and handed to the header as
 * plain values, because the header is a client component and the catalogue must
 * never cross that boundary.
 */
export interface ProductMenuLink extends NavItem {
  children?: readonly NavItem[];
}

export interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Benefit {
  /** Two-digit display index, for example "01". */
  index: string;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/* Tool range                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The two halves of the range. Every category belongs to exactly one, which is
 * what lets the site present traditional Indian hand tools and modern garden
 * machinery as one complete offer.
 */
export type ProductGroupId = "hand" | "machinery";

export type PowerSource = "manual" | "electric" | "battery" | "petrol";

export interface ProductGroup {
  id: ProductGroupId;
  title: string;
  description: string;
}

/** One tool inside a category. */
export interface ProductItem {
  /** English name, written exactly as it should appear in running text. */
  name: string;
  /**
   * Common Indian name, where one is in everyday use. Regional names vary, so
   * this is the most widely understood Hindi term, not an exhaustive list.
   */
  localName?: string;
}

export interface ProductCategory {
  slug: string;
  group: ProductGroupId;
  title: string;
  /** Compact label for footer links, chips and teaser lists. */
  shortTitle: string;
  /** One sentence. Cards, the range index and product search all read this. */
  description: string;
  /** Two or three sentences for the product's own page. */
  intro: string;
  /**
   * The product this one is a type of, by slug.
   *
   * The client nests two of their ranges a level deeper, lawn mowers by type
   * and watering by what is on the end of the hose. Those children are ordinary
   * products with their own pages; this is only what puts them under the right
   * heading in the menu and the breadcrumb.
   */
  parent?: string;
  /** What is inside a range. Omitted on the leaf products, which list nothing. */
  items?: readonly ProductItem[];
  /** What is worth knowing before choosing from this part of the range. */
  features: readonly string[];
  /** Where these products are actually used, in Indian terms. */
  applications: readonly string[];
  /** Machinery only. Hand tools are manual by definition and omit it. */
  powerSources?: readonly PowerSource[];
  /** Present once the category has been photographed. */
  image?: ImageAsset;
  /**
   * Extra photographs for the category page gallery, beyond `image`.
   *
   * Empty until the photographs exist. The gallery falls back to `image` alone
   * rather than padding itself with pictures of something else, and the slots
   * are defined in `resources/image-generation.md`.
   */
  gallery?: readonly ImageAsset[];
  /** Eligible for the Home page card grid. Only rendered when `image` exists. */
  featured?: boolean;
}

/**
 * A flattened category row for the Products page.
 *
 * The browser on that page filters, searches and sorts on the client, so it is
 * handed this instead of the catalogue: plain, serialisable values with the
 * searchable text already joined on the server. The full `ProductCategory`
 * objects, and `lib/catalogue.ts` itself, never cross the client boundary.
 */
export interface ProductListRow {
  slug: string;
  title: string;
  description: string;
  group: ProductGroupId;
  groupTitle: string;
  image?: ImageAsset;
  /** How many product types the category lists. */
  itemCount: number;
  powerSources: readonly PowerSource[];
  /** Lower-cased title, description and every product name, for the search box. */
  keywords: string;
}

/** A category that has photography and can therefore render as an image card. */
export type PhotographedProductCategory = ProductCategory & { image: ImageAsset };

export interface ProductCategoryGroup extends ProductGroup {
  categories: readonly ProductCategory[];
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  /**
   * Added only once the tool has been photographed, with alt text describing
   * that photograph. Until then the tool is part of the range but is never
   * shown as a photo card, the same rule the categories follow.
   */
  image?: ImageAsset;
  featured: boolean;
}

export type PhotographedProduct = Product & { image: ImageAsset };

/* -------------------------------------------------------------------------- */
/* Solutions, clients, testimonials                                           */
/* -------------------------------------------------------------------------- */

/**
 * A kind of help offered alongside the range. There is no Services page: these
 * are presented contextually on Home, About and Contact, and every one of them
 * converts to an enquiry rather than to a page of its own.
 */
export interface Solution {
  slug: string;
  title: string;
  description: string;
  /** Who this is actually for, in one line. */
  audience: string;
  icon: LucideIcon;
  image: ImageAsset;
}

/**
 * A manufacturer mark for the brand wall on the Clients page.
 *
 * These are other companies' trademarks. The wall renders only what the client
 * has supplied, places each mark on a white cell and contains it inside that
 * cell. Nothing is drawn, recoloured, cropped or invented, and the section
 * hides itself while the list is empty.
 */
export interface BrandMark {
  name: string;
  image: ImageAsset;
  /** Website, included only once the brand has approved being linked. */
  href?: string;
}

/** A kind of customer the business serves, and the work that comes with it. */
export interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Product categories this kind of customer buys from, by slug. */
  categorySlugs: readonly string[];
}

/** A derived or verified figure. Never a guessed one. */
export interface Highlight {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Organisation, where the person speaks for one. */
  company?: string;
  location: string;
  /** Whole stars, 1 to 5. */
  rating: number;
  image: ImageAsset;
}
