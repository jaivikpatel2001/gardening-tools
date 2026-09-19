import { AboutPreview } from "@/components/home/AboutPreview";
import {
  FeaturedTools,
  ResourcesPreview,
  ServicesPreview,
  Testimonials,
  ToolCategories,
} from "@/components/home/collections";
import { CommunityStory } from "@/components/home/CommunityStory";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

/**
 * Home page — a server component that composes the twelve sections and nothing
 * else. Copy and imagery live in `data/`, behaviour lives in the handful of
 * client components each section pulls in.
 *
 * The section order is also the background rhythm: canvas, white, warm,
 * canvas, soft, white, elevated, soft, photo, canvas, sage, white, then the
 * footer. No two neighbours share a surface, and the photographic community
 * band is the only dark section in the body, so the page never reads as "a
 * green website" and the dark footer always lands after a light section.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ToolCategories />
      <WhyChooseUs />
      <FeaturedTools />
      <ServicesPreview />
      <ResourcesPreview />
      <CommunityStory />
      <Testimonials />
      <FinalCTA />
      <Newsletter />
    </>
  );
}
