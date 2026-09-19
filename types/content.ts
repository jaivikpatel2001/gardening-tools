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
export type ToolGroupId = "hand" | "machinery";

export type PowerSource = "manual" | "electric" | "battery" | "petrol";

export interface ToolGroup {
  id: ToolGroupId;
  title: string;
  description: string;
}

/** One tool inside a category. */
export interface ToolItem {
  /** English name, written exactly as it should appear in running text. */
  name: string;
  /**
   * Common Indian name, where one is in everyday use. Regional names vary, so
   * this is the most widely understood Hindi term, not an exhaustive list.
   */
  localName?: string;
}

export interface ToolCategory {
  slug: string;
  group: ToolGroupId;
  title: string;
  /** Compact label for footer links, chips and teaser lists. */
  shortTitle: string;
  description: string;
  tools: readonly ToolItem[];
  /** Machinery only. Hand tools are manual by definition and omit it. */
  powerSources?: readonly PowerSource[];
  /** Present once the category has been photographed. */
  image?: ImageAsset;
  /** Eligible for the Home page card grid. Only rendered when `image` exists. */
  featured?: boolean;
}

/** A category that has photography and can therefore render as an image card. */
export type PhotographedToolCategory = ToolCategory & { image: ImageAsset };

export interface ToolCategoryGroup extends ToolGroup {
  categories: readonly ToolCategory[];
}

export interface Tool {
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

export type PhotographedTool = Tool & { image: ImageAsset };

/* -------------------------------------------------------------------------- */
/* Services, resources, testimonials                                          */
/* -------------------------------------------------------------------------- */

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: ImageAsset;
}

export interface Resource {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  image: ImageAsset;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  /** Whole stars, 1 to 5. */
  rating: number;
  image: ImageAsset;
}
