import { env } from "@/config/env";

/**
 * Brand-level configuration: the single source of truth for anything that
 * identifies the business. Metadata, JSON-LD, the footer and every contact block
 * read from here, so a change of phone number or production URL is one edit.
 *
 * Separated from `data/` on purpose. `data/` holds page content that changes
 * with marketing; this holds facts about the company.
 *
 * Every fact below comes from the client's existing website, jivagreens.com
 * (home, company and contact pages, checked 19 September 2026). Nothing is
 * invented: where the old site does not state something (postcode, opening
 * hours, social profiles) it is left out rather than guessed. The old site gives
 * two founding years, "established in 1998" on the company page and "Since
 * 2003" on the home page; the company page's establishment date is used here
 * until the client confirms. No GSTIN or CIN is included: those are regulated
 * identifiers and must only ever come from the registration certificate.
 *
 * The WhatsApp number is deliberately absent. It is deployment configuration,
 * read from NEXT_PUBLIC_WHATSAPP_NUMBER through `config/env.ts`.
 */
export const site = {
  name: "Jiva Greens",
  /** The trading name printed on the old site and on the logo lockup. */
  shortName: "JIVA",
  legalName: "Shree Khodiyar Garden Tools",
  tagline: "Everything in Gardening",
  url: env.siteUrl,
  description:
    "Garden machinery, lawn mowers, plant protection equipment, hand tools and watering products from Shree Khodiyar Garden Tools, Ahmedabad, for landscapers, institutions, corporates and home gardeners.",
  founded: "1998",
  locale: "en-IN",
  contact: {
    phone: "+91 79 4004 6010",
    phoneHref: "tel:+917940046010",
    phoneAlt: "+91 79 2675 0730",
    phoneAltHref: "tel:+917926750730",
    email: "jivagreen@yahoo.com",
    emailHref: "mailto:jivagreen@yahoo.com",
    address: {
      street: "30, 31, Silicon Valley",
      area: "Shivranjani Cross Road, Satellite",
      locality: "Ahmedabad",
      region: "Gujarat",
      country: "India",
      countryCode: "IN",
    },
  },
  whatsapp: {
    /** Pre-filled opening message for the floating WhatsApp button. */
    defaultMessage: "Hello Jiva Greens, I would like some help choosing the right gardening tools.",
  },
  /** No social profiles are listed on the old site. Add real ones here when supplied. */
  social: [] as readonly { label: string; href: string }[],
} as const;

export type Site = typeof site;
