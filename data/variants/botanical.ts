import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and media for variant 3, "Modern Indian Botanical" (`/variant3`).
 *
 * The direction is contemporary Indian rather than traditional Indian: no
 * pattern work, no motifs, no folk borders. What makes it Indian is the
 * geography of the copy, the environments a reader recognises, and the arched
 * organic image boundaries that carry the botanical feeling instead of drawn
 * leaves (see the imagery rules in CLAUDE.md).
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export interface SceneMarker {
  id: string;
  /** Position on the photograph, as a percentage of its width and height. */
  x: number;
  y: number;
  name: string;
  category: string;
  feature: string;
  href: string;
}

export const botanicalHero = {
  eyebrow: "Gardening tools for India",
  headingLines: ["Grow", "Better."] as const,
  body: "Tools chosen for black cotton soil and laterite, for six weeks of monsoon damp and forty degree afternoons. The garden you want is mostly a question of the right tool in your hand.",
  primaryCta: { label: "Explore Our Tools", href: routes.tools },
  secondaryCta: { label: "Get in Touch", href: routes.contact },
  meta: [
    { value: site.founded, label: "Growing with Indian gardeners" },
    { value: "14", label: "Categories, hand tools to machinery" },
  ] as const,
  image: {
    src: "/images/about-preview.webp",
    alt: "A gardener in an apron kneeling to plant seedlings in a raised timber bed on a bright afternoon",
  } satisfies ImageAsset,
};

export const botanicalNav = {
  eyebrow: "Find your tools",
  heading: "The range, arranged the way a garden is",
  body: "Move through the categories and the photograph at the centre follows you.",
  cta: { label: "See the complete range", href: routes.tools },
};

export const botanicalScene = {
  eyebrow: "In the garden",
  heading: "Everything here has a job",
  body: "One Sunday morning in a kitchen garden, and four tools earning their place in it. Select a marker to see each one.",
  hint: "Select a marker",
  image: {
    src: "/images/hero-main.webp",
    alt: "A hand trowel and fork with hardwood handles resting on dark soil beside herb seedlings in a garden bed at sunrise",
  } satisfies ImageAsset,
  markers: [
    {
      id: "trowel",
      x: 41,
      y: 74,
      name: "Hardwood Hand Trowel",
      category: "Hand Tools & Planting",
      feature: "Balanced for a hundred transplants in an afternoon",
      href: routes.toolCategory("hand-tools"),
    },
    {
      id: "gloves",
      x: 8,
      y: 67,
      name: "Leather-palmed Gloves",
      category: "Garden Accessories & Safety",
      feature: "Enough grip for thorns, thin enough to feel a seedling",
      href: routes.toolCategory("garden-accessories"),
    },
    {
      id: "beds",
      x: 74,
      y: 66,
      name: "Watering Cans & Roses",
      category: "Watering Tools",
      feature: "A fine brass rose leaves young beds where you planted them",
      href: routes.toolCategory("watering-tools"),
    },
    {
      id: "border",
      x: 91,
      y: 31,
      name: "Bypass Secateurs",
      category: "Pruning & Cutting",
      feature: "Clean cuts on flowering shrubs, so they come back thicker",
      href: routes.toolCategory("pruning-tools"),
    },
  ] satisfies readonly SceneMarker[],
};

export const botanicalStory = {
  eyebrow: "Our story",
  heading: "Gardens, people, craft, tools",
  body: "Four things we think about, in that order. The tool comes last because it only matters once you know whose hands it is for.",
  cta: { label: "Discover our story", href: routes.about },
  chapters: [
    {
      key: "gardens",
      title: "Gardens",
      body: "Balconies in Mumbai, terraces in Chennai, kitchen plots outside Nashik and society lawns in Pune. Six square feet or six acres, the work is the same work.",
      image: {
        src: "/images/hero-main.webp",
        alt: "A hand trowel and fork with hardwood handles resting on dark soil beside herb seedlings in a garden bed at sunrise",
      } satisfies ImageAsset,
    },
    {
      key: "people",
      title: "People",
      body: "First-time growers, retired engineers with better beds than ours, and crews who put in eight hours a day. We stock for all three and never pretend one is the other.",
      image: {
        src: "/images/service-tool-selection.webp",
        alt: "Two people examining a selection of gardening tools together at a workbench",
      } satisfies ImageAsset,
    },
    {
      key: "craft",
      title: "Craft",
      body: "A forged head, a seasoned handle, a join that does not work loose. Most of what we reject fails at the join, and it always fails in the second monsoon.",
      image: {
        src: "/images/why-choose.webp",
        alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
      } satisfies ImageAsset,
    },
    {
      key: "tools",
      title: "Tools",
      body: "Khurpi to brush cutter, under one roof, with the same honest advice on choosing it, using it and keeping it alive through the rain.",
      image: {
        src: "/images/tool-garden-spade.webp",
        alt: "The blade and lower shaft of a forged garden spade against a pale background",
      } satisfies ImageAsset,
    },
  ] as const,
};

export const botanicalJourney = {
  eyebrow: "Garden solutions",
  heading: "Five Indian gardens, five sets of tools",
  body: "What you need depends less on what you grow than on where you grow it.",
  stops: [
    {
      key: "balcony",
      index: "01",
      title: "Balcony Garden",
      body: "Grow bags, a few pots on a railing and a metre of working space. Everything has to be small, light and storable behind the door.",
      tools: ["Khurpi (hand hoe and weeder)", "Hand trowel", "Watering can", "Secateurs"],
      image: {
        src: "/images/category-hand-tools.webp",
        alt: "A hand trowel, hand fork and weeder with hardwood handles laid out on a weathered wooden bench beside potted herbs",
      } satisfies ImageAsset,
    },
    {
      key: "terrace",
      index: "02",
      title: "Terrace Garden",
      body: "Full sun, wind, and a summer that dries a pot out by noon. Watering stops being a chore and starts being a system.",
      tools: ["Hose pipe and reel", "Spray gun", "Drip kit", "Grow bags"],
      image: {
        src: "/images/category-watering-tools.webp",
        alt: "A galvanised watering can with a brass rose beside a bed of freshly watered seedlings",
      } satisfies ImageAsset,
    },
    {
      key: "kitchen",
      index: "03",
      title: "Home Kitchen Garden",
      body: "Beds you can reach across, a compost corner, and a crop that has to come in before the rain does.",
      tools: ["Phawda (digging spade)", "Digging fork", "Harvesting knife", "Tasla (carrying pan)"],
      image: {
        src: "/images/about-preview.webp",
        alt: "A gardener in an apron kneeling to plant seedlings in a raised timber bed on a bright afternoon",
      } satisfies ImageAsset,
    },
    {
      key: "lawn",
      index: "04",
      title: "Lawn & Grounds",
      body: "Society greens, bungalow lawns and school grounds. Cutting height and edge discipline decide how a lawn looks far more than horsepower does.",
      tools: ["Lawn mowers", "Grass trimmers", "Hedge trimmers", "Leaf blowers"],
      image: {
        src: "/images/service-professional-support.webp",
        alt: "A professional gardening team working together on a landscaped residential garden",
      } satisfies ImageAsset,
    },
    {
      key: "professional",
      index: "05",
      title: "Professional Landscaping",
      body: "Daily commercial use, several sites a week, and spares that have to arrive the same day. We specify for the crew, not for the catalogue.",
      tools: ["Brush cutters", "Chainsaws", "Knapsack sprayers", "Mini tillers"],
      image: {
        src: "/images/service-garden-setup.webp",
        alt: "A new raised garden bed being assembled and filled with soil",
      } satisfies ImageAsset,
    },
  ] as const,
};

export const botanicalVoices = {
  eyebrow: "What our customers say",
  heading: "Gardeners who stayed",
};

export const botanicalClosing = {
  eyebrow: "Get in touch",
  heading: "Let us help you grow something better",
  body: "Tell us your soil, your season and your space. We will tell you what you need, and what you can happily do without.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Tools", href: routes.tools },
  image: {
    src: "/images/category-garden-accessories.webp",
    alt: "Gardening gloves, jute twine and wooden plant labels arranged on a potting bench",
  } satisfies ImageAsset,
};
