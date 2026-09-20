@AGENTS.md

# Jiva Greens Project Rules

A premium, photography-led **static brand website** for **Jiva Greens** (JIVA, "Everything in Gardening"), the trading brand of **Shree Khodiyar Garden Tools**, Ahmedabad. The client's existing site is jivagreens.com.

**Brand facts are real, never placeholder.** Name, legal name, address, phones, email and founding year live in `config/site.ts` and come from the client's own site. Copy reads years and names from `site`, never retyped. Anything the old site does not state (postcode, opening hours, social profiles, customer counts) is left out until the client supplies it, never invented. "GreenTools" was a working placeholder name and must not reappear.

It is **not** e-commerce. No cart, checkout, payment, pricing, wishlist, stock levels, discount badges, commerce filters or shopping accounts, anywhere, ever. Products are presented editorially, and every conversion path leads to an **enquiry**.

## Pages, and what they are called

The site is **Home, About, Products, Product Detail, Clients, Contact**. Nothing else.

- There is **no Blog and no Journal**: no page, no route, no navigation item, no footer link, no sitemap entry.
- There is **no Services page**. Service content is carried contextually as *gardening solutions*, on Home, About, Products and Contact, from `data/solutions.ts`. The solution cards deliberately do not link anywhere.
- There is **no Resources page**. Resources was replaced by **Clients**, the credibility page. Do not reintroduce guides, articles, reading time or a FAQ route.
- The range is called **Products**, never Tools, in navigation, headings, buttons, breadcrumbs, URLs, metadata, page titles and every call to action. "Hand tools" and "cutting tools" stay as product-type names, because that is what the trade calls them.
- **Every product has its own page** at `/products/[slug]`, rendered by one reusable component from `data/productCategories.ts`. Never add a page component for an individual product. Two products are ranges the client nests a level deeper (lawn mowers by type, watering by what is on the end of the hose); those children carry `parent` and have pages of their own. Someone who picks Garden Solar Lights lands on garden solar lights, never on a bucket that contains them.
- **The range is the client's, entry for entry.** `data/productCategories.ts` follows the Products menu on jivagreens.com: their products, their names, their order. Never fold their products into a heading of our own invention, and never add one they do not sell. A fourteen-category structure that read well but was ours was removed in review for exactly that reason.
- **Products in the header opens a dropdown, it does not navigate.** `All Products` inside it goes to `/products`. Everything else is generated from the catalogue by `getProductMenu()`, so the menu cannot drift from the range: adding a product puts it in the menu. It is a plain one-column disclosure with a flyout on the two nested ranges, never a mega menu.

## Project Work History

The project maintains a chronological implementation history in:

`done.md`

Before making major architectural or feature changes, review `done.md` when historical context is relevant.

After completing meaningful work, update `done.md` with:

- Date
- Time (actual local time, never fabricated)
- Work completed
- Relevant files/components
- Important implementation decisions
- Pending follow-up items

Keep `done.md` continuously updated throughout development.

## Content rule: no unnecessary em dashes (strict)

Copy scattered with em dashes reads as machine-written. Do not use the em dash (the "—" character, or `&mdash;`) in website content.

Never use it as a stand-in for a comma, a colon, parentheses, a full stop or an ordinary sentence break. Rewrite the sentence instead.

| Avoid | Prefer |
|---|---|
| Premium gardening tools — built for Indian gardens. | Premium gardening tools built for Indian gardens. |
| Premium gardening tools — built for Indian gardens. | Premium gardening tools, built for Indian gardens. |

The only exception is a sentence where English grammar or meaning genuinely requires one. Making marketing copy sound sophisticated never qualifies.

The rule covers headings, subheadings, paragraphs, tool, product and service descriptions, cards, CTAs, testimonials, FAQs, image alt text, SEO content, page titles and metadata, and all future generated content. Hyphens, and en dashes in ranges such as "Mon–Sat", are unaffected.

Before finishing any content change, scan the visitor-facing strings in `app/`, `components/`, `data/`, `config/` and `lib/` for the em dash.

## Key documents

| File | What it holds |
|---|---|
| `done.md` | Chronological work log |
| `resources/plan.md` | Project plan, architecture, roadmap, deviations, page visibility |
| `resources/section-parity.md` | The twelve homepage sections, and where each one lives in each variant |
| `resources/gardening-tools-design.md` | The design system: colours, type, spacing, components |
| `resources/image-generation.md` | Image manifest: a slot and a prompt per product, plus the pending list |
| `resources/reference/jivagreens-products.json` | The client's own product pages, captured: copy, spec tables and image paths |
| `.env.example` | Every environment variable, documented |

## Architecture

```text
app/            routes, layout, not-found, error, global-error, manifest, robots,
                sitemap, globals.css,
                icon.svg, favicon.ico, apple-icon.png (the icons are generated)
components/
  layout/       Header, Footer, MobileMenu, ProductsMenu, ThemeToggle, Logo
  sections/     reusable section shells: CollectionSection, CategoryIndex,
                PageHero, Breadcrumbs, CtaBand, HighlightsBand
  home/         Home page section bindings
  about/        About page sections (one file)
  clients/      Clients page sections (one file)
  products/     ProductCatalogue, ProductListCard, ProductGallery,
                ProductCategoryDetail
  forms/        EnquiryForm
  preloader/    Preloader
  cards/        ProductCategoryCard, ProductShowcaseCard, SolutionCard,
                IndustryCard, TestimonialCard, RangeTeaserCard
  ui/           Button, Container, Section, SectionHeading, Eyebrow, ArrowLink,
                ArrowIcon, ImagePlate, Reveal, MagneticButton, StarRating
  motion/       gsap.ts, SmoothScrollProvider, MotionProvider, ParallaxLayer, scroll-controller
  cursor/       CustomCursor, cursor-intent
  floating-actions/  FloatingActions, ScrollToTop, WhatsAppButton
  not-found/    NotFoundView, GardenPathScene, SceneParallax
  decor/        SocialIcons, SocialLinks
config/         site.ts (facts about the business), env.ts (validated environment),
                brand.ts (mark geometry and brand colours),
                pageVisibility.ts (the production release switchboard)
data/           content collections and page copy
hooks/          useMediaQuery, useScrollThreshold
lib/            cn, seo, routes, catalogue, highlights, media, whatsapp, social,
                visibility (page flags), page-guard (route enforcement)
proxy.ts        edge-level enforcement of page visibility
types/          shared content domain types
scripts/        process-images.mjs, generate-icons.mjs
public/images/  generated output, never hand-edited
public/icons/   generated output, never hand-edited
```

- `config/` holds facts and configuration; `data/` holds content that marketing changes. Keep them apart.
- Components import types from `types/`, never content from `data/`. Section bindings in `components/home/` are the only place data meets components.
- Build every internal URL through `lib/routes.ts`.
- Every section's content sits in `container-page` (the `Container` component): a 1400px content cap with 16, 24 and 32px gutters. Backgrounds and full-bleed photographic bands may run edge to edge; the hero's photograph stays inside the container.
- Before writing a new component, check `components/ui/`, `components/cards/` and `components/sections/`. The odds are it exists.
- Interior pages open with `PageHero` and close with `CtaBand`. Neither gets a second version.

## Engineering standards

- **SOLID and DRY.** One well-designed component with props, never `CardNew.tsx` beside `Card.tsx`. Similar sections are configurations of one section, not separate components. Extend through composition (`trailing`, `footer`, injected props) before adding variants.
- **Strong TypeScript.** No `any`. Type props, config and content. Reuse the shared types.
- **Data-driven UI.** Repeated structure renders from an array through one component. Copy lives in `data/`, not inside components.
- **Server Components by default.** `"use client"` only where interaction genuinely requires it. Currently: `Header`, `MobileMenu`, `ThemeToggle`, `SmoothScrollProvider`, `MotionProvider`, `Reveal`, `ParallaxLayer`, `MagneticButton`, `EnquiryForm`, `ProductCatalogue`, `ProductGallery`, `Preloader`, `HeroMotion`, `CustomCursor`, `CursorLayer`, `LazyGardenPathScene`, `RouteError`, `GlobalError`, `ScrollToTop`, `SceneParallax`. Client components take server-rendered content through `children`, so the bundle carries behaviour, not copy.
- **Keep heavy data off the client.** Anything imported under a `"use client"` boundary ships to the browser. `lib/catalogue.ts` and `data/productCategories.ts` must never be imported there; `data/navigation.ts` stays light for that reason.
- **The Products menu is the worked example of that rule.** `app/layout.tsx` is a server component, so it calls `getProductNavLinks()` and passes the result into `Header`, which passes it on to `ProductsMenu` and `MobileMenu`. Those three are client components and must keep taking the links as a prop. Never solve a future version of this by copying category names into `data/navigation.ts`: that would drift the moment a category is renamed.
- **Accessibility during construction, not after.** Semantic HTML, keyboard operability, visible focus, labelled inputs, meaningful alt text, AA contrast in both themes, `prefers-reduced-motion` honoured in CSS *and* JS.
- **No debug leftovers.** No stray `console.log`, unused imports, dead code or duplicate logic. CLI scripts in `scripts/` may log their own report.

## Typography

- **Manrope**: headings (h1 to h6), hero and display text, the logo wordmark, category titles in the range index, decorative numerals.
- **Inter**: body copy, navigation, buttons and links, forms, labels, chips, captions and all other UI.
- Both load through `next/font` in `app/layout.tsx` with the exact axes from the brief: Manrope wght 200 to 800; Inter opsz 14 to 32 and wght 100 to 900, upright and italic.
- **Never** add a Google Fonts `@import` or `<link>`. It would download every face a second time and add a render-blocking third-party request.
- Inter italic is a separate instance with `preload: false`, mapped onto `em`, `i`, `cite`, `dfn` and `q` in `globals.css`. Do not merge it back into the main Inter call; that preloads 77 KB on every page for a style the site barely uses.

## Product range

The site presents one complete range in two groups: **traditional and hand tools** (khurpi, phawda, kudali, gaiti, belcha, sabbal, daranti, kulhadi, tasla and the rest) and **power and garden machinery** (mowers, brush cutters, hedge trimmers, chainsaws, tillers, sprayers, blowers and shredders, irrigation and pumps).

- The range lives in `data/productCategories.ts`; derived views live in `lib/catalogue.ts`. Components never filter the catalogue themselves. The Products page computes its rows on the server and hands the client browser plain values, so the catalogue never crosses a `"use client"` boundary.
- Every category must have a genuine gardening or landscaping use, and must be something the client actually sells. Never add categories to pad the count.
- **Never invent a product.** No product name, model, model number, SKU, variant, measurement, capacity or specification that the client has not supplied. A category's `features` and `applications` describe the category; they are not a data sheet. Where a real number is needed, derive it from the catalogue (`getRangeCounts`), never type it.
- An Indian tool carries a `localName` alongside its English `name`, rendered as "Khurpi (hand hoe and weeder)".
- A category gets `image` only once it has been photographed, with alt text describing that photograph. Home shows `featured` photographed categories as cards; the complete range index and the Products page list every category regardless, and an unphotographed category renders a typographic card rather than a placeholder image.

## Page visibility (production release switchboard)

Pages are developed normally and released to the client one at a time. **`config/pageVisibility.ts` is the only file to change to release or withdraw a page.**

- Development and staging serve every implemented page regardless of the flags. Only `NEXT_PUBLIC_APP_ENV=production` enforces them.
- Enforcement is at the route, never in the markup. `proxy.ts` (Next 16's replacement for `middleware.ts`) blocks a withdrawn path at the edge, and every gated route calls `enforcePageVisibility(key)` from `lib/page-guard.ts`, which calls `notFound()` and returns a real 404. Never gate a page with `if (!visible) return null`.
- Nothing else reads `pageVisibility` directly. `lib/visibility.ts` answers the question; `visibleLinks()` filters the header, the mobile sheet and the footer; `app/sitemap.ts` filters the same way; a footer column with nothing left in it renders nothing rather than an empty heading.
- Adding a page means adding a key to `PAGE_KEYS`, a branch to `pageKeyForPath`, a `enforcePageVisibility` call in the route and an entry in `app/sitemap.ts`. Nothing else.
- **Do not overengineer this.** No database, no admin panel, no feature-flag service, no authentication, no API.

## No newsletter, and no invented social profiles

**There is no newsletter.** It was removed from the whole site on the client's instruction: no form, no heading, no email input, no footer panel, no component and no copy. Do not reintroduce a mailing list, a subscribe box or an "updates" signup in any form. The site collects an address in exactly one place, the enquiry form, and only because somebody is asking us a question.

**Social profiles are real or absent.** `site.social` in `config/site.ts` is the only list, and it is empty because jivagreens.com was checked end to end on 20 September 2026 and publishes no social profile at all: the home page's 87 links and the contact page's own set contain not one link to Facebook, Instagram, LinkedIn, YouTube, X or Pinterest.

- **Never invent a handle or a profile URL.** A guessed link sends a customer to a stranger's account, which is worse than no icon. Add an entry only from a URL the client has supplied.
- Everything renders from `getSocialChannels()` in `lib/social.ts`, and `SocialLinks` renders **nothing at all** when that list is empty, heading included. The footer, the Contact page and the mobile sheet all use it, so one entry appears in all three at once, and in the organisation JSON-LD's `sameAs`, with no other edit.
- WhatsApp is in that row but is **not** a profile. It is a phone number from `NEXT_PUBLIC_WHATSAPP_NUMBER`, so it appears only when that variable is set, exactly like the floating button.
- `SocialPlatform` in `types/content.ts` is a closed union. A platform with no mark drawn in `SocialIcons.tsx` cannot be added to it, so a typo fails the build instead of rendering an empty circle on every page.

**Opening hours are not published either.** The client's site does not state them, so the Contact page says so plainly and invites a call rather than printing hours nobody has confirmed.

## Indian market

The site targets Indian customers. Use natural Indian English, Indian scenarios (terrace and balcony gardens, kitchen gardens, housing societies, nurseries, farms, resorts, institutions) and Indian conditions (black cotton and laterite soil, monsoon rust, pre-monsoon heat).

Sample data must be Indian and realistic: Indian names, `+91` numbers, `.in` emails, Indian cities and states. Never `John Doe`, `+1 …` or `New York`. Mark placeholder data as placeholder in-file.

Never fabricate regulated identifiers (GSTIN, CIN, licence numbers). Leave them out until the real ones are supplied.

jivagreens.com is the **client's own site**: its facts, product names and terminology are authoritative. `sharpex.com` and `sharpexindia.com` are **reference only**. Study the product and terminology landscape; never copy content, wording, branding, layout or structure.

## Environment and configuration

- `.env.example` documents **only the variables the code actually reads**. There are four, all `NEXT_PUBLIC_`. Never add a variable for a feature that has not been built: no SMTP, no CMS, no analytics, no captcha, no API keys. They go in when the feature does.
- Only `.env.example` is committed; every other `.env*` file is gitignored.
- Code reads environment variables only through `config/env.ts`. Never read `process.env` directly anywhere else.
- `NEXT_PUBLIC_APP_ENV` does two jobs: indexing, and the page visibility switchboard above.
- **Never commit** API keys, passwords, SMTP credentials, private tokens or production secrets, and never put a secret in a `NEXT_PUBLIC_` variable.
- `NEXT_PUBLIC_APP_ENV` must be `production` on the live deployment. Any other value, including unset, makes every page `noindex` and robots.txt disallow-all. This is deliberate, so staging can never be indexed.
- The WhatsApp number comes only from `NEXT_PUBLIC_WHATSAPP_NUMBER`. The floating button renders nothing until it is set.
- The enquiry form delivers through **FormSubmit** (`https://formsubmit.co/ajax/<target>`), addressed by `NEXT_PUBLIC_FORMSUBMIT_EMAIL`, which holds either the recipient address or, preferably, the FormSubmit token: the value is inlined into the bundle, and the token keeps the address off the page. There is no route, no server action and no SMTP credential. **Never show a success message for a submission that did not leave the browser:** the form says "sent" only when the service accepted it, offers the mail, phone and WhatsApp routes when it refuses, and says delivery is not connected when the variable is unset. Fields are declared in `data/contact.ts` so a future backend can validate against the same list; if delivery moves, only `onSubmit` changes.

## Visual system rules

- **Radius scale only:** `sm` 8, `md` 12, `lg` 18, `xl` 24, `2xl` 32 and `full`, plus `organic` and `arch` (Home and variant 3 only), all defined in `globals.css`. Choose the level by the element's size and role: thumbnail, card, hero media, panel or pill. Never write `rounded-[…]`. Photographs are always rounded. Only full-bleed backgrounds, and plates clipped by an already rounded card, use `radius="none"`.
- **Background rhythm.** A page body has at most one deep band, used where it carries hierarchy. The section directly above the footer is never a deep band. Neighbouring sections never share a surface.
- **Type on photographs** sits on `scrim-caption` (caption blocks) or `photo-chip` (short corner labels), never as bare white text on an unscrimmed image. Keep photographs out from under the transparent header.
- **Colour on bands.** Green on a deep band uses `on-band-accent`, never `brand-soft`. `muted-soft` is for rules, icons and disabled states, never text.
- **Featured products follow the category photo rule.** A product gets `image` only once it has been photographed. `featuredProducts` returns photographed products only.

## Images

Source artwork goes in `gardening images/` (gitignored); `npm run images` processes it into `public/images/`. The script skips slots whose source has not arrived yet and lists them. Never hand-edit `public/images/`.

Follow `resources/image-generation.md` exactly. Slots, filenames, dimensions, ratios, composition and negative prompts are fixed. Generate sources at or above the target size; the script never upscales.

**No text, signage, logos or printed slogans inside any photograph.** Several slots sit behind live headings.

**No decorative botanical line-art.** Outline leaves and sprigs behind content were removed in review as unconvincing. Organic detail comes from photography, and any future botanical accent must look real. The 404 scene is a self-contained illustration and the one exception.

## Brand assets and icons

- The logo is the client's JIVA lockup, `gardening images/jiva-logo.png`, trimmed losslessly into `public/images/brand/` by `npm run images` and described by `BRAND_LOGO` in `config/brand.ts`. Never recolour, redraw or knock it out; on a deep band or in the dark theme it sits on a small white plate.
- Brand colours and the sprout mark in `config/brand.ts` feed the viewport, web manifest and icon generator. The sprout is a stand-in for app icons only, until the client supplies a vector logo.
- `npm run icons` regenerates `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` and `public/icons/*`. Never hand-edit those outputs.
- Next.js emits the icon `<link>` tags from the `app/` files. Never add `metadata.icons` as well; it would duplicate them.
- The share image is `public/images/og-home.jpg`, JPEG on purpose, referenced once through `lib/seo.ts`.
- **Third-party brand marks** (the manufacturers on the Clients page) live in `gardening images/clients/` and are copied **byte for byte** into `public/images/clients/` by `npm run images`: no resize, no re-encode, no crop, no trim. The wall serves them `unoptimized` on a white cell, contained and in their own colours. Never recolour, greyscale, redraw or crop somebody else's trademark. They are brands the business **stocks**, never described as customers.

## Interaction layer

- **Custom cursor** (`components/cursor/`): the leaf is the cursor. It tracks the pointer exactly with its tip on the hotspot; only the trailing dot, which opens into the labelled ring, eases. Never put easing on the element at the hotspot. Mounted only for a fine pointer without reduced motion. Purely visual, `pointer-events: none` and `aria-hidden`. Label an interactive element with `{...cursorIntent("view")}`, never a raw `data-cursor` string. `Button` already sets `click`.
- **Floating actions** (`components/floating-actions/`): scroll-to-top and WhatsApp, bottom right. Move the page through `components/motion/scroll-controller.ts`, never `window.scrollTo`, so Lenis is not fought.
- **Products dropdown** (`components/layout/ProductsMenu.tsx`): the panel is **portalled to the body and positioned in document coordinates**, so it scrolls with the page instead of being pinned to the fixed header. That is what makes a menu taller than the viewport reachable, and it is the behaviour the client's own site has. Do not re-anchor it to the header. **Never give the panel a max height or an inner scrollbar.** It was tried and rejected twice over: a scrollbar down a premium menu, and Lenis swallowing the wheel so the page moved behind the panel instead of the list moving inside it. The panel is exactly as tall as its contents and closes on page scroll instead. A disclosure (button with `aria-expanded` over a list of links), never `role="menu"`. The menu role would hide the links from the document, take Tab away and make arrow keys the only route through; arrow keys are added here on top, not instead. Hover opens it only behind `MEDIA.finePointer`, and a click straight after a hover-open keeps it open rather than toggling it shut. Focus moves into the panel from an effect after the mounting commit, never from `requestAnimationFrame`, which a throttled tab can skip. One header serves every page and every variant, so this is defined once and never duplicated per variant.
- **404** (`app/not-found.tsx`): an animated SVG garden-path scene using CSS-only ambient motion, with no GSAP. Its recovery links point at Home sections until interior pages exist.
- **Preloader** (`components/preloader/`): a lawn grows, a mower crosses and cuts it, the trimmed lawn hands over to the site. **No logo plate over the scene.** One was tried and removed in review: it covered the frame the composition was built to deliver, and the header shows the mark a moment later anyway. The composition is the **client's own**, authored in Claude Design (`Lawn Preloader.dc.html`) and ported in `LawnScene.tsx`; the geometry, choreography and material colours are theirs and should not be redesigned here. None of the design tool's runtime ships: the clock is one request-animation-frame loop in `Preloader.tsx`, the easing and tween helpers are four functions in `lawn-scene.ts`, and the editor panel is replaced by the `TWEAKS` constants holding the values the design was saved with.
- **The scene is a pure function of authored time `t`.** Nothing in `LawnScene.tsx` may read the clock, hold state or use an effect. That is what makes the sequence reproducible and lets it be stepped through frame by frame in review.
- **The field is seeded, never random.** `lawn-scene.ts` builds its blades from a seeded generator so the server and the client agree exactly. Never introduce `Math.random()` there.
- **Preloader timing:** armed before first paint by the script in `app/layout.tsx`, on **every document load**. Every browser reload plays it, and only a reload does, because client-side navigation never re-runs that script. Never make it run on client-side navigation. The authored five second timeline plays once in 3200ms, paced by the `TIMELINE` warp in `lawn-scene.ts` rather than scaled uniformly: the mower keeps close to its authored speed while the beats either side stay brisk. Uniform compression made it read as a machine being yanked across the frame. To re-time, change that table, not the scene. Skipped entirely on reduced motion, on reduced data and without JavaScript.
- **Preloader colour follows the theme.** `lawn-scene.ts` holds two environment palettes, `DAWN` and `DUSK`, chosen from `data-theme` through `useSyncExternalStore` with a `null` server snapshot, so the scene is absent from the server HTML rather than painted in the wrong palette and corrected a frame later. The mower is deliberately **not** themed: it is the same machine at dawn or dusk, and the light on it comes from the wash and the vignette. `--preloader-ground` in `globals.css` is only the colour either side of the scene.
- **Depth of field is the expensive part.** The three band blurs are turned down below 744px or on four cores or fewer. Never remove that fallback.

## Follow the installed Next.js documentation

**This is not the Next.js in your training data.** Before writing or changing anything that touches a framework API, read the relevant guide in `node_modules/next/dist/docs/`. That copy is the version this project actually builds against, so it is the only authority. `AGENTS.md` says the same thing and is re-added by `next dev`; this section is the standing project rule behind it.

- The guides live under `node_modules/next/dist/docs/01-app/`: `01-getting-started/` for the concepts, `03-api-reference/` for components, functions, file conventions and `next.config.ts` options.
- Read it **before** the first line of code, not as a check afterwards. Signatures have changed in ways that still compile: `error.tsx` takes `{ error, retry }` in Next 16, not the `{ error, reset }` most examples show, and a wrong name is a silently dead button rather than a type error.
- The same applies to advice from anywhere else, including previous work in this repository. If a pattern here contradicts the installed docs, the docs win and the pattern is a bug to be fixed.
- Prefer the framework's own answer to a hand-rolled one: a file convention over a custom boundary, `next/image` over `<img>`, `next/font` over an `@import`, `next/dynamic` over a bespoke lazy loader.
- Changes to framework behaviour are measured, not assumed. Build before and after and compare the real numbers, then write what changed and by how much. Several "obvious" optimisations on this project turned out to cost more than they saved.
- The **Next.js 16 traps** below are the ones this project has already been bitten by. Add to that list whenever a new one is found, with the behaviour and the fix.

## Next.js 16 traps

1. `<Image priority>` is deprecated. Use `preload`.
2. `images.qualities` defaults to `[75]`; other values are silently coerced unless declared in `next.config.ts`.
3. `sizes` is required on `fill` and responsive images.
4. There is no `tailwind.config.js`. `@theme` in CSS is the only config surface.
5. `LayoutProps<"/">` and `PageProps<"/route">` are globals, not imports.
6. `themeColor` and `colorScheme` belong in `export const viewport`, not `metadata`.
7. Turbopack is the default; a `webpack` config fails the build.
8. Never set CSS `scroll-behavior: smooth`. Lenis owns scrolling.
9. `params` and `searchParams` are Promises with no synchronous fallback.
10. Spreading a metadata object that contains `title: undefined` wipes the layout's title template. Only include keys that have values.
11. **`not-found.tsx` and `error.tsx` are serialised into the payload of every route**, so a client-side navigation can render them without a round trip. Everything they draw, and everything they import, is weight on every page of the site. Keep both boundaries cheap, and load anything decorative inside them through `next/dynamic`.
12. `error.tsx` and `global-error.tsx` receive `{ error, retry }`. The `reset` in older examples type-checks as an unused prop and leaves a dead button.
13. **A folder whose name starts with `_` is private and is not routed.** `app/__boom/page.tsx` builds cleanly and 404s.
14. `ssr: false` on `next/dynamic` is only legal inside a client component. In a server component it is a build error, so a deferred client component needs a small client wrapper.
15. `sizes` on a **fixed-size** image makes Next treat it as responsive and emit the whole width ladder, up to `w=3840`, in the `srcset` and in the preload tag. Give `width` and `height` and leave `sizes` off; the `sizes` rule in item 3 is about `fill` and genuinely fluid images.
16. The image optimiser never upscales past the source, so a `w=` larger than the artwork simply returns the artwork.

## Tailwind v4 traps

1. **Two competing utilities for the same property are resolved by Tailwind's sort order, not class-string order.** `hidden` loses to `inline-flex`; `text-[…]` loses to `text-on-brand`. Use a variant (`max-lg:hidden`) or a component variant, never an override.
2. **Interpolated class names produce no CSS.** `` rounded-${radius} `` compiles to nothing. Use a lookup map.
3. Breakpoints are overridden to the design system's values: `sm` 744, `md` 900, `lg` 1128, `xl` 1440, `2xl` 1680.
4. A CSS `scale` or `rotate` on the same element as an inline `transform: translate(...)` scales or rotates the translation too. Put positioning and scaling on separate elements.

## Before finishing any piece of work

```bash
npm run check   # tsc --noEmit && eslint
npm run build
```

Then verify responsive behaviour, check for broken image paths, console errors and em dashes in content, confirm nothing secret is staged, and update `done.md`.
