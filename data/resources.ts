import type { Resource } from "@/types/content";

/**
 * Home page previews the first three. Resources is the site's editorial home —
 * guides, how-tos, seasonal tips and FAQ. There is no separate blog.
 */
export const resources: Resource[] = [
  {
    slug: "how-to-choose-the-right-gardening-tool",
    category: "Tool Guide",
    title: "How to Choose the Right Gardening Tool",
    excerpt:
      "Blade shape, handle length and material change how a tool feels after an hour in the sun. Here is how to judge all three before you buy.",
    readingTime: "6 min read",
    image: {
      src: "/images/resource-choosing-tools.webp",
      alt: "Several gardening tools laid out side by side on a bench for comparison",
    },
  },
  {
    slug: "essential-tools-for-an-indian-home-garden",
    category: "Gardening Guide",
    title: "Essential Tools for an Indian Home Garden",
    excerpt:
      "Five tools cover most of the work in a terrace or kitchen garden. Start here, and add the specialists only when your plants ask for them.",
    readingTime: "5 min read",
    image: {
      src: "/images/resource-essential-tools.webp",
      alt: "A compact starter set of gardening tools grouped beside a canvas tote",
    },
  },
  {
    slug: "keep-garden-tools-rust-free-through-the-monsoon",
    category: "Seasonal Tips",
    title: "Keeping Garden Tools Rust-Free Through the Monsoon",
    excerpt:
      "Ten minutes at the end of a session is the difference between tools that last two monsoons and tools that outlast the garden.",
    readingTime: "7 min read",
    image: {
      src: "/images/resource-clean-maintain.webp",
      alt: "A muddy garden tool being cleaned with a brush and cloth after use",
    },
  },
];
