import { Building2, GraduationCap, Hotel, Leaf, Sprout, Trees } from "lucide-react";

import { site } from "@/config/site";
import { routes } from "@/lib/routes";
import type { BrandMark, Industry } from "@/types/content";

/**
 * Content for the Clients page and the Clients section on Home.
 *
 * Clients replaced the planned Resources section and page. Editorial guides are
 * no longer a route; credibility is.
 *
 * The client categories below are the ones the business states itself:
 * "leading landscapers, iconic institutes, corporates and even individual
 * customers", plus the nursery, farm and hospitality work its machinery range
 * plainly serves. No individual customer is named and no project is described,
 * because none of that has been supplied. The marks on the page are the
 * manufacturer brands the business stocks, not customers; see `brandMarks`.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const clientsIntro = {
  eyebrow: "Who we supply",
  heading: "Trusted Where Gardens Are Work, Not a Hobby",
  body: `Landscapers, institutes, corporates and individual gardeners have bought from ${site.legalName} since ${site.founded}. The range is specified for the ones who use it every day, which is why it holds up for everyone else.`,
};

/**
 * The brand wall.
 *
 * These five marks come from the client's own site. They are **manufacturers**
 * whose equipment Jiva Greens stocks, not customers who buy from it: STIHL
 * makes power tools, and Falcon, Concorde, Milan and Kamlesh are Indian garden
 * tool and lawn mower makers. The old site files them under "clients", but the
 * marks themselves are unambiguous, and calling a manufacturer a client would
 * be an obvious error to anyone in the trade. They are presented here as what
 * they are, which is the stronger claim anyway: carrying these names is what a
 * serious dealer is judged on.
 *
 * Files are copied byte for byte by `npm run images` from
 * `gardening images/clients/`. Add a mark by dropping the file in and adding an
 * entry here. Customer logos, when the client supplies approved ones, belong in
 * a separate list rather than mixed into this one.
 */
export const brandMarks: readonly BrandMark[] = [
  {
    name: "STIHL",
    image: { src: "/images/clients/stihl.jpg", alt: "Logo of STIHL" },
  },
  {
    name: "Falcon Garden Tools",
    image: { src: "/images/clients/falcon.jpg", alt: "Logo of Falcon Garden Tools" },
  },
  {
    name: "Concorde",
    image: { src: "/images/clients/concorde.jpg", alt: "Logo of Concorde" },
  },
  {
    name: "Milan",
    image: { src: "/images/clients/milan.jpg", alt: "Logo of Milan" },
  },
  {
    name: "Kamlesh Lawn Mowers",
    image: { src: "/images/clients/kamlesh-lown-mower.jpg", alt: "Logo of Kamlesh Lawn Mowers" },
  },
];

export const brandWall = {
  eyebrow: "Brands we stock",
  heading: "The Names Behind the Range",
  body: "We supply and service equipment from the makers below. Stocking them means holding their spares too, which is the part that matters on the day something breaks.",
};

export const industries: readonly Industry[] = [
  {
    icon: Trees,
    title: "Landscapers & Contractors",
    description:
      "Crews running several sites a week, where a failed machine costs a day. Specified for daily commercial use, with spares kept in stock.",
    categorySlugs: ["brush-cutters", "lawn-mowers", "chain-saws", "spray-pumps"],
  },
  {
    icon: GraduationCap,
    title: "Institutes & Campuses",
    description:
      "Schools, colleges and research campuses with lawns, avenues and hedges that have to look the same in June as they do in December.",
    categorySlugs: ["lawn-mowers", "hedge-trimmers", "blowers", "sprinklers"],
  },
  {
    icon: Building2,
    title: "Corporates & Housing Societies",
    description:
      "Common plots, podium gardens and society greens maintained by a small in-house team on a fixed annual budget.",
    categorySlugs: ["lawn-mowers", "hedge-trimmers", "watering-solutions", "plastic-planters-and-stands"],
  },
  {
    icon: Sprout,
    title: "Nurseries & Growers",
    description:
      "Potting benches, polyhouse beds and bench irrigation, where the same hand tool is picked up two hundred times a day.",
    categorySlugs: ["hand-tools", "plastic-planters-and-stands", "sprinklers", "spray-pumps"],
  },
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    description:
      "Grounds that are part of the guest experience, cleared and cut early in the morning and never seen being worked on.",
    categorySlugs: ["lawn-mowers", "blowers", "hedge-trimmers", "sprinklers"],
  },
  {
    icon: Leaf,
    title: "Home & Terrace Gardeners",
    description:
      "Balconies, terraces and kitchen gardens, where the right khurpi matters more than the biggest machine on the shelf.",
    categorySlugs: ["hand-tools", "watering-solutions", "cutting-tools", "plastic-planters-and-stands"],
  },
];

export const industriesSection = {
  eyebrow: "Industries served",
  heading: "Six Kinds of Garden, One Counter",
  body: "The work changes with the site. What does not change is being asked what you are actually growing before anything is recommended.",
};

export const partnershipApproach = {
  eyebrow: "How we work",
  heading: "How a Supply Relationship Starts",
  body: "No account managers and no annual contracts. Four steps, and most of them happen over a phone call.",
  steps: [
    {
      index: "01",
      title: "Understand the site",
      body: "Area, soil, grass type, water source and who will be doing the work. A society green and a farmhouse lawn need different machines with the same name.",
    },
    {
      index: "02",
      title: "Specify the kit",
      body: "We put up options with the trade-offs stated plainly, including the cheaper one where it is genuinely the right answer.",
    },
    {
      index: "03",
      title: "Supply and hand over",
      body: "Delivery, setup and a walk through starting, cutting heights, safety gear and what not to do with it.",
    },
    {
      index: "04",
      title: "Service and spares",
      body: "Sharpening, blades, seals, chains and handles. The relationship is judged on the second monsoon, not the first invoice.",
    },
  ] as const,
};

export const clientsCta = {
  eyebrow: "Work with us",
  heading: "Tell Us What You Maintain",
  body: "Send us the site and the season, and we will specify the kit for it. Bulk and institutional supply is quoted by enquiry.",
  primaryCta: { label: "Get in Touch", href: routes.contact },
  secondaryCta: { label: "Explore Our Products", href: routes.products },
};
