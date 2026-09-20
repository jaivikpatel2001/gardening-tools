import { routes } from "@/lib/routes";

/**
 * Copy for the sections every Home variant has to carry.
 *
 * The live Home page at `/` is the reference for section coverage: a variant
 * may reorder and restyle anything, but it may not drop a section. Several
 * sections were missing from the variants, so they are supplied from here and
 * rendered through the shared bands in `components/variants/shared/`.
 *
 * Bodies are shared, because the substance is the same on every variant.
 * Eyebrows and headings are written per variant, so each page still sounds like
 * itself: the cinematic page is quiet, the interactive page is direct, the
 * botanical page is warm, the art-directed page is short, and the catalogue
 * page is numbered like a printed section.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export type VariantId = 1 | 2 | 3 | 4 | 5;

interface SectionCopy {
  eyebrow: string;
  heading: string;
}

export interface VariantSectionCopy {
  trust: SectionCopy;
  about: SectionCopy;
  benefits: SectionCopy;
  solutions: SectionCopy;
  highlights: SectionCopy;
  clients: SectionCopy;
  community: SectionCopy;
  testimonials: SectionCopy;
}

/** The supporting lines, identical everywhere because the facts are identical. */
export const variantSectionBody = {
  trust: "Four things every order gets, whether it is one khurpi or a season of machinery.",
  about:
    "Garden machinery, plant protection equipment, hand tools and watering products, supplied from Ahmedabad to landscapers, institutes, corporates and home gardeners.",
  benefits: "What a product has to prove before it earns space on the shelf.",
  solutions: "Practical help that turns a product into a garden that actually works.",
  highlights: "Counted from the catalogue itself rather than rounded up for a website.",
  clients:
    "Landscapers, institutes, corporates, nurseries and home gardeners buy from the same counter, and the range is specified for the ones who use it every day.",
  community:
    "Better products make better gardens. The rest of it is time, water and somebody willing to kneel down.",
  testimonials: "What people say once the second monsoon has been and gone.",
} as const;

export const variantSectionCopy: Record<VariantId, VariantSectionCopy> = {
  1: {
    trust: { eyebrow: "What you get", heading: "Four things, every time" },
    about: { eyebrow: "The company", heading: "A counter in Ahmedabad" },
    benefits: { eyebrow: "Why it lasts", heading: "Judged on the second monsoon" },
    solutions: { eyebrow: "What we offer", heading: "More than the products themselves" },
    highlights: { eyebrow: "At a glance", heading: "The range, counted" },
    clients: { eyebrow: "Who we supply", heading: "Six kinds of garden" },
    community: { eyebrow: "Grow together", heading: "Growing better gardens together" },
    testimonials: { eyebrow: "In their words", heading: "Trusted by gardeners" },
  },
  2: {
    trust: { eyebrow: "Every order", heading: "What comes with it" },
    about: { eyebrow: "Who we are", heading: "Supplying Indian gardens since 1998" },
    benefits: { eyebrow: "Built to last", heading: "What we check first" },
    solutions: { eyebrow: "Garden solutions", heading: "Tell us the job" },
    highlights: { eyebrow: "The numbers", heading: "The range, counted" },
    clients: { eyebrow: "Who buys here", heading: "Six kinds of customer" },
    community: { eyebrow: "Grow together", heading: "Better gardens, not bigger bills" },
    testimonials: { eyebrow: "What people say", heading: "Trusted by gardeners" },
  },
  3: {
    trust: { eyebrow: "What you get", heading: "Four promises that travel with the order" },
    about: { eyebrow: "Our story", heading: "Rooted in Ahmedabad, growing across India" },
    benefits: { eyebrow: "Why gardeners stay", heading: "Made for the work your garden demands" },
    solutions: { eyebrow: "Garden solutions", heading: "Five gardens, five sets of products" },
    highlights: { eyebrow: "At a glance", heading: "Grown steadily, counted honestly" },
    clients: { eyebrow: "Who we grow with", heading: "The gardens behind the range" },
    community: { eyebrow: "Grow together", heading: "Growing better gardens together" },
    testimonials: { eyebrow: "What our customers say", heading: "Gardeners who stayed" },
  },
  4: {
    trust: { eyebrow: "Standard", heading: "Every order" },
    about: { eyebrow: "The company", heading: "Ahmedabad. 1998." },
    benefits: { eyebrow: "Specification", heading: "Why these products last" },
    solutions: { eyebrow: "Support", heading: "Beyond the object" },
    highlights: { eyebrow: "Figures", heading: "Counted, not claimed" },
    clients: { eyebrow: "Clients", heading: "Who this is for" },
    community: { eyebrow: "Together", heading: "Better gardens" },
    testimonials: { eyebrow: "Voices", heading: "Trusted by gardeners" },
  },
  5: {
    trust: { eyebrow: "Terms of supply", heading: "What every order includes" },
    about: { eyebrow: "Section 04", heading: "About us" },
    benefits: { eyebrow: "Section 07", heading: "Why these products last" },
    solutions: { eyebrow: "Section 03", heading: "What we do besides supplying products" },
    highlights: { eyebrow: "Section 08", heading: "The range, in figures" },
    clients: { eyebrow: "Section 05", heading: "Clientele" },
    community: { eyebrow: "Section 09", heading: "Growing better gardens together" },
    testimonials: { eyebrow: "Section 10", heading: "Testimonials" },
  },
};

/** The closing pair of actions, shared by every variant band that needs one. */
export const variantActions = {
  primary: { label: "Get in Touch", href: routes.contact },
  secondary: { label: "Explore Our Products", href: routes.products },
  clients: { label: "See Our Clients", href: routes.clients },
  about: { label: "Discover Our Story", href: routes.about },
};
