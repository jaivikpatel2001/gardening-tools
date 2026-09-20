import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FloatingActions } from "@/components/floating-actions/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Preloader } from "@/components/preloader/Preloader";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { BRAND_COLORS } from "@/config/brand";
import { site } from "@/config/site";
import { getProductMenu } from "@/lib/catalogue";
import { getSocialChannels } from "@/lib/social";
import { DEFAULT_TITLE, buildMetadata, organizationJsonLd } from "@/lib/seo";

import "./globals.css";

/**
 * Typography, matching the Google Fonts specification in the project brief:
 *
 *   Manrope   wght 200 to 800                             headings and display
 *   Inter     ital 0 to 1, opsz 14 to 32, wght 100 to 900 body, navigation, UI
 *
 * Loaded through next/font rather than a CSS `@import` of fonts.googleapis.com.
 * next/font fetches the same variable font files at build time and serves them
 * from this origin. That removes a render-blocking third-party stylesheet and two
 * extra connections, and it generates size-adjusted fallback metrics so the hero
 * headline does not shift when the real font arrives. Importing the Google
 * stylesheet as well would download every face twice.
 */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  axes: ["opsz"],
});

/**
 * Inter italic is its own instance, declared but not preloaded. Loaded together
 * with the upright face, next/font preloaded it on every page: a 77 KB
 * high-priority download competing with the hero image, for a style the site
 * barely uses. Declared this way, the browser fetches it only when italic text
 * actually renders. `globals.css` maps `em`, `i` and friends onto it.
 */
const interItalic = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-italic",
  style: "italic",
  axes: ["opsz"],
  preload: false,
});

export const metadata: Metadata = {
  ...buildMetadata({ path: "/" }),
  metadataBase: new URL(site.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Light is the primary experience; the dark value is what mobile browsers
  // paint their chrome with once the visitor opts in.
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_COLORS.canvas },
    { media: "(prefers-color-scheme: dark)", color: BRAND_COLORS.canvasDark },
  ],
};

/**
 * Runs before first paint, so neither the theme nor the scroll-reveal initial
 * state can flash.
 *
 * Light is the default for a first-time visitor, per the brand direction. The
 * system preference is only consulted once `RESPECT_SYSTEM` is flipped to true.
 * A stored choice from the toggle always wins.
 *
 * It also adds `js-motion`, which is the single gate for every CSS-defined
 * hidden state. With JavaScript off, or with reduced motion requested, the class
 * never lands and all content renders visible.
 *
 * Finally it arms the preloader, by the same rule and for the same reason: the
 * overlay has to be decided before the first frame or the visitor sees the page
 * and then has it covered up.
 *
 * It runs on every document load, which is what the client asked for: every
 * browser reload plays it, and only a reload does. Client-side navigation
 * between pages never re-runs this script, so moving around the site stays
 * instant. It is still skipped entirely for reduced motion, for reduced data
 * and with JavaScript off, and the page behind it renders normally either way.
 */
const themeScript = `(function(){
  var RESPECT_SYSTEM = false;
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem('gt-theme');
    var theme = (stored === 'light' || stored === 'dark')
      ? stored
      : (RESPECT_SYSTEM && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    var motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionOk) {
      root.classList.add('js-motion');
    }

    var saveData = navigator.connection && navigator.connection.saveData;
    if (motionOk && !saveData) {
      root.dataset.preloader = 'active';
    }
  } catch (e) {
    root.dataset.theme = 'light';
  }
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} ${interItalic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-dvh bg-canvas font-body text-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brand focus:px-4 focus:py-3 focus:font-body focus:text-[0.875rem] focus:font-semibold focus:text-on-brand"
        >
          Skip to main content
        </a>

        <MotionProvider>
          <SmoothScrollProvider>
            {/* Product links are resolved here, on the server. The header and
                the mobile sheet are client components and must never import the
                catalogue themselves. */}
            <Header productMenu={getProductMenu()} socialChannels={getSocialChannels()} />
            {/* tabIndex lets the skip link actually move focus here, not just scroll. */}
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </SmoothScrollProvider>
        </MotionProvider>

        <Preloader />
        <CustomCursor />
      </body>
    </html>
  );
}
