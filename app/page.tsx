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
 * The section order is also the background rhythm: canvas → band → warm →
 * canvas → soft → surface → elevated → soft → photo → canvas → band → sage.
 * No two neighbours share a surface, and the deep-green bands are rationed to
 * three so the page never reads as "a green website".
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
