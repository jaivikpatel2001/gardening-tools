@AGENTS.md

# GreenTools Project Rules

A premium, photography-led **static brand website** for an Indian gardening tools company.

It is **not** e-commerce. No cart, checkout, payment, pricing, wishlist, stock levels, discount badges, commerce filters or shopping accounts, anywhere, ever. Tools are presented editorially, and every conversion path leads to an **enquiry**.

There is **no Blog and no Journal**: no page, no route, no navigation item, no footer link, no sitemap entry. Editorial content lives under **Resources**.

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
| `resources/plan.md` | Project plan, architecture, roadmap and the deviations table |
| `resources/gardening-tools-design.md` | The design system: colours, type, spacing, components |
| `resources/image-generation.md` | Image manifest: slots, dimensions, ratios, alt text, prompts |
| `.env.example` | Every environment variable, documented |

## Architecture

```text
app/            routes, layout, not-found, manifest, robots, sitemap, globals.css,
                icon.svg, favicon.ico, apple-icon.png (the icons are generated)
components/
  layout/       Header, Footer, MobileMenu, ThemeToggle, Logo
  sections/     reusable section shells: CollectionSection, CategoryIndex
  home/         Home page section bindings
  cards/        ToolCategoryCard, ToolShowcaseCard, ServiceCard, ResourceCard,
                TestimonialCard, RangeTeaserCard
  ui/           Button, Container, Section, SectionHeading, Eyebrow, ArrowLink,
                ArrowIcon, ImagePlate, Reveal, MagneticButton, StarRating, NewsletterForm
  motion/       gsap.ts, SmoothScrollProvider, MotionProvider, ParallaxLayer, scroll-controller
  cursor/       CustomCursor, cursor-intent
  floating-actions/  FloatingActions, ScrollToTop, WhatsAppButton
  not-found/    NotFoundView, GardenPathScene, SceneParallax
  decor/        SocialIcons
config/         site.ts (facts about the business), env.ts (validated environment),
                brand.ts (mark geometry and brand colours)
data/           content collections and page copy
hooks/          useMediaQuery, useScrollThreshold
lib/            cn, seo, routes, catalogue, media, whatsapp
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

## Engineering standards

- **SOLID and DRY.** One well-designed component with props, never `CardNew.tsx` beside `Card.tsx`. Similar sections are configurations of one section, not separate components. Extend through composition (`trailing`, `footer`, injected props) before adding variants.
- **Strong TypeScript.** No `any`. Type props, config and content. Reuse the shared types.
- **Data-driven UI.** Repeated structure renders from an array through one component. Copy lives in `data/`, not inside components.
- **Server Components by default.** `"use client"` only where interaction genuinely requires it. Currently: `Header`, `MobileMenu`, `ThemeToggle`, `SmoothScrollProvider`, `MotionProvider`, `Reveal`, `ParallaxLayer`, `MagneticButton`, `NewsletterForm`, `HeroMotion`, `CustomCursor`, `ScrollToTop`, `SceneParallax`. Client components take server-rendered content through `children`, so the bundle carries behaviour, not copy.
- **Keep heavy data off the client.** Anything imported under a `"use client"` boundary ships to the browser. `lib/catalogue.ts` and `data/toolCategories.ts` must never be imported there; `data/navigation.ts` stays light for that reason.
- **Accessibility during construction, not after.** Semantic HTML, keyboard operability, visible focus, labelled inputs, meaningful alt text, AA contrast in both themes, `prefers-reduced-motion` honoured in CSS *and* JS.
- **No debug leftovers.** No stray `console.log`, unused imports, dead code or duplicate logic. CLI scripts in `scripts/` may log their own report.

## Typography

- **Manrope**: headings (h1 to h6), hero and display text, the logo wordmark, category titles in the range index, decorative numerals.
- **Inter**: body copy, navigation, buttons and links, forms, labels, chips, captions and all other UI.
- Both load through `next/font` in `app/layout.tsx` with the exact axes from the brief: Manrope wght 200 to 800; Inter opsz 14 to 32 and wght 100 to 900, upright and italic.
- **Never** add a Google Fonts `@import` or `<link>`. It would download every face a second time and add a render-blocking third-party request.
- Inter italic is a separate instance with `preload: false`, mapped onto `em`, `i`, `cite`, `dfn` and `q` in `globals.css`. Do not merge it back into the main Inter call; that preloads 77 KB on every page for a style the site barely uses.

## Tool range

The site presents one complete range in two groups: **traditional and hand tools** (khurpi, phawda, kudali, gaiti, belcha, sabbal, daranti, kulhadi, tasla and the rest) and **power and garden machinery** (mowers, brush cutters, hedge trimmers, chainsaws, tillers, sprayers, blowers and shredders, irrigation and pumps).

- The range lives in `data/toolCategories.ts`; derived views live in `lib/catalogue.ts`. Components never filter the catalogue themselves.
- Every category must have a genuine gardening or landscaping use. Never add categories to pad the count.
- An Indian tool carries a `localName` alongside its English `name`, rendered as "Khurpi (hand hoe and weeder)".
- A category gets `image` only once it has been photographed, with alt text describing that photograph. Home shows `featured` photographed categories as cards; the complete range index lists every category regardless.

## Indian market

The site targets Indian customers. Use natural Indian English, Indian scenarios (terrace and balcony gardens, kitchen gardens, housing societies, nurseries, farms, resorts, institutions) and Indian conditions (black cotton and laterite soil, monsoon rust, pre-monsoon heat).

Sample data must be Indian and realistic: Indian names, `+91` numbers, `.in` emails, Indian cities and states. Never `John Doe`, `+1 …` or `New York`. Mark placeholder data as placeholder in-file.

Never fabricate regulated identifiers (GSTIN, CIN, licence numbers). Leave them out until the real ones are supplied.

`sharpex.com` and `sharpexindia.com` are **reference only**. Study the product and terminology landscape; never copy content, wording, branding, layout or structure.

## Environment and configuration

- Every variable is documented in `.env.example`. Only that template is committed; every other `.env*` file is gitignored.
- Code reads environment variables only through `config/env.ts`. Never read `process.env` directly anywhere else.
- **Never commit** API keys, passwords, SMTP credentials, private tokens or production secrets, and never put a secret in a `NEXT_PUBLIC_` variable.
- `NEXT_PUBLIC_APP_ENV` must be `production` on the live deployment. Any other value, including unset, makes every page `noindex` and robots.txt disallow-all. This is deliberate, so staging can never be indexed.
- The WhatsApp number comes only from `NEXT_PUBLIC_WHATSAPP_NUMBER`. The floating button renders nothing until it is set.
- The contact form and email delivery are future scope: their variables are documented, not implemented. Do not build them without being asked.

## Images

Source artwork goes in `gardening images/` (gitignored); `npm run images` processes it into `public/images/`. The script skips slots whose source has not arrived yet and lists them. Never hand-edit `public/images/`.

Follow `resources/image-generation.md` exactly. Slots, filenames, dimensions, ratios, composition and negative prompts are fixed. Generate sources at or above the target size; the script never upscales.

**No text, signage, logos or printed slogans inside any photograph.** Several slots sit behind live headings.

**No decorative botanical line-art.** Outline leaves and sprigs behind content were removed in review as unconvincing. Organic detail comes from photography, and any future botanical accent must look real. The 404 scene is a self-contained illustration and the one exception.

## Brand assets and icons

- The sprout mark and brand colours live in `config/brand.ts`, shared by the header logo, the viewport, the web manifest and the icon generator.
- `npm run icons` regenerates `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` and `public/icons/*`. Never hand-edit those outputs.
- Next.js emits the icon `<link>` tags from the `app/` files. Never add `metadata.icons` as well; it would duplicate them.
- The share image is `public/images/og-home.jpg`, JPEG on purpose, referenced once through `lib/seo.ts`.

## Interaction layer

- **Custom cursor** (`components/cursor/`): the leaf is the cursor. It tracks the pointer exactly with its tip on the hotspot; only the trailing dot, which opens into the labelled ring, eases. Never put easing on the element at the hotspot. Mounted only for a fine pointer without reduced motion. Purely visual, `pointer-events: none` and `aria-hidden`. Label an interactive element with `{...cursorIntent("view")}`, never a raw `data-cursor` string. `Button` already sets `click`.
- **Floating actions** (`components/floating-actions/`): scroll-to-top and WhatsApp, bottom right. Move the page through `components/motion/scroll-controller.ts`, never `window.scrollTo`, so Lenis is not fought.
- **404** (`app/not-found.tsx`): an animated SVG garden-path scene using CSS-only ambient motion, with no GSAP. Its recovery links point at Home sections until interior pages exist.

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
