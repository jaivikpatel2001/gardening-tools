# Project Work History

Chronological implementation log for the GreenTools gardening website. Newest entries at the bottom of each day. Times are IST.

See also: [resources/plan.md](resources/plan.md) for the project plan and architecture, and [resources/image-generation.md](resources/image-generation.md) for the image manifest.

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
