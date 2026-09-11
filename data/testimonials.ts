import type { Testimonial } from "@/types/content";

/**
 * Sample testimonials. Names, roles and cities are realistic **placeholder**
 * data — replace with real, permissioned customer quotes before launch.
 * Each entry is matched to the person actually shown in its photograph.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I asked for help choosing one pair of secateurs and got a proper conversation about my hands and my terrace. Two summers on, they still close cleanly.",
    name: "Meera Nair",
    role: "Terrace gardener",
    location: "Kochi, Kerala",
    rating: 5,
    image: {
      src: "/images/testimonial-01.webp",
      alt: "Portrait of a smiling gardener holding a potted plant in a flowering garden",
    },
  },
  {
    quote:
      "The spade has been through three monsoons in heavy black soil without a wobble. The rust-care guide alone was worth the visit.",
    name: "Rajendra Deshmukh",
    role: "Kitchen gardener",
    location: "Pune, Maharashtra",
    rating: 5,
    image: {
      src: "/images/testimonial-02.webp",
      alt: "Portrait of a smiling older gardener standing beside raised vegetable beds",
    },
  },
  {
    quote:
      "We kit out an eight-person crew from here for society and resort work. They understand what daily commercial use does to a tool, and they specify accordingly.",
    name: "Harpreet Singh",
    role: "Landscape contractor",
    location: "Chandigarh",
    rating: 5,
    image: {
      src: "/images/testimonial-03.webp",
      alt: "Portrait of a landscaping professional leaning on a tool handle at a work site",
    },
  },
];
