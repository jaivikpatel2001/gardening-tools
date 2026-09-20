# Homepage section parity

The live Home page at `/` is the reference for **content coverage**. Every alternative Home design under `/variant1` to `/variant5` must carry all thirteen sections below. A variant may reorder them, restyle them and give them a different voice. A variant may not drop one.

Checked 20 September 2026, against the rendered HTML of all six pages, not by eye.

---

## The thirteen canonical sections

| # | Section | What it has to carry |
|---|---|---|
| 1 | Hero | The opening claim and the two calls to action |
| 2 | Trust strip | The four assurances in `data/trust.ts` |
| 3 | About | Who the company is, and the link to About |
| 4 | Product categories | The range, including the complete index |
| 5 | Why choose us | The four benefits in `data/benefits.ts` |
| 6 | Featured products | The photographed products in `data/products.ts` |
| 7 | Gardening solutions | The four solutions in `data/solutions.ts` |
| 8 | Highlights | The four figures counted from the catalogue |
| 9 | Clients | The six kinds of customer in `data/clients.ts` |
| 10 | Community | The brand statement over photography |
| 11 | Testimonials | The customer quotes |
| 12 | Final CTA | The closing enquiry action |
| 13 | Newsletter | The seasonal signup |

The header and the footer are global and appear on every page by definition.

---

## Coverage

| Section | `/` | `/variant1` | `/variant2` | `/variant3` | `/variant4` | `/variant5` |
|---|---|---|---|---|---|---|
| Hero | `Hero` | `CinematicHero` | `InteractiveHero` | `BotanicalHero` | `TypeHero` | `CatalogueHero` |
| Trust strip | `TrustBar` | `VariantTrust` ruled | `VariantTrust` icons | `VariantTrust` plates | `VariantTrust` numbered | `VariantTrust` ruled |
| About | `AboutPreview` | `StoryBand` | `VariantAbout` split | `CraftStory` | `VariantAbout` statement | `WorkshopFactSheet` |
| Product categories | `ProductCategories` + index | `EditorialCollage` | `InteractiveCategories` | `BotanicalCategories` | `ArtCategories` | `CatalogueRange` |
| Why choose us | `WhyChooseUs` | `VariantBenefits` ledger | `InteractiveDurability` | `VariantBenefits` split | `TechnicalSpecs` | `VariantBenefits` grid |
| Featured products | `FeaturedProducts` | `ProductStories` | `InteractiveProducts` | `BotanicalShowcase` | `ArtGallery` | `SpecimenBoard` |
| Gardening solutions | `SolutionsPreview` | `SolutionsLedger` | `InteractiveSolutions` + `VariantSolutions` | `GardenJourney` + `VariantSolutions` | `VariantSolutions` | `ServiceColumns` |
| Highlights | `Highlights` grid | `VariantHighlights` ledger | `InteractiveTrust` counters | `VariantHighlights` column | `VariantHighlights` inline | `VariantHighlights` ledger |
| Clients | `ClientsPreview` | `VariantClients` spread | `VariantClients` rail | `VariantClients` arc | `VariantClients` wall | `VariantClients` register |
| Community | `CommunityStory` | `VariantCommunity` plate | `VariantCommunity` plate | `VariantCommunity` photo | `VariantCommunity` plate | `VariantCommunity` plate |
| Testimonials | `Testimonials` | `EditorialVoices` | `VariantTestimonials` plates | `BotanicalVoices` | `VariantTestimonials` columns | `VariantTestimonials` rows |
| Final CTA | `FinalCTA` | `CinematicClosing` | `InteractiveClosing` | `BotanicalClosing` | `ArtClosing` | `CatalogueClosing` |
| Newsletter | `Newsletter` | `VariantNewsletter` inline | `VariantNewsletter` panel | `VariantNewsletter` inline | `VariantNewsletter` ruled | `VariantNewsletter` panel |

Every cell is filled. No variant is missing a section.

---

## Notes on the additions

**One component per section, configured per variant.** The seven shared bands in `components/variants/shared/` take a `variant`, a `layout` and a `tone`. That is what lets five pages carry the same content in five different shapes without five copies of it. Copy lives in `data/variants/shared.ts`, where the supporting lines are shared and the eyebrow and heading are written per variant, so each page still sounds like itself.

**Variants 2 and 3 carry solutions twice on purpose.** The solution finder on variant 2 and the walk through five Indian gardens on variant 3 are those pages' own treatments of "which product for which job". They are not the four gardening solutions that `/` carries, so the shared band follows them. Dropping either would have lost content that is on the live page.

**Variant 2 does not repeat the highlights band.** `InteractiveTrust` already counts the same figures from the same catalogue. Adding a second set of the same numbers would be duplication, not coverage.

**The deep band budget was respected.** A page body carries at most one deep band. Variant 1 (`StoryBand`), variant 2 (`InteractiveTrust`) and variant 4 (`ArtCategories`) already spend theirs, so their community section uses the plate layout. Variant 3 has no deep band of its own, so it is the one that keeps the full-bleed photographic treatment `/` uses. Variant 5 stays light throughout, as its catalogue direction requires.

---

## How to re-run the audit

The check is on rendered HTML, not on the source, so a section that fails to render counts as missing.

```bash
npm run dev
```

Then fetch each page and look for a marker from each section. Markers that proved reliable: `Quality Tools` (trust), `Hand Tools & Planting` (categories), `Durable Construction` (benefits), `Hardwood Hand Trowel` (featured), `Garden Setup Assistance` (solutions), `Product types listed` (highlights), `Landscapers & Contractors` (clients), `Meera Nair` (testimonials), `Seasonal advice and product guides` (newsletter).

Some sections are named differently per variant and need a per-variant marker: variant 1's about is `StoryBand` (`have trusted us with their tools`), variant 3's featured products are marked inside a garden photograph (`Bypass Secateurs`), and variant 2 and variant 4 render their category walls through client components (`Lawn Mowers`).

---

## When a section is added to `/`

Add it to the table above, add it to all five variants, and re-run the audit. A section that exists on `/` and nowhere else is a bug, not a design decision.
