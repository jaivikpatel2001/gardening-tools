import type { PhotographedTool, Tool } from "@/types/content";

/**
 * Tool catalogue. The Home page samples the `featured` entries; the future
 * Tools and Tool Detail pages will render the same array, so a tool is added
 * once, here, and appears everywhere it should.
 *
 * The last four entries come from the client's existing catalogue at
 * jivagreens.com (reviewed September 2026): the khurpi, drop-forged hedge
 * shears, a rotary electric lawn mower and a petrol brush cutter are core lines
 * there, and the Home page showed none of them. They carry no `image` yet, so they stay off every photo grid
 * until their photographs arrive (prompts in resources/image-generation.md,
 * section 6). Adding `image` is the only change needed to show them.
 */
export const tools: Tool[] = [
  {
    slug: "bypass-pruning-secateurs",
    name: "Bypass Pruning Secateurs",
    category: "Pruning Tools",
    categorySlug: "pruning-tools",
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
    category: "Digging Tools",
    categorySlug: "digging-tools",
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
    category: "Watering Tools",
    categorySlug: "watering-tools",
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
    featured: true,
  },
  {
    slug: "drop-forged-hedge-shears",
    name: "Drop-Forged Hedge Shears",
    category: "Pruning Tools",
    categorySlug: "pruning-tools",
    description: "Long, wavy-edged blades that shape boundary hedges and topiary without tearing the leaf.",
    featured: true,
  },
  {
    slug: "rotary-electric-lawn-mower",
    name: "Rotary Electric Lawn Mower",
    category: "Lawn Mowers",
    categorySlug: "lawn-mowers",
    description: "A single-phase mower with a grass box and stepped cutting heights for bungalow and society lawns.",
    featured: true,
  },
  {
    slug: "petrol-brush-cutter",
    name: "Petrol Brush Cutter",
    category: "Brush Cutters",
    categorySlug: "brush-cutters",
    description: "A straight-shaft cutter with a harness and metal blade for plots, bunds and orchard floors.",
    featured: true,
  },
];

function isPhotographed(tool: Tool): tool is PhotographedTool {
  return tool.image !== undefined;
}

/** Featured tools that have been photographed, in catalogue order. */
export const featuredTools: PhotographedTool[] = tools.filter(isPhotographed).filter((tool) => tool.featured);
