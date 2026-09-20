/**
 * Typed, validated access to environment variables.
 *
 * Nothing else in the codebase reads `process.env` directly. Parsing, fallbacks
 * and validation live here, and `.env.example` documents every variable.
 *
 * There are four, and the site uses all four. Nothing is reserved here for a
 * feature that has not been built: when a backend or a CMS actually arrives,
 * its variables are added then, along with the server-only module that reads
 * them.
 *
 * Only public (`NEXT_PUBLIC_*`) values exist so far. They are inlined at build
 * time, which is why each is read as a literal `process.env.NEXT_PUBLIC_...`
 * expression.
 */

export const APP_ENVIRONMENTS = ["development", "staging", "production"] as const;
export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

const DEFAULT_SITE_URL = "https://www.jivagreens.com";

function parseAppEnvironment(value: string | undefined): AppEnvironment {
  const match = APP_ENVIRONMENTS.find((environment) => environment === value);
  return match ?? "development";
}

function parseSiteUrl(value: string | undefined): string {
  if (!value) return DEFAULT_SITE_URL;
  return value.trim().replace(/\/+$/, "");
}

/**
 * WhatsApp click-to-chat needs the full international number as digits only.
 * Spaces, dashes and a leading "+" are stripped. Anything that does not leave
 * 11 to 15 digits is treated as unset, so a malformed value hides the button
 * instead of sending visitors to the wrong chat.
 */
function parseWhatsAppNumber(value: string | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 11 && digits.length <= 15 ? digits : null;
}

/**
 * The enquiry form posts to FormSubmit, which addresses the mail by the last
 * segment of its endpoint. That segment may be either the recipient address or
 * the random token FormSubmit issues after activation.
 *
 * Prefer the token. This value is inlined into the browser bundle, so an
 * address here is published on the page for scrapers to collect; the token
 * delivers to the same inbox without naming it.
 *
 * Anything that is neither a plausible email address nor a token is treated as
 * unset, and the form falls back to handing the enquiry to the visitor's own
 * mail client rather than posting it into the void.
 */
function parseFormSubmitTarget(value: string | undefined): string | null {
  const target = value?.trim();
  if (!target) return null;
  const isEmail = /^[^s@]+@[^s@]+.[^s@]{2,}$/.test(target);
  const isToken = /^[a-zA-Z0-9]{8,}$/.test(target);
  return isEmail || isToken ? target : null;
}

export const env = {
  appEnv: parseAppEnvironment(process.env.NEXT_PUBLIC_APP_ENV),
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  whatsappNumber: parseWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  formSubmitTarget: parseFormSubmitTarget(process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL),
} as const;

/** The AJAX endpoint the enquiry form posts to, or null when unconfigured. */
export const formSubmitEndpoint = env.formSubmitTarget
  ? `https://formsubmit.co/ajax/${encodeURIComponent(env.formSubmitTarget)}`
  : null;

/**
 * Only a production deployment may be indexed. Staging and development builds
 * send `noindex` and a disallow-all robots.txt, so a preview can never end up in
 * search results. The live deployment must set `NEXT_PUBLIC_APP_ENV=production`.
 *
 * The same variable drives the page switchboard in `config/pageVisibility.ts`;
 * see `lib/visibility.ts` for that rule.
 */
export const isIndexable = env.appEnv === "production";
