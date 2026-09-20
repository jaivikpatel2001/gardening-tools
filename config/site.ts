import { env } from "@/config/env";
import type { SocialProfile } from "@/types/content";

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
  /**
   * Official social profiles.
   *
   * **Empty on purpose, and verified empty.** jivagreens.com was checked in
   * full on 20 September 2026: the home page carries 87 links and the contact
   * page carries its own set, and not one of them points at Facebook,
   * Instagram, LinkedIn, YouTube, X or Pinterest. The old footer offers an
   * address, two phone numbers and an email address, and nothing else.
   *
   * A guessed handle is worse than no icon: it sends customers to somebody
   * else. So the row renders only what is listed here, and renders nothing at
   * all while this array is empty.
   *
   * To publish one, add an entry with a `platform` that `socialIcons` knows
   * and the full profile URL. Footer, Contact page, mobile menu and the
   * `sameAs` array in the organisation JSON-LD all pick it up from here, with
   * no other edit anywhere.
   *
   * WhatsApp is deliberately not listed: it is deployment configuration, read
   * from NEXT_PUBLIC_WHATSAPP_NUMBER, and `lib/social.ts` adds it to the row
   * when it is set.
   */
  social: [] as readonly SocialProfile[],
} as const;

export type Site = typeof site;
