import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and media for variant 4, "Bold Art-Directed Product Showcase"
 * (`/variant4`).
 *
 * The most experimental of the five, and the one where typography carries the
 * hierarchy that photography carries elsewhere. Copy is written short on
 * purpose: at these sizes a sentence becomes a composition, so every line here
 * has been counted rather than written and trimmed later.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const artHero = {
  eyebrow: "Jiva Greens",
  words: ["Grow", "Better"] as const,
  body: "Gardening tools built for Indian soil, Indian seasons and the way Indian gardens are actually worked.",
  cta: { label: "Explore the range", href: routes.tools },
  meta: [
    { value: "14", label: "Categories" },
    { value: site.founded, label: "Since" },
  ] as const,
  scrollCue: "Scroll",
  image: {
    src: "/images/tool-garden-spade.webp",
    alt: "The blade and lower shaft of a forged garden spade against a pale background",
  } satisfies ImageAsset,
};

export const artWall = {
  eyebrow: "The range",
  heading: "Pick a direction",
  body: "Five photographed categories. The rest of the range, machinery included, sits behind the index.",
  cta: { label: "View the complete range", href: routes.tools },
};

export const artGallery = {
  eyebrow: "Selected tools",
  heading: "Four objects, four ways of looking",
  /** A different visual treatment per tool, keyed by slug. */
  treatments: {
    "bypass-pruning-secateurs": { label: "Macro study", note: "Blade, pivot, spring" },
    "hardwood-hand-trowel": { label: "In the hand", note: "Balance and reach" },
    "forged-garden-spade": { label: "Technical detail", note: "Forged head, rolled tread" },
    "galvanised-watering-can": { label: "Material study", note: "Galvanised steel, brass rose" },
  } as Record<string, { label: string; note: string }>,
};

export const artTechnical = {
  eyebrow: "Specification",
  heading: "Why these tools last",
  body: "Six things we check before anything earns shelf space.",
  image: {
    src: "/images/why-choose.webp",
    alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
  } satisfies ImageAsset,
  items: [
    {
      index: "01",
      title: "Blade technology",
      body: "Hardened carbon steel, ground to an edge that can be brought back with a stone rather than replaced.",
    },
    {
      index: "02",
      title: "Ergonomic design",
      body: "Weight toward the hand, not the tip. Tested across an afternoon of work, not across a showroom counter.",
    },
    {
      index: "03",
      title: "Durability",
      body: "Solid sockets and forged heads. The join is where cheap tools fail, and it fails in the second monsoon.",
    },
    {
      index: "04",
      title: "Performance",
      body: "Specified for black cotton soil in May and laterite in August, which is the worst week of the year, not the easiest.",
    },
    {
      index: "05",
      title: "Safety",
      body: "Locks that hold, guards that stay on, and goggles and ear defence specified with every power tool we sell.",
    },
    {
      index: "06",
      title: "Materials",
      body: "Seasoned hardwood, galvanised steel and powder coat. Nothing that swells, splits or rusts through in a wet year.",
    },
  ] as const,
};

export const artJournal = {
  eyebrow: "Learn and grow",
  heading: "Field notes",
  body: "Practical guidance for Indian gardens, written by people who dig.",
  cta: { label: "View all resources", href: routes.resources },
};

export const artClosing = {
  eyebrow: "Start here",
  words: ["Make Your", "Garden", "Better."] as const,
  body: "Tell us what you are growing. We will tell you what you need.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Tools", href: routes.tools },
};
