import { Shovel, Sprout, Users, Wrench } from "lucide-react";

import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "tool-selection",
    title: "Garden Tool Selection",
    description:
      "Tell us your soil, your plants and the hours you put in, and we will narrow six options down to the one that suits your garden.",
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
    icon: Shovel,
    image: {
      src: "/images/service-garden-setup.webp",
      alt: "A new raised garden bed being assembled and filled with soil",
    },
  },
  {
    slug: "tool-care",
    title: "Tool Care & Maintenance",
    description:
      "Sharpening, cleaning, oiling and handle replacement, plus the monsoon routine that keeps steel from rusting through.",
    icon: Wrench,
    image: {
      src: "/images/service-tool-care.webp",
      alt: "Hands sharpening and oiling a garden tool blade at a workbench",
    },
  },
  {
    slug: "professional-support",
    title: "Professional Garden Support",
    description:
      "Kit specification, bulk supply and servicing for landscapers, housing societies, schools, resorts and nursery teams.",
    icon: Users,
    image: {
      src: "/images/service-professional-support.webp",
      alt: "A professional gardening team working together on a landscaped residential garden",
    },
  },
];
