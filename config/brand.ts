/**
 * Brand geometry and colours that must stay identical everywhere they appear.
 *
 * Shared by the header logo (`components/layout/Logo.tsx`), the viewport and
 * web app manifest, and the icon generator (`scripts/generate-icons.mjs`), so
 * the favicon, the home-screen icon and the logo can never drift apart.
 *
 * Plain data with no imports and only erasable TypeScript, which lets Node load
 * this file directly from the build script.
 */

export const BRAND_COLORS = {
  /** Botanical Green: primary brand colour and icon background. */
  primary: "#155A28",
  /** Canvas colour of the light theme. */
  canvas: "#F7F7EF",
  /** Canvas colour of the dark theme. */
  canvasDark: "#08150C",
  /** Foreground drawn on the primary colour. */
  onPrimary: "#FFFFFF",
} as const;

/**
 * The client's JIVA logo lockup (leaf, wordmark and "Everything in Gardening"),
 * taken from jivagreens.com and trimmed by `npm run images`. The source is a
 * 280px raster, which is enough for the header and footer at up to 2x, but not
 * for app icons: those still use the sprout mark below until the client
 * supplies a vector logo.
 */
export const BRAND_LOGO = {
  src: "/images/brand/jiva-logo.png",
  width: 273,
  height: 89,
} as const;

/** Sprout mark used only for the generated app icons, drawn on a 24 by 24 grid. */
export const BRAND_MARK = {
  viewBox: "0 0 24 24",
  strokeWidth: 1.7,
  stem: "M12 21v-8.5",
  leaves: [
    "M12 12.5c0-3.6 2.6-6.5 6.5-6.9.4 3.9-2.5 6.9-6.5 6.9Z",
    "M12 15.5c-3.3 0-5.9-2.4-6.3-5.6 3.3-.3 6.3 2.2 6.3 5.6Z",
  ],
} as const;
