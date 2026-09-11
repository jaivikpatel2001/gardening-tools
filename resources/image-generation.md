# GreenTools Image Generation Manifest

Every image slot on the site. Slot names, dimensions, aspect ratios and composition rules are **fixed**. Do not change them without an explicit instruction.

---

## Pipeline

```text
gardening images/<source>.png   ->   npm run images   ->   public/images/<slot>.webp
```

1. Drop generated source artwork into `gardening images/` at the highest resolution you can produce, using the **source filename** listed for the slot.
2. Run `npm run images`. Slots whose source has not arrived yet are listed and skipped, so images can be delivered a few at a time.
3. For a new tool category image, add `image` (with alt text describing the actual photograph) to that category in `data/toolCategories.ts`. Until then the category still appears in the complete range index, just not as a photo card.

The script enforces each slot's aspect ratio by cover-cropping with sharp's attention strategy, never upscales, and encodes to WebP. The Open Graph card stays JPEG, because several social crawlers and messaging previews still handle WebP unreliably.

**Generate large.** The script cannot invent pixels. A slot whose source is smaller than its target ships at the smaller size, and the run prints `capped from ...`. Several current slots are capped for exactly this reason.

`public/images/` is generated output. Never hand-edit it; re-run the script.

---

## Visual direction

This is an **Indian gardening brand** serving homeowners, terrace and balcony gardeners, kitchen gardeners, farmers, nurseries, housing societies, institutions and professional landscapers. The photography has to look like it was shot in India.

### Base prompt (every slot)

> Photorealistic editorial photography shot in India. Natural daylight, warm low-angle sun, soft shadows. Shallow depth of field with a genuinely blurred background. Moderate saturation, slightly warm colour temperature, true-to-life greens. Realistic materials, realistic skin texture and natural expressions. Premium lifestyle-brand composition with clean negative space. Full-frame camera, 35 to 85mm lens.
>
> **Setting cues to draw on where the slot calls for a place:** Indian terrace and balcony gardens, courtyard and compound-wall gardens, kitchen gardens, apartment society landscaping, nursery polyhouses and shade-net houses, farm plots and bunds, tulsi, curry leaf, hibiscus, bougainvillea, marigold, jasmine, mango and neem trees, red laterite or black cotton soil, terracotta pots, jute grow bags.
>
> **Negative / avoid:** any text, lettering, signage, logos, watermarks, brand marks, stickers, printed slogans on clothing or aprons, printed labels on products. Cartoon, illustration, painting, 3D render, CGI, waxy or plastic skin, toy-like products. HDR, heavy vignette, heavy filters, oversaturated neon greens, cold blue light. Cluttered frames, generic Western stock-photo styling, European cypress, lavender or cottage-garden scenery, white studio backgrounds, showrooms, price tags, packaging, barcodes, shop shelves, checkout counters.

**Why the negatives matter:** this is a brand site, not a shop, so anything that reads as retail packaging breaks the positioning. And **baked-in text is the single most damaging failure mode**: several slots sit behind live headings, where lettering inside the photograph competes with the real typography and cannot be translated, restyled or made accessible.

---

## Current asset status

| Status | Slots | Issue |
|---|---|---|
| **Ship as is** | `hero-main`, `hero-detail`, `why-choose`, all 4 featured tools, all 3 resources, `og-home` | Still-life and product photography. Clean, no text. `og-home` has the right negative space in its left third. |
| **Live, regeneration optional** | the 5 photographed tool categories | Good images, but they show Western tools (spade and fork, not phawda and gaiti) and do not form one series with the 9 new category shots below. Regenerate them with the series prompts if the grid should read as one shoot. |
| **Needed** | the 9 unphotographed tool categories | No image yet. Listed in the range index; will appear as photo cards once delivered. |
| **Acceptable, low priority** | `testimonial-01`, `testimonial-02`, `testimonial-03` | Subjects read as South Asian, which is right. Each carries small baked-in lettering on an apron or sign, illegible at the 44px display size. |
| **Regenerate** | `community-story`, the 4 service images, `about-preview` | Western or Mediterranean settings, and the scene shots carry **large, legible baked-in signage**. `community-story` is the worst: it sits full bleed behind the "Growing Better Gardens Together" heading and its signs read through the scrim. |

`hero-main` is a Mediterranean garden (cypress, dry-stone wall, rolling hills). It is a beautiful frame that satisfies every composition rule, but it is not India. Regenerating it is a judgement call rather than a defect.

---

## Slots

### 1. Hero main plate

| | |
|---|---|
| **Source** | `gardening images/hero-main.png` |
| **Output** | `public/images/hero-main.webp` |
| **Ratio** | 3:2 |
| **Target** | 2400 x 1600 |
| **Alt** | A hand trowel and fork with hardwood handles resting on dark soil beside herb seedlings in a garden bed at sunrise |

**Subject:** An Indian kitchen garden or terrace bed in early-morning light. Foreground: premium gardening tools (hardwood-handled trowel and hand fork, forged steel heads) resting on dark soil beside a tray of seedlings. Mid-ground: healthy leafy plants, tulsi and curry leaf, dew still on the leaves. Background: a soft-focus Indian garden with a compound wall, terracotta pots and a trellis.

**Critical:** the most important image on the site. It bleeds off the right edge of the viewport on desktop, so **keep the subject in the left-to-centre half of the frame**. The pipeline crops this slot from the left for the same reason.

---

### 2. Hero overlapping detail plate

| | |
|---|---|
| **Source** | `gardening images/hero-detail.png` |
| **Output** | `public/images/hero-detail.webp` |
| **Ratio** | 4:5 |
| **Target** | 1000 x 1250 |
| **Alt** | Close-up of a pair of bypass pruning secateurs held over green foliage |

**Subject:** Tight vertical close-up of bypass secateurs with a timber handle and forged blade, held in a gardener's hand over green foliage. Very shallow depth of field, only the blade and the front of the hand sharp. Warm rim light along the metal edge.

---

### 3. About preview (regenerate)

| | |
|---|---|
| **Source** | `gardening images/about-preview.png` |
| **Output** | `public/images/about-preview.webp` |
| **Ratio** | 3:4 |
| **Target** | 1200 x 1600 |
| **Alt** | A gardener in an apron kneeling to plant seedlings in a raised timber bed on a bright afternoon |

**Subject:** Vertical editorial portrait of an Indian gardener at work, kneeling beside a raised bed on a terrace or in a courtyard garden, planting seedlings, sleeves rolled, soil on their hands, tools resting on the bed edge. The face may be partly turned away; this is about the work, not a headshot. Warm afternoon light, an established Indian garden softly blurred behind. **Plain apron and clothing, no printed text.**

---

### 4. Tool category series (14 slots)

All tool category images share one ratio, one light and one camera language, so the category grid reads as a single commissioned shoot.

| | |
|---|---|
| **Ratio** | 4:3 |
| **Target** | 1200 x 900 (generate 2400 x 1800 where possible) |
| **Output** | `public/images/<slot>.webp` |

#### Series rules (apply to every category prompt)

- **Light:** late-afternoon sun from camera left, warm and low. Soft shadows fall to the right. Gentle backlight on foliage.
- **Camera:** three-quarter view from slightly above the product's height, 50mm full-frame equivalent, f/2.8 to f/4. Background genuinely blurred.
- **Composition:** the hero product fills about 55 to 65 percent of the frame width, sits slightly left of centre, and is shown **whole and uncropped**. Keep calm, uncluttered negative space in the upper right third.
- **Products:** realistic, unbranded and free of printed text. Hand tools have seasoned hardwood handles and forged or polished steel heads with honest wear. Machinery uses one consistent house colourway: **deep botanical green housing with charcoal grey and brushed steel details, matte finish.**
- **People:** none, or hands and forearms only, partly in frame. No faces.
- **Grade:** natural greens, warm highlights, moderate saturation, identical across all 14.
- **Negative:** the base negatives above, plus: logos, model numbers, warning stickers, orange, yellow or red manufacturer colourways, showroom floors, white studio sweeps.

#### Series prompt template

> Photorealistic editorial product photograph for an Indian gardening brand, 4:3 landscape. [SUBJECT]. [SETTING]. Late-afternoon warm sunlight from the left, soft shadows falling right, gentle backlight on the foliage. Three-quarter view from slightly above the product, 50mm lens, f/3.5, shallow depth of field with a softly blurred background. The product is whole and uncropped, filling about 60 percent of the frame width, slightly left of centre, with calm negative space in the upper right third. Realistic materials and honest wear, unbranded with no text or logos anywhere, natural greens, moderate saturation, premium catalogue look. No people except hands at most, no text, no logos, no packaging, no studio background, no CGI.

Fill `[SUBJECT]` and `[SETTING]` from the table below.

#### Category prompts

| # | Slot and source | Status | [SUBJECT] | [SETTING] | Draft alt text |
|---|---|---|---|---|---|
| 4a | `category-hand-tools` <br> source: `hand-tools.png` (current) or `category-hand-tools.png` (new) | Live, regeneration optional | A khurpi with a worn hardwood handle and a triangular forged blade, a hand trowel, a three-prong hand cultivator and a narrow hand weeder, laid side by side with handles aligned on a weathered teak potting bench, a little dark soil scattered around them | A Mumbai apartment terrace garden, terracotta pots of tulsi and chilli plants blurred behind | A khurpi, hand trowel, hand cultivator and hand weeder laid side by side on a weathered potting bench on a terrace garden |
| 4b | `category-digging-tools` <br> source: `digging-tools.png` (current) or `category-digging-tools.png` (new) | Live, regeneration optional | A traditional phawda with a broad forged blade set at an angle to its long wooden handle, a kudali and a gaiti (pickaxe), the phawda upright in freshly turned soil and the other two resting against it | A kitchen garden plot of black cotton soil on the edge of a village near Nashik, young vegetable beds blurred behind | A phawda standing in freshly turned black soil with a kudali and a gaiti resting beside it |
| 4c | `category-pruning-tools` <br> source: `pruning-tools.png` (current) or `category-pruning-tools.png` (new) | Live, regeneration optional | Bypass secateurs, a pair of loppers and a traditional curved daranti (sickle) resting at the base of a freshly pruned hibiscus hedge, fresh clippings and a few red hibiscus flowers on the ground | A Bengaluru bungalow garden with a trimmed hedge line blurred behind | Secateurs, loppers and a curved daranti resting beside a freshly pruned hibiscus hedge |
| 4d | `category-watering-tools` <br> source: `-watering-tools.png` (current) or `category-watering-tools.png` (new) | Live, regeneration optional | A galvanised watering can with a brass rose, a neatly coiled green garden hose pipe with a pistol spray gun and a wall-mounted hose reel beside a bed of freshly watered seedlings, droplets catching the light | A Chennai terrace garden with potted plants and a whitewashed parapet blurred behind | A galvanised watering can, coiled hose pipe with spray gun and hose reel beside freshly watered seedlings |
| 4e | `category-garden-utility` <br> source: `category-garden-utility.png` | **Needed** | A traditional round iron tasla filled with dark potting soil in front of a single-wheel wheelbarrow, with a long-handled fruit picker and its cloth catch-basket leaning against the barrow | A Gujarat farmhouse garden under a mango tree, a whitewashed compound wall blurred behind | An iron tasla of potting soil beside a wheelbarrow and a long-handled fruit picker under a mango tree |
| 4f | `category-garden-accessories` <br> source: `garden-accessories.png` (current) or `category-garden-accessories.png` (new) | Live, regeneration optional | Leather-palmed gardening gloves, a ball of jute twine, wooden plant labels, a stack of folded jute grow bags and a pair of clear safety goggles arranged on a potting bench | A Pune nursery shade-net house, rows of potted saplings blurred behind | Gardening gloves, jute twine, plant labels, folded grow bags and safety goggles on a nursery potting bench |
| 4g | `category-lawn-mowers` <br> source: `category-lawn-mowers.png` | **Needed** | An unbranded electric rotary lawn mower with its grass box attached, standing at the edge of a half-mown lawn, a crisp line between mown and unmown grass leading in from the lower left | A green lawn in an Indian housing society garden, low hedges and palms blurred behind | An electric rotary lawn mower standing at the edge of a half-mown lawn in a housing society garden |
| 4h | `category-brush-cutters` <br> source: `category-brush-cutters.png` | **Needed** | An unbranded petrol brush cutter with a straight shaft, bike-style handlebar and a three-tooth metal blade, lying across its harness at the boundary between tall uncut grass and a freshly cleared strip | The bund of a farm field in rural Maharashtra, crops and a neem tree blurred behind | A petrol brush cutter resting where tall grass meets a freshly cleared strip on a farm bund |
| 4i | `category-hedge-trimmers` <br> source: `category-hedge-trimmers.png` | **Needed** | An unbranded cordless battery hedge trimmer with a long double-sided steel blade and its battery attached, resting on top of a neatly squared boundary hedge, trimmed leaves scattered on the hedge | The compound wall hedge of a Hyderabad bungalow, the house softly blurred behind | A cordless hedge trimmer resting on top of a neatly trimmed boundary hedge |
| 4j | `category-chainsaws` <br> source: `category-chainsaws.png` | **Needed** | An unbranded petrol chainsaw with a 16-inch guide bar resting on a freshly cut section of a fallen neem branch, sawdust on the bark, a telescopic pole saw leaning against the trunk beside it | A monsoon-green garden in Kerala, wet foliage blurred behind | A petrol chainsaw resting on a freshly cut neem branch with a pole saw leaning beside it |
| 4k | `category-tillers` <br> source: `category-tillers.png` | **Needed** | An unbranded petrol mini tiller (power weeder) with its tines set into freshly tilled red laterite soil at the start of a vegetable plot, neat furrows stretching behind it | A Karnataka farm plot, coconut palms blurred on the horizon | A petrol mini tiller in freshly tilled red soil with neat furrows behind it |
| 4l | `category-sprayers` <br> source: `category-sprayers.png` | **Needed** | An unbranded 16-litre battery knapsack sprayer with a translucent tank, lance and adjustable nozzle, standing upright between rows of chilli and brinjal plants, a faint mist visible in the backlight | An Indian kitchen garden with drip lines between the rows, blurred behind | A battery knapsack sprayer standing between rows of chilli and brinjal plants |
| 4m | `category-blowers` <br> source: `category-blowers.png` | **Needed** | An unbranded cordless leaf blower resting on a stone-paved garden path that is half covered with fallen dry leaves and gulmohar petals and half blown clean | A shaded garden walkway under a gulmohar tree, blurred behind | A cordless leaf blower on a garden path half covered in fallen leaves and half blown clean |
| 4n | `category-irrigation` <br> source: `category-irrigation.png` | **Needed** | A drip irrigation lateral with inline emitters running along young vegetable beds in the foreground, a compact electric monoblock water pump beside a coiled lay-flat hose at the head of the line | A Rajasthan nursery under shade net, a water tank blurred behind | Drip irrigation lines along young vegetable beds with a compact water pump and coiled hose |

**Note on 4a to 4d and 4f:** these slots already have live images. If you regenerate them, save the new file as the new source name shown and tell Claude, so the pipeline mapping can be switched to it.

---

### 5. Why Choose Us

| | |
|---|---|
| **Source** | `gardening images/why-choose.png` |
| **Output** | `public/images/why-choose.webp` |
| **Ratio** | 3:4 |
| **Target** | 1200 x 1600 |
| **Alt** | Macro detail of a forged steel tool head joined to a seasoned hardwood handle |

**Subject:** Vertical macro study of build quality: the join where a forged head meets its wooden handle. Visible grain, a riveted or socketed ferrule, fine tooling marks in the metal. Dramatic but soft directional light. This image has to say durability without a word of copy.

---

### 6. Featured tool showcase

All four: **1:1**, **1200 x 1200**. One consistent set: a single hero object on a calm surface with room to breathe.

| Output | Source | Alt | Subject |
|---|---|---|---|
| `tool-pruning-shears.webp` | `pruning-shears.png` | A pair of bypass pruning secateurs with a hardwood handle resting on pale linen | Bypass secateurs, three-quarter view, pale linen or warm off-white surface, one soft shadow, a sprig of greenery just in frame. |
| `tool-hand-trowel.webp` | `hand-trowel.png` | A hand trowel with a hardwood handle and polished steel blade resting on soil-dusted linen | Hand trowel, same surface and lighting, a light dusting of soil. |
| `tool-garden-spade.webp` | `garden-spade.png` | The blade and lower shaft of a forged garden spade against a pale background | Garden spade cropped to blade and lower shaft filling the square, same surface and grade. |
| `tool-watering-can.webp` | `watering-can.png` | A galvanised metal watering can with a brass rose on a pale surface | Galvanised can with brass rose, side view, same surface and grade. |

---

### 7. Services (regenerate)

All four: **16:10**, **1600 x 1000**. More human than the tool shots: people, hands, conversation, activity. One consistent grade across the set. **All clothing and signage plain, no printed slogans, no lettering anywhere in frame.**

| Output | Source | Alt | Subject |
|---|---|---|---|
| `service-tool-selection.webp` | `tool-selection.png` | Two people examining a selection of gardening tools together at a workbench | Two Indian people at a counter or workbench going over a selection of tools together, one pointing at a handle. Advisory, unhurried, warm. |
| `service-garden-setup.webp` | `garden-setup.png` | A new raised garden bed being assembled and filled with soil | A terrace or courtyard garden being set up: grow bags and a raised bed part-filled, tools and soil around it, work visibly in progress. |
| `service-tool-care.webp` | `tool-care.png` | Hands sharpening and oiling a garden tool blade at a workbench | Hands cleaning, sharpening and oiling a blade with a whetstone, oiled cloth and wire brush. Close and tactile. |
| `service-professional-support.webp` | `professional-support.png` | A professional gardening team working together on a landscaped residential garden | A small Indian landscaping crew at work in an apartment society or bungalow garden, two or three people, wide enough to read as a crew. **Plain uniforms, no printed text.** |

---

### 8. Resources

All three: **4:3**, **1200 x 900**. Editorial and slightly quieter than the service shots; these illustrate articles.

| Output | Source | Alt | Subject |
|---|---|---|---|
| `resource-choosing-tools.webp` | `choosing-tools.png` | Several gardening tools laid out side by side on a bench for comparison | Several tools laid out for comparison, subtly different handle types and blade shapes, viewed from above at a slight angle. |
| `resource-essential-tools.webp` | `ssential-tools.png` | A compact starter set of gardening tools grouped beside a canvas tote | A starter set of trowel, hand fork, secateurs and gloves grouped in or beside a canvas or jute tote on a doorstep or bench. |
| `resource-clean-maintain.webp` | `clean-maintain.png` | A muddy garden tool being cleaned with a brush and cloth after use | A muddy tool mid-clean with brush, cloth and bucket of water, one half of the blade already bright. The before and after is the story. |

---

### 9. Community and brand story (regenerate, highest priority)

| | |
|---|---|
| **Source** | `gardening images/community-story.png` |
| **Output** | `public/images/community-story.webp` |
| **Ratio** | 21:9 (ultrawide panoramic) |
| **Target** | 2520 x 1080 |
| **Alt** | A wide view of a thriving community garden with raised beds and gardeners at work in golden evening light |

**Subject:** Wide panoramic of a thriving Indian community or society garden at golden hour: rows of raised beds and grow bags, climbing frames heavy with gourds, marigold and hibiscus in flower, a few people working at a distance, long warm shadows.

**Two hard requirements:**

1. **No text or signage anywhere in the frame.** This image sits full bleed behind a white heading on a dark green scrim, and the current asset is full of readable wooden signs that show straight through.
2. **Keep the centre third simple and even in tone**, with no high-contrast hotspots through the middle, or the headline becomes unreadable. Detail belongs at the left and right edges.

---

### 10. Testimonials

All three: **1:1**, **400 x 400**. Small circular avatars: tight, warm, unposed. Vary age and appearance. Each must match the person described in [data/testimonials.ts](../data/testimonials.ts).

| Output | Source | Person | Alt |
|---|---|---|---|
| `testimonial-01.webp` | `testimonial-01.png` | Woman, terrace gardener, Kochi | Portrait of a smiling gardener holding a potted plant in a flowering garden |
| `testimonial-02.webp` | `testimonial-02.png` | Older man, kitchen gardener, Pune | Portrait of a smiling older gardener standing beside raised vegetable beds |
| `testimonial-03.webp` | `` `testimonial-03.png `` | Younger man, landscape contractor, Chandigarh | Portrait of a landscaping professional leaning on a tool handle at a work site |

**Subject:** Natural outdoor head-and-shoulders portrait of an Indian gardener, garden softly blurred behind, warm daylight, relaxed and genuine expression. No studio backdrop, no corporate headshot styling, **no printed text on aprons or clothing**.

---

### 11. Open Graph share image

| | |
|---|---|
| **Source** | `gardening images/og-home..png` |
| **Output** | `public/images/og-home.jpg` (**JPEG, not WebP**) |
| **Ratio** | 1.91:1 |
| **Target** | 1200 x 630 |

**Subject:** A cinematic wide crop of garden tools laid on soil in warm light, with clear open space in the **left third** where a title could sit. No text in the image.

**Where it appears:** Google, X, LinkedIn, Slack and WhatsApp link previews. It is the first impression for anyone who receives a link, so it deserves the same care as the hero.

---

### 12. 404 illustration (optional)

The 404 page already ships with an animated SVG scene drawn in code: a garden path whose footprint trail wanders off toward a crooked "404" signpost. It needs no image. Use this prompt only if you want a richer illustrated backdrop to replace or sit behind it.

| | |
|---|---|
| **Source** | `gardening images/not-found-garden-path.png` |
| **Ratio** | 15:14 (matches the 600 by 560 scene) |
| **Target** | 1800 x 1680 |
| **Alt** | Not needed: decorative, hidden from assistive technology |

**Prompt:**

> Premium soft-matte 3D diorama illustration for a gardening brand's 404 page, 15:14. A small, calm Indian garden scene on a gentle mound: a winding pale stone stepping-stone path curves from the bottom centre toward the upper right and fades out, while a faint line of footprints wanders off the path to the left toward a crooked wooden signpost with a blank arrow-shaped board tilted about nine degrees, one plank snapped and lying in the grass at its foot. A small hand trowel lies dropped in the grass beside the path. Clusters of tulsi and fern-like fronds in the foreground corners, a low hill line and a soft warm sun glow in the upper right. Palette of botanical deep green, sage, cream and warm wood, matching hex tones #155A28, #A8C98D, #DCE9C9, #F3F1E7, #B88A5C. Soft global illumination, gentle ambient occlusion, clay-like matte materials with subtle texture, no harsh specular highlights. Isolated on a flat #F7F7EF background with generous empty space around the scene.
>
> **Negative:** any text or numbers on the sign (the "404" is added live on the page), logos, cartoon faces or characters, glossy plastic, neon colours, busy backgrounds, dramatic shadows, photographic realism, cluttered props.

---

## Checklist before running `npm run images`

- [ ] Source files are in `gardening images/` under the exact source names above
- [ ] Sources are at or above the target size, so nothing ships capped
- [ ] No text, signage, logos, watermarks or printed slogans anywhere in any frame
- [ ] The tool category series (section 4) reads as one consistent shoot, with machinery in the green and charcoal house colourway
- [ ] The featured tool set (section 6) reads as one consistent shoot
- [ ] The service set (section 7) reads as one consistent shoot
- [ ] Settings, people and vegetation read as Indian
- [ ] `hero-main` keeps its subject left of centre
- [ ] `community-story` has an even, uncluttered centre third
- [ ] Nothing in any frame suggests retail, packaging or pricing
- [ ] After running: new category images have `image` added in `data/toolCategories.ts`, `npm run check` passes and the page shows no broken images
