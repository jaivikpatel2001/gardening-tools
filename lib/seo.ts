import type { Metadata } from "next";

import { isIndexable } from "@/config/env";
import { site } from "@/config/site";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  /** Root-relative path, for example "/tools". Becomes the canonical URL. */
  path?: string;
  /** Root-relative image path. Defaults to the site-wide share card. */
  image?: string;
  /** Alt text for `image`. Must describe that image, not the page. */
  imageAlt?: string;
  noIndex?: boolean;
}

/** Title used when a page does not set its own, and on share cards for Home. */
export const DEFAULT_TITLE = `${site.name} | Gardening Tools for Indian Gardens`;

/**
 * JPEG, not WebP. Several social crawlers and messaging previews still handle
 * WebP unreliably, and a share card that fails to render costs far more than the
 * bytes it saves.
 */
export const DEFAULT_OG_IMAGE = "/images/og-home.jpg";

const DEFAULT_OG_IMAGE_ALT =
  "A garden trowel, fork and secateurs resting on freshly turned soil beside potted herbs and a watering can at sunset";

/**
 * Every page's metadata funnels through here so canonicals, Open Graph, Twitter
 * cards and indexing rules stay consistent as pages are added. `metadataBase`
 * lives in the root layout, which is what lets the relative paths resolve.
 *
 * Indexing is decided by the deployment, not the page: outside production every
 * page is `noindex`. A page can additionally opt out with `noIndex`.
 */
export function buildMetadata({
  title,
  description = site.description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const shareTitle = title ? `${title} | ${site.name}` : DEFAULT_TITLE;
  const indexable = isIndexable && !noIndex;

  return {
    // Only set when a page supplies one. Writing `title: undefined` would
    // overwrite the root layout's title template when this object is spread.
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: shareTitle,
      description,
      url: path,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/**
 * Organization, LocalBusiness and WebSite graph, rendered once in the root
 * layout. `LocalBusiness` matters here specifically: the business serves the
 * Indian market from a physical Ahmedabad address, and it is what lets the
 * address and phone number surface in local search. Opening hours and a
 * postcode are omitted because the client's own site does not state them.
 */
export function organizationJsonLd() {
  const { address, phone, email } = site.contact;

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: `${address.street}, ${address.area}`,
    addressLocality: address.locality,
    addressRegion: address.region,
    addressCountry: address.countryCode,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        description: site.description,
        foundingDate: site.founded,
        telephone: phone,
        email,
        address: postalAddress,
        areaServed: { "@type": "Country", name: "India" },
        ...(site.social.length > 0 ? { sameAs: site.social.map((channel) => channel.href) } : {}),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#localbusiness`,
        name: site.name,
        image: `${site.url}${DEFAULT_OG_IMAGE}`,
        url: site.url,
        telephone: phone,
        email,
        address: postalAddress,
        currenciesAccepted: "INR",
        parentOrganization: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: site.locale,
      },
    ],
  };
}

/**
 * BreadcrumbList for interior pages. Home does not render one, since a
 * single-item breadcrumb is noise, but Tools, Tool Detail, Services and
 * Resources will, so the builder lives here rather than being rewritten per page.
 */
export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}
