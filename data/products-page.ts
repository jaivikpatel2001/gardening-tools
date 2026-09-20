import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy for the Products listing page and the shared parts of a product category
 * page.
 *
 * Product names, categories and the contents of each category live in
 * `data/productCategories.ts` and come from the client's own catalogue. Nothing
 * here invents a product, a model or a specification.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const productsHero = {
  eyebrow: "The range",
  heading: "Everything in Gardening, Category by Category",
  body: "Traditional Indian hand tools and modern garden machinery, from the khurpi in your hand to the brush cutter on your shoulder. Browse by group, search by name, and send an enquiry when you find what you need.",
  image: {
    src: "/images/products-overview.webp",
    alt: "Several gardening tools laid out side by side on a bench for comparison",
  } satisfies ImageAsset,
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "About Jiva Greens", href: routes.about },
};

export const productsCatalogue = {
  eyebrow: "Browse the range",
  heading: "Find the Right Part of the Range",
  body: "Every category is stocked and supplied by enquiry. No prices are published, because what a garden actually needs changes the answer.",
};

export const productsNotice = {
  title: "Supplied by enquiry, not by cart",
  body: "This site is a showcase rather than a shop. Tell us the site, the soil and who will be using the product, and we will come back with the options that fit and the one we would pick.",
};

/** Labels shared by every product category page. */
export const productDetail = {
  overviewEyebrow: "Overview",
  rangeHeading: "What Is in This Category",
  rangeBody: "Every product type we stock under this heading. Ask for anything here by name.",
  featuresHeading: "Key Features",
  applicationsHeading: "Where It Is Used",
  benefitsHeading: "Why It Lasts",
  benefitsBody: "The four things every product in the range has to prove before it earns shelf space.",
  specificationsHeading: "At a Glance",
  relatedHeading: "Related Categories",
  relatedBody: "The parts of the range people usually look at alongside this one.",
  specLabels: {
    group: "Range group",
    types: "Product types",
    power: "Power options",
    supply: "How to buy",
    served: "Serving",
  },
  supplyValue: "By enquiry",
  servedValue: "All India",
  powerManualOnly: "Manual",
  cta: {
    eyebrow: "Next step",
    heading: "Tell Us What You Are Growing",
    body: "Send us the garden, the site or the crew and we will specify the right product from this category.",
  },
};

/**
 * The gardening solutions band on the Products page.
 *
 * The reference structure asks for a selection guide and a care and maintenance
 * section here. Both already exist as solutions, so they are rendered from
 * `data/solutions.ts` rather than written a second time: one of them is
 * literally called Care & Maintenance, and another is Product Selection.
 */
export const productsSolutions = {
  eyebrow: "Choosing and caring",
  heading: "Help Before and After You Buy",
  body: "Picking the right thing off this page is half of it. Keeping it working through a monsoon is the other half, and we do both.",
} as const;
