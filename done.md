# Project Work History

Chronological implementation log for the Jiva Greens gardening website. Newest entries at the bottom of each day. Times are IST.

See also: [resources/plan.md](resources/plan.md) for the project plan and architecture, [resources/section-parity.md](resources/section-parity.md) for the homepage section checklist, and [resources/image-generation.md](resources/image-generation.md) for the image manifest.

---

## 2026-09-10

### 20:40 IST: Project setup, skills and planning

**Work completed**

- Audited the existing scaffold: Next.js 16.3.4 (App Router, Turbopack), React 19.2.8, Tailwind v4.3.3 (CSS-first, no `tailwind.config.*`), TypeScript 5.9 strict, alias `@/*` → repo root.
- Installed eight design/engineering skills to `~/.claude/skills`: `ui-ux-pro-max`, `frontend-design`, `design-taste-frontend`, `motion-framer`, `react-best-practices`, `web-design-guidelines`, `seo-geo-aeo`, and the eight official GreenSock GSAP modules.
- Wrote the project plan and the image manifest.

**Files affected**

- `resources/plan.md` (new)
- `resources/image-generation.md` (new)

**Decisions**

- `components/`, `data/`, `lib/` live at the repo root rather than under `src/`. The alias is `@/*` → `./*` and `app/` is already at the root; adding `src/` would mean moving `app/` for no functional gain.
- Skipped `convex-create-component` (backend DB, no backend here) and `vercel-react-native-skills` (no mobile app). Skipped both MCP servers — this design is bespoke editorial and neither fits.
- There is no `gsap-master` skill; GreenSock ships eight separate modules.

---

### 21:10 IST: Design tokens and theme system

**Work completed**

- Built a two-layer token system in `app/globals.css`: fixed palette primitives, then semantic aliases that flip between themes. Components reference only the semantic layer, which is what makes the dark theme a design rather than an inversion.
- Mapped tokens into Tailwind via `@theme inline`; added a `@custom-variant dark` keyed on `[data-theme]` so the toggle is authoritative in both directions.
- Added a blocking inline theme script in the root layout — resolves the stored preference before first paint, so there is no flash, and adds a `js-motion` class that gates every CSS-defined hidden state.
- Replaced Tailwind's default breakpoints with the design system's: 744 / 900 / 1128 / 1440 / 1680.

**Files affected**

- `app/globals.css`, `app/layout.tsx`

**Decisions**

- Two contrast corrections against `design.md`, both documented in `resources/plan.md` §13: `--muted` darkened `#69736A` → `#5A645B` (was 4.36:1 on the botanical tint, below the 4.5:1 AA floor the same document requires) and `--brand-soft` darkened `#3F7F35` → `#38712C` (was 4.31:1 on cream, and it carries 12px eyebrow labels).
- Dark-theme brand buttons use near-black-green text: white on `#7FB56F` measures 2.4:1 and fails AA.

---

### 22:00 IST: Home page build

**Work completed**

- Built all twelve Home sections, the global header and footer, the motion primitives and the SEO foundation.
- Motion split three ways with no overlap: Lenis owns smooth scrolling only; GSAP + ScrollTrigger own the hero timeline, parallax and scroll reveals; Motion owns component state only (mobile sheet, theme toggle, newsletter).
- SEO: `metadataBase`, title template, canonical, Open Graph, Twitter card, `viewport` export for `themeColor`/`colorScheme`, `robots.ts`, `sitemap.ts`, Organization + WebSite JSON-LD.

**Files affected**

- `components/layout/*`, `components/home/*`, `components/ui/*`, `components/cards/*`, `components/motion/*`, `components/decor/*`
- `data/*`, `lib/cn.ts`, `lib/seo.ts`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `next.config.ts`

**Bugs found and fixed**

- `Reveal` used `clearProps` at the end of its tween, which stripped the inline styles and handed every section straight back to the CSS hidden rule — content reappeared invisible after animating in. The attribute is now removed on tween start instead.
- The hero's `lg:` styles fired at Tailwind's 1024px while its grid waited for 1128px, leaving a 104px window with the desktop plate and the mobile layout.
- Two Tailwind class-order traps: `hidden` lost to the Button's base `inline-flex` on the header CTA, and `text-[var(--green-800)]` lost to `text-on-brand` on the final CTA, rendering a white label on a white button. Both resolved with variants rather than overrides.
- `gsap.matchMedia()` does not inherit the scope `useGSAP` sets, so the hero's selector strings matched nothing and the timeline silently did nothing. Targets are now resolved to elements up front.

**Decisions**

- Added `@gsap/react` (~3KB): the official GSAP React guidance is `useGSAP()`, and its `contextSafe` wrapper is what makes the magnetic-button pointer handlers clean up correctly.
- Motion loaded via `LazyMotion` + `m` rather than the full `motion` component. Measured: 258KB vs 267KB gzipped for the page. `strict` mode makes the saving permanent.

**Pending follow-up**

- Animations are still unverified at runtime. The in-app Browser pane reports `visibilityState: "hidden"`, so `requestAnimationFrame` never fires and GSAP's ticker stays frozen. End states and the reduced-motion fallback were verified; the timelines have not been watched playing.

---

### 23:10 IST: Image asset pipeline

**Work completed**

- Reviewed all 26 source images in `gardening images/` and mapped each to its manifest slot. Four filenames were malformed (`-watering-tools.png`, `` `testimonial-03.png ``, `og-home..png`, `ssential-tools.png`) and are now mapped explicitly rather than by inference.
- Wrote `scripts/process-images.mjs` and added `npm run images`. It enforces each slot's aspect ratio by cover-cropping with sharp's attention strategy, never upscales, and encodes to WebP.
- Processed all 26: **67.5 MB → 5.1 MB, 92% smaller**. Deleted the placeholder JPEGs and repointed every reference.
- Rewrote all alt text to describe what each photograph actually shows.

**Files affected**

- `scripts/process-images.mjs` (new), `public/images/*` (26 regenerated), `package.json`
- `data/*`, `components/home/*` — image path and alt updates

**Decisions**

- WebP for everything except the Open Graph card, which stays JPEG: several social crawlers and messaging previews still handle WebP unreliably, and a share card that fails to render costs more than the bytes saved.
- Nine slots ship below their manifest target because the sources are smaller than the spec — the script never upscales and prints `capped from …` for each. Documented in the manifest.
- Ratio mismatches (four tool shots, four services, two resources, three testimonials) are cropped to the manifest spec rather than the spec being changed to fit the sources.

**Pending follow-up**

- Six slots need regeneration: `community-story` and the four service images carry **large, legible baked-in signage**, which the manifest explicitly forbids — `community-story` sits full-bleed behind a live heading and its signs read straight through the scrim. Those slots plus `about-preview` also use Western/Mediterranean settings rather than Indian ones. Flagged in `resources/image-generation.md` under "Current asset status".

---

### 23:20 IST: Indian localisation and architecture refactor

**Work completed**

- **Localisation.** Rewrote all site content for the Indian market: contact details, address (Ahmedabad), phone numbers in `+91` format, `.in` email, Indian testimonial names, roles and cities (Kochi, Pune, Chandigarh). Copy now references black cotton and laterite soil, monsoon rust, pre-monsoon summer, terrace and balcony gardens, housing societies, nurseries and resorts.
- **Types.** Added `types/content.ts` holding the shared content domain types. Components now type their props against these without importing the content itself.
- **Config.** Moved brand facts out of `data/site.ts` into `config/site.ts` — configuration and content are different concerns.
- **DRY.** Replaced five near-identical section components with one generic `CollectionSection` plus five configurations in `components/home/collections.tsx`. Net removal of roughly 150 lines of duplicated markup.
- **Data-driven UI.** Added `data/home.ts` for the one-off sections' copy and media, so section components are now pure layout and a copy change never touches a component.
- **Image contract.** `ImagePlate` now takes an `ImageAsset` (`{ src, alt }`) instead of separate props, making it structurally impossible to add an image without alt text.
- Extracted `ArrowIcon` — the same inline SVG had been pasted into four call sites and one copy had already drifted in stroke weight.
- **SEO.** Added `LocalBusiness` schema with the Indian address, opening hours and INR currency; added a `breadcrumbJsonLd` builder for the interior pages still to come; switched OG locale to `en_IN` and `<html lang>` to `en-IN`.
- Added `npm run check` (`tsc --noEmit && eslint`).

**Files affected**

- `types/content.ts`, `config/site.ts`, `data/home.ts`, `components/sections/CollectionSection.tsx`, `components/home/collections.tsx`, `components/ui/ArrowIcon.tsx` (all new)
- `data/*` (all rewritten), `lib/seo.ts`, `app/layout.tsx`, `app/page.tsx`
- `components/ui/ImagePlate.tsx`, `components/cards/*`, `components/home/*`
- Deleted: `data/site.ts`, `components/home/{ToolCategories,FeaturedTools,ServicesPreview,ResourcesPreview,Testimonials}.tsx`

**Decisions**

- No GSTIN or CIN in `config/site.ts`. Those are regulated identifiers and should only ever be entered from the real registration certificate — a plausible-looking fake is worse than an absent one.
- All contact details, addresses and testimonials are marked in-file as **placeholder** data to be replaced before launch.
- `data/` holds content that marketing changes; `config/` holds facts about the business. Keeping them apart is what stops a copy edit touching the JSON-LD.

**Pending follow-up**

- Six image slots still need Indian regeneration (see the 23:10 entry).
- Runtime animation verification still outstanding (see the 22:00 entry).

### 23:32 IST: Asset cleanup and verification

**Work completed**

- Removed the five unused `create-next-app` scaffold SVGs from `public/`. `public/` is now 5.2 MB and contains only the 26 images the site actually references.
- Added `/gardening images/` to `.gitignore` — the 68 MB of source PNG masters stay on disk for re-runs but out of git history. `public/images/` is the committed output.
- Verified the whole build end to end.

**Verification results**

| Check | Result |
|---|---|
| `npm run check` (`tsc --noEmit && eslint`) | pass |
| `npm run build` | pass, all four routes static |
| Broken image paths | none — all 26 referenced files exist |
| Unused images | none — 26 referenced, 26 present |
| Images loading in the browser | 25 of 25, zero failed, zero pending |
| Responsive sizing | correct — Next serves 748×499 for the hero, 204×255 for the detail plate, 475×356 for category cards at 1440px |
| Alt text | 25 of 25 images have it |
| Horizontal overflow | none at 1440px |
| `console.log` in app code | none (only the CLI report in `scripts/process-images.mjs`) |
| E-commerce terms | none |
| Blog/Journal references | none outside a comment stating there is no blog |
| `<html lang>` / `og:locale` | `en-IN` / `en_IN` |
| JSON-LD | Organization, LocalBusiness, PostalAddress, Country, WebSite |
| Page JS | 259 KB gzipped |

**Pending follow-up**

- Runtime animation verification is **still outstanding**. The Browser pane now reports `visibilityState: "visible"`, but `requestAnimationFrame` still fires zero frames in 700ms because Claude's window sits behind another window and the compositor is not running. GSAP's ticker stays frozen, so the hero entrance timeline and the scroll reveals cannot be observed. Everything else about them is verified: end states, cleanup, and the reduced-motion `!important` fallback in the compiled CSS.
- Six image slots still need Indian regeneration — `community-story` (highest priority, legible signage behind a live heading), the four service images, and `about-preview`. See `resources/image-generation.md` → "Current asset status".

---

## 2026-09-11

### 08:00 IST: Complete tool range, traditional Indian tools and modern machinery

**Work completed**

- Rebuilt the tool categories as one range in two groups, 14 categories in all, each with a genuine gardening or landscaping use:
  - **Traditional & hand tools (6):** Hand Tools & Planting, Digging & Soil Preparation, Pruning & Cutting, Watering Tools, Garden Utility & Harvesting, Garden Accessories & Safety.
  - **Power & garden machinery (8):** Lawn Mowers & Lawn Cutters, Brush Cutters & Grass Trimmers, Hedge Trimmers, Chainsaws & Pole Saws, Tillers & Cultivators, Sprayers & Plant Protection, Blowers, Vacuums & Shredders, and Irrigation & Water Pumps.
- Traditional tools carry their Indian name alongside the English one (khurpi, phawda, kudali, gaiti, belcha, sabbal, kainchi, daranti, kulhadi, tasla). Every machinery category lists its power options: manual, electric, battery or petrol.
- New `CategoryIndex`: a typographic index of the complete range, grouped into hand tools and machinery, with a stretched link per category and power-option chips. It needs no photography, so every category is visible on Home today.
- New `RangeTeaserCard`: a band-coloured card at the end of the photo grid that points to the machinery half of the range and jumps to the index.
- `CollectionSection` extended through composition (`trailing`, `footer`, `mobileLayout="scroll"`) rather than a new variant. Below 744px the category cards become a horizontal swipe row.
- Every internal URL now comes from `lib/routes.ts`. Footer tool links are resolved from the catalogue by slug, and an unknown slug throws, so a stale footer link fails the build instead of shipping.
- `scripts/process-images.mjs` gained the nine new category slots. It now skips slots whose source artwork has not arrived and lists them, instead of failing the whole run.
- At 07:35, reviewed sharpex.com and sharpexindia.com for category and terminology coverage only. Nothing was copied.

**Files affected**

- `types/content.ts`, `data/toolCategories.ts`, `data/home.ts`, `data/navigation.ts`
- `lib/catalogue.ts`, `lib/routes.ts`, `components/sections/CategoryIndex.tsx`, `components/cards/RangeTeaserCard.tsx` (new)
- `components/sections/CollectionSection.tsx`, `components/home/collections.tsx`, `components/cards/*`, `components/layout/Footer.tsx`
- `scripts/process-images.mjs`; deleted `public/images/category-professional-tools.webp`

**Decisions**

- Retired the vague "Professional Tools" category in favour of eight specific machinery categories, and deleted its photograph rather than leave an unused asset.
- Ranges on the reference sites with no gardening or landscaping use (animal rescue, disaster management, industrial) were left out.
- `image` is optional on a category, and `ToolCategoryCard` accepts only a photographed category, so a category without a photograph can never render as a broken card.
- Resolving footer links inside `data/navigation.ts` would have pulled the whole catalogue into the client bundle, because the client-side header imports that module. Resolution moved into the server-rendered footer.

**Pending follow-up**

- Nine category photographs to generate (prompts in `resources/image-generation.md`, section 4). Once processed, add `image` and accurate alt text to each category.
- Home shows the five photographed categories plus the machinery teaser. When machinery photographs arrive, consider featuring a mix of both groups.

---

### 08:04 IST: Environment configuration, indexing safeguard and title fix

**Work completed**

- Created `.env.example`, documenting every variable the site needs now or is likely to need: runtime environment, site URL, WhatsApp, contact form recipients, SMTP, transactional email provider, captcha, Google Analytics and Tag Manager, CMS and API endpoints. Every value is empty except two safe local defaults, `NEXT_PUBLIC_APP_ENV=development` and `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- Added `config/env.ts`, the only module that reads `process.env`. It validates `NEXT_PUBLIC_APP_ENV` against development, staging and production, normalises the site URL, and accepts a WhatsApp number only as 11 to 15 digits.
- Search indexing is gated on the environment. Anything other than `NEXT_PUBLIC_APP_ENV=production`, including unset, serves `noindex, nofollow` on every page and a disallow-all robots.txt.
- Added `!.env.example` to `.gitignore`; the existing `.env*` rule would otherwise have ignored the template itself.
- Removed the hardcoded WhatsApp link from `config/site.ts`.

**Bug fixed**

- The Home page had no `<title>`. The root layout declared its title template and then spread `buildMetadata()`, which returned `title: undefined` and overwrote it. `buildMetadata` now includes only keys that have values, and the layout spreads it first. Verified: `<title>GreenTools | Gardening Tools for Indian Gardens</title>`.

**Files affected**

- `.env.example`, `config/env.ts` (new); `.gitignore`, `config/site.ts`, `app/robots.ts`, `lib/seo.ts`, `app/layout.tsx`

**Decisions**

- `NODE_ENV` is documented but commented out, because Next.js sets it itself. `NEXT_PUBLIC_APP_ENV` is what separates staging from production.
- An unset environment counts as development, so a forgotten variable fails safe (not indexed) rather than exposing a staging site to search engines.
- The contact form and email delivery remain future scope. Their variables are documented; nothing is implemented.

**Pending follow-up**

- **Launch checklist:** the live deployment must set `NEXT_PUBLIC_APP_ENV=production` and `NEXT_PUBLIC_SITE_URL`, or the site will not be indexed.

---

### 08:04 IST: Floating actions, scroll-to-top and WhatsApp

**Work completed**

- `components/floating-actions/`: `FloatingActions` and `WhatsAppButton` are server components; only `ScrollToTop` ships JavaScript. Both buttons share one 48px control style.
- Scroll-to-top appears after 640px of scroll and shows a scroll-progress ring written straight to the DOM from an rAF-throttled listener. It scrolls through Lenis when Lenis is running, otherwise natively (instantly under reduced motion), then moves focus to the header's first link. While hidden it is `inert`.
- The WhatsApp link builds its URL in `lib/whatsapp.ts` from `NEXT_PUBLIC_WHATSAPP_NUMBER` and a pre-filled message in `config/site.ts`, opens in a new tab and shows a hover label. With no number configured it renders nothing.
- Added `components/motion/scroll-controller.ts`, which exposes the running Lenis instance so nothing calls `window.scrollTo` and fights it, plus `hooks/useScrollThreshold.ts`, `hooks/useMediaQuery.ts` and `lib/media.ts`.
- The controls sit 16px from the edges below 744px and 24px above, clear of the device safe area, and below the header and mobile menu in the stacking order.

**Files affected**

- `components/floating-actions/*`, `components/motion/scroll-controller.ts`, `hooks/*`, `lib/media.ts`, `lib/whatsapp.ts` (new)
- `components/decor/SocialIcons.tsx` (WhatsApp icon), `components/motion/SmoothScrollProvider.tsx`, `components/motion/gsap.ts`, `components/layout/Header.tsx`, `components/ui/MagneticButton.tsx`, `app/layout.tsx`

**Decisions**

- The number is injected, never written into the component, and the button renders nothing without it, so a placeholder number can never become a live chat link.

**Pending follow-up**

- Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the business number to switch the button on.

---

### 08:05 IST: Plant-inspired custom cursor

**Work completed**

- `components/cursor/CustomCursor.tsx`: a dot at the exact pointer position, and a follower that eases toward it (22% of the gap each frame) carrying a small leaf that leans into the direction of travel, plus a 64px ring that replaces the leaf over interactive elements and carries a contextual label.
- Labels come from a typed `cursorIntent()` helper: click, view, open and explore, with drag and play defined for future carousels and video. Buttons show Click, category cards Explore, tool cards View, service and resource cards Open. Over text inputs the custom cursor steps aside for the native caret.
- React renders the layer once. Pointer events write transforms straight to the DOM, and a single rAF loop stops itself once the follower settles.
- Mounted only for a fine pointer without reduced motion. Purely visual: `pointer-events: none` and `aria-hidden`, touch pointer events ignored, and hidden when the pointer leaves the window or Tab is pressed, so it never covers focus rings.

**Files affected**

- `components/cursor/*` (new), `app/globals.css`, `components/ui/Button.tsx`, `components/cards/*`, `components/sections/CategoryIndex.tsx`

**Decisions**

- A CSS `scale` on the element that carries the inline `translate3d` would scale the translation too and throw the dot away from the pointer. Positioning and scaling live on separate elements, recorded as a Tailwind trap in `CLAUDE.md`.

---

### 08:07 IST: Premium animated 404 page

**Work completed**

- `app/not-found.tsx` renders "This page wandered off the garden path" with Back to Home (magnetic), Explore Gardening Tools and a row of recovery links to the complete range, services and resources.
- `GardenPathScene`: an inline SVG of a garden path whose footprint trail wanders off toward a crooked, half-broken "404" signpost, with a dropped trowel, swaying fronds, drifting leaves and pollen motes. The sign straightens on hover.
- Pointer parallax across six depth layers through CSS variables (fine pointer with motion allowed only), a staggered CSS entrance, and ambient motion in CSS alone, with no GSAP. All of it stops under reduced motion. The scene uses the site's colour tokens, so it follows the light and dark themes.

**Files affected**

- `app/not-found.tsx`, `components/not-found/*`, `data/notFound.ts` (all new)

**Decisions**

- Recovery links point at Home sections, because interior routes do not exist yet and would lead straight back to the 404.
- Served with HTTP 404 and `noindex`. Drawn in SVG rather than shipped as an image; an optional illustration prompt is in `resources/image-generation.md`, section 12.

---

### 08:08 IST: Favicon and app icons

**Work completed**

- Replaced the create-next-app `favicon.ico` (25,931 bytes) with the GreenTools sprout mark (2,162 bytes; 16, 32 and 48px frames with heavier strokes at the small sizes).
- `scripts/generate-icons.mjs` (`npm run icons`) renders every icon from `config/brand.ts`: `app/icon.svg`, `app/favicon.ico`, a full-bleed 180px `app/apple-icon.png`, and 192px, 512px and maskable 512px PNGs in `public/icons/`.
- Added `app/manifest.ts` (name, `minimal-ui`, `en-IN`, brand background and theme colours, the three icons). The header logo and the viewport theme colours read the same brand constants.

**Files affected**

- `config/brand.ts`, `scripts/generate-icons.mjs`, `app/manifest.ts`, `app/icon.svg`, `app/apple-icon.png`, `public/icons/*` (new); `app/favicon.ico`, `components/layout/Logo.tsx`, `app/layout.tsx`, `package.json`

**Decisions**

- Icon `<link>` tags come only from the Next.js file conventions. `metadata.icons` is not set, so nothing is declared twice.
- The npm script passes `--disable-warning=MODULE_TYPELESS_PACKAGE_JSON`, because the generator imports `config/brand.ts` directly through Node 24 type stripping.
- The share image stays `public/images/og-home.jpg`; its alt text now describes the photograph.

---

### 08:08 IST: Em dash cleanup

**Work completed**

- Removed the em dash from every visitor-facing string: the default page title, the Open Graph image alt text, the logo's accessible name, the newsletter success message, the about story, a benefit, a service, a tool description and the garden accessories category. Sentences were rewritten rather than re-punctuated.
- Developer comments in the files touched this session were rewritten too. The em dashes left in the codebase are in developer comments only.
- An audit of visitor-facing strings found none.

**Files affected**

- `app/layout.tsx`, `lib/seo.ts`, `components/layout/Logo.tsx`, `components/ui/NewsletterForm.tsx`, `data/home.ts`, `data/benefits.ts`, `data/services.ts`, `data/tools.ts`, `data/toolCategories.ts`

**Decisions**

- Added a strict project-wide rule to `CLAUDE.md` (08:14) covering headings, cards, CTAs, testimonials, FAQs, alt text, SEO content, metadata and all future generated content.

---

### 08:14 IST: Typography, Inter and Manrope

**Work completed**

- Navigation, buttons, arrow links, the mobile menu, the newsletter button, the skip link and testimonial names moved from Manrope to Inter. Manrope stays on headings, hero and display text, the logo and the range index category titles. Verified in the browser: h1 in Manrope; body, navigation and CTAs in Inter.
- Inter now loads with the optical size axis (`opsz` 14 to 32), weights 100 to 900, upright and italic; Manrope with weights 200 to 800. These match the brief's font URL.

**Performance fix**

- Adding the italic range put a third font preload on every page: Inter italic at 77 KB, beside Inter (71 KB) and Manrope (24 KB). Italic is now its own `next/font` instance with `preload: false`, mapped onto `em`, `i`, `cite`, `dfn` and `q`. Rebuilt and verified: two preloads.

**Files affected**

- `app/layout.tsx`, `app/globals.css`, `components/layout/Header.tsx`, `components/layout/MobileMenu.tsx`, `components/ui/Button.tsx`, `components/ui/ArrowLink.tsx`, `components/ui/NewsletterForm.tsx`, `components/cards/TestimonialCard.tsx`

**Decisions**

- The Google Fonts `@import` was not added to `globals.css`. Both families were already self-hosted through `next/font`; the import would have downloaded every face a second time from a render-blocking third-party stylesheet, contradicting the brief's own no-duplicate and performance conditions. The brief allows integration with a justified existing system. Recorded in `resources/plan.md`, section 13.

---

### 08:16 IST: Project documentation and tool category image prompts

**Work completed**

- `CLAUDE.md` (08:14): added sections for the em dash rule, typography, the tool range, environment and configuration, brand assets and icons, and the interaction layer; updated the architecture map and the client component list; added Next.js trap 10 (metadata `title: undefined`) and Tailwind trap 4 (scale on a translated element).
- `resources/plan.md`: new rows in the deviations table for fonts through `next/font`, the italic split, UI text in Inter, the retired Professional Tools category and noindex outside production.
- `resources/image-generation.md` (08:16): a tool category series with shared series rules, a prompt template, and a prompt, setting and draft alt text for all 14 categories (nine new, five optional regenerations); an optional 404 illustration prompt; a refreshed asset status table.

**Files affected**

- `CLAUDE.md`, `resources/plan.md`, `resources/image-generation.md`

---

### 08:21 IST: Review fixes and verification

**Work completed**

- Screenshots of the 404 scene at 08:17 showed the landscape ending in hard rectangular edges. It now sits inside an organic island clip, with the sign, foliage and leaves breaking its silhouette (08:19). Checked again in the light and dark themes at 08:21.
- The newsletter submit button used a raw `data-cursor` string; it now uses the typed `cursorIntent("click")` helper that `CLAUDE.md` requires (08:18).
- Final clean production build, without a WhatsApp number, at 08:20. An earlier build used a throwaway test number to exercise the button.

**Verification results**

| Check | Result |
|---|---|
| `tsc --noEmit` and `eslint` | pass |
| `next build` | pass; `/`, `/_not-found`, `/apple-icon.png`, `/icon.svg`, `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` all static |
| Unknown URL | HTTP 404, title "Page not found \| GreenTools", `noindex`, one `h1`, scene hidden from assistive technology, no horizontal overflow |
| Icons | `favicon.ico`, `icon.svg`, `apple-icon.png` and the 512px manifest icon all HTTP 200; one link each for the ICO, the SVG, the Apple touch icon and the manifest |
| Title and robots | `<title>` present; `noindex, nofollow` and `Disallow: /` in this non-production build, as designed |
| Font preloads | 2 (Inter 71 KB, Manrope 24 KB), down from 3 |
| Computed fonts | h1 in Manrope; body, navigation and CTAs in Inter |
| Custom cursor, desktop | mounted with `pointer-events: none`; system cursor hidden, text caret on the email input; Explore on category cards, View on tool cards, unlabelled ring on navigation links, idle over headings, hidden after Tab |
| Custom cursor, 375px mobile emulation | not mounted; normal cursor |
| Complete range | 5 photo cards plus the teaser; index with 2 groups, 14 category links and 8 power-option lists |
| Mobile category row | 281px cards in a horizontal scroll row at 375px; no page overflow |
| Scroll-to-top | `inert` at the top, active after scrolling; focus moves to the header logo link on click |
| WhatsApp | with the test number: rendered at 48px, 24px from the bottom on desktop and 16px from both edges at 375px, message correctly encoded; with no number: absent |
| Em dashes in visitor-facing content | none |
| Images | no missing or unused files; `npm run images` reports 25 processed (64.6 MB to 4.9 MB) and 9 waiting for artwork |
| Secrets | none found; `.env.example` visible to git, other `.env*` files ignored |

**Pending follow-up**

- **Animations still cannot be watched playing.** The in-app browser pane runs zero `requestAnimationFrame` frames (0 in 600ms), so Lenis, the GSAP timelines, the cursor's easing, the scroll-to-top glide and its progress ring cannot be observed moving there. Their logic, end states, event handling and reduced-motion fallbacks are verified; the motion itself needs a look in a normal browser window.
- Nine new category images, the six regenerations listed in the 2026-09-10 23:10 entry, and optional regeneration of the five existing category images for series consistency.
- Launch checklist: `NEXT_PUBLIC_APP_ENV=production`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and real contact details in `config/site.ts`.
- Card, navigation and footer links point at interior routes that are still future scope, so they show the 404 page until those pages are built.

---

### 09:02 IST: Hero inside the page container, 1400px container, leaf cursor, line-art removed

**Work completed**

- **Container.** `--container-page` widened from 1200px to 1400px. The gutters are unchanged (16, 24 and 32px), so content reaches the full 1400px from a 1464px viewport.
- **Hero.** The hero now sits inside `container-page` like every other section, instead of padding its text in from a computed gutter and bleeding the photograph off the right edge. `hero-grid` keeps the pinned 560px text measure, so the headline still sets in three balanced lines; the `hero-text` utility became plain Tailwind padding. The photograph is now rounded on all four corners (a broad arc down the left, softer corners on the right), and its `sizes` hint matches the contained width.
- **Custom cursor.** The leaf is now the cursor: its tip tracks the pointer exactly, with no easing. The dot trails behind it and, over interactive elements, opens into the labelled ring. Over unlabelled links the leaf stays visible for precise aim; over labelled cards and buttons it steps aside for the ring. The easing is rescaled to the real frame time, so the dot trails the same way on 60Hz, 120Hz and 144Hz displays.
- **Line-art removed.** The stroked leaf illustration is gone from the hero, the final CTA (both drifting sprigs and their parallax layers) and the range teaser card. `components/decor/LeafLineArt.tsx` was deleted.
- Added a `greentools-prod` configuration (production server on port 3312) to `.claude/launch.json`.

**Files affected**

- `app/globals.css`, `components/home/Hero.tsx`, `components/ui/Container.tsx`
- `components/cursor/CustomCursor.tsx`, `components/cursor/CustomCursor.module.css`
- `components/home/FinalCTA.tsx`, `components/cards/RangeTeaserCard.tsx`, `components/motion/ParallaxLayer.tsx` (comment only); deleted `components/decor/LeafLineArt.tsx`
- `CLAUDE.md`, `resources/plan.md`, `.claude/launch.json`

**Decisions**

- All four changes were requested in review. For the line-art, removal was chosen over a more realistic redraw: a hand-drawn SVG is unlikely to read as real, and the photography already carries the organic detail. `CLAUDE.md` now rules out decorative botanical line-art.
- Of the two dot options offered, the dot stays as a trailing follower, because it is also what opens into the labelled ring. Hiding it takes one CSS rule on `.dot`.
- The rule that the element on the hotspot never eases is recorded in `CLAUDE.md`, and all four changes are listed in `resources/plan.md`, section 13.

**Verification**

| Check | Result |
|---|---|
| `tsc --noEmit`, `eslint`, `next build` | pass |
| Shared edges | header, hero text, hero photograph and the next section share the same left and right content edges at 1128px (32 and 1081px), 1440px (32 and 1393px) and 1920px (252.5 and 1652.5px) |
| Content width | 1049px at 1128, 1361px at 1440, 1400px at 1920 |
| Hero columns | 499 + 550px at 1128, 608 + 753px at 1440, 608 + 792px at 1920; the headline sets as three single lines at every width |
| Plate corners at 1440px | 129.6px on the left, 34.56px top right, 72px bottom right |
| Mobile, 375px | 16px gutters, 343px photograph, text padding unchanged (112 and 48px), no custom cursor, no horizontal overflow |
| Cursor | dot and ring painted beneath the leaf; after two synthetic pointer moves the leaf sat exactly on the second position while the dot stayed at the first, waiting on animation frames; Explore and View labels, unlabelled ring on navigation links, idle over headings, text state over the email input |
| Line-art | no line-art SVGs on the page; the final CTA and the teaser card each keep only their arrow icon |
| 404 at 1920px | 1400px container, 600px scene, no horizontal overflow |
| Horizontal overflow | none at any tested width |

**Pending follow-up**

- Watch the dot's trail and the ring opening in a normal browser window; the in-app pane still runs no animation frames.

---

## 2026-09-12

### 23:45 IST: Four alternative Home design concepts at /variant1 to /variant4

**Work completed**

Built four complete alternative Home pages so the client can compare five design directions side by side. The live Home page is untouched and is concept 1.

| Route | Concept | Direction |
|---|---|---|
| `/` | 01 | The existing Home page, unchanged |
| `/variant1` | 02 | Cinematic Editorial |
| `/variant2` | 03 | Interactive Product Experience |
| `/variant3` | 04 | Modern Indian Botanical |
| `/variant4` | 05 | Bold Art-Directed Showcase |

Every major section differs between concepts, not just the hero:

| Section | 01 Original | 02 Cinematic | 03 Interactive | 04 Botanical | 05 Art directed |
|---|---|---|---|---|---|
| Hero | Contained split | Full-bleed photograph, wipe reveal | Dark stage, one tool, four hotspots | True split screen with a cut arc | Two words with the object between them |
| Categories | Card grid plus index | Asymmetric magazine spread | Steered list with a cross-fading panel | Ring of names around one arch | Typographic wall that changes the surroundings |
| Products | Four equal cards | Four alternating long chapters | Dragged horizontal rail | Tools marked inside a garden scene | Gallery hung four different ways |
| Solutions | Service card grid | Vertical ledger with sticky heading | Question and answer disclosure | Walk through five Indian gardens | Specification sheet, sticky macro |
| Brand story | Photo band | Photographic band, layered type | Scroll-lit durability checks | Four chapters, four arches | Six technical notes |
| Editorial | Resource cards | Magazine front page | Counted figures | Warm pull quote plus two | Three differently shaped journal entries |
| Closing | Contained CTA | Cinematic full bleed | Type on an empty dark room | Warm arch with drifting photograph | Display-size statement |

**Files affected**

- Routes: `app/variant1/page.tsx`, `app/variant2/page.tsx`, `app/variant3/page.tsx`, `app/variant4/page.tsx`
- Copy: `data/variants/cinematic.ts`, `data/variants/interactive.ts`, `data/variants/botanical.ts`, `data/variants/artDirected.ts`
- Shared: `components/variants/shared/ConceptIntro.tsx`, `ScrollLines.tsx`, `ConceptSwitcher.tsx`
- Concept 2: `components/variants/cinematic/` (CinematicHero, EditorialCollage, ProductStories, StoryBand, SolutionsLedger, MagazineJournal, EditorialVoices, CinematicClosing)
- Concept 3: `components/variants/interactive/` (InteractiveHero, ProductStage, InteractiveCategories, CategorySelector, InteractiveProducts, ProductRail, InteractiveSolutions, SolutionFinder, InteractiveTrust, TrustCounters, InteractiveDurability, DurabilityScroller, InteractiveClosing)
- Concept 4: `components/variants/botanical/` (BotanicalHero, BotanicalCategories, CategoryOrbit, BotanicalShowcase, GardenScene, CraftStory, GardenJourney, BotanicalVoices, BotanicalClosing)
- Concept 5: `components/variants/artdirected/` (TypeHero, TypeHeroMotion, ArtCategories, CategoryWall, ArtGallery, TechnicalSpecs, VisualJournal, ArtClosing)
- Shared system: `app/globals.css` (one deeper band surface, two display sizes, the `rail-x` utility, three concept entrance states), `config/variants.ts` (new), `lib/routes.ts` (`routes.concept`), `components/layout/Header.tsx`, `components/layout/MobileMenu.tsx` (`tone` prop)

**Decisions**

- **One design system, four art directions.** No concept introduces a colour, a font or a breakpoint of its own. The additions to `globals.css` are `--band-deep` (a near-black botanical green for the concepts art-directed as dark environments), `display-2xl` and `display-3xl` above the existing scale, and the `[data-v-*]` entrance states, which all four heroes share.
- **Header scheme by route.** `config/variants.ts` records which routes need the white header over their hero; the header reverts to ink the moment it lands on a surface. Nothing else about the header, navigation or footer changes between concepts.
- **Concept 3 stays a dark experience** rather than a dark theme: the page is composed dark in both themes, which is an art direction, not a colour inversion.
- **No new content model.** Every concept renders the same catalogue, tools, services, resources and testimonials. Concept-specific copy lives in `data/variants/`, and the counted figures in concept 3 are derived from the catalogue and the founding year rather than typed.
- **Client components take plain props.** `lib/catalogue` and `data/toolCategories` are read in server bindings and reduced to serialisable props, so no concept ships the catalogue to the browser.
- **The concept switcher is a review aid**, mounted only on the four concept routes and removable by deleting one line per page. The live Home page has nothing added to it.
- Concept pages are `noindex` in every deployment, and none of them is in the sitemap.

**Verification**

| Check | Result |
|---|---|
| `tsc --noEmit`, `eslint`, `next build` | pass; 13 static routes including the four concepts |
| Horizontal overflow at 390px and 1440px | none on any of the four pages, after clipping the product-story breakout on concept 2 |
| Collage geometry at 1440px | five entries, no overlapping rectangles, after the third entry's negative offset was reduced below the row gap |
| Hotspots, disclosure, category steering | verified by script: the hero panel swaps on selection, a closed row reports `aria-expanded="false"`, the rail scrolls one panel per press |
| Rail snapping | mandatory snapping dragged the rail back to the start when it only just overflowed; changed to proximity snapping and a measured one-panel step |
| Dark theme | concept 4 checked at 390px; the warm surfaces resolve to the botanical night palette |
| Images | every photograph 200; the only 404s are route prefetches for pages that do not exist yet, which the live Home page also produces |

**Pending follow-up**

- Review the four concepts in a normal browser window. The in-app pane still runs no animation frames and can only capture part of a wide viewport, so the entrance timelines, the drag rail and the full desktop compositions were verified by measurement and by script rather than by eye.
- `tool-pruning-shears.webp` carries legible baked-in lettering on the crate behind the tool. It is the hero object on concept 3 at large size, where the floating specification card covers it from 744px up but not on a phone. Worth regenerating with the section 6 prompt in the image manifest.
- Concept 4's garden scene and concept 2's hero both use `hero-main.webp`. A second wide garden photograph would let the two concepts stop sharing their signature image.

---

## 2026-09-13

### 00:05 IST: Variant numbering fixed, variant 2 re-toned light, new variant 5 (Structured Catalogue)

**Work completed**

- **Numbering.** The live Home page at `/` is now a separate, unnumbered entry, and the variants are numbered by their URL: `/variant1` is variant 01 through `/variant5` is variant 05. Page titles, the switcher chips (Home, 01 to 05) and every doc comment were renumbered. `routes.concept` became `routes.variant` and accepts 1 to 5.
- **Variant 2 re-toned light.** Client feedback: the page was deep green from top to bottom. Every section now sits on a light surface (canvas, cream, sage tint, white, elevated), with ink type, hairline rules and brand-green actions. The product stage became a raised white plate on the warm canvas, hotspots became brand-green dots, the spec card and detail panel became light panels, and the rail, finder, counters and durability list were redrawn in the light palette. One deep green band remains, the closing statement, matching the live Home page's rhythm. The header over its hero switched back to ink.
- **New variant 5, Structured Catalogue** (`/variant5`), the printed trade catalogue brought to the web and light throughout:
  - Hero: a masthead strip of facts, the title, and a numbered contents list that jumps to each section, then one wide captioned plate.
  - Range: all 14 categories in both groups as a ruled index (number, category, what is inside, tool count, plate), the only variant that lists the complete range at the top level.
  - Tools: a framed specimen sheet of four cells, each with a plate and three spec lines.
  - Services: four printed columns under a heavy rule, each saying who the service is for.
  - About: a fact sheet with a tall plate, the founding statement and four ruled facts.
  - Resources: a numbered reading list whose plate grows on hover.
  - Closing: the enquiry inside a framed page, with a colophon of the contact facts from `config/site.ts`.

**Files affected**

- `config/variants.ts` (rewritten: `originalHome`, `homeVariants`, `allHomeVariants`), `lib/routes.ts`, `components/variants/shared/ConceptSwitcher.tsx`
- `app/variant1/page.tsx` to `app/variant4/page.tsx` (titles and routes), `app/variant5/page.tsx` (new)
- Variant 2: `InteractiveHero`, `ProductStage`, `InteractiveCategories`, `CategorySelector`, `InteractiveProducts`, `ProductRail`, `InteractiveSolutions`, `SolutionFinder`, `InteractiveTrust`, `TrustCounters`, `InteractiveDurability`, `DurabilityScroller`, `InteractiveClosing` (comment)
- Variant 5: `data/variants/catalogue.ts`; `components/variants/catalogue/` (CatalogueHero, CatalogueRange, SpecimenBoard, ServiceColumns, WorkshopFactSheet, ReadingList, CatalogueClosing)
- `resources/plan.md` section 15 rewritten

**Decisions**

- Numbering follows the URL, so a client reading "variant 3" in feedback and a developer opening `/variant3` always mean the same page.
- Variant 2 keeps its interaction design unchanged; only the palette moved. The direction was never the dark background.
- Variant 5's hero plate is cropped high (`object-[50%_20%]`, 16:9 and 21:9 only) because `resource-choosing-tools.webp` carries small printed labels along its foot.
- Inactive labels in the variant 2 selector and finder were raised to 60% and 70% ink after the light re-tone, to keep AA contrast on cream and sage.
- Photo captions make no claim about where a photograph was taken.

**Verification**

| Check | Result |
|---|---|
| `tsc --noEmit`, `eslint`, `next build` | pass; `/variant1` to `/variant5` all static |
| Variant 2 section backgrounds | six light sections (luminance 241 to 255) and one dark closing band |
| Variant 5 section backgrounds | all seven light (luminance 241 to 255) |
| Horizontal overflow | none on variant 2 at 390 and 1440px; none on variant 5 at 390, 800, 1128 and 1440px |
| Variant 5 range index | 14 rows; desktop columns 48, 282, 487, 64 and 72px at 1128px |
| Images | none broken; console 404s are prefetches of the interior routes that do not exist yet |
| Em dashes | none in visitor-facing strings |

**Pending follow-up**

- Review the variants in a normal browser window; the in-app pane runs no animation frames and captures only part of a wide viewport.
- Variants 1 and 4 still close on a deep green band and use one more in the middle (variant 1's story band, variant 4's category wall). If the light-background feedback applies site-wide, those two bands are the next to re-tone.
- `resource-choosing-tools.webp` and `tool-pruning-shears.webp` carry baked-in lettering; both are worth regenerating.


---

## 2026-09-19

### 18:09 IST: Homepage variant audit, background rhythm, radius system, product review

**Homepage variants audited**

The live Home page (`/`) and all five variants (`/variant1` to `/variant5`) were rendered in headless Chrome at 1440, 1280, 1024, 768, 390 and 360px in the light theme, and at 1440 and 390px in the dark theme. Each render ran a scripted check of text contrast against its real background, horizontal overflow, the section background sequence and image corner radii. Full-page captures were then reviewed by eye. Final pass: zero horizontal overflow and zero AA contrast failures across all 48 renders.

**Layout issues fixed**

- Variant 1 product stories, text placement: whenever the text sat left of the photograph, grid auto-placement pushed it into a second row. Half the band was left empty beside the image, with the copy stranded underneath (the "missing text" in the client screenshots). Both columns are now pinned to row 1.
- Variant 1 product stories, responsive layout: the two-column layout now starts at 900px instead of 1128px, and the stacked photograph is 4:3 rather than a full-width square. At 1024px the page is 3,800px shorter.
- Variant 1 product stories, breakout: removed the photograph breakout that ran flush to the viewport edge. Everything sits inside the container.
- Variant 1 category collage: the row-spanning lead photograph stretched the rows beside it and opened dead gaps of 150 to 200px. It is now two independent columns. On a phone these dissolve (`display: contents`) into catalogue order. The column ends now differ by 24px at 1440px.
- Variant 3 hero: the photograph ran under the transparent header, putting "Resources", "Contact" and the theme toggle on the image. It now starts below the header and keeps to the container's right gutter.
- Variant 4 hero on phones: the photograph sat absolutely centred over the two display words and covered the "w" of "Grow". Below 1128px it now sits in the flow between them.
- Variant 4 gallery: the side-captioned entry used an `auto` text column, which squeezed its photograph to a 44px thumbnail. It now uses two equal columns and sits vertically centred beside the tall entry.
- Concept switcher: from 1128px it sits at bottom centre, so the framework's development badge no longer clips the "Home" chip.

**Contrast issues fixed**

- The green "Tools" in the wordmark measured 2.0:1 on the deep band. This affected the footer on every page and the header over variant 1's hero. A new token, `on-band-accent` (#A8C98D, about 6:1), is now used for any green on a band.
- `muted-soft` (about 3:1) was used for index numerals and "Drag to explore" in variants 2 and 5. Every text use is now `muted`, and the token is documented as non-text only.
- Faded display numerals (`brand-soft/35` and `/40`) in variants 1 and 5 were raised to solid colour. Where they are purely decorative they are 70% and `aria-hidden`.
- Labels on photographs vanished on bright images: the white "01" numerals in the variant 1 collage and the blended `text-ink/45` numerals in the variant 4 gallery. Two shared utilities now carry all type on photographs: `scrim-caption`, a graded scrim under caption blocks, and `photo-chip`, a translucent pill for short corner labels.

**Background and colour balance**

- Home: the deep-green sections in the body went from three to one.
  - The trust bar is now a white strip ruled top and bottom.
  - The final CTA sits on the soft sage band with brand buttons.
  - The newsletter strip is white.
  - The photographic community band is the one dark beat, and the dark footer always follows a light section.
  - Sequence: canvas, white, warm, canvas, soft, white, elevated, soft, photo, canvas, sage, white, footer.
- Variant 1: the closing photograph is now an inset rounded panel on the warm surface, not a full-bleed dark band above the dark footer.
- Variant 2: the counted-figures section is now the variant's one deep band, and the closing moved to the soft sage band.
- Variant 4: the closing typographic statement is now ink on the warm surface, with the last word in brand green. The category wall stays as the variant's dark feature.
- Variants 3 and 5 were already balanced and are unchanged.

**Border-radius consistency**

Before this pass there were 22 hard-coded radius values across the variants: `rounded-[2px]`, `[28px]`, `[2rem]`, `[7rem]`, `[9rem]`, `[13rem]` and six different `clamp()` corners. Photographs in variants 1, 4 and 5 had square corners while every other variant rounded them.

One scale is now documented in `globals.css`:

| Level | Size | Used for |
|---|---|---|
| `sm` | 8px | Buttons, inputs, rectangular tags, thumbnails up to 64px |
| `md` | 12px | Compact floating panels, thumbnails up to about 200px |
| `lg` | 18px | Cards and standard photographs |
| `xl` | 24px | Hero and feature media, large panels |
| `2xl` | 32px | Full-width section panels |
| `full` | n/a | Pills, chips, avatars, floating controls |
| `organic`, `arch` | n/a | Botanical signature corners, on Home and variant 3 only |

- `ImagePlate` gained `sm` and lost the unused `2xl`.
- No `rounded-[…]` value remains.
- The logo tile moved to `sm`, which matches the 0.22 corner of the generated icons.

**Jiva Greens reference research**

jivagreens.com is the catalogue of Shree Khodiyar Garden Tools ("JIVA"), Ahmedabad. Its range covers:

- **Lawn mowers,** sold by type: wheel-type manual, rotary electric, roller-type electric and petrol, and zero-cut.
- **Cutting equipment:** brush cutters, chainsaws, hedge trimmers and a mist blower from a major brand, plus branch cutters and drop-forged hedge shears.
- **Watering:** garden pipes, self-coiling hoses, hose reels, multi-pattern nozzles, and four-arm, oscillating and brass sprinklers.
- **Hand tools:** khurpi, heavy khurpa, pavda (phawda), bulb planter, grafting tool, bypass and roll-cut secateurs, and bonsai cutters.
- **Also:** folding pruning saws, a telescopic tree pruner, a 16-litre spray pump, planter stands, fountain nozzles, solar lights and a snake catcher.

The site was used as a factual and terminology reference only. No copy, design, images or branding were taken.

**Product names and categories updated**

- `data/toolCategories.ts`:
  - Hand tools add the khurpa and a bulb planter.
  - Pruning lists bypass and roll-cut secateurs, branch cutters (loppers), drop-forged hedge shears, grass shears, bonsai cutters, folding and fixed saws, telescopic tree pruners and grafting tools.
  - Watering uses "garden pipes", self-coiling hoses, multi-pattern nozzles and named sprinkler types.
  - Accessories add planters and stands, solar lights and a snake catcher.
  - Lawn mowers are listed by type: wheel, rotary, roller electric, roller petrol, zero-cut and battery.
  - Brush cutters add electric models.
  - Sprayers name the 16-litre knapsack spray pump.
  - Irrigation adds fountain nozzles.
- `data/tools.ts`: four new tools, not yet photographed: Forged Khurpi, Drop-Forged Hedge Shears, Rotary Electric Lawn Mower and Petrol Brush Cutter. `Tool.image` is now optional (`PhotographedTool`), and `featuredTools` returns only photographed tools. This is the rule the categories already follow, so no grid shows a missing or mismatched photograph.
- Variant 2's solution finder uses the same mower types and "branch cutters".
- Company facts in `config/site.ts` were **not** changed (see pending).

**Image-generation prompts updated**

- `resources/image-generation.md` status table: the four featured tools, `why-choose` and the three resource images are now marked for regeneration. They carry legible baked-in slogans and labels that are plainly visible at variant sizes.
- Section 6 was rewritten as eight exact-product prompts: four regenerations and the four new tools. Each covers physical form, materials, handle and blade detail, Indian setting, lens, angle, light, placement, background, 1:1 ratio and negative space, under shared set rules.
- Category prompts 4c, 4d, 4f and 4l now use the renamed products.
- `scripts/process-images.mjs` maps the four new slots.

**Important decisions**

- The section directly above the footer is never a deep band. A dark closing plus the dark footer reads as one slab.
- Each page gets at most one deep band in the body, used where it carries hierarchy.
- The variants keep their own art direction: arches only in variant 3, editorial rules in variant 1, the dark category wall in variant 4. They share one radius scale, one pair of photo-label utilities and one set of contrast tokens.
- A new tool enters the catalogue without a photograph rather than borrowing another tool's.

**Files affected**

- `app/globals.css`, `app/page.tsx`, `CLAUDE.md`
- `components/ui/ImagePlate.tsx`, `components/layout/Logo.tsx`, `components/cards/ToolShowcaseCard.tsx`
- `components/home/`: Hero, TrustBar, AboutPreview, WhyChooseUs, FinalCTA, Newsletter
- `components/variants/cinematic/`: EditorialCollage, ProductStories, SolutionsLedger, MagazineJournal, CinematicClosing
- `components/variants/interactive/`: InteractiveTrust, TrustCounters, InteractiveClosing, ProductStage, CategorySelector, InteractiveDurability, ProductRail, SolutionFinder, DurabilityScroller
- `components/variants/botanical/`: BotanicalHero, BotanicalClosing, BotanicalVoices, CategoryOrbit, CraftStory, GardenJourney, GardenScene
- `components/variants/artdirected/`: TypeHero, ArtGallery, TechnicalSpecs, VisualJournal, CategoryWall, ArtClosing
- `components/variants/catalogue/`: CatalogueHero, CatalogueRange, ReadingList, SpecimenBoard, WorkshopFactSheet, ServiceColumns
- `components/variants/shared/ConceptSwitcher.tsx`
- `types/content.ts`, `data/tools.ts`, `data/toolCategories.ts`, `data/variants/interactive.ts`
- `resources/image-generation.md`, `scripts/process-images.mjs`

**Verification**

| Check | Result |
|---|---|
| `npm run check`, `npm run build` | Pass. All 14 routes are static. |
| Horizontal overflow: 6 pages at 6 widths, plus dark theme at 2 widths | 0px everywhere |
| AA contrast, scripted over every visible text node | No failures outside photographs |
| Radius inventory | Only scale values; `organic` and `arch` appear on Home and variant 3 only |
| Em dashes in visitor-facing strings | None |

**Pending follow-up**

- Resolved at 18:45 IST: the client confirmed Jiva Greens is the brand; see the next entry.
- Generate the eight section 6 product photographs. Once the four new tools are photographed, the Home featured grid grows to eight cards. Decide then whether the trowel and spade leave `featured`.
- Regenerate `why-choose` and the three resource images, which carry baked-in lettering.
- Check entrance animations and hover states in a normal browser window. The audit ran with reduced motion so that every reveal was visible.


### 18:45 IST: Rebrand from the "GreenTools" placeholder to the client, Jiva Greens

**Work completed**

The client confirmed the site is for **Jiva Greens (JIVA)**, the trading brand of **Shree Khodiyar Garden Tools**, Ahmedabad, whose current site is jivagreens.com. Every placeholder brand fact has been replaced with the client's real details, checked today against their home, company and contact pages.

| Fact | Now | Source |
|---|---|---|
| Name | Jiva Greens (short name JIVA) | Domain, logo, copyright line |
| Legal name | Shree Khodiyar Garden Tools | Home and company pages |
| Tagline | Everything in Gardening | Logo lockup |
| Address | 30, 31, Silicon Valley, Shivranjani Cross Road, Satellite, Ahmedabad, Gujarat | Contact page |
| Phones | +91 79 4004 6010, +91 79 2675 0730 | Contact page |
| Email | jivagreen@yahoo.com | Contact page |
| Established | 1998 | Company page, which says "established in 1998" (see pending) |
| Site URL fallback | https://www.jivagreens.com | Domain |

- **Logo.** The client's JIVA logo (`gardening images/jiva-logo.png`, from their site) is trimmed losslessly by `npm run images` into `public/images/brand/jiva-logo.png`. `Logo.tsx` now renders it in the header and footer.
  - It is never recoloured.
  - On the deep footer band, over variant 1's photographic hero and in the dark theme, it sits on a small white plate.
- **Removed, not invented.** The old site does not state these, so they are gone rather than guessed:
  - opening hours, from the footer, the variant 5 colophon and the LocalBusiness JSON-LD;
  - the postcode;
  - the placeholder social links. The footer social row and `sameAs` now render only when real profiles exist.
- **Invented history rewritten.**
  - "We began in a single workshop repairing tools" and "Fifteen years" appeared on Home, variant 1 and variant 5. They now describe what the company actually states: it supplies garden machinery, plant protection equipment, spares and hand tools to landscapers, institutes, corporates and individual gardeners.
  - Every "2009" is replaced with `site.founded`, read from config rather than retyped.
- **Copy and metadata.**
  - The name changes to Jiva Greens across page titles, the web manifest (short name JIVA), JSON-LD, the WhatsApp greeting, the 404 copy, the variant eyebrows and the footer blurb.
  - The comments in `data/tools.ts` and `data/toolCategories.ts` now name jivagreens.com as the client's own catalogue.

**Files affected**

`config/site.ts`, `config/env.ts`, `config/brand.ts`, `.env.example`, `components/layout/Logo.tsx`, `components/layout/Footer.tsx`, `components/variants/catalogue/CatalogueClosing.tsx`, `lib/seo.ts`, `app/manifest.ts`, `data/home.ts`, `data/notFound.ts`, `data/tools.ts`, `data/toolCategories.ts`, `data/variants/{cinematic,catalogue,artDirected,botanical}.ts`, `scripts/process-images.mjs`, `resources/image-generation.md`, `CLAUDE.md`

**Decisions**

- `CLAUDE.md` now states that brand facts are real and come from `config/site.ts`, and that the old site is the client's own and therefore authoritative.
- A trademark is placed, not altered: a white plate rather than a white knockout on dark surfaces.
- The app icons and favicon keep the generated sprout for now. The only logo source is a 280px raster with a baked-in drop shadow, which cannot produce a sharp 16px favicon or a 512px home-screen icon.

**Verification**

- `npm run check` and `npm run build` pass.
- Home and variant 1 at 1440px, and Home at 390px in dark, show no overflow and no contrast failures.
- The logo was checked by eye on the light header, over the photographic hero and in the dark theme.

**Pending follow-up**

- **Founding year:** the client's site says both "established in 1998" (company page) and "Since 2003" (home page). The site currently uses 1998; confirm with the client.
- Ask the client for a vector (SVG or AI) logo, so the favicon and app icons can carry the JIVA mark and the header logo is sharp on high-density screens.
- Ask for opening hours, postcode and any social profiles, to restore those blocks with real data.
- Testimonials in `data/testimonials.ts` are still sample quotes marked as placeholder in the file. They need real, permissioned customer quotes before launch.

---

## 2026-09-20

### 11:15 IST: Products terminology, the five interior pages, homepage section parity, the preloader and the production page switchboard

The largest single phase so far. Six pieces of work, in the order they had to happen.

---

#### 1. Tools became Products, everywhere

The range is now called Products in navigation, headings, buttons, breadcrumbs, URLs, metadata, page titles and every call to action. The rename went all the way down rather than stopping at the copy, so the code and the site use one vocabulary.

- Routes: `/tools` and `/tools/[category]` became `/products` and `/products/[slug]`. `routes.services`, `routes.service()`, `routes.resources`, `routes.resource()`, `routes.faq`, `routes.privacy` and `routes.terms` were deleted; nothing pointed at a page that exists.
- Types: `ToolCategory` to `ProductCategory`, `Tool` to `Product`, `ToolGroup` to `ProductGroup`, `ToolItem` to `ProductItem`, and the photographed variants with them. The category field `tools` became `items`.
- Files: `data/toolCategories.ts` to `data/productCategories.ts`, `data/tools.ts` to `data/products.ts`, `ToolCategoryCard` to `ProductCategoryCard`, `ToolShowcaseCard` to `ProductShowcaseCard`, `ServiceCard` to `SolutionCard`.
- "Hand Tools", "Cutting Tools" and "Watering Tools" stay as category names. That is what the trade and the client call them, and it is the one contextual reason the word survives.

**Product scope.** Checked against the client's own navigation and catalogue. Nothing was invented: no product name, model, SKU, variant or specification that the client does not publish. Two real gaps were closed from their nav: pesticides and fertilisers, and fountain nozzles, both folded into existing categories (`sprayers`, now "Sprayers, Pesticides & Fertilisers", and `watering-tools`) rather than padded into new ones. The range stays at fourteen categories.

**Category data gained `intro`, `features` and `applications`** so the detail pages have something real to say. These describe the category, not a data sheet: no measurements, capacities or model numbers appear anywhere.

---

#### 2. The five interior pages

| Route | What it is |
|---|---|
| `/about` | Company introduction, brand story, mission and vision, values, product philosophy, capability, Indian focus, solutions, CTA |
| `/products` | Premium catalogue listing: group filter, search, sort, responsive grid |
| `/products/[slug]` | One reusable component over all fourteen categories |
| `/clients` | Logo wall, industries served, highlights, partnership approach, testimonials |
| `/contact` | Contact channels, enquiry form, location, CTA |

Four new shared shells carry them: `PageHero`, `Breadcrumbs`, `CtaBand` and `HighlightsBand`. Nothing underneath was redesigned.

**Products listing.** Rows, groups and counts are computed on the server; the client browser receives plain serialisable values with the searchable text already joined. `lib/catalogue.ts` and the catalogue data never cross the client boundary. There is no price filter, no availability filter and no cart, because none of those exist on this site.

**Product detail.** One route, one component, driven entirely by `data/productCategories.ts`. Adding a category publishes its page. A category that has not been photographed renders a typographic plate rather than a borrowed photograph. The gallery component is built and falls back to the single lead image; extra frames are defined in the manifest and will appear as `gallery` entries when they exist.

**Services page removed.** The client's own services page is placeholder Latin, and four cards do not justify a route. The content lives on as `data/solutions.ts`, shown on Home, About and the variants. The cards deliberately do not link anywhere: a card linking nowhere useful is worse than a card that does not link.

**Resources replaced by Clients.** Three variant sections that previewed guides became client sections, `data/resources.ts` and `ResourceCard` were deleted, and the footer, sitemap and navigation followed. **No client is named and no logo is drawn.** The logo wall renders nothing at all while `clientLogos` is empty. The logos on the client's existing Clients page turned out to be the demo marks that shipped with their old template (brilliant, goodwaves, videosms, spectrum, diagblog, home-energy), so they were not reused. Testimonials remain the existing placeholder set, and the Clients page now says so on the page as well as in the data file.

**Contact.** Every fact reads from `config/site.ts`. No opening hours, postcode, response time or map pin is shown, because none has been supplied: the page says hours are not published and to call first. The map is a link, not an embed, so there is no third-party request on every visit.

**The enquiry form does not lie.** Delivery is not built, so it never claims an enquiry was sent. It composes the message and hands it to the visitor's own mail client, and offers the phone and WhatsApp routes beside it. Fields are declared in `data/contact.ts` so a future backend validates against the same list; only `onSubmit` has to change.

---

#### 3. Homepage section parity across all five variants

The live Home page is the reference for content coverage. It now carries thirteen sections: Resources became Clients, and a highlights band was added.

Seven shared, configurable bands were built in `components/variants/shared/` (`VariantTrust`, `VariantBenefits`, `VariantAbout`, `VariantSolutions`, `VariantHighlights`, `VariantClients`, `VariantTestimonials`, `VariantCommunity`, `VariantNewsletter`). Each takes a `variant`, a `layout` and a `tone`, so five pages carry the same content in five shapes without five copies of it. Copy lives in `data/variants/shared.ts`: shared bodies, per-variant eyebrows and headings.

Thirty-one section instances were added across the five variants. The audit was run against rendered HTML, not by eye, and the checklist is in [resources/section-parity.md](resources/section-parity.md). Every cell is filled.

Two judgement calls are recorded there: variants 2 and 3 carry solutions twice on purpose, because their finder and journey sections are a different story from the four gardening solutions on `/`; and variant 2 does not repeat the highlights band, because `InteractiveTrust` already counts the same figures from the same catalogue.

The deep-band budget was respected. Variants 1, 2 and 4 already spend their one dark band, so their community section takes the plate layout. Variant 3 has none, so it keeps the full-bleed photographic treatment `/` uses. Variant 5 stays light throughout.

---

#### 4. The preloader

Grass grows, a mower crosses and cuts it, the trimmed lawn hands over to the logo.

- Inline SVG and CSS keyframes. No images beyond the logo the header already preloads, no Lottie, no GSAP, nothing to download before it can start.
- Armed before first paint by the script in `app/layout.tsx`, the same technique the theme and `js-motion` use, so there is no flash of page followed by overlay.
- Runs **once per session**. Skipped entirely on reduced motion, on reduced data (`navigator.connection.saveData`) and with JavaScript off.
- Holds no React state: `data-preloader` on `<html>` decides everything. The whole sequence is capped at 1.75 seconds plus a 420ms fade, and the timeout fires whatever happens, so a slow device cannot trap anyone behind it.
- Thirty blades, each a nested pair of groups: one grows, one is cut, because both are `scaleY` and cannot share an element.

---

#### 5. Production page visibility

One file, `config/pageVisibility.ts`, decides what exists in production.

- Development and staging serve every implemented page regardless of the flags.
- Enforcement is at the route, never in the markup: `proxy.ts` blocks a withdrawn path at the edge, and every gated route calls `enforcePageVisibility()`, which calls `notFound()`.
- `lib/visibility.ts` is the only module that reads the flags. `visibleLinks()` filters the header, the mobile sheet and the footer; `app/sitemap.ts` filters the same way; a footer column left with no links renders nothing rather than an empty heading.
- No database, no admin panel, no feature-flag service, no authentication, no API.

`middleware.ts` is deprecated in Next 16, so this is `proxy.ts`.

---

#### 6. `.env.example` reduced to what the code reads

Every `process.env` reference in the codebase was traced. Three variables are used, all through `config/env.ts`: `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER`.

**Removed:** `NODE_ENV` (commented note), `CONTACT_FORM_TO_EMAIL`, `CONTACT_FORM_FROM_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_PROVIDER`, `EMAIL_PROVIDER_API_KEY`, `NEXT_PUBLIC_CAPTCHA_SITE_KEY`, `CAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_CONTAINER_ID`, `CMS_API_URL`, `CMS_API_TOKEN`, `CMS_PREVIEW_SECRET`, `CMS_REVALIDATE_SECRET`, `NEXT_PUBLIC_API_BASE_URL`, `API_SECRET_KEY`. Twenty variables, none referenced anywhere in the code.

No backend was built as part of this. Variables go in when the feature does.

---

#### Image manifest

`resources/image-generation.md` was updated to the real product list.

- The three Resources slots were retired. `resource-choosing-tools` was kept and renamed `products-overview`, because a bench of tools laid out for comparison is exactly what the Products page opens with; `resource-essential-tools` and `resource-clean-maintain` are gone, sources and outputs both.
- Section 4 now states that each category image is also the lead photograph of its own page, and defines optional `-02` and `-03` gallery slots.
- The sprayers prompt covers pesticides and fertilisers, with an explicit instruction that the bottle carries no label or packaging graphics.
- New section 8b covers client logos: supplied by the client, never generated, traced or recoloured, with the note about the old site's demo marks.

---

#### Files affected

New: `config/pageVisibility.ts`, `lib/visibility.ts`, `lib/page-guard.ts`, `lib/highlights.ts`, `proxy.ts`, `app/about/page.tsx`, `app/products/page.tsx`, `app/products/[slug]/page.tsx`, `app/clients/page.tsx`, `app/contact/page.tsx`, `data/about.ts`, `data/clients.ts`, `data/contact.ts`, `data/solutions.ts`, `data/products-page.ts`, `data/variants/shared.ts`, `components/about/sections.tsx`, `components/clients/sections.tsx`, `components/products/*`, `components/forms/EnquiryForm.tsx`, `components/preloader/*`, `components/cards/IndustryCard.tsx`, `components/sections/{PageHero,Breadcrumbs,CtaBand,HighlightsBand}.tsx`, `components/variants/shared/Variant*.tsx`, `resources/section-parity.md`.

Renamed: `data/productCategories.ts`, `data/products.ts`, `components/cards/ProductCategoryCard.tsx`, `components/cards/ProductShowcaseCard.tsx`, `components/cards/SolutionCard.tsx`.

Deleted: `data/resources.ts`, `data/services.ts`, `components/cards/ResourceCard.tsx`, `components/variants/cinematic/MagazineJournal.tsx`, `components/variants/artdirected/VisualJournal.tsx`, `components/variants/catalogue/ReadingList.tsx`, three `resource-*.webp` images.

Updated: `app/page.tsx`, `app/layout.tsx`, `app/sitemap.ts`, all five variant pages, `lib/routes.ts`, `lib/catalogue.ts`, `lib/seo.ts` callers, `types/content.ts`, `config/env.ts`, `data/home.ts`, `data/navigation.ts`, all five variant data files, `components/layout/{Header,Footer,MobileMenu}.tsx`, `components/home/collections.tsx`, `scripts/process-images.mjs`, `.env.example`, `CLAUDE.md`, `resources/plan.md`, `resources/image-generation.md`, `.claude/launch.json`.

---

#### Verification

- `npm run check` and `npm run build` pass. The build generates all fourteen product category pages and registers the proxy.
- Section parity audited against rendered HTML for `/` and all five variants. All thirteen sections present on every page, all six returning 200.
- Production gating tested with a real production build and server, with `products` and `clients` set to `false`: `/` `/about` `/contact` returned 200; `/products`, `/products/lawn-mowers`, `/clients` and `/variant1` returned **404** with the site's not-found page; the sitemap listed only the three released URLs; Products and Clients were absent from the header, the mobile sheet and the footer, and the two empty footer columns disappeared with them.
- The preloader was stepped through frame by frame in the browser: grass grows, the mower crosses leaving a cut trail behind it, the logo settles.
- No console errors on Home, Products, a product category page, Clients or Contact.
- No em dash in any visitor-facing string.
- Nothing secret is staged. `.env.example` is the only committed `.env*` file.

---

#### Decisions worth keeping

- **Product detail pages are per category, not per product.** The client publishes categories, not model sheets. A page per named product would have to invent the specification table it needs to justify itself.
- **The logo wall hides itself rather than showing placeholders.** Greyed boxes or invented brands on a credibility page would undermine the exact thing the page is for.
- **The solutions cards do not link.** With no Services page, a "Learn more" that went nowhere useful would be worse than no link.
- **The enquiry form is honest about not being connected**, and still does something real by composing the message for the visitor's mail client.
- **Page visibility is enforced twice, both server side.** The route check produces the 404 page and status; the proxy makes sure a withdrawn page is never rendered at all.
- **The variant bands are configurations, not copies.** Nine components, thirty-one uses, and a layout and tone per variant.

---

#### Pending follow-up

- **Client logos.** Ask for real marks with permission to show them, as transparent PNG or SVG. The wall is built and hides itself until they arrive.
- **Testimonials** are still placeholder, now labelled as such on the Clients page. Real, permissioned quotes are needed before launch, ideally with company names for the Clients page.
- **Opening hours and postcode.** The Contact page states that hours are not published. Add them to `config/site.ts` when supplied.
- **Photography.** Nine product categories and four featured products still have no image. The Products page and the category pages render typographic cards for them, which is honest but plainer than the photographed ones.
- **Regenerate `products-overview`.** The current frame carries printed labels under the tools and now sits beside the Products page heading.
- **Founding year** still unconfirmed: the client's site says both 1998 and 2003. The site uses 1998, and the derived "years" figure on the highlights band depends on it.
- **Legal pages.** Privacy and terms links were removed from the footer because the pages do not exist. Add both, then restore the links.
- **Enquiry delivery.** When email is built, add its variables to `.env.example` then, not before, and replace the form's `onSubmit`.

### 12:05 IST: Preloader plays on every reload, and follows the theme

Two changes to the preloader, both requested in review.

**Every browser reload, not once per session.** The `sessionStorage` gate in the arming script in `app/layout.tsx` is gone, so the animation plays on every document load. Client-side navigation between pages never re-runs that script, so moving around the site is still instant and the preloader does not reappear between pages. Reduced motion, reduced data and no-JavaScript still skip it entirely, and the 1.75 second cap is unchanged.

**Colour follows the theme.** The scene was drawing its grass in raw palette values, `--green-600` and `--green-800`. That works on the cream canvas and fails on the dark one: `#123b1c` on `#08150c` is all but invisible, so half the patch disappeared in the dark theme.

Four semantic tokens now carry it, defined in both theme blocks of `globals.css`:

| Token | Light | Dark |
|---|---|---|
| `--preloader-blade` | `green-600` | `green-300` |
| `--preloader-blade-deep` | `green-800` | `green-600` |
| `--preloader-mower` | `ink` | `ink` |
| `--preloader-mower-accent` | `green-600` | `leaf-400` |

Not an inversion: the greens lighten so they read against near-black, and the pair keeps the same relationship, with the deeper green still sitting behind the lighter one. The ground line, the wheel spokes, the tagline and the logo plate were already on theme tokens and needed nothing.

**Files:** `app/layout.tsx`, `app/globals.css`, `components/preloader/Preloader.module.css`, `components/preloader/Preloader.tsx` (comment), `CLAUDE.md`.

**Verified:** two consecutive reloads both arm the overlay (`data-preloader="active"` on both); in the dark theme the tokens resolve to `#a8c98d` and `#3f7f35` on a `#08150c` canvas, and the scene was checked by eye mid-animation in both themes. `npm run check` passes.

**Pending follow-up**

- The client has supplied a Lawn Preloader design at `claude.ai/design` (project `b0e1b9d6`, file `Lawn Preloader.dc.html`) to replace this scene. DesignSync has no authorization in this session; it needs `/design-login` run once from an interactive Claude Code terminal on this machine. The every-reload behaviour and the theme tokens above carry over to whatever replaces the current SVG.

### 13:40 IST: The client's Lawn Preloader composition ported in

The hand-drawn SVG preloader is replaced by the client's own composition from Claude Design, project `b0e1b9d6`, file `Lawn Preloader.dc.html`.

**What was imported.** The design is a five second cinematic loop in five scenes: Dawn, Growth, Lush, Mow, Settle. A dense procedural lawn in three depth bands rises out of the turf, stands and sways, and a detailed mower glides in from the left cutting it, throwing clippings, before the lawn settles clean again.

**What was ported, and what was not.**

| File in the design | Here |
|---|---|
| `LawnPreloader.jsx` | `components/preloader/LawnScene.tsx` and `lawn-scene.ts` |
| `animations-v3.jsx` (clock, easing, tweens) | Four functions in `lawn-scene.ts`, plus one rAF loop in `Preloader.tsx` |
| `tweaks-panel.jsx` (editor sliders) | Not ported. Its saved values are the `TWEAKS` constants |
| `support.js` (the `<x-dc>` page loader) | Not ported. The Next component boundary replaces it |

The design tool's runtime is an authoring harness, so none of it ships. What ships is the composition: the same geometry, the same choreography, the same numbers.

**Design decisions taken during the port.**

- **The scene stays a pure function of authored time.** `LawnScene` reads no clock, holds no state and has no effect. `Preloader.tsx` owns one request-animation-frame loop and passes `t` down, which is what let the whole sequence be stepped through frame by frame in review.
- **The field is seeded, not random.** Blades, turf, clippings and motes all come from a seeded generator, so the server and the client build byte-identical geometry.
- **The design loops; a preloader cannot.** The authored five seconds are played through once, warped rather than scaled (see the 14:10 entry below for why).
- **Two palettes, not one.** The design is a warm dawn on a cream sky, which is right in the light theme and wrong in the dark one. `DAWN` is the design exactly as saved. `DUSK` is the same lawn after sundown: the sky darkens toward the top instead of the horizon, the sun becomes a cool moon, the wash goes blue and the grass keeps its root-to-tip relationship while shifting down to separate against near-black. The mower is deliberately not themed, because it is the same machine at either hour and the light on it comes from the wash and vignette laid over the frame.
- **The palette is chosen through `useSyncExternalStore`** on `data-theme`, with a `null` server snapshot. The scene is therefore absent from the server HTML rather than rendered in the wrong palette and corrected a frame later, and there is no hydration mismatch and no setState in an effect.
- **The brand plate is white in both themes.** The scene is deep and busy either way, so the lockup sits on its own plate, which is the rule the header already follows on a deep band.
- **Depth of field is the expensive part.** The three band Gaussian blurs are turned down below 744px or on four cores or fewer, which is the design's own `depthBlur: false` path rather than a new one.

**Cost.** Twenty-four path elements on screen. The static turf mat, nearly six thousand blades of texture, is built once at module scope and joined into twelve paths; only its fills depend on the palette. The 920 animated blades are rebuilt per frame into twelve more.

**Files:** new `components/preloader/lawn-scene.ts` and `components/preloader/LawnScene.tsx`; rewritten `components/preloader/Preloader.tsx` and `Preloader.module.css`; `app/globals.css` (the four `--preloader-*` scene tokens from this morning are gone, replaced by `--preloader-ground`); `CLAUDE.md`.

**Verified:** stepped through the arc at a temporarily slowed `RUN_MS` and confirmed each scene in turn: grass rising, the lawn dense and standing, the mower crossing with cut turf behind it, the settled lawn. Checked in both themes, with the palette swapping live when `data-theme` changes. At 375px the depth blur drops to the design's low setting, the scene crops rather than letterboxes, and there is no horizontal overflow. No console errors, no long tasks recorded across the load, the overlay returns to `display: none` and the attribute is cleared after the run. `npm run check` and `npm run build` pass.

**Pending follow-up**

- `RUN_MS` is the one number to change if the client wants the full authored five seconds rather than the compressed 2.6.
- The design ships `shots/a.png` and `shots/b.png` as reference frames. They were not imported; nothing on the site needs them.

### 14:10 IST: Preloader re-timed so the mower reads

Review: the grass cutter crossed far too fast.

The cause was uniform compression. The whole five second timeline was being squeezed into 2600ms, so everything ran at about 1.9x, and the mower covered nearly two screen widths in 1.3 seconds. It read as a machine being yanked across the frame rather than mowing.

Fixed by warping the timeline instead of scaling it. Per-section re-timing is part of the design tool's own model, so this keeps the composition honest: the mower plays close to the speed it was authored at, and the beats on either side stay brisk.

```ts
// lawn-scene.ts
export const TIMELINE = [
  { until: 2.18, ms: 850 },   // dawn, and the grass rising
  { until: 4.72, ms: 2100 },  // the mower's full travel
  { until: 5.0,  ms: 250 },   // clippings settling
];
```

The boundaries are the mower's own travel window rather than the scene names, because its glide starts before the Mow cue and finishes inside Settle.

| | Before | After |
|---|---|---|
| Mower travel | 1321ms | 2100ms |
| Whole arc | 2600ms | 3200ms |
| On screen, including fade | 3060ms | 3660ms |

The mower is 59 percent slower for 600ms more on screen. `authoredTime()` maps elapsed milliseconds through the warp and `wallTime()` inverts it, which is what cues the brand plate, so nothing outside the scene needs to know the pacing. Everything inside the scene is still keyed to authored time, so the clippings, the sway, the wheel roll and the engine bob all slowed with the mower automatically.

**Files:** `components/preloader/lawn-scene.ts`, `components/preloader/Preloader.tsx`, `CLAUDE.md`.

**Verified:** pacing arithmetic checked against the table, the arc watched through on reload in the light theme, `npm run check` and `npm run build` pass.

**To re-tune:** change the middle number in `TIMELINE`. It is the only one that affects how the machine reads.

### 15:20 IST: Preloader plate removed, stale image cache cleared, brand wall live

Three things from review.

#### 1. The logo plate is off the preloader

The white plate carrying the lockup and the tagline covered the middle of the frame the composition had been built to deliver. It is gone, and the preloader is now the scene alone. The header shows the mark a moment later anyway.

`wallTime()` in `lawn-scene.ts` existed only to cue that plate, so it went with it rather than being left as dead code.

#### 2. "This image is old" was a cache, not a file

`public/images/about-preview.webp` on disk was already the new photograph: an Indian gardener on a terrace with rooftops and a temple dome behind. What was being served was a stale rendition out of Next's image optimiser cache, which is keyed on the URL and the URL had not changed.

Cleared `.next/cache/images`. A production deploy writes a fresh `.next`, so this only bites in a long-running dev server. **If an image looks stale in dev after replacing a source file, that is where to look first.**

#### 3. All twenty regenerated images checked, and the alt text caught up

Every category and every featured product now has a photograph; those were already wired up. What had not caught up was the alt text on the four hand-tool categories that were reshot, which still described the previous frames:

| Slot | Was | Now |
|---|---|---|
| `category-digging-tools` | a spade and digging fork standing upright | a spade, a phawda and a gaiti resting in turned soil at a plot edge |
| `category-pruning-tools` | secateurs and loppers beside a pruned shrub | secateurs, branch cutter, hedge shears and a daranti against a clipped hedge in flower |
| `category-watering-tools` | a watering can beside a bed of seedlings | a watering can, a wall-mounted hose reel and a rotating sprinkler on a wet terrace |
| `category-hand-tools` | trowel, fork and weeder beside potted herbs | trowel, cultivator, weeder and dibber beside terracotta pots |

`about-preview` alt now names the terrace and the rooftops. The nine machinery categories and the four new products were generated from the manifest's own draft alt text, so those already matched.

Home still shows the same five featured categories plus the machinery teaser: the composition was approved that way, and featuring all fourteen would turn that section into a wall. The nine machinery photographs appear on the Products page and on each category page.

#### 4. The brand wall is live, and it is a brand wall

Five marks supplied: STIHL, Falcon Garden Tools, Concorde, Milan and Kamlesh Lawn Mowers.

**They are manufacturers, not customers.** The old site files them under `images/clients/`, but STIHL makes power tools and Falcon, Concorde, Milan and Kamlesh are Indian garden tool and lawn mower makers. Presenting STIHL as a client of a garden tools dealer would be an obvious error to anyone in the trade. They are presented as the brands stocked, under "Brands we stock" and "The Names Behind the Range", which is true and is the stronger claim: carrying those names is what a serious dealer is judged on.

Handling, because these are third-party trademarks:

- `npm run images` copies everything in `gardening images/clients/` **byte for byte**. No resize, no re-encode, no crop, no trim.
- The wall serves them `unoptimized`, so the exact supplied file reaches the browser. The optimiser had been emitting a 100px rendition of a 160px original, which the cell then scaled back up.
- Each mark sits on a white cell in both themes, contained, capped at 130px wide, in its own colours. No greyscale filter: a trademark is placed, not treated.

`ClientLogo` became `BrandMark` and `ClientLogoWall` became `BrandWall`, so the code says what it means.

**Files:** `components/preloader/Preloader.tsx`, `Preloader.module.css`, `lawn-scene.ts`, `scripts/process-images.mjs`, `types/content.ts`, `data/clients.ts`, `data/productCategories.ts`, `data/home.ts`, `data/about.ts`, `data/variants/{cinematic,botanical}.ts`, `components/clients/sections.tsx`, `app/clients/page.tsx`, `resources/image-generation.md`.

**Verified:** `npm run check` and `npm run build` pass. Checked against a fresh production build rather than the dev server, which had gone stale: the brand wall renders five marks, none broken, each at 160px natural served from `/images/clients/` and drawn at 130px, no console errors. The preloader overlay now has a single child, no logo and no tagline.

**Pending follow-up**

- The long-running dev server on port 3000 is holding a stale module graph and its HMR socket is dead. It needs restarting to pick up today's renames.
- Customer logos and permissioned testimonials are still outstanding. They are a separate list from `brandMarks`, not an addition to it.
- Worth asking the client whether any of the five brands restricts how its mark may be displayed; several manufacturers publish brand guidelines for dealers.

### 16:35 IST: Products navigation is a dropdown

Clicking Products in the header used to go straight to `/products`. It now opens a small menu, the way the client's existing site does.

```text
Products ˅
──────────────
All Products        -> /products
Hand Tools          -> /products/hand-tools
Digging Tools       -> /products/digging-tools
...fourteen categories, in catalogue order
```

**Data driven, and the data stays on the server.** `getProductNavLinks()` in `lib/catalogue.ts` returns all fourteen categories as labels and hrefs. `app/layout.tsx` is a server component, so it resolves them and passes them into `Header`, which hands them to `ProductsMenu` and `MobileMenu`. All three of those are client components, and the project rule is that the catalogue never crosses a `"use client"` boundary. The alternative, retyping fourteen category names into `data/navigation.ts`, would have drifted the first time one was renamed.

One header serves every page and all five Home variants, so the menu is defined once. Nothing was duplicated per variant.

**A disclosure, not a menu.** Button with `aria-expanded` and `aria-controls` over a plain list of links, rather than `role="menu"`. The menu role promises application-menu semantics that would hide the links from the document, remove them from the Tab order and make arrow keys the only way through. Arrow keys, Home and End are added on top as a convenience: ArrowDown from the trigger opens and focuses the first item, focus wraps, Escape closes and returns focus to the trigger, an outside pointerdown closes, and Tab just leaves.

**Two interaction details worth recording.**

1. *Hover opened it, then the click closed it again.* Hovering set it open, and the click that naturally follows toggled it straight back shut, which reads as a menu refusing to open. A `openedByHover` ref now makes the first click after a hover-open a no-op and the second one close it.
2. *`requestAnimationFrame` dropped the keyboard focus move.* Focusing the first link after an ArrowDown open was scheduled in a frame callback, and a throttled or unpainted tab never ran it. It is an effect keyed on `open` now, which runs after the commit that mounts the panel and cannot be skipped.

**Mobile** does not reuse the hover menu. The Products row in the existing sheet became a button that expands a nested, indented list in place, with the same fifteen destinations and the same `aria-expanded` wiring. It collapses when the sheet navigates.

**Design.** 240px single column, existing radius, hairline, shadow and type scale, `All Products` pinned at the top above a hairline, 180ms fade with 6px of travel. Absolutely positioned, so opening it never shifts the header or the page, and it caps at `min(70vh, 32rem)` with internal scroll so a short viewport cannot clip it.

**Files:** `components/layout/ProductsMenu.tsx` (new), `components/layout/Header.tsx`, `components/layout/MobileMenu.tsx`, `app/layout.tsx`, `lib/catalogue.ts`, `CLAUDE.md`.

**Verified** against a production build at 1280x820 and 375x812:

- Trigger is a `button`, not a link, and no longer navigates.
- Panel lists fifteen destinations: All Products plus the fourteen real categories, every href matching its slug.
- 240 x 512px panel, bottom at 570px in an 820px viewport, no clipping and no layout shift.
- Click opens and closes. Escape closes and returns focus to the trigger. Outside pointerdown closes.
- ArrowDown opens and focuses All Products, ArrowDown steps to Hand Tools, End jumps to Irrigation, ArrowDown from there wraps back to All Products.
- Mobile sheet expands fifteen items in place, no horizontal overflow.
- Variant 1 shows the same dropdown, confirming every variant inherits it.
- On `/products/lawn-mowers` the trigger carries `aria-current="page"`.
- `npm run check` and `npm run build` pass.

**Note:** the browser pane collapsed to zero width partway through testing, which made `innerWidth` 0 and put the header nav below the `sm` breakpoint, so it was `display: none` and clicks did nothing. Worth recognising quickly: set an explicit viewport before testing a breakpoint-dependent component.

### 17:30 IST: Products dropdown rebuilt in the client's own vocabulary

Three things were wrong with the first version, all raised in review.

#### 1. Our names instead of theirs

The menu was listing labels I had derived: Hand Tools, Digging Tools, Pruning Tools, Watering Tools. The client's own menu does not say any of that. `data/productMenu.ts` now holds their list, in their order and with their grouping:

```text
All Products
Lawn Mowers            > Wheel Type Manual, Rotary Type Electric, Roller Type
                         Electric, Roller Type Petrol, Zero Cut, Battery Mowers
Brush Cutters
Branch Cutters
Chain Saws
Hedge Trimmers
Hedge Shears
Mist Blowers & Sprayers
Blowers
Sprinklers
Spray Pumps
Planters & Stands
Cutting & Pruning
Hand Tools
Watering Solutions     > Garden Pipes, Watering Cans, Hose Reels, Self Coiling Hose
Pesticides & Fertilisers
Fountain Nozzles
Garden Solar Lights
```

Three of our categories are not in their menu at all (digging, tillers, garden utility). They are appended so every page the site has stays reachable from the navigation.

**The menu is a vocabulary layer over the existing routes.** Several of the client's entries are different counter names for the same part of the range: branch cutters, hedge shears and cutting tools all live under Pruning & Cutting. So `label` is what the visitor reads and `slug` is what routes, and `getProductMenu()` resolves every slug against the catalogue, which means a typo in the menu fails the build instead of shipping a dead link. Child entries land on the parent category page at its range list, which is where that exact product type is named.

Category names dropped our invented "Tools" suffix where the client's terminology gives a better one: "Watering Tools" became **Watering Solutions** (title and short title), "Digging Tools" became **Digging & Soil**, "Pruning Tools" became **Cutting & Pruning**. **Hand Tools** is kept, because that is the client's own menu entry and the trade name; flag if it should change too.

#### 2. The scrollbar, and Lenis eating the wheel

The panel had `max-h-[min(70vh,32rem)]` with `overflow-y: auto`. Two problems in one: a scrollbar running down a premium menu, and scrolling over the panel moved the page instead of the list, because Lenis takes the wheel globally and an inner scroll container has to opt out of it.

Fixed by removing the constraint rather than by opting out. The panel is now exactly as tall as its contents, 703px on the full menu, which leaves it at 761px in a 900px viewport. No max height, no overflow, no scrollbar, nothing for Lenis to fight. It closes on page scroll instead, which is the honest behaviour for a menu hanging off a fixed header over a moving page.

Rows tightened from 40px to 32px and the panel from 240px to 224px wide to buy that height back.

#### 3. The client's second level was missing

Lawn Mowers and Watering Solutions now open a flyout to the right, as theirs do. It is an enhancement and never the only route: the parent row is itself a link to the same range, so nothing in the menu is reachable by hover alone, and the mobile sheet indents the same children one step further rather than flying anything out.

**Files:** `data/productMenu.ts` (new), `lib/catalogue.ts`, `types/content.ts`, `components/layout/ProductsMenu.tsx`, `components/layout/Header.tsx`, `components/layout/MobileMenu.tsx`, `app/layout.tsx`, `data/productCategories.ts`, `CLAUDE.md`.

**Verified** against a production build at 1440x900 and 375x812:

- 21 entries in the client's names and order, every href resolving to a real category page.
- `overflow-y: visible`, `max-height: none`, `scrollHeight === clientHeight`. No scrollbar, nothing scrollable.
- Panel 703px tall, bottom at 761px in a 900px viewport.
- Hovering Lawn Mowers opens the flyout with all six mower types, each to `/products/lawn-mowers#range`.
- Page scroll closes the menu.
- Mobile sheet lists 21 entries plus 10 nested children, no horizontal overflow.
- `npm run check` and `npm run build` pass.

Featured product cards and the botanical garden-scene markers carried the old category labels as display text; those were realigned too, so nothing on the site still says Watering Tools, Pruning Tools or Digging Tools.

**Pending follow-up**

- The menu now carries more names than the site has pages, by design. If the client wants a page per menu entry, that is a catalogue restructure (roughly 17 categories instead of 14) with new copy and new photography slugs, not a navigation change.
- On a viewport shorter than about 790px the open panel reaches the bottom edge. That matches the reference site, which does the same, but say so if it should cap and scroll after all.

### 18:45 IST: The range is the client's, every product has a page, and the menu travels with the page

Four things from review, and a fifth that arrived while they were being built.

#### 1. Release flags: Home and the variants only

`config/pageVisibility.ts` now opens Home and all five variants in production and closes everything else.

Verified against a production build and server, not a dev one, which matters because the flags only bind when `NEXT_PUBLIC_APP_ENV=production`:

```text
/  /variant1  /variant3  /variant5   -> 200
/about  /products  /clients  /contact -> 404
/products/garden-solar-lights         -> 404
sitemap                               -> Home only
```

#### 2. The dropdown travels with the page

It used to close on scroll, which meant a menu taller than the viewport had items you could never reach. It now stays open and scrolls with the content, as the client's own menu does.

The panel is **portalled to `document.body` and positioned in document coordinates**, measured off the trigger before it opens. It had to leave the header to do that: the header is `fixed`, so anything inside it is pinned to the viewport no matter how it is positioned. Consequences handled: the outside-click test now checks the portal as well as the wrapper, the panel carries its own hover handlers, a resize closes it because the measurement is stale, and `createPortal` is guarded because `document` does not exist during the server render.

#### 3. The range is now the client's range

The fourteen categories were mine. They read well and they were wrong: they folded the client's products into headings of my invention, which is why Garden Solar Lights opened a page called Garden Accessories.

`data/productCategories.ts` is now their Products menu, entry for entry: **27 products, each with its own page.** Seventeen top level in their order, and the ten types they nest under Lawn Mowers and Watering Solutions, which carry `parent` and have pages of their own.

Gone, because they are not on the client's counter list: Digging & Soil, Tillers & Cultivators, Garden Utility. Digging tools were not lost, they moved inside **Hand Tools** where the client keeps them, phawda and kudali included.

The detail component renders three shapes from the same data and branches on none of them by slug: a range shows its types as cards, a type shows its parent in the breadcrumb and its siblings as related, a plain product shows neither.

The menu is no longer a hand-written list. `getProductMenu()` derives it from the catalogue, so adding a product puts it in the menu, the listing, the sitemap and the search index at once. `data/productMenu.ts` was deleted.

#### 4. One image slot per product, and a pending list

Image slots are named after the route now: `product-<slug>`, from `gardening images/product-<slug>.png`. Twelve carried over from the old structure. **Fifteen are pending**, and section 4 of [image-generation.md](resources/image-generation.md) lists exactly which, with a full prompt for each, so they can be generated one at a time:

```text
wheel-type-manual-lawn-mower     roller-type-electric-lawn-mower
roller-type-petrol-lawn-mower    zero-cut-lawn-mower
other-lawn-mowers                branch-cutters
mist-blowers-and-sprayers        sprinklers
plastic-planters-and-stands      garden-pipes
hose-reels                       self-coiling-hose
pesticides-and-fertilisers       fountain-nozzles
garden-solar-lights
```

`npm run images` prints the same list every run. Five images had no product left to sit on and their outputs were deleted; the sources are still in `gardening images/`.

#### 5. Contact map is embedded

Requested in review, replacing the link. It is lazy-loaded, so the third-party frame is not fetched until someone scrolls to it, and the written address above it is still the authority. The keyless `output=embed` endpoint is used, so there is no API key to configure or leak. The link out remains beside it for directions.

**Files:** `config/pageVisibility.ts`, `data/productCategories.ts`, `data/navigation.ts`, `data/clients.ts`, `data/products.ts`, `data/contact.ts`, `data/variants/{botanical,interactive}.ts`, `types/content.ts`, `lib/catalogue.ts`, `components/layout/{ProductsMenu,Header,MobileMenu}.tsx`, `components/products/ProductCategoryDetail.tsx`, `components/sections/CategoryIndex.tsx`, `components/variants/catalogue/CatalogueRange.tsx`, `components/variants/interactive/InteractiveTrust.tsx`, `app/{layout,contact/page}.tsx`, `scripts/process-images.mjs`, `resources/image-generation.md`, `CLAUDE.md`. Deleted `data/productMenu.ts`.

**Verified:** `npm run check` and `npm run build` pass, 45 static pages. Every one of the 27 products returns 200 and is named on the listing page. The dropdown scrolls with the page (panel top moved 58px to -342px on a 400px scroll while staying open) and carries the client's 17 names with the two flyouts. No broken image paths. Release gating confirmed under a real production build.

---

### 19:10 IST: Requirement 21 reference data captured

The next requirement asks for real product data, specifications and multi-image galleries from 25 of the client's own product pages. Those pages turned out to be far richer than the rest of their site, so the first move was to capture them before building anything.

[resources/reference/jivagreens-products.json](resources/reference/jivagreens-products.json) now holds all 25, scraped and structured: body copy, specification tables and every product image path.

What is in there:

- **Real model numbers and specifications.** The rotary electric mowers are KR 30, KR 35 and KR 40, with motor ratings, cutting widths, cable lengths, weights and grass box capacities. Wheel-type manual mowers come in 12, 14, 16 and 18 inch with weights from 22 to 25 kg. Roller electrics in 14, 18 and 24 inch with motor and weight per size. Eight specification tables in total.
- **Real brand and product names.** Kamlesh for the mowers, STIHL for the brush cutters, chain saws, hedge trimmers and mist blowers, STIGA for the blowers, with their own published descriptions and power outputs.
- **Around 430 product image references** across the range: 110 on Hand Tools, 56 on Sprinklers, 30 each on Hedge Shears and Spray Pumps, and multiple angles for most machines.

**This is a phase of work, not a change**, so it has not been started: a data model carrying variants, specifications and an image array; roughly 150 images to pull, process and check; an ecommerce-style gallery with thumbnails, lightbox, keyboard and touch; and the detail page rebuilt around them. The capture above is what it will be built from, and it means the build does not depend on the client's site staying up.

**Pending follow-up**

- Requirement 21 itself: product data, specifications, variants and the multi-image gallery.
- Decide with the client whether STIHL, STIGA and Kamlesh product copy may be reproduced. The captured text is theirs, not the client's, and the brand wall already raised the same question.
- The 15 pending product photographs. Some may not be needed once the real product images from the reference pages are in.

### 20:05 IST: The client's real product photographs, fetched and live

Requirement 21 asked for real product data from 25 of the client's own product pages. The photographs are the first part of that, and they are in.

**217 photographs, 25 pages, no failures.** Two things had to be got right to fetch them cleanly:

1. **Every page carries a related-products strip**, so an image sitting on several pages is somebody else's product. Only images unique to a page are treated as belonging to it.
2. **The site serves a `-t` thumbnail and links the full size behind it.** The full size is what was taken; the thumbnail is the fallback for pages that never link one.

What arrived: mostly 800 x 533 and 783 x 588, 13.2 MB of JPEG. Fifty-one are under 600px wide. That is catalogue photography rather than hero photography, and it is sized for a gallery, not for a full-bleed band.

**Seven products have no photograph on the client's own site**, only the placeholder their template ships: roller type petrol lawn mower, zero cut lawn mower, other lawn mowers, garden pipes, hose reels, self coiling hose, pesticides and fertilisers. Those stay on the pending generation list in the image manifest.

**Pipeline.** `npm run images` gained a product pass: anything in `gardening images/products/<slug>/` is written to `public/images/products/<slug>/NN.webp` at 800 x 600, **contained on white and never enlarged**. Contained rather than cover-cropped because half of these are portrait or panoramic and a common crop would cut the product in half, and not enlarged because the sources top out around 800px.

**Wiring.** `data/productGallery.ts` is generated from what lands in `public/images/products/`, and `getGallery()` in `lib/catalogue.ts` puts the commissioned garden photograph first and the catalogue shots after it. The detail page already had `ProductGallery`, so no new component was needed: eighteen products now show a real multi-image gallery, capped at eight in the set.

Generated data is kept out of `data/productCategories.ts`, which is written by hand. Mixing them would make it impossible to regenerate either one safely.

**Files:** `data/productGallery.ts` (new, generated), `lib/catalogue.ts`, `components/products/ProductCategoryDetail.tsx`, `scripts/process-images.mjs`.

**Verified:** `npm run check` and `npm run build` pass, 45 pages. Chain Saws and Hand Tools render eight gallery images, Wheel Type Manual Lawn Mower renders three.

**Pending follow-up**

- **Alt text is provisional.** Every line names the product and its position in the set, which is true but thin, and it was written without looking at 217 photographs. It needs a pass by someone who has.
- **Rights.** Most of this is manufacturer photography: STIHL, STIGA and Kamlesh product shots that sit on the client's site. The brand wall raised the same question and it is still open. Worth settling before launch, for the photographs and for the product copy.
- The rest of requirement 21: specifications from the eight captured tables, variants, and the ecommerce-style gallery with lightbox and touch.


---

## 2026-09-20

### 17:08 IST: Enquiry form delivers through FormSubmit, recipient from the environment

**Work completed**

- **Delivery.** `EnquiryForm` now posts the enquiry as JSON to FormSubmit's AJAX endpoint, `https://formsubmit.co/ajax/<target>`. No route, no server action, no SMTP credential, so the site stays static.
- **Recipient from the environment.** New variable `NEXT_PUBLIC_FORMSUBMIT_EMAIL`, parsed and validated in `config/env.ts`, which also exports the assembled `formSubmitEndpoint`. It accepts either the recipient address or the token FormSubmit issues after activation, and anything that is neither counts as unset.
- **Three honest outcomes.** The form no longer has a single "not connected" message:

  | State | What the visitor sees |
  |---|---|
  | Accepted by FormSubmit | "Enquiry sent", and the fields are cleared |
  | Refused, or the network failed | The enquiry could not be sent, with the typed values kept and the prefilled mail, phone and WhatsApp routes offered |
  | Variable unset | Online submission is not connected, with the same three routes |

- **The submit button actually submits.** `Button` renders `type="button"` by default, so the enquiry button never fired a submit event and the form could only be sent with the Enter key. It now passes `type="submit"`, and it disables itself with `aria-busy` while the request is in flight.
- **Spam and status.** FormSubmit's `_honey` honeypot is included, hidden from people and from assistive technology. `_captcha` is off, which the AJAX endpoint requires, otherwise it answers with a challenge page instead of JSON. `_subject` carries the enquirer's name and `_template: "table"` formats the email. The status block is a live region.
- **Consent line updated** to say enquiries are delivered by email through FormSubmit, because the details now go to a third party.

**Files affected**

`config/env.ts`, `components/forms/EnquiryForm.tsx`, `data/contact.ts`, `.env.example`, `CLAUDE.md`

**Decisions**

- **The token is preferred over the address.** The value is `NEXT_PUBLIC_`, so it is inlined into the browser bundle: an address there is published for scrapers, while the token reaches the same inbox without naming it. Both are accepted and `.env.example` explains why.
- **Field labels, not field names, are sent.** The payload keys are "Your name", "Phone" and so on, so the email reads as a form rather than as a variable dump.
- **A failure keeps the visitor's typing.** Only a confirmed send resets the form.

**Verification**

- `npm run check` and `npm run build` pass; 45 static routes.
- Unset variable, on the dev server: submitting shows "not connected" with the mail and WhatsApp actions.
- Configured, on a production build served locally with a dummy token and `fetch` stubbed in the browser, so nothing reached FormSubmit:
  - success: posts to `https://formsubmit.co/ajax/<token>` with the labelled payload, `_subject`, `_template`, `_captcha` and `_honey`, shows "Enquiry sent" and clears the fields;
  - HTTP 422 and a thrown network error: both show the failure notice, keep the typed values and offer the prefilled mailto and WhatsApp links.
- The build was repeated without the dummy token afterwards, so nothing carries it.

**Pending follow-up**

- Set `NEXT_PUBLIC_FORMSUBMIT_EMAIL` on the deployment and complete FormSubmit's one-time activation: it emails the address a confirmation link, and submissions are held until somebody clicks it. Then swap the address for the token from the FormSubmit dashboard.
- Send one real enquiry after activation to confirm the email arrives and reads well.
- Consider whether the privacy wording needs to name FormSubmit's own data handling when a privacy policy page is written.

### 20:40 IST: Duplicate React key on the Clients section

`Encountered two children with the same key, hand-tools` on Home, from the industry chips.

**Cause.** When the range was restructured, several old slugs collapsed onto `hand-tools`: digging tools, tillers and garden utility all moved inside it. The Nurseries & Growers chip list had been `["hand-tools", "irrigation", "sprayers", "garden-utility"]`, and after the remap both ends of it pointed at the same product. The components key those rows on the slug, so a list naming one product twice became a key collision.

**Fixed in the data.** Nurseries now reads hand tools, planters and stands, sprinklers, spray pumps. Planters and stands is what a nursery actually buys alongside the rest, and its own applications already say so.

**Fixed so it cannot happen again.** `resolveCategories()` in `lib/catalogue.ts` resolves any curated slug list to products, in order, dropping repeats. `getCategoryLinks()` (the footer), `IndustryCard` and `VariantClients` all go through it and key on the resolved product rather than the raw slug. A future rename that collapses two slugs will render one chip instead of breaking the console.

**Swept the rest.** Checked every list in the catalogue that a component uses as a key: the 27 product slugs, and the `items`, `features` and `applications` of each. No other duplicates. The remaining string-keyed renders (paragraphs, features, points) are all within a single product or copy block, where a repeat would be a copy error rather than a structural one.

**Files:** `data/clients.ts`, `lib/catalogue.ts`, `components/cards/IndustryCard.tsx`, `components/variants/shared/VariantClients.tsx`.

**Verified:** `npm run check` and `npm run build` pass. Home, variant 2, Clients and a product page all load with no key warning, six chip lists on Home and none with a duplicate href. The one console line left is a Next.js CSS preload warning, which is framework-level and unrelated.

### 18:21 IST: Next.js audit against the installed documentation, and the optimisations it justified

Requirement 22: audit the codebase against current official Next.js practice, then improve it without rewriting what already works. The audit came first, and most of it came back clean, which is worth recording as plainly as the changes.

**The rule, added first.** `CLAUDE.md` gains a section, "Follow the installed Next.js documentation": read `node_modules/next/dist/docs/` before touching a framework API, treat that copy as the only authority, prefer the framework's own answer to a hand-rolled one, and measure changes rather than assuming them. It is the standing project rule behind the `AGENTS.md` block that `next dev` keeps re-adding. Six new entries were added to the Next.js 16 traps list underneath it, all of them found during this pass.

#### What the audit found clean

Worth stating, because these are the usual sources of trouble and none of them applied here.

- **Images.** No raw `<img>` anywhere. Every `fill` image carries `sizes`. No deprecated `priority`. AVIF ahead of WebP, and `qualities` declared so Next does not coerce them.
- **Fonts.** `next/font` with no Google stylesheet anywhere near it, `display: swap`, and the italic instance correctly left unpreloaded. Checked in the browser: exactly two font files are preloaded and exactly two faces load. Nothing is wasted.
- **Server and client boundaries.** 33 client components, each one justified. The catalogue does not cross a client boundary: the Products page computes its rows on the server and the header resolves the product menu in the layout, exactly as the project rules require.
- **Rendering.** All 45 routes prerender. `generateStaticParams` on the product route, metadata on every page, no stray `dynamic` or `revalidate`, no request-time data fetching to get wrong.
- **Prefetching.** Measured rather than assumed: a cold page load issues no RSC prefetches at all, and opening the products dropdown costs 48 KB across the four top-level nav routes. The 27-item menu does not prefetch 27 payloads. No change needed.

#### The gap: there were no error boundaries at all

No `error.tsx` and no `global-error.tsx` anywhere in `app/`. Any uncaught render error dropped the visitor onto the framework's default screen, with no header, no footer and no way back.

- `app/error.tsx` catches a failure inside a route, with the layout still standing, so the header and footer remain as ways out. Typographic on purpose.
- `app/global-error.tsx` handles a failure of the root layout itself. It supplies its own `html` and `body` and is styled inline from `config/brand.ts`, because at that point the fonts, the design tokens and the theme script are all part of what may have failed. Its home link is a plain anchor: a full document load is likelier to recover than a client navigation through the router that just broke.
- Copy lives in `data/errorPage.ts`, alongside `data/notFound.ts`, per the project rule about where copy goes.
- **Next 16 passes `{ error, retry }`, not `{ error, reset }`.** The old name type-checks as an unused prop and leaves a dead button, which is exactly the class of mistake the new documentation rule exists to prevent.

Verified rather than assumed: a temporary throwing route was added, built, and clicked in a production build. The boundary rendered on-brand with the header intact, and "Try again" recovered the route. The route was then removed.

#### The find: the 404 illustration was in every page

Next.js serialises the `not-found` boundary into the payload of **every** route, so a client-side navigation to a missing page renders without a round trip. The garden path scene is several hundred server-rendered SVG nodes, so a copy of it sat in the HTML of the home page, the products page and every other page on the site.

`components/not-found/LazyGardenPathScene.tsx` loads it through `next/dynamic` with `ssr: false`, leaving a reference in the payload instead of the drawing. The placeholder holds the same 600 by 560 box, written as a utility rather than borrowed from the scene's stylesheet, because importing that CSS module in the wrapper put its class map back on every page and undid most of the saving. `ssr: false` is only legal inside a client component, which is why the wrapper exists.

**An earlier measurement of this was wrong and is corrected here.** A first pass reported 35 to 64 KB per page by measuring the span between the first and last mention of the scene, which swept up unrelated content in between. The true figure, from a stashed before-and-after build, is about 9 KB of HTML per page.

#### Smaller changes

- **The custom cursor is now fetched on demand.** The pointer logic moved to `components/cursor/CursorLayer.tsx`; `CustomCursor` keeps the media query gate and loads the layer dynamically. Confirmed in the browser at 375px: neither the cursor chunk nor the 404 scene chunk is requested at all. For a range aimed at Indian customers, where most traffic is a phone, that matters more than the raw number suggests. The native cursor stays visible until the layer mounts and adds `has-custom-cursor`, so there is never a moment with no pointer.
- **The logo no longer declares `sizes`.** It is a fixed-size image, so `sizes="140px"` made Next treat it as responsive and emit the entire width ladder up to `w=3840`, about 1.4 KB of preload markup on every page, for artwork whose source is 273 pixels wide. Dropping it gives a two-entry 1x and 2x srcset and a 194-byte tag. Checked in the browser that the delivered bitmap is still the full 273 by 89: the optimiser never upscales past the source, so both candidates return the same pixels. Nothing looks different.
- **`images.minimumCacheTTL` raised from the four hour default to seven days.** Every image is a build-time file, so an optimised variant only goes stale when the artwork is replaced. A week is the compromise while photography is still arriving product by product; the comment in `next.config.ts` says to raise it to 31 days once the imagery is final, and how to bust it in the meantime.

#### A correctness fix found on the way

The 404 page's recovery links still pointed at `/#services` and `/#resources`. Both sections had been removed from the Home page, so two of the four ways out of the 404 page scrolled nowhere, and "Resources" contradicted the rule that Clients replaced it. They now point at the interior pages, which exist. Because those pages are released one at a time, `NotFoundView` filters them through `visibleLinks()`, the same filter the header, the footer and the sitemap use, and the secondary button and the whole link block disappear rather than offering a route to a withdrawn page. The meta description was reworded for the same reason: it advertised services and guides that are not on the site.

#### Measured result

A true before-and-after, from stashing the work and rebuilding, rather than comparing across re-split chunks.

| Route | HTML before | HTML after | HTML change | Eager JS change |
|---|---|---|---|---|
| `/` | 332.0 KB | 320.2 KB | -11.8 KB | +6.4 KB |
| `/products` | 146.2 KB | 134.3 KB | -11.9 KB | +6.4 KB |
| `/about` | 159.0 KB | 147.1 KB | -11.9 KB | +6.4 KB |
| `/clients` | 153.0 KB | 141.1 KB | -11.9 KB | +6.4 KB |
| `/contact` | 107.0 KB | 95.1 KB | -11.9 KB | +6.3 KB |

On top of that, 3.9 KB of cursor code is never fetched on a touch device, and 7.7 KB of illustration is never fetched unless someone actually lands on a 404.

The JavaScript went **up** by 6.4 KB a page, and that is the honest cost of the error boundaries: a capability the site did not have before. Isolated, the two code splits were within a kilobyte of neutral on eager JavaScript while taking 9 KB off the HTML, because `next/dynamic` brings its own small runtime. Net for a first-time visitor, the page is about 5 KB lighter and now fails gracefully.

#### Two console warnings, explained rather than silenced

Both were investigated in a production build and neither is a misconfiguration.

- **"font preloaded but not used within a few seconds."** The preloader covers the page for 3200 ms, which pushes first text paint past Chrome's heuristic window. The fonts are correct: two files preloaded, two files fetched, two faces used. The fetch happening during the preloader is arguably ideal, since it uses otherwise dead time.
- **"CSS preloaded but not used."** A 319-byte chunk holding the 404 page's entrance animation, preloaded because the `not-found` boundary is reachable from every route. Harmless, and not worth contorting the code to satisfy a heuristic.

#### Not done, and why

- **`loading.tsx` was deliberately not added.** Every route is prerendered at build time, so there is no loading state to show; the file would be dead weight in every payload for a spinner that can never render. Worth revisiting only if a route ever becomes dynamic.
- **The preloader was left loading eagerly.** It is armed before first paint on every document load, so deferring it would delay the brand moment it exists to deliver, and it sits in the shared layout chunk that a document load fetches anyway. There is no saving to take.

#### The open item worth a decision

First-load JavaScript is about 279 KB gzipped, and the single largest contributor is that the site runs **three animation runtimes**: GSAP with ScrollTrigger (46.6 KB gzipped), Motion (17.8 KB) and Lenis. GSAP drives `Reveal`, which appears in nearly every section including above the fold, so it cannot simply be deferred without reveals failing to fire. Consolidating onto one library is a design decision with visible consequences, not a mechanical optimisation, so it is flagged here rather than taken unilaterally. It is the only remaining change on the list that would move the number significantly.

**Files:** `CLAUDE.md`, `app/error.tsx`, `app/global-error.tsx`, `data/errorPage.ts`, `components/not-found/LazyGardenPathScene.tsx`, `components/not-found/NotFoundView.tsx`, `components/cursor/CursorLayer.tsx`, `components/cursor/CustomCursor.tsx`, `components/layout/Logo.tsx`, `data/notFound.ts`, `next.config.ts`.

**Verified:** `npm run check` and `npm run build` pass, 45 routes prerendered. In a production build: Home, a product page and the 404 all render correctly; the error boundary renders and recovers; at 375px neither deferred chunk is fetched; the logo still delivers its full-resolution bitmap. No em dashes in any new visitor-facing string, no `console.log`, nothing secret staged.
