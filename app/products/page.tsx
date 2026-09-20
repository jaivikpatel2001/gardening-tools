import type { Metadata } from "next";

import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productsCatalogue, productsHero, productsNotice, productDetail } from "@/data/products-page";
import { productGroups } from "@/data/productCategories";
import { getProductListRows, getRangeCounts } from "@/lib/catalogue";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: routes.home },
  { name: "Products", path: routes.products },
];

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "The complete Jiva Greens range: lawn mowers, brush cutters, chainsaws, hedge trimmers, sprayers, irrigation, hand tools, watering products and garden accessories, supplied from Ahmedabad by enquiry.",
  path: routes.products,
});

/**
 * Products listing page.
 *
 * The rows, the groups and the counts are computed on the server; the browser
 * component below receives plain values and does the filtering, searching and
 * sorting in the page. No price, stock level, discount or cart appears here or
 * anywhere else on the site.
 */
export default function ProductsPage() {
  enforcePageVisibility("products");

  const rows = getProductListRows();
  const counts = getRangeCounts();
  const groups = productGroups.map((group) => ({ id: group.id, title: group.title }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
      />

      <PageHero
        eyebrow={productsHero.eyebrow}
        heading={productsHero.heading}
        body={productsHero.body}
        trail={trail}
        image={productsHero.image}
        primaryCta={productsHero.primaryCta}
        secondaryCta={productsHero.secondaryCta}
        meta={[
          { label: "Categories", value: `${counts.categories}` },
          { label: "Product types", value: `${counts.productTypes}` },
          { label: "How to buy", value: productDetail.supplyValue },
        ]}
      />

      <Section id="catalogue" tone="canvas" size="lg" labelledBy="catalogue-heading">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading
              id="catalogue-heading"
              eyebrow={productsCatalogue.eyebrow}
              title={productsCatalogue.heading}
              description={productsCatalogue.body}
            />
          </Reveal>

          <div className="mt-12">
            <ProductCatalogue rows={rows} groups={groups} />
          </div>

          <Reveal className="mt-14 rounded-lg border border-hairline bg-surface p-7 lg:p-9">
            <h3 className="text-title-lg text-ink">{productsNotice.title}</h3>
            <p className="mt-3 max-w-2xl text-body-md text-body">{productsNotice.body}</p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        eyebrow={productDetail.cta.eyebrow}
        heading={productDetail.cta.heading}
        body={productDetail.cta.body}
        primaryCta={{ label: "Get in Touch", href: routes.contact }}
        secondaryCta={{ label: "Our Clients", href: routes.clients }}
      />
    </>
  );
}
