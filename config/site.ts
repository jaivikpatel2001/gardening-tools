import { env } from "@/config/env";

/**
 * Brand-level configuration: the single source of truth for anything that
 * identifies the business. Metadata, JSON-LD, the footer and every contact block
 * read from here, so a change of phone number or production URL is one edit.
 *
 * Separated from `data/` on purpose. `data/` holds page content that changes
 * with marketing; this holds facts about the company.
 *
 * NOTE: contact details, address and social links are realistic placeholder
 * data for an Ahmedabad-based gardening brand. Replace them with the real
 * business details before launch. No GSTIN or CIN is included: those are
 * regulated identifiers and must only ever come from the real registration
 * certificate.
 *
 * The WhatsApp number is deliberately absent. It is deployment configuration,
 * read from NEXT_PUBLIC_WHATSAPP_NUMBER through `config/env.ts`.
 */
export const site = {
  name: "GreenTools",
  legalName: "GreenTools Garden Equipment Pvt. Ltd.",
  tagline: "Tools for better gardens",
  url: env.siteUrl,
  description:
    "Traditional Indian garden tools and modern garden machinery, with practical guidance for terraces, kitchen gardens, farms, nurseries and professional landscaping teams.",
  founded: "2009",
  locale: "en-IN",
  contact: {
    phone: "+91 79 4023 8800",
    phoneHref: "tel:+917940238800",
    mobile: "+91 98250 41276",
    mobileHref: "tel:+919825041276",
    email: "hello@greentools.in",
    emailHref: "mailto:hello@greentools.in",
    address: {
      street: "214, Shivalik Business Centre, Sanand–Sarkhej Road",
      area: "Bopal",
      locality: "Ahmedabad",
      region: "Gujarat",
      postalCode: "380058",
      country: "India",
      countryCode: "IN",
    },
    hours: "Mon–Sat, 9:30 am to 6:30 pm IST",
  },
  whatsapp: {
    /** Pre-filled opening message for the floating WhatsApp button. */
    defaultMessage: "Hello GreenTools, I would like some help choosing the right gardening tools.",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export type Site = typeof site;
