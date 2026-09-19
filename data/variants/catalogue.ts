import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and media for variant 5, "Structured Catalogue" (`/variant5`).
 *
 * The direction is the printed trade catalogue a serious tool company sends to
 * its dealers: a cover with a contents page, an index of the complete range as
 * a table, specimen plates, and a colophon at the end. Everything sits on the
 * warm light surfaces, ruled with hairlines rather than boxed into cards.
 *
 * The anchors below are same-page fragments, not routes, which is why they are
 * plain strings here and not built through `lib/routes`.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const catalogueHero = {
  edition: "Edition 2026",
  eyebrow: "Tools for better gardens",
  headingLines: ["The Complete", "Garden Tool", "Catalogue"] as const,
  body: "Traditional Indian hand tools and modern garden machinery, set out the way a trade catalogue sets them out: everything listed, explained honestly and supplied by enquiry.",
  primaryCta: { label: "Explore Our Tools", href: routes.tools },
  secondaryCta: { label: "Get in Touch", href: routes.contact },
  /** The masthead strip. Counts are filled in from the catalogue at render. */
  meta: [
    { label: "Established", value: site.founded },
    { label: "Based in", value: "Ahmedabad" },
    { label: "How to buy", value: "By enquiry" },
  ] as const,
  contents: [
    { number: "01", title: "The complete range", href: "#catalogue-range" },
    { number: "02", title: "Selected tools", href: "#catalogue-specimens" },
    { number: "03", title: "Services", href: "#catalogue-services" },
    { number: "04", title: "About us", href: "#catalogue-about" },
    { number: "05", title: "Reading", href: "#catalogue-reading" },
    { number: "06", title: "Enquire", href: "#catalogue-enquire" },
  ] as const,
  image: {
    src: "/images/resource-choosing-tools.webp",
    alt: "Several gardening tools laid out side by side on a bench for comparison",
  } satisfies ImageAsset,
  caption: "Plate 01. Hand tools laid out for comparison.",
};

export const catalogueRange = {
  eyebrow: "Section 01",
  heading: "The complete range, listed",
  body: "Every category we stock, both halves of the range, with what sits inside each one. Photographed categories carry a plate; the rest are listed exactly the same way.",
  columns: { category: "Category", contents: "What is inside", count: "Types" },
  cta: { label: "View all tools", href: routes.tools },
};

export const catalogueSpecimens = {
  eyebrow: "Section 02",
  heading: "Selected tools",
  body: "Four specimens from the range, each with the three things worth knowing before you pick it up.",
  /** Three spec rows per featured tool, keyed by slug. */
  specs: {
    "bypass-pruning-secateurs": [
      { label: "Action", value: "Bypass" },
      { label: "Blade", value: "Hardened carbon steel" },
      { label: "Cuts to", value: "20 mm" },
    ],
    "hardwood-hand-trowel": [
      { label: "Join", value: "Solid socket" },
      { label: "Blade", value: "Polished steel" },
      { label: "Best for", value: "Pots and grow bags" },
    ],
    "forged-garden-spade": [
      { label: "Head", value: "Forged, one piece" },
      { label: "Tread", value: "Rolled step" },
      { label: "Best for", value: "Black cotton soil" },
    ],
    "galvanised-watering-can": [
      { label: "Rose", value: "Fine brass" },
      { label: "Body", value: "Galvanised steel" },
      { label: "Best for", value: "Seedlings" },
    ],
  } as Record<string, readonly { label: string; value: string }[]>,
};

export const catalogueServices = {
  eyebrow: "Section 03",
  heading: "What we do besides selling tools",
  body: "Four services, and who each one is actually for.",
  /** The audience column, keyed by service slug. */
  audiences: {
    "tool-selection": "First-time growers and anyone replacing a tool that failed",
    "garden-setup": "Balcony, terrace and kitchen garden owners starting out",
    "tool-care": "Everyone, once a season, and before the monsoon",
    "professional-support": "Landscapers, societies, schools, resorts and nurseries",
  } as Record<string, string>,
};

export const catalogueAbout = {
  eyebrow: "Section 04",
  heading: "About us",
  statement: `${site.legalName}, Ahmedabad, since ${site.founded}.`,
  paragraphs: [
    "Garden machinery, plant protection equipment, spares and hand tools for lawn and garden care, supplied to leading landscapers, institutes, corporates and individual gardeners.",
    "A tool earns its place in the range if it will still be working after ten monsoons, three owners and a season of daily commercial use.",
  ],
  facts: [
    { label: "Established", value: site.founded },
    { label: "Based in", value: "Ahmedabad, Gujarat" },
    { label: "Serving", value: "Landscapers, institutes, corporates, homes" },
    { label: "Support", value: "Advice, spares and servicing" },
  ] as const,
  cta: { label: "Discover our story", href: routes.about },
  image: {
    src: "/images/why-choose.webp",
    alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
  } satisfies ImageAsset,
  caption: "Plate 06. Forged head, seasoned handle.",
};

export const catalogueReading = {
  eyebrow: "Section 05",
  heading: "Reading",
  body: "Practical guidance for Indian gardens, written by people who dig.",
  cta: { label: "View all resources", href: routes.resources },
};

export const catalogueClosing = {
  eyebrow: "Section 06",
  heading: "Tell us what you are growing",
  body: "Send us your soil, your season and your space, and we will tell you what you need and what you can skip.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Tools", href: routes.tools },
  colophonNote: "Every tool in this catalogue is supplied by enquiry. No prices are published.",
};
