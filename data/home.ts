import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and media for the Home page's one-off sections: the ones not backed by a
 * repeating collection. Keeping them here means section components stay pure
 * layout, and a copy change never touches a component.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const heroContent = {
  eyebrow: "Tools for better gardens",
  /**
   * Three explicit lines, not natural wrapping. Each is its own clip-reveal
   * target in the entrance timeline, and the break is tuned so the block reads
   * as a balanced editorial rag (473, 471 and 440px wide at the 64px cap).
   */
  headingLines: ["Everything You", "Need to Grow a", "Better Garden"] as const,
  body: "Reliable gardening tools, practical guidance and garden solutions built for Indian soil, Indian seasons and the way Indian gardens are actually worked.",
  primaryCta: { label: "Explore Our Tools", href: routes.tools },
  secondaryCta: { label: "Get in Touch", href: routes.contact },
  trustLine: "Built for gardeners. Designed for lasting performance.",
  card: {
    eyebrow: "Quality Tools",
    line: "Practical · Reliable · Built to Last",
  },
  image: {
    src: "/images/hero-main.webp",
    alt: "A hand trowel and fork with hardwood handles resting on dark soil beside herb seedlings in a garden bed at sunrise",
  } satisfies ImageAsset,
  detailImage: {
    src: "/images/hero-detail.webp",
    alt: "Close-up of a pair of bypass pruning secateurs held over green foliage",
  } satisfies ImageAsset,
};

export const aboutContent = {
  eyebrow: "Who we are",
  heading: "Tools That Help You Grow With Confidence",
  paragraphs: [
    `${site.legalName} has supplied garden machinery, plant protection equipment and hand tools from Ahmedabad since ${site.founded}. Landscapers, institutes, corporates and home gardeners come to us for the same thing: the right tool for the job, and one that keeps working after the monsoon.`,
    "From wheel-type and rotary lawn mowers to brush cutters, spray pumps, secateurs and the humble khurpi, everything we supply is chosen for Indian soil, Indian grass and Indian summers.",
  ],
  points: [
    "Tools chosen for how they hold up, not how they photograph",
    "Practical garden knowledge from people who actually dig",
    "Support that continues long after the first monsoon",
  ],
  cta: { label: "Discover Our Story", href: routes.about },
  image: {
    src: "/images/about-preview.webp",
    alt: "A gardener in an apron kneeling to plant seedlings in a raised timber bed on a bright afternoon",
  } satisfies ImageAsset,
};

export const whyChooseContent = {
  eyebrow: "Why choose us",
  heading: "Made for the Work Your Garden Demands",
  body: "Black cotton soil that sets like concrete in May, six weeks of monsoon damp, and forty-degree afternoons. The tools we stock are specified for the worst week of the year, not the easiest.",
  image: {
    src: "/images/why-choose.webp",
    alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
  } satisfies ImageAsset,
};

export const communityContent = {
  eyebrow: "Grow together",
  heading: "Growing Better Gardens Together",
  body: "We believe better tools create better gardening experiences. Our goal is to help people spend less time struggling with their tools and more time enjoying the spaces they create.",
  cta: { label: "Learn More About Us", href: routes.about },
  image: {
    src: "/images/community-story.webp",
    alt: "A wide view of a thriving community garden with raised beds and gardeners at work in golden evening light",
  } satisfies ImageAsset,
};

export const finalCtaContent = {
  heading: "Ready to Make Gardening Easier?",
  body: "Tell us what you are growing and we will help you find the right tools and solutions.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Tools", href: routes.tools },
};

export const newsletterContent = {
  heading: "Stay Connected to Your Garden",
  body: "Practical gardening tips, useful guides and season-by-season advice for Indian gardens.",
};

export const sectionCopy = {
  toolCategories: {
    eyebrow: "Explore our tools",
    heading: "Tools for Every Garden Task",
    body: "Traditional Indian hand tools and modern garden machinery for balconies, kitchen gardens, farms, nurseries and estate grounds.",
    cta: { label: "View All Tools", href: routes.tools },
    teaser: {
      eyebrow: "Power & garden machinery",
      title: "Mowers, brush cutters, sprayers and more",
      cta: { label: "See the complete range", href: "#complete-range" },
    },
    index: {
      eyebrow: "The complete range",
      heading: "Traditional tools and modern machinery, under one roof",
      description:
        "From the khurpi in your hand to the brush cutter on your shoulder. Every category comes with the same honest advice on choosing, using and caring for it.",
    },
  },
  featuredTools: {
    eyebrow: "Our tool range",
    heading: "Built for Every Gardening Need",
    body: "A few of the tools we reach for most often, and why they keep earning their place.",
    cta: { label: "Browse the Range", href: routes.tools },
  },
  services: {
    eyebrow: "What we offer",
    heading: "More Than Just Gardening Tools",
    body: "Practical support, guidance and garden solutions from people who understand the work.",
  },
  resources: {
    eyebrow: "Learn & grow",
    heading: "Helpful Knowledge for Better Gardens",
    body: "Simple guides, practical tips and useful information to help you get more from your garden and your tools.",
    cta: { label: "View All Resources", href: routes.resources },
  },
  testimonials: {
    eyebrow: "What our customers say",
    heading: "Trusted by Gardeners",
  },
} as const;
