import type { PhotographedProduct, Product } from "@/types/content";

/**
 * Featured products: the individual lines worth putting a photograph against.
 *
 * These are real lines from the client's own catalogue, described generically.
 * No model name, model number, SKU or measured specification is invented here,
 * and none should be added without the client supplying it.
 *
 * Each entry belongs to a product category and links to that category's page.
 * Categories are what carry detail pages, because categories are what the
 * client publishes; a per-item page would have to invent the specification
 * sheet it needs to justify itself.
 *
 * Entries without `image` stay off every photo grid until their photographs
 * arrive (prompts in resources/image-generation.md). Adding `image` is the only
 * change needed to show them.
 */
export const products: Product[] = [
  {
    slug: "bypass-pruning-secateurs",
    name: "Bypass Pruning Secateurs",
    category: "Cutting & Pruning",
    categorySlug: "cutting-tools",
    description: "A clean bypass cut that heals fast on hibiscus, bougainvillea and curry leaf.",
    image: {
      src: "/images/tool-pruning-shears.webp",
      alt: "A pair of bypass pruning secateurs with a hardwood handle resting on pale linen",
    },
    featured: true,
  },
  {
    slug: "hardwood-hand-trowel",
    name: "Hardwood Hand Trowel",
    category: "Hand Tools",
    categorySlug: "hand-tools",
    description: "Balanced for potting on, transplanting seedlings and close work in terrace beds.",
    image: {
      src: "/images/tool-hand-trowel.webp",
      alt: "A hand trowel with a hardwood handle and polished steel blade resting on soil-dusted linen",
    },
    featured: true,
  },
  {
    slug: "forged-garden-spade",
    name: "Forged Garden Spade",
    category: "Digging & Soil",
    categorySlug: "hand-tools",
    description: "A solid-socket blade that holds its edge in black cotton soil, wet or baked hard.",
    image: {
      src: "/images/tool-garden-spade.webp",
      alt: "The blade and lower shaft of a forged garden spade against a pale background",
    },
    featured: true,
  },
  {
    slug: "galvanised-watering-can",
    name: "Galvanised Watering Can",
    category: "Watering Solutions",
    categorySlug: "watering-solutions",
    description: "A fine brass rose that waters seedlings gently instead of flattening them.",
    image: {
      src: "/images/tool-watering-can.webp",
      alt: "A galvanised metal watering can with a brass rose on a pale surface",
    },
    featured: true,
  },
  {
    slug: "forged-khurpi",
    name: "Forged Khurpi",
    category: "Hand Tools",
    categorySlug: "hand-tools",
    description: "The Indian hand hoe: a triangular forged blade for weeding, loosening and opening seed drills.",
    image: {
      src: "/images/tool-khurpi.webp",
      alt: "A hand-forged khurpi with a sheesham handle beside freshly pulled weeds",
    },
    featured: true,
  },
  {
    slug: "drop-forged-hedge-shears",
    name: "Drop-Forged Hedge Shears",
    category: "Cutting & Pruning",
    categorySlug: "cutting-tools",
    description: "Long, wavy-edged blades that shape boundary hedges and topiary without tearing the leaf.",
    image: {
      src: "/images/tool-hedge-shears.webp",
      alt: "Drop-forged hedge shears lying open on top of a freshly clipped hedge",
    },
    featured: true,
  },
  {
    slug: "rotary-electric-lawn-mower",
    name: "Rotary Electric Lawn Mower",
    category: "Lawn Mowers",
    categorySlug: "lawn-mowers",
    description: "A single-phase mower with a grass box and stepped cutting heights for bungalow and society lawns.",
    image: {
      src: "/images/tool-lawn-mower.webp",
      alt: "A green rotary electric lawn mower at the edge of a half-mown society lawn",
    },
    featured: true,
  },
  {
    slug: "petrol-brush-cutter",
    name: "Petrol Brush Cutter",
    category: "Brush Cutters",
    categorySlug: "brush-cutters",
    description: "A straight-shaft cutter with a harness and metal blade for plots, bunds and orchard floors.",
    image: {
      src: "/images/tool-brush-cutter.webp",
      alt: "A petrol brush cutter lying where tall grass meets a freshly cleared strip on a farm bund",
    },
    featured: true,
  },
];

function isPhotographed(product: Product): product is PhotographedProduct {
  return product.image !== undefined;
}

/** Featured products that have been photographed, in catalogue order. */
export const featuredProducts: PhotographedProduct[] = products
  .filter(isPhotographed)
  .filter((product) => product.featured);
