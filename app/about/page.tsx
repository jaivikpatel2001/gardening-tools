import type { Metadata } from "next";

import {
  AboutIntroduction,
  AboutSolutions,
  BrandStory,
  BrandValues,
  Capability,
  IndianFocus,
  MissionVision,
  ProductPhilosophy,
} from "@/components/about/sections";
import { CtaBand } from "@/components/sections/CtaBand";
import { HighlightsBand } from "@/components/sections/HighlightsBand";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/config/site";
import { aboutCta, aboutHero } from "@/data/about";
import { highlightsContent } from "@/data/home";
import { getHighlights } from "@/lib/highlights";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: routes.home },
  { name: "About", path: routes.about },
];

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `${site.legalName}, Ahmedabad. Garden machinery, plant protection equipment, hand tools and watering products supplied to landscapers, institutes, corporates and home gardeners since ${site.founded}.`,
  path: routes.about,
});

/**
 * About page.
 *
 * Its own visual identity, consistent with Home: where Home alternates card
 * grids, this page is ruled and text-led, with a single deep band carrying the
 * mission and vision and a single photographic section carrying the Indian
 * focus. The highlights band is the same one Home uses, so the figures on both
 * pages are counted from the same place.
 */
export default function AboutPage() {
  enforcePageVisibility("about");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
      />

      <PageHero
        eyebrow={aboutHero.eyebrow}
        heading={aboutHero.headingLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        body={aboutHero.body}
        trail={trail}
        image={aboutHero.image}
        primaryCta={aboutHero.primaryCta}
        secondaryCta={aboutHero.secondaryCta}
      />

      <AboutIntroduction />
      <HighlightsBand
        eyebrow={highlightsContent.eyebrow}
        heading={highlightsContent.heading}
        description={highlightsContent.body}
        items={getHighlights()}
        tone="warm"
        layout="column"
      />
      <BrandStory />
      <MissionVision />
      <BrandValues />
      <ProductPhilosophy />
      <Capability />
      <IndianFocus />
      <AboutSolutions />

      <CtaBand
        eyebrow={aboutCta.eyebrow}
        heading={aboutCta.heading}
        body={aboutCta.body}
        primaryCta={aboutCta.primaryCta}
        secondaryCta={aboutCta.secondaryCta}
      />
    </>
  );
}
