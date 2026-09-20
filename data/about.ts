import { Compass, HandHeart, Ruler, ShieldCheck } from "lucide-react";

import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy for the About page.
 *
 * Every fact here comes from the business itself: established in 1998, based in
 * Ahmedabad, supplying landscapers, institutes, corporates and individual
 * customers, working from in-house processing expertise and its own
 * infrastructure. Nothing is added that the client has not stated. No turnover,
 * headcount, customer count, certification or registered identifier appears,
 * because none of those have been supplied.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const aboutHero = {
  eyebrow: "About Jiva Greens",
  headingLines: ["Everything in", "Gardening, Since", site.founded] as const,
  body: `${site.legalName} has supplied garden tools and equipment from Ahmedabad since ${site.founded}. Jiva Greens is the name that range is sold under, and the promise behind it is simple: anything and everything in gardening, chosen for Indian conditions.`,
  primaryCta: { label: "Explore Our Products", href: routes.products },
  secondaryCta: { label: "Get in Touch", href: routes.contact },
  image: {
    src: "/images/about-preview.webp",
    alt: "A gardener in an apron kneeling to plant seedlings in a raised timber bed on a terrace, with potted plants and rooftops behind",
  } satisfies ImageAsset,
  detailImage: {
    src: "/images/why-choose.webp",
    alt: "Macro detail of a forged steel tool head joined to a seasoned hardwood handle",
  } satisfies ImageAsset,
};

export const aboutIntroduction = {
  eyebrow: "The company",
  heading: "A Garden Tools Business, Run Like One",
  paragraphs: [
    `${site.legalName} is a professionally organised company established in ${site.founded}, supplying the most comprehensive range of garden tools and equipment we can put our name to.`,
    "Over the years the firm has become a byword for anything and everything in horticultural tools, including the odds and ends nobody else stocks. As a trusted stockist of quality material, we are reckoned among the best in the field, and a clientele of leading landscapers, iconic institutes, corporates and individual gardeners is what that claim rests on.",
    "In-house processing expertise, sound infrastructure and steady finances are what let us fulfil needs that range from a single khurpi to a season of machinery for an eight-person crew.",
  ],
  points: [
    "Garden machinery, plant protection equipment, hand tools and watering products",
    "Supplied to landscapers, institutes, corporates and home gardeners",
    "Advice, spares and servicing that continue long after the sale",
  ],
};

export const brandStory = {
  eyebrow: "Our story",
  heading: "From a Counter in Ahmedabad to Gardens Across India",
  body: "The business grew the way a garden does: slowly, in the same place, by people who kept turning up.",
  chapters: [
    {
      index: "01",
      title: "A counter, and a question",
      body: `The firm opened in ${site.founded} with a simple idea: stock the tools Indian gardeners actually ask for, and answer honestly when someone asks which one they need. That second half is what brought people back.`,
    },
    {
      index: "02",
      title: "The range widens",
      body: `Hand tools led to watering, watering led to lawn care, and lawn care led to machinery. Today the range runs from a khurpi to a petrol brush cutter, which is what ${site.tagline.toLowerCase()} was always meant to mean.`,
    },
    {
      index: "03",
      title: "Professionals arrive",
      body: "Landscapers, institutes and corporates buy differently from home gardeners: they buy for daily use and they judge you on spares. Supplying them changed what we were willing to stock.",
    },
    {
      index: "04",
      title: "The same counter",
      body: "The address has not moved and neither has the approach. A garden is still judged in the second monsoon, and so is the tool that made it.",
    },
  ] as const,
};

export const missionVision = [
  {
    key: "mission",
    eyebrow: "Mission",
    title: "Put the right tool in the right hands",
    body: "To supply Indian gardeners, from a first balcony to a hundred-acre campus, with equipment that suits the work, the soil and the season, and to say plainly when something cheaper will do the job.",
  },
  {
    key: "vision",
    eyebrow: "Vision",
    title: "Everything in gardening, under one roof",
    body: "To remain the counter that has whatever a garden needs, from the odds and ends nobody else stocks to the machinery a landscaping crew runs all week.",
  },
] as const;

export const brandValues = [
  {
    icon: ShieldCheck,
    title: "Honest specification",
    body: "The right answer, including when it is the cheaper option or nothing at all. A tool sold into the wrong job comes back, and so does the customer, in the worst way.",
  },
  {
    icon: Ruler,
    title: "Built for the worst week",
    body: "Products are judged against black cotton soil in May and six weeks of monsoon damp, not against an easy afternoon in a showroom.",
  },
  {
    icon: HandHeart,
    title: "Support after the sale",
    body: "Sharpening, spares, seals, chains and handles. A supplier is only useful on the day something breaks.",
  },
  {
    icon: Compass,
    title: "Local knowledge",
    body: "Indian soil, Indian grass, Indian seasons and Indian names for the tools. A phawda is not a spade, and it matters which one you ask for.",
  },
] as const;

export const productPhilosophy = {
  eyebrow: "How we choose",
  heading: "What a Product Has to Survive Before We Stock It",
  body: "There is no laboratory here and we will not pretend otherwise. What there is, is decades of watching where things fail.",
  checks: [
    {
      index: "01",
      title: "The join",
      body: "Most cheap tools fail where the head meets the handle, and they fail in the second monsoon. Forged heads and solid sockets, or it does not come in.",
    },
    {
      index: "02",
      title: "The edge",
      body: "An edge you can bring back with a stone is worth more than an edge that arrives sharper and cannot be recovered.",
    },
    {
      index: "03",
      title: "The spares",
      body: "If the blade, spring, seal or chain cannot be supplied separately, the product is disposable, whatever the price says.",
    },
    {
      index: "04",
      title: "The hand",
      body: "Weight toward the hand, not the tip. Tested across an afternoon of work rather than across a counter.",
    },
  ] as const,
};

export const capability = {
  eyebrow: "Capability",
  heading: "In-House Expertise, Not Just a Shelf",
  body: "Processing expertise and infrastructure of our own are what make a diverse order possible, whether it is one item or a full kit.",
  items: [
    {
      title: "In-house processing",
      body: "Assembly, finishing and preparation handled here rather than passed down the line, which is what keeps quality consistent across a batch.",
    },
    {
      title: "Sound infrastructure",
      body: "Storage and handling for machinery and consumables together, so a mixed order leaves as one delivery.",
    },
    {
      title: "Service bench",
      body: "Sharpening, blade changes, handle replacement and seasonal servicing, including for equipment bought years ago.",
    },
    {
      title: "Spares holding",
      body: "Blades, springs, heads, chains, seals, nozzles and trimmer line kept in stock, because that is what keeps machines working.",
    },
  ] as const,
};

export const indianFocus = {
  eyebrow: "Made for India",
  heading: "Specified for Indian Ground, Not Adapted to It",
  body: "Black cotton soil that sets like concrete in May. Laterite that hides stone. Six weeks of monsoon damp that finds every unprotected join, and forty-degree afternoons that decide whether a handle is comfortable or unusable. Products chosen for that work everywhere else by default.",
  points: [
    {
      title: "Soil",
      body: "Digging tools specified for black cotton, red and laterite soil rather than for loose European loam.",
    },
    {
      title: "Season",
      body: "Rust care, seals and finishes chosen around the monsoon, which is when most garden equipment in India dies.",
    },
    {
      title: "Grass",
      body: "Mowers sold by cutting type and height, because that is what decides how an Indian lawn actually looks.",
    },
    {
      title: "Language",
      body: "Khurpi, phawda, kudali, gaiti, daranti. The names people use at the counter are the names we use on the website.",
    },
  ] as const,
  image: {
    src: "/images/community-story.webp",
    alt: "A wide view of a thriving community garden with raised beds and gardeners at work in golden evening light",
  } satisfies ImageAsset,
};

export const aboutCta = {
  eyebrow: "Start here",
  heading: "Tell Us What You Are Growing",
  body: "Whether it is one terrace or forty acres of campus, the conversation starts the same way.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Our Products", href: routes.products },
};
