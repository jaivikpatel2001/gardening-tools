import type { Metadata } from "next";

import {
  BrandWall,
  ClientVoices,
  IndustriesServed,
  PartnershipApproach,
} from "@/components/clients/sections";
import { CtaBand } from "@/components/sections/CtaBand";
import { HighlightsBand } from "@/components/sections/HighlightsBand";
import { PageHero } from "@/components/sections/PageHero";
import { clientsCta, clientsIntro } from "@/data/clients";
import { highlightsContent } from "@/data/home";
import { getHighlights } from "@/lib/highlights";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: routes.home },
  { name: "Clients", path: routes.clients },
];

export const metadata: Metadata = buildMetadata({
  title: "Clients",
  description:
    "Landscapers, institutes, corporates, housing societies, nurseries, resorts and home gardeners across India buy garden tools and machinery from Jiva Greens, Ahmedabad.",
  path: routes.clients,
});

/**
 * Clients page. Replaces the planned Resources page.
 *
 * A credibility page rather than an editorial one: who the business supplies,
 * the figures behind the range, how a supply relationship actually starts, and
 * what customers say. The logo wall is built and hides itself until approved
 * client marks are supplied.
 */
export default function ClientsPage() {
  enforcePageVisibility("clients");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
      />

      <PageHero
        eyebrow={clientsIntro.eyebrow}
        heading={clientsIntro.heading}
        body={clientsIntro.body}
        trail={trail}
        image={{
          src: "/images/service-professional-support.webp",
          alt: "A professional gardening team working together on a landscaped residential garden",
        }}
        primaryCta={clientsCta.primaryCta}
        secondaryCta={clientsCta.secondaryCta}
      />

      <BrandWall />
      <IndustriesServed />
      <HighlightsBand
        eyebrow={highlightsContent.eyebrow}
        heading={highlightsContent.heading}
        description={highlightsContent.body}
        items={getHighlights()}
        tone="warm"
        layout="grid"
      />
      <PartnershipApproach />
      <ClientVoices />

      <CtaBand
        eyebrow={clientsCta.eyebrow}
        heading={clientsCta.heading}
        body={clientsCta.body}
        primaryCta={clientsCta.primaryCta}
        secondaryCta={clientsCta.secondaryCta}
      />
    </>
  );
}
