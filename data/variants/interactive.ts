import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and media for variant 2, "Interactive Product Experience" (`/variant2`).
 *
 * The page is built around discovery: one tool examined closely, then the range
 * explored by hovering, dragging and answering a question. Everything the
 * reader can reveal is written here, so the interactive components stay pure
 * behaviour and layout.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export interface Hotspot {
  id: string;
  /** Position on the photograph, as a percentage of its width and height. */
  x: number;
  y: number;
  label: string;
  detail: string;
}

export const interactiveHero = {
  eyebrow: "Tool in focus",
  product: "Bypass Pruning Secateurs",
  headingLines: ["Precision for", "Every Cut"] as const,
  body: "Four things separate a pair of secateurs you keep for a decade from a pair you replace next season. Take a closer look at each of them.",
  cta: { label: "Explore the range", href: routes.products },
  scrollCue: "Scroll to explore",
  hint: "Select a point on the tool",
  image: {
    src: "/images/tool-pruning-shears.webp",
    alt: "A pair of bypass pruning secateurs with a hardwood handle resting on pale linen",
  } satisfies ImageAsset,
  hotspots: [
    {
      id: "blade",
      x: 23,
      y: 27,
      label: "Hardened blade",
      detail:
        "A bypass blade passes its counter blade like a pair of scissors, so the stem is sliced rather than crushed and the wound closes over in days.",
    },
    {
      id: "pivot",
      x: 42,
      y: 42,
      label: "Adjustable pivot",
      detail:
        "The pivot bolt is adjustable and the blade is replaceable. Take up the play once a season and the cut stays clean for years.",
    },
    {
      id: "spring",
      x: 50,
      y: 58,
      label: "Sprung return and catch",
      detail:
        "The coil spring reopens the jaws for you, which is what makes an hour of pruning possible. The catch locks them shut for the toolbox.",
    },
    {
      id: "grip",
      x: 73,
      y: 76,
      label: "Hardwood grip",
      detail:
        "Seasoned hardwood stays comfortable at forty degrees, where a plastic grip goes slick and a bare steel one goes hot.",
    },
  ] satisfies readonly Hotspot[],
  specs: [
    { label: "Cutting action", value: "Bypass" },
    { label: "Blade", value: "Hardened carbon steel" },
    { label: "Handles", value: "Seasoned hardwood" },
    { label: "Best for", value: "Stems up to 20 mm" },
  ] as const,
};

export const interactiveSelector = {
  eyebrow: "Explore our tools",
  heading: "Choose where to begin",
  body: "Five entry points into the range. Move through them and the garden behind changes with you.",
  cta: { label: "See the complete range", href: routes.products },
};

export const interactiveRail = {
  eyebrow: "Our tool range",
  heading: "Built for every gardening need",
  body: "Drag, scroll or use the arrow keys.",
  dragHint: "Drag to explore",
  /** One spec line per featured tool, keyed by slug. */
  specs: {
    "bypass-pruning-secateurs": ["Bypass cut", "Replaceable blade", "Stems to 20 mm"],
    "hardwood-hand-trowel": ["Solid socket", "Polished steel", "Pots and grow bags"],
    "forged-garden-spade": ["Forged head", "Rolled tread", "Black cotton soil"],
    "galvanised-watering-can": ["Brass rose", "Galvanised body", "Seedling safe"],
  } as Record<string, readonly string[]>,
};

export const interactiveFinder = {
  eyebrow: "Garden solutions",
  heading: "Tell us the job. We will name the tool.",
  body: "Five questions we are asked every week, and where each one leads.",
  items: [
    {
      id: "lawn",
      question: "Need to keep a lawn even through the growing season?",
      answer:
        "A wheel-type manual mower for a small lawn, a rotary or roller mower for a society green. Cutting height matters more than motor size in Indian grass.",
      categorySlug: "lawn-mowers",
      tools: ["Wheel-type manual mowers", "Rotary electric mowers", "Roller-type mowers"],
    },
    {
      id: "pruning",
      question: "Need clean cuts that heal instead of dying back?",
      answer:
        "Bypass secateurs for green stems, a branch cutter past 20 mm, a pruning saw beyond that. A daranti still beats all three for long grass.",
      categorySlug: "cutting-tools",
      tools: ["Secateurs", "Branch cutters", "Pruning saw", "Daranti (sickle)"],
    },
    {
      id: "watering",
      question: "Need watering that survives a pre-monsoon April?",
      answer:
        "A fine rose for seedlings, a hose reel for a garden you walk around, drip lines for anything you leave for a week.",
      categorySlug: "sprinklers",
      tools: ["Watering cans", "Hose reels", "Drip irrigation kits", "Timers"],
    },
    {
      id: "soil",
      question: "Need to break soil that has set hard?",
      answer:
        "A phawda and a kudali for beds you can reach across, a mini tiller once the plot is bigger than your patience.",
      categorySlug: "hand-tools",
      tools: ["Phawda (digging spade)", "Kudali (hoe)", "Gaiti (pickaxe)", "Mini tillers"],
    },
    {
      id: "clearing",
      question: "Need to clear a plot that has gone over completely?",
      answer:
        "A brush cutter for grass and scrub, a chainsaw only for wood. Safety gear is not optional with either of them.",
      categorySlug: "brush-cutters",
      tools: ["Petrol brush cutters", "Battery trimmers", "Safety goggles and ear protection"],
    },
  ] as const,
};

export const interactiveTrust = {
  eyebrow: "Why gardeners stay",
  heading: "The numbers behind the range",
  /** The three numeric tiles are counted from the catalogue, never hand typed. */
  labels: {
    years: "Years in the trade",
    categories: "Tool categories",
    toolTypes: "Tool types listed",
  },
  statement: { value: "Made for", label: "Indian soil, Indian seasons, Indian gardens" },
};

export const interactiveDurability = {
  eyebrow: "Built to last",
  heading: "What we check before a tool earns its place",
  body: "Four tests, applied to everything on the shelf.",
  image: {
    src: "/images/why-choose.webp",
    alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
  } satisfies ImageAsset,
};

export const interactiveClosing = {
  eyebrow: "Next step",
  headingLines: ["Tell us what", "you are growing."] as const,
  body: "We will help you find the tools that suit your soil, your season and the hours you actually have.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Products", href: routes.products },
};
