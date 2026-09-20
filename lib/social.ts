import { env } from "@/config/env";
import { site } from "@/config/site";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import type { SocialChannel } from "@/types/content";

/**
 * The social and messaging row, resolved once for the whole site.
 *
 * Two different things end up in the same row and they come from two different
 * places, which is the reason this function exists rather than each surface
 * assembling its own list:
 *
 *   - **Profiles** come from `site.social`, and only ever from there. That array
 *     is empty today because the client's own site publishes no social profile
 *     at all, so nothing is rendered rather than a plausible-looking handle.
 *   - **WhatsApp** is not a profile. It is a phone number supplied as deployment
 *     configuration, so it is absent until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set,
 *     exactly like the floating button.
 *
 * The result may be empty, and every caller is expected to render nothing at
 * all in that case rather than an empty row or a heading with no content.
 */
export function getSocialChannels(): SocialChannel[] {
  const profiles: SocialChannel[] = site.social.map((profile) => ({
    label: profile.platform,
    href: profile.href,
    external: true,
  }));

  if (!env.whatsappNumber) return profiles;

  return [
    ...profiles,
    {
      label: "WhatsApp",
      href: buildWhatsAppHref(env.whatsappNumber, site.whatsapp.defaultMessage),
      external: true,
    },
  ];
}

/** True when there is at least one channel worth drawing a row for. */
export function hasSocialChannels(): boolean {
  return getSocialChannels().length > 0;
}
