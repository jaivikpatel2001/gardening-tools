import { AboutPreview } from "@/components/home/AboutPreview";
import {
  ClientsPreview,
  FeaturedProducts,
  ProductCategories,
  SolutionsPreview,
  Testimonials,
} from "@/components/home/collections";
import { CommunityStory } from "@/components/home/CommunityStory";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { enforcePageVisibility } from "@/lib/page-guard";

/**
 * Home page, and the reference for section coverage across the site.
 *
 * The thirteen sections below are the canonical list. Every Home variant under
 * `/variant1` to `/variant5` must cover all of them, in its own visual
 * treatment and in whatever order suits that design. The checklist lives in
 * `resources/section-parity.md`.
 *
 * The section order is also the background rhythm: canvas, white, warm, canvas,
 * soft, white, elevated, warm, soft, photo, canvas, sage, white, then the
 * footer. No two neighbours share a surface, and the photographic community
 * band is the only dark section in the body, so the page never reads as "a
 * green website" and the dark footer always lands after a light section.
 */
export default function HomePage() {
  enforcePageVisibility("home");

  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ProductCategories />
      <WhyChooseUs />
      <FeaturedProducts />
      <SolutionsPreview />
      <Highlights />
      <ClientsPreview />
      <CommunityStory />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
