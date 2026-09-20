import { Shovel, Sprout, Users, Wrench } from "lucide-react";

import type { Solution } from "@/types/content";

/**
 * The help offered alongside the range.
 *
 * There is deliberately no Services page and no service detail route. These are
 * shown contextually: on Home under "gardening solutions", on About as what the
 * business actually does for its customers, and on Contact as the reasons
 * people get in touch. Every one of them converts to an enquiry.
 */
export const solutions: Solution[] = [
  {
    slug: "product-selection",
    title: "Product Selection",
    description:
      "Tell us your soil, your plants and the hours you put in, and we will narrow six options down to the one that suits your garden.",
    audience: "First-time growers and anyone replacing something that failed",
    icon: Sprout,
    image: {
      src: "/images/service-tool-selection.webp",
      alt: "Two people examining a selection of gardening tools together at a workbench",
    },
  },
  {
    slug: "garden-setup",
    title: "Garden Setup Assistance",
    description:
      "Practical help planning terrace gardens, balcony containers and kitchen garden beds, including what you genuinely need to start.",
    audience: "Balcony, terrace and kitchen garden owners starting out",
    icon: Shovel,
    image: {
      src: "/images/service-garden-setup.webp",
      alt: "A new raised garden bed being assembled and filled with soil",
    },
  },
  {
    slug: "care-and-maintenance",
    title: "Care & Maintenance",
    description:
      "Sharpening, cleaning, oiling and handle replacement, plus the monsoon routine that keeps steel from rusting through.",
    audience: "Everyone, once a season, and again before the monsoon",
    icon: Wrench,
    image: {
      src: "/images/service-tool-care.webp",
      alt: "Hands sharpening and oiling a garden tool blade at a workbench",
    },
  },
  {
    slug: "professional-supply",
    title: "Professional & Bulk Supply",
    description:
      "Kit specification, bulk supply and servicing for landscapers, housing societies, schools, resorts and nursery teams.",
    audience: "Landscapers, societies, institutes, corporates and nurseries",
    icon: Users,
    image: {
      src: "/images/service-professional-support.webp",
      alt: "A professional gardening team working together on a landscaped residential garden",
    },
  },
];
