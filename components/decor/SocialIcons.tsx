/**
 * Brand marks are hand-drawn here rather than imported: lucide-react v1 removed
 * its brand icon set, and pulling in a second icon library purely for four
 * glyphs would break the design system's "one icon system" rule.
 *
 * Stroke weight and corner radius are matched to lucide so these sit correctly
 * beside the functional icons used elsewhere.
 */

type IconProps = { className?: string };

const shared = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5H17.6V4.4A21 21 0 0 0 15.3 4.3c-2.3 0-3.9 1.4-3.9 4v2.2H8.8v3h2.6V21" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.4 9.4 15 12l-4.6 2.6V9.4Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.2 10.5V17M7.2 7.3v.02M11.4 17v-3.7c0-1.3.9-2.3 2.1-2.3s2.1 1 2.1 2.3V17M11.4 10.5V17" />
    </svg>
  );
}

/**
 * WhatsApp speech bubble with a handset. The handset is filled rather than
 * stroked so it stays legible at the 22px it is drawn at in the floating button.
 */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className}>
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.3-4.25A8.5 8.5 0 1 1 20.5 11.8Z" />
      <path
        transform="translate(7.3 7.1) scale(0.4)"
        fill="currentColor"
        stroke="none"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

export const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  LinkedIn: LinkedinIcon,
} as const;

export type SocialLabel = keyof typeof socialIcons;
