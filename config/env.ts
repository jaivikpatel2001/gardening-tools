/**
 * Typed, validated access to environment variables.
 *
 * Nothing else in the codebase reads `process.env` directly. Parsing, fallbacks
 * and validation live here, and `.env.example` documents every variable,
 * including the ones reserved for features that are not built yet.
 *
 * Only public (`NEXT_PUBLIC_*`) values are exposed. They are inlined at build
 * time, which is why each is read as a literal `process.env.NEXT_PUBLIC_...`
 * expression. Server-only secrets (SMTP, CMS tokens) will get their own
 * server-only module when a feature actually needs them.
 */

export const APP_ENVIRONMENTS = ["development", "staging", "production"] as const;
export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

const DEFAULT_SITE_URL = "https://greentools.in";

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

export const env = {
  appEnv: parseAppEnvironment(process.env.NEXT_PUBLIC_APP_ENV),
  siteUrl: parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  whatsappNumber: parseWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
} as const;

/**
 * Only a production deployment may be indexed. Staging and development builds
 * send `noindex` and a disallow-all robots.txt, so a preview can never end up in
 * search results. The live deployment must set `NEXT_PUBLIC_APP_ENV=production`.
 */
export const isIndexable = env.appEnv === "production";
