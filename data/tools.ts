import type { Tool } from "@/types/content";

/**
 * Tool catalogue. The Home page samples the `featured` entries; the future
 * Tools and Tool Detail pages will render the same array, so a tool is added
 * once, here, and appears everywhere it should.
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
];

export const featuredTools = tools.filter((tool) => tool.featured);
