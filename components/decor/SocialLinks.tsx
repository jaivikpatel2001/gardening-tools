import { socialIcons, WhatsAppIcon } from "@/components/decor/SocialIcons";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { getSocialChannels } from "@/lib/social";

/**
 * The row of social and messaging links, drawn once and reused everywhere.
 *
 * The footer, the Contact page and the mobile sheet all render this, so a
 * profile added to `config/site.ts` appears in all three at once and can never
 * be listed in one place and forgotten in another.
 *
 * **It renders nothing when there is nothing to render.** That is the normal
 * state today: the client publishes no social profile, so unless a WhatsApp
 * number is configured this component returns `null` and the surfaces around it
 * close up rather than leaving an empty row or a heading over blank space.
 *
 * A server component. The links are static markup, so none of this costs the
 * browser any JavaScript.
 */

type Tone = "on-band" | "surface";

const LINK_CLASS: Record<Tone, string> = {
  "on-band":
    "border-white/18 text-on-band-muted hover:border-white/50 hover:text-on-band",
  surface:
    "border-hairline text-muted hover:border-brand hover:text-brand",
};

interface SocialLinksProps {
  tone?: Tone;
  className?: string;
  /** Visually hidden label for the list, so the row is announced meaningfully. */
  label?: string;
}

export function SocialLinks({
  tone = "surface",
  className,
  label = `${site.name} on social media`,
}: SocialLinksProps) {
  const channels = getSocialChannels();
  if (channels.length === 0) return null;

  return (
    <ul aria-label={label} className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {channels.map((channel) => {
        // WhatsApp is a messaging channel rather than a profile, so it is not in
        // the profile icon map and is matched here instead.
        const Icon = channel.label === "WhatsApp" ? WhatsAppIcon : socialIcons[channel.label as keyof typeof socialIcons];
        if (!Icon) return null;

        return (
          <li key={channel.label}>
            <a
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              aria-label={
                channel.label === "WhatsApp"
                  ? `Message ${site.name} on WhatsApp`
                  : `${site.name} on ${channel.label}`
              }
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-200",
                LINK_CLASS[tone],
              )}
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
