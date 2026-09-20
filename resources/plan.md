# Jiva Greens — Project Plan

**Status:** Phase 2 — full information architecture built, pages released one at a time
**Scope of this phase:** Home, About, Products, Product Detail, Clients, Contact
**Design system:** [gardening-tools-design.md](./gardening-tools-design.md)
**Image manifest:** [image-generation.md](./image-generation.md)

---

## 1. What this is

A premium, photography-led **static corporate brand website** for a gardening tools company.

It is **not** e-commerce. There is no cart, no checkout, no payment, no pricing, no wishlist, no shopping account, and no commerce filtering anywhere in the codebase. Tools are presented editorially — for discovery and education — and every conversion path leads to an **enquiry**, not a transaction.

The Home page is the flagship. It establishes the complete visual language for every page that follows, and is intended to be markedly more refined than the internal pages that come later.

### What the visitor must understand within seconds

1. What the company does
2. That it specialises in gardening tools
3. What kinds of tools are available
4. Why the company can be trusted
5. That expert guidance and services exist
6. Where to learn more
7. How to get in touch

---

## 2. Site hierarchy

```
COMMON HEADER
├── HOME
├── ABOUT
├── PRODUCTS
│   └── PRODUCT CATEGORY DETAIL  /products/[slug]
├── CLIENTS
└── CONTACT
COMMON FOOTER
```

**Blog and Journal are permanently excluded** — no page, no route, no navigation item, no footer link, no sitemap entry.

**Tools is now Products.** The range is called Products everywhere a visitor sees it: navigation, headings, buttons, breadcrumbs, URLs, metadata and every call to action. "Hand tools" and "cutting tools" remain as product-type names, because that is what the trade calls them.

**Services was removed.** The client's own services page is placeholder Latin, and four service cards did not justify a route. The same content is now carried contextually as *gardening solutions*, on Home, on About and on Contact, and each one converts to an enquiry.

**Resources was replaced by Clients.** Editorial guides are gone; credibility is not. `/clients` carries the logo wall, the industries served, the partnership approach and testimonials.

**Release is controlled centrally.** `config/pageVisibility.ts` decides which pages exist in production. See §16.

---

## 3. Technical baseline

| Item | Value |
|---|---|
| Framework | Next.js **16.3.4**, App Router, Turbopack |
| React | 19.2.8 |
| Styling | Tailwind **v4** — CSS-first via `@theme`. **No `tailwind.config.*` exists or should be created.** |
| Language | TypeScript 5.9, `strict: true` |
| Path alias | `@/*` → repo root |
| Animation | GSAP + ScrollTrigger, Lenis, Motion (Framer) |
| Icons | lucide-react |
| Node | 24.x |

### Deviation from the original folder sketch

The brief sketched `src/components/…`. This repo has `app/` at the root and an `@/*` → `./*` alias. Introducing `src/` would mean moving `app/` for no functional gain, so **`components/`, `data/` and `lib/` live at the repo root**. `@/components/ui/Button` resolves identically and the reuse goals are unchanged.

---

## 4. Architecture

```
app/
  layout.tsx           Fonts, metadata, viewport, theme script, JSON-LD, smooth scroll
  page.tsx             Home — server component, composes 12 sections
  globals.css          Design tokens, @theme mapping, base styles, reduced motion
  sitemap.ts
  robots.ts

components/
  layout/    Header  MobileMenu  Footer  ThemeToggle  Logo
  home/      Hero  TrustBar  AboutPreview  ProductCategories  WhyChooseUs
             FeaturedProducts  SolutionsPreview  Highlights
             ClientsPreview  CommunityStory  Testimonials
             FinalCTA  Newsletter
  about/     sections.tsx (introduction, story, mission, values,
             philosophy, capability, Indian focus, solutions)
  clients/   sections.tsx (logo wall, industries, approach, voices)
  products/  ProductCatalogue  ProductListCard  ProductGallery
             ProductCategoryDetail
  forms/     EnquiryForm
  preloader/ Preloader
  ui/        Button  Container  Section  SectionHeading  Eyebrow
             ArrowLink  ImagePlate  Reveal  MagneticButton  StarRating
  cards/     ProductCategoryCard  ProductShowcaseCard  SolutionCard
             IndustryCard  RangeTeaserCard  TestimonialCard
  motion/    SmoothScrollProvider  gsap.ts  useReveal.ts
  seo/       JsonLd
  decor/     LeafLineArt  BotanicalCorner

sections/    CollectionSection  CategoryIndex  PageHero  Breadcrumbs
             CtaBand  HighlightsBand

data/        navigation  trust  productCategories  products
             benefits  solutions  clients  testimonials
             about  contact  products-page
lib/         cn  seo
public/images/
resources/   plan.md  image-generation.md  gardening-tools-design.md
```

### Reuse contract for future pages

Every page (About, Products, Product Detail, Clients, Contact) reuses `layout/*`, `ui/*`, `cards/*`, `sections/*`, `motion/*`, `data/*` and `lib/seo.ts` **without modification**. Adding a page means writing a route and composing existing primitives — never redesigning the foundation. This held: the five pages built in phase 2 added `PageHero`, `Breadcrumbs`, `CtaBand` and `HighlightsBand` to the shared set and changed nothing underneath them.

All copy lives in typed arrays under `data/`. The Products page renders the same catalogue the Home page samples from; About and Contact render the same `solutions` array Home does. Nothing is hard-coded into a section component.

**One product detail component, not one per product.** `/products/[slug]` is a single route over `ProductCategoryDetail`, driven entirely by `data/productCategories.ts`. Adding a category publishes its page.

### Server vs client boundary

Server components by default — `page.tsx`, every section shell, every card, and all static UI primitives.

`"use client"` only where interaction genuinely requires it:

| Component | Why |
|---|---|
| `Header` | scroll-position state |
| `MobileMenu` | open/close, focus trap |
| `ThemeToggle` | localStorage + DOM attribute |
| `SmoothScrollProvider` | Lenis instance |
| `Reveal` | ScrollTrigger |
| `MagneticButton` | pointer tracking |
| `Newsletter` | form state |
| `HeroMotion` | entrance timeline wrapper |

Images and copy stay server-rendered inside client wrappers via `children`, so the client bundle carries behaviour only — never content.

---

## 5. Theme system

Light is the default and the primary experience. Dark is a **separately designed botanical theme**, not an inversion.

### Two-layer tokens

**Layer 1 — palette primitives.** Fixed hex values that never change with theme: the green ramp, cream, off-white, rating gold, terracotta, and the dark-theme-specific surfaces.

**Layer 2 — semantic aliases.** These flip between themes: `--canvas`, `--surface`, `--surface-elevated`, `--surface-soft`, `--surface-strong`, `--band-dark`, `--ink`, `--body`, `--muted`, `--border`, `--brand`, `--on-brand`, `--accent`.

Components only ever reference layer 2. That is what makes the dark theme a design decision rather than a filter.

```css
:root            { /* light */ }
[data-theme="dark"] { /* dark  */ }

@theme inline {
  --color-canvas: var(--canvas);
  --color-ink:    var(--ink);
  /* …fonts, radii, shadows, container width */
}

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

`dark:` keys off the `data-theme` attribute, not `prefers-color-scheme`, so the toggle is authoritative in both directions.

### Palettes

| Role | Light | Dark |
|---|---|---|
| Canvas | `#F7F7EF` | `#08150C` |
| Surface | `#FFFFFF` | `#102217` |
| Elevated surface | `#FAF9F3` | `#162D1D` |
| Brand | `#155A28` | `#7FB56F` |
| On brand | `#FFFFFF` | `#08150C` |
| Ink | `#1B241C` | `#F4F7F1` |
| Muted | `#69736A` | `#B8C5B8` |
| Border | `#DDE2D6` | `rgba(220,233,201,0.15)` |

**Contrast note:** in dark theme the brand green `#7FB56F` carries **near-black-green label text**, not white. White on `#7FB56F` fails WCAG AA; `#08150C` on it passes comfortably. The same rule applies to the sage-light newsletter band in light theme.

### No flash on load

A small blocking script in `<head>` reads `localStorage['gt-theme']`, falls back to `prefers-color-scheme`, and writes `data-theme` on `<html>` before first paint.

---

## 6. Home page structure

Background rhythm is deliberate: no two adjacent sections share a surface, and deep-green bands are rationed to three so the site never reads as "a generic green website".

| # | Section | Background | Layout |
|---|---|---|---|
| 1 | Hero | canvas | asymmetric 45/55, image bleeds right |
| 2 | Trust bar | deep green | 4 cols → 2 on mobile |
| 3 | About preview | cream | image left, editorial text right |
| 4 | Tool categories | canvas | 6 cards, 3 → 2 → 1 |
| 5 | Why choose us | botanical tint | numbered 01–04 list + sticky image |
| 6 | Featured tools | white | 4 square-image cards |
| 7 | Gardening solutions | cream light | 4 cards with icon badges |
| 8 | Highlights | warm | 4 figures counted from the catalogue |
| 8a | Clients | botanical tint | 6 industry cards with category chips |
| 9 | Community story | full-bleed photo + scrim | centred white text |
| 10 | Testimonials | canvas | 3 quiet cards |
| 11 | Final CTA | deep green | centred, leaf line-art |
| 12 | Newsletter | sage light | copy left, inline form right |

Header and footer wrap all of it.

### Hero

The strongest section on the site.

**Desktop:** left text column at ~45% on the warm canvas; right image plate at ~55% bleeding off the right edge of the viewport with a large organic radius on its left and bottom edges. A smaller 4:5 detail plate overlaps its lower-left with a soft card shadow. A white floating card sits at the seam reading `QUALITY TOOLS / Practical · Reliable · Built to Last`. Fine leaf line-art at 10% opacity occupies the upper-left negative space.

**Copy:** eyebrow `TOOLS FOR BETTER GARDENS`; h1 `Everything You Need to Grow a Better Garden`; supporting paragraph; primary `Explore Our Products →`; secondary `Get in Touch`; trust line `Built for gardeners. Designed for lasting performance.`

**Mobile (<744px):** text → CTAs → image, in that order. The image becomes a full-width 4:3 plate with an 18px radius. No bleed, no second plate, no parallax.

---

## 7. Motion

Three libraries, three strictly separate jobs. No two of them animate the same thing.

| Library | Owns | Never touches |
|---|---|---|
| **Lenis** | smooth scrolling, nothing else | any element animation |
| **GSAP + ScrollTrigger** | hero timeline, parallax, scroll reveals, card batches, magnetic CTA, community-story scrub | component state |
| **Motion (Framer)** | mobile menu sheet, theme toggle crossfade, newsletter success state | anything scroll-driven |

Lenis is driven by `gsap.ticker` rather than its own RAF loop, and calls `ScrollTrigger.update()` on scroll, so the two stay in lockstep.

### Rules

- `transform` and `opacity` only. Never `width`, `height`, `top` or `left`.
- Every GSAP call lives inside a `gsap.context()` that is reverted on unmount — no orphaned ScrollTriggers.
- `will-change` appears on exactly two elements and is cleared when their timelines complete.
- Reduced motion is gated with `gsap.matchMedia()`. Under `prefers-reduced-motion: reduce`, Lenis is **not instantiated at all** and every reveal renders at its final state.
- Timings follow the design system: 150–200ms fast, 200–300ms standard, 400–600ms large reveals.

---

## 8. Responsive strategy

| Breakpoint | Width | Behaviour |
|---|---|---|
| Mobile | < 744px | logo + theme toggle + hamburger; hero stacks text → CTA → image; all grids 1-up; footer columns become accordions |
| Tablet | 744–1128px | compact nav; grids 2-up; footer 2–3 columns |
| Desktop | 1128–1440px | full nav; hero split; grids 3–4 columns; footer 5 columns |
| Wide | > 1440px | content caps at 1200px, extra width becomes gutter; hero photography expands without stretching text |

Mobile is designed, not squeezed. Touch targets are a minimum of 44×44px; form controls and accordion rows are at least 48px tall.

---

## 9. SEO foundation

Built correctly now so later pages inherit it for free.

- `metadataBase` and a title template in the root layout
- `alternates.canonical` on every page
- Open Graph and Twitter/X card metadata pointing at `og-home.jpg`
- `themeColor` and `colorScheme` in the **`viewport`** export — not `metadata`, where they are deprecated
- `app/robots.ts` and `app/sitemap.ts`, the sitemap array already shaped for future routes
- `Organization` and `WebSite` JSON-LD
- `lib/seo.ts` exports a `buildMetadata()` helper so every future page gets canonical and OG handling in one line
- One `<h1>` per page, sequential `h2`/`h3`, descriptive `alt` on every image

No keyword stuffing. The copy reads as a brand, not as SEO output.

---

## 10. Accessibility

- Semantic landmarks and a correct heading hierarchy
- Full keyboard operability, with visible focus rings that are never removed
- Accessible theme toggle with a live-updating label
- Mobile menu traps focus and closes on `Escape`
- Visible form labels — never placeholder-as-label
- Contrast verified at every text/background pairing in both themes
- `prefers-reduced-motion` respected in CSS and in JavaScript

---

## 11. Next.js 16 notes

This version differs from Next 14/15 habits. These caused real breakage and are worth remembering:

1. `priority` on `<Image>` is deprecated — use `preload`
2. `images.qualities` defaults to `[75]`; any other `quality` value is silently coerced unless configured
3. `sizes` is required on responsive and `fill` images, or the `srcset` is only 1x/2x
4. No `tailwind.config.js` — `@theme` in CSS is the entire config surface
5. `LayoutProps<"/">` and `PageProps<"/route">` are globals, not imports
6. `themeColor` / `colorScheme` belong in `export const viewport`
7. Turbopack is the default bundler; adding a `webpack` config fails the build
8. Do not set CSS `scroll-behavior: smooth` — Lenis owns scrolling
9. `next lint` is gone; the script is plain `eslint`
10. `params` and `searchParams` are Promises with no synchronous fallback (relevant when Tool Detail is built)

The authoritative reference for this version is `node_modules/next/dist/docs/`, per `AGENTS.md`.

---

## 12. Roadmap

| Phase | Deliverable | Status |
|---|---|---|
| 1 | Home page, design tokens, theme system, header, footer, motion primitives, SEO foundation | **built — awaiting review** |
| 1.1 | Complete tool range, 404 page, custom cursor, floating actions, environment configuration, brand icons | **built, awaiting review** |
| 2 | About, Products listing, Product Detail template, Clients, Contact, preloader, page visibility system | **built, awaiting review** |
| 3 | Enquiry form backend and email delivery | not started |
| 4 | Legal pages (privacy, terms) | not started |

Phase 2 built the whole information architecture at once because the pages share one component set and one catalogue. Release is now controlled per page in production through `config/pageVisibility.ts`, so the client still sees them one at a time (§16).

There is no Services phase and no Resources phase. Services was removed and Resources became Clients.

---

## 13. Deviations from the design system, and why

Each of these departs from `gardening-tools-design.md` deliberately. They are listed so nobody "corrects" them back.

| Change | Reason |
|---|---|
| Fonts load through `next/font`, not the brief's Google Fonts `@import` | Same families and the exact requested axes (Inter ital, opsz 14 to 32, wght 100 to 900; Manrope wght 200 to 800), but self-hosted: no render-blocking third-party stylesheet, no extra connections, and size-adjusted fallbacks so the hero headline does not shift. Adding the `@import` as well would have loaded every face twice. |
| Inter italic split into a non-preloaded instance | Loaded together with the upright face it was preloaded on every page, a 77 KB high-priority download for a style the site barely uses. |
| Navigation, buttons and all UI moved from Manrope to Inter | The later brief assigns Inter to navigation and UI elements; Manrope stays on headings and display text. |
| "Professional Tools" category retired | Replaced by eight specific machinery categories. Its photograph no longer matched any category and was removed rather than left unused. |
| Every build is `noindex` unless `NEXT_PUBLIC_APP_ENV=production` | Staging and preview deployments can never be indexed. The live deployment must set the variable. |
| Page container widened from 1200px to 1400px | Requested in review. The gutters are unchanged (16, 24 and 32px), so content reaches the full 1400px from a 1464px viewport. Text blocks keep their own measures, so line lengths do not grow. |
| Hero sits inside `container-page` instead of bleeding off the right edge | Requested in review, so the hero shares its edges with the header and every section below. The photograph keeps its organic shape, now rounded on all four corners. |
| Botanical line-art removed from the hero, the final CTA and the range teaser card | Rejected in review as unconvincing. Organic detail comes from photography; any future botanical accent must look real. |
| Custom cursor: the leaf tracks the pointer exactly and the dot trails it | Requested in review, so the leaf is the cursor itself. Aim stays precise because the element on the hotspot never eases. |
| `--muted` darkened from `#69736A` to `#5A645B` | The specified value measures **4.36:1** on the botanical tint used by the soft and Why-Choose-Us bands — below the 4.5:1 AA floor the same document requires for body text. Now ≥4.85:1 on every light surface. |
| `--brand-soft` darkened from `#3F7F35` to `#38712C` | Leaf Green measures **4.31:1** on the cream band and carries 12px eyebrow labels, which count as normal-size text. Now ≥4.64:1 everywhere. Visually identical at label size. |
| Dark theme brand button uses near-black-green text | White on `#7FB56F` measures **2.4:1** and fails AA. `#08150C` on it measures 7.78:1. |
| Star rating keeps `#D8A92E` despite 2.18:1 on white | Kept as specified. The rating is exposed to assistive technology as text ("Rated 5 out of 5"), so the stars reinforce rather than carry the information. |
| `components/`, `data/`, `lib/` at the repo root instead of under `src/` | The alias is `@/*` → `./*` and `app/` already sits at the root. See §3. |
| `@gsap/react` added as a dependency | The official GSAP React guidance is to use `useGSAP()`, and its `contextSafe` wrapper is what makes the magnetic-button pointer handlers clean up correctly. ~3KB. |
| Motion loaded via `LazyMotion` + `m` rather than `motion` | Measured: 258KB vs 267KB gzipped for the page. `strict` mode makes the saving permanent by throwing if anyone imports `motion.*` again. |
| Tailwind's default breakpoints replaced with 744 / 900 / 1128 / 1440 / 1680 | So `sm:` and `lg:` mean the design system's tablet and desktop. Without it the hero's `lg:` styles fired at 1024px while its grid waited for 1128px. |
| Tools renamed Products everywhere a visitor sees it, including the routes | Requested in review, and it matches the client's own navigation. The domain types, data files and card components were renamed with it rather than left saying Tool, so the code and the site use one vocabulary. |
| Services page removed, its content kept as *gardening solutions* | The client's own services page is placeholder Latin, and four cards do not justify a route. Keeping a page whose only job is to list four things the enquiry form already covers would have been a dead end for visitors. |
| Resources replaced by Clients | Editorial guides were never written and the client has no article to publish. A credibility page is what a twenty-eight-year supplier actually needs, and it replaces Resources across Home, all five variants, the footer and the sitemap. |
| Product detail pages are per **category**, not per product | The client publishes product categories, not model sheets. A page per named product would have to invent specifications, model numbers and photographs, which the brief forbids. Each category page lists the real product types inside it. |
| Privacy and terms links removed from the footer | Those pages do not exist. A link to a page that is not there is worse than no link. |
| Enquiry form composes a message for the visitor's own mail client | Email delivery is not built, and a success message for something that never left the browser would be a lie. The form states this and hands over the phone, email and WhatsApp routes that do work. |
| The preloader runs once per session, never on reduced motion or reduced data | A branded animation on every navigation is a tax, not a brand. |

### Two Tailwind traps this codebase has already hit

Both cost real debugging time; if a class "isn't applying", check these first.

1. **Two competing utilities for the same property are resolved by Tailwind's own sort order, not by the order they appear in the class string.** `hidden` lost to `inline-flex` on the header CTA, and `text-[var(--green-800)]` lost to `text-on-brand` on the final CTA — which rendered a white label on a white button. The fix in both cases is a variant (`max-lg:hidden`) or a proper component variant, never an override.
2. **Interpolated class names produce no CSS.** `` rounded-${radius} `` compiles to nothing; `ImagePlate` uses an explicit lookup map instead.

---

## 14. Hard constraints

Permanent rules for this codebase.

**Never add:** shopping cart, checkout, payment, Add to Cart, Buy Now, pricing, wishlist, stock levels, discount badges, commerce filters, customer shopping accounts, Blog page, Journal page, or any navigation or footer link to either.

**Never introduce** a third typeface, a second icon system, or a visual language that diverges from `gardening-tools-design.md`.

**Always** treat photography as the primary carrier of emotion, deep green as the trust anchor, cream and sage as warmth, and typography as clarity.

---

## 15. Home design variants (`/variant1` to `/variant5`)

Five alternative Home pages sit beside the live one. `/` is the original Home page, is unchanged, and is not numbered, so `/variantN` is always variant N.

| Route | Variant | Direction |
|---|---|---|
| `/` | Home | The existing Home page |
| `/variant1` | 01 | Cinematic Editorial: full-bleed photography, magazine spread, long product chapters |
| `/variant2` | 02 | Interactive Product Experience: examined tool with hotspots, steered list, dragged rail, counted figures |
| `/variant3` | 03 | Modern Indian Botanical: split screen, arch geometry, marked garden scene, five Indian garden environments |
| `/variant4` | 04 | Bold Art-Directed Showcase: typographic hero, category wall, gallery hang, specification sheet |
| `/variant5` | 05 | Structured Catalogue: cover with contents, complete range as a ruled index, specimen sheet, colophon |

Rules these follow:

- One design system. No variant adds a colour, a typeface or a breakpoint. The only shared additions are `--band-deep`, `display-2xl`, `display-3xl`, the `rail-x` utility and the `[data-v-*]` entrance states, all in `globals.css`.
- Light sections by default. Client feedback (2026-09-13): too many deep green section backgrounds. Variant 2 was re-toned to light surfaces with a single dark closing band; variant 5 has no dark section before the footer. Deep green belongs to text, rules and actions, and to at most one or two bands a page, as on the live Home page.
- One content model. Same catalogue, tools, services, resources and testimonials; variant-specific copy lives in `data/variants/`.
- Same header, navigation and footer. `config/variants.ts` records only which routes need the white header treatment over their hero (variant 1 alone).
- Client components receive plain props from server bindings, so the catalogue never crosses the client boundary.
- Every variant route is `noindex` and none is in the sitemap. The floating switcher (Home, 01 to 05) is mounted on the five variant routes only; the live Home page has nothing added to it.

---

## 16. Page visibility (production release switchboard)

Pages are developed normally and released to the client one at a time. One file decides what exists in production.

```ts
// config/pageVisibility.ts
export const pageVisibility: Record<PageKey, boolean> = {
  home: true,
  about: true,
  products: true,
  clients: true,
  contact: true,
  variants: false,
};
```

**Environment rule.** Development and staging serve every implemented page regardless of the flags, so unreleased work stays reviewable. Only `NEXT_PUBLIC_APP_ENV=production` enforces them.

**Enforcement is at the route, not in the markup.** Two layers, both server side:

1. `proxy.ts` (Next 16's replacement for `middleware.ts`) rewrites a withdrawn path so it never reaches the page.
2. Every gated route calls `enforcePageVisibility(key)`, which calls `notFound()`. The response is a real 404 with the site's not-found page, exactly as an unknown URL is.

**Everything else follows automatically.** `visibleLinks()` filters the header, the mobile sheet and all four footer columns; a footer column with nothing left in it renders nothing rather than an empty heading; `app/sitemap.ts` filters the same way. Releasing a page is one boolean.

**What it is not.** No database, no admin panel, no feature-flag service, no authentication and no API. Two constants and a path test.
