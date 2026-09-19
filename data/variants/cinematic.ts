import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and media for variant 1, "Cinematic Editorial" (`/variant1`).
 *
 * The brand facts, the range and the calls to action are the same ones the live
 * Home page uses. What changes here is the voice: fewer words, longer pauses,
 * and copy written to sit over photography rather than beside it.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const cinematicHero = {
  eyebrow: "Jiva Greens, Ahmedabad",
  /** Three clip-revealed lines, broken for rag rather than by wrapping. */
  headingLines: ["Premium Gardening", "Tools, Designed for", "Better Gardens"] as const,
  body: `Garden machinery and hand tools from Ahmedabad since ${site.founded}, chosen to keep working through Indian monsoons.`,
  cta: { label: "Explore the Collection", href: routes.tools },
  secondaryCta: { label: "Talk to us", href: routes.contact },
  scrollCue: "Scroll",
  meta: [`Est. ${site.founded}`, "Ahmedabad, Gujarat"] as const,
  image: {
    src: "/images/hero-main.webp",
    alt: "A hand trowel and fork with hardwood handles resting on dark soil beside herb seedlings in a garden bed at sunrise",
  } satisfies ImageAsset,
};

export const cinematicCategories = {
  eyebrow: "The collection",
  heading: "Five ways into the range",
  body: "Traditional Indian hand tools and modern garden machinery, presented the way a gardener actually reaches for them.",
  cta: { label: "View the complete range", href: routes.tools },
};

export const cinematicProducts = {
  eyebrow: "Tool stories",
  heading: "Four tools worth the space in your shed",
  /**
   * One story per featured tool, keyed by slug. The photograph, name and
   * category come from `data/tools.ts`, so a tool is still described once.
   */
  stories: [
    {
      slug: "bypass-pruning-secateurs",
      chapter: "01",
      story:
        "A bypass blade slices past its anvil rather than crushing against it, which is why hibiscus and bougainvillea heal over in days instead of dying back. The spring is replaceable, because the spring is what usually goes first.",
      features: ["Hardened carbon steel blade", "Seasoned hardwood grips", "Replaceable spring and blade"],
    },
    {
      slug: "hardwood-hand-trowel",
      chapter: "02",
      story:
        "Balanced so the weight sits in your palm and not at the tip, which matters on the hundredth transplant of an afternoon. Narrow enough for grow bags, deep enough for a terrace bed.",
      features: ["Solid socket join", "Polished steel blade", "Sized for pots and grow bags"],
    },
    {
      slug: "forged-garden-spade",
      chapter: "03",
      story:
        "Black cotton soil sets like concrete in May and turns to glue in July. A forged blade with a rolled tread takes both without folding at the shoulder.",
      features: ["Forged one-piece head", "Rolled step for boot pressure", "Ash handle, grain run straight"],
    },
    {
      slug: "galvanised-watering-can",
      chapter: "04",
      story:
        "A fine brass rose breaks the flow into rain instead of a jet, so seedlings stay upright and the soil surface stays where you put it. Galvanised, so the monsoon does not eat it.",
      features: ["Fine brass rose", "Galvanised body", "Balanced full or half full"],
    },
  ] as const,
  cta: { label: "Browse the range", href: routes.tools },
};

export const cinematicStory = {
  eyebrow: "Our story",
  statement: "Landscapers, institutes and home gardeners have trusted us with their tools for decades.",
  body: "We judge a tool the way they do. Not by how it photographs on a bench, but by whether it will be working after ten monsoons, three owners and a season of daily commercial use.",
  cta: { label: "Discover our story", href: routes.about },
  facts: [
    { value: site.founded, label: "Established in Ahmedabad" },
    { value: "14", label: "Categories across hand tools and machinery" },
    { value: "All India", label: "Advice, spares and servicing" },
  ] as const,
  image: {
    src: "/images/why-choose.webp",
    alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
  } satisfies ImageAsset,
};

export const cinematicSolutions = {
  eyebrow: "What we offer",
  heading: "More than the tools themselves",
  body: "Four kinds of help, from choosing a first trowel to specifying a kit for an eight-person crew.",
};

export const cinematicJournal = {
  eyebrow: "Learn and grow",
  heading: "From the resources desk",
  body: "Guides written for Indian conditions, by people who garden in them.",
  cta: { label: "View all resources", href: routes.resources },
};

export const cinematicVoices = {
  eyebrow: "In their words",
  heading: "Trusted by gardeners",
};

export const cinematicClosing = {
  eyebrow: "Start here",
  statement: "Every good garden starts with the right tool in your hand.",
  body: "Tell us what you are growing and where you are growing it. We will tell you honestly what you need, and what you can skip.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Tools", href: routes.tools },
  image: {
    src: "/images/about-preview.webp",
    alt: "A gardener in an apron kneeling to plant seedlings in a raised timber bed on a bright afternoon",
  } satisfies ImageAsset,
};
