# Gardening Tools Website — Design System

## Overview

The website is a **premium, photography-led gardening tools and garden-solutions brand website**. It is intentionally **not an e-commerce marketplace**. The experience should communicate quality, expertise, reliability, sustainability, and practical gardening knowledge while guiding visitors toward tool discovery, services, resources, and enquiries.

The visual language combines the warmth of a botanical lifestyle brand with the credibility of a professional gardening-tools company.

The base canvas uses warm botanical neutrals rather than stark white. Deep botanical green carries the primary brand actions, active navigation, important links, icons, and dark sections. Sage and pale botanical greens create supporting surfaces, while cream adds warmth.

Type uses **Manrope for headings and Inter for body/UI**. This pairing is the recommended choice from the supplied font options because Manrope provides a confident, modern, premium heading voice while Inter keeps navigation, descriptions, forms, resources, and technical information exceptionally readable.

The shape language is soft but professional. Buttons use 8–10px corners, content cards use 14–18px corners, image plates use 16–20px corners, and selected feature elements can use pill/circular shapes. The system should feel friendly and natural without becoming overly playful.

The site is photography-first. Realistic gardening, tools, plants, gardens, gardeners, and outdoor lifestyle imagery should carry much of the emotional hierarchy.

### Key Characteristics

- **Botanical green-led palette:** Deep green is the primary brand color and appears consistently but not excessively.
- **Warm neutral canvas:** Cream and off-white surfaces create a natural premium atmosphere.
- **Manrope + Inter:** Manrope handles display hierarchy; Inter handles body and UI.
- **Editorial navigation:** The header is clean and spacious rather than marketplace-oriented.
- **Tool discovery instead of shopping:** Tool categories and tool showcases use editorial cards with descriptions and “View Tool” / “Learn More” actions. There are no prices, carts, checkout flows, or purchase widgets.
- **Photography-first cards:** Large garden/tool photography provides the visual weight.
- **Organic geometry:** Curved image boundaries, leaf motifs, circular icon badges, and soft botanical shapes can be used as secondary visual details.
- **Minimal elevation:** Most surfaces are flat; one restrained shadow tier is used for interactive cards and floating UI.
- **4px base spacing:** Major sections use approximately 64–88px vertical spacing.
- **Conversion through enquiry:** Primary conversion actions are “Get in Touch”, “Request a Quote”, “Ask an Expert”, or “Explore Tools”, depending on context.

---

# Colors

## Brand & Accent

- **Botanical Green** (`{colors.primary}` — `#155A28`): The main brand color. Used for primary CTA backgrounds, active navigation, important icons, links, section accents, and selected feature elements.
- **Deep Botanical** (`{colors.primary-dark}` — `#0E3F1C`): Used for footer backgrounds, dark CTA sections, active/pressed states, and strong contrast areas.
- **Forest Ink** (`{colors.primary-deep}` — `#123B1C`): Very dark green used for strong headings, footer content, and premium editorial moments.
- **Leaf Green** (`{colors.primary-light}` — `#3F7F35`): Supporting brand green for icons, eyebrow labels, secondary actions, and hover states.
- **Sage** (`{colors.sage}` — `#A8C98D`): Soft botanical accent used for highlights, badges, decorative shapes, and secondary CTA surfaces.
- **Sage Light** (`{colors.sage-light}` — `#DCE9C9`): Pale green surface for feature cards, icon circles, and supporting sections.
- **Botanical Tint** (`{colors.botanical-tint}` — `#EEF3E6`): Very light green background used for alternating sections and resource areas.

### Primary Button States

- **Primary Default** (`{colors.primary}` — `#155A28`)
- **Primary Hover** (`{colors.primary-hover}` — `#0E3F1C`)
- **Primary Active** (`{colors.primary-active}` — `#123B1C`)
- **Primary Disabled** (`{colors.primary-disabled}` — `#AFC5A8`)
- **Primary On-Color** (`{colors.on-primary}` — `#FFFFFF`)

The primary green should be recognizable but used with restraint. Large areas of green should be reserved for intentional CTA bands, trust bars, and footer sections.

## Surface

- **Canvas** (`{colors.canvas}` — `#F7F7EF`): Default page background.
- **White Surface** (`{colors.surface-white}` — `#FFFFFF`): Cards, navigation, forms, and clean content blocks.
- **Cream** (`{colors.cream}` — `#F3F1E7`): Warm editorial section background.
- **Cream Light** (`{colors.cream-light}` — `#FAF9F3`): Very subtle alternate surface.
- **Botanical Soft** (`{colors.surface-soft}` — `#EEF3E6`): Soft green content band.
- **Botanical Strong** (`{colors.surface-strong}` — `#DCE9C9`): Stronger sage surface for feature blocks and icon containers.

## Hairlines & Borders

- **Hairline** (`{colors.hairline}` — `#DDE2D6`): Standard 1px border.
- **Hairline Soft** (`{colors.hairline-soft}` — `#E9ECE4`): Very subtle separators.
- **Border Strong** (`{colors.border-strong}` — `#B9C5B4`): Form focus outlines, stronger secondary button borders, and selected states.

Borders should remain quiet. Avoid dark outlines around every component.

## Text

- **Ink** (`{colors.ink}` — `#1B241C`): Primary headings, navigation, titles, and important copy. Never use pure black.
- **Body** (`{colors.body}` — `#3F493F`): Default running text and descriptions.
- **Muted** (`{colors.muted}` — `#69736A`): Secondary information, metadata, captions, helper text, and inactive links.
- **Muted Soft** (`{colors.muted-soft}` — `#8B948C`): Disabled or low-priority text.
- **On Dark** (`{colors.on-dark}` — `#FFFFFF`): Text over deep green backgrounds.
- **On Dark Muted** (`{colors.on-dark-muted}` — `#D7E2D4`): Supporting text on dark green sections.
- **Accent Highlight** (`{colors.accent}` — `#D8A92E`): Used sparingly for review stars or tiny attention markers.
- **Terracotta Botanical** (`{colors.terracotta}` — `#B86F4B`): Optional decorative accent inspired by terracotta planters. Never use as a primary CTA.

## Semantic

- **Success** (`{colors.success}` — `#2E6B3A`): Form success and confirmation states.
- **Error** (`{colors.error}` — `#B63A2B`): Validation and error text.
- **Error Hover** (`{colors.error-hover}` — `#92291F`): Error link hover.
- **Warning** (`{colors.warning}` — `#A56A18`): Warning states.
- **Info** (`{colors.info}` — `#356A72`): Informational messages.

## Scrim

- **Scrim** (`{colors.scrim}` — `#123B1C` at approximately 45–55% opacity): Modal, mobile menu, image lightbox, and overlay backdrop.

---

# Typography

## Font Family

### Recommended Font Pair

**Manrope + Inter**

- **Manrope:** Headings, hero display, section titles, navigation emphasis, card titles, large CTA headlines.
- **Inter:** Body copy, descriptions, forms, metadata, labels, footer, resource content, utility text.

This is the strongest choice from the supplied font options for this website because it balances **premium visual identity + professional readability + modern web UI**.

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');
```

### CSS Font Variables

```css
:root {
  --font-heading: "Manrope", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Recommended fallback

```css
font-family: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

There is no need for a third display font. Avoid mixing too many typefaces.

## Why Manrope + Inter

### Manrope

Use Manrope because it gives:

- Strong but friendly headings
- Modern premium geometry
- Excellent uppercase/small-label rendering
- Good presence over photography
- A contemporary gardening/lifestyle feel
- Enough personality without looking decorative

### Inter

Use Inter because it provides:

- Excellent paragraph readability
- Clear form labels
- Strong navigation legibility
- Good responsive rendering
- Consistent UI sizing
- Reliable browser/platform support

## Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---:|---:|---:|---:|---|
| `{typography.display-xl}` | 56–64px | 700–800 | 1.05–1.10 | -1.5px | Homepage hero heading |
| `{typography.display-lg}` | 44–52px | 700 | 1.08–1.12 | -1px | Major page hero headings |
| `{typography.display-md}` | 36–42px | 700 | 1.12–1.18 | -0.7px | Main section headings |
| `{typography.display-sm}` | 28–34px | 700 | 1.15–1.22 | -0.4px | Sub-section headings |
| `{typography.title-lg}` | 22–26px | 700 | 1.20 | -0.2px | Service/tool card headings |
| `{typography.title-md}` | 18–20px | 700 | 1.25 | 0 | Card titles |
| `{typography.title-sm}` | 16px | 600 | 1.30 | 0 | Footer headings / compact titles |
| `{typography.body-lg}` | 18px | 400 | 1.60 | 0 | Hero supporting text |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default body copy |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | Card descriptions / metadata |
| `{typography.caption}` | 13px | 500 | 1.35 | 0.1px | Labels and supporting text |
| `{typography.caption-sm}` | 12px | 500 | 1.30 | 0.2px | Footer/legal text |
| `{typography.eyebrow}` | 12px | 700 | 1.25 | 1.4px | Section eyebrow / uppercase tag |
| `{typography.button-lg}` | 15px | 600 | 1.20 | 0 | Main CTA |
| `{typography.button-md}` | 14px | 600 | 1.20 | 0 | Standard CTA |
| `{typography.button-sm}` | 13px | 600 | 1.25 | 0 | Compact action |
| `{typography.nav-link}` | 14–15px | 600 | 1.25 | 0 | Primary navigation |
| `{typography.link}` | 14–16px | 500 | 1.45 | 0 | Inline links |

## Principles

The typography should be confident but not overly heavy.

Use 700–800 only for:

- Hero headlines
- Major section titles
- Strong card headings

Use 400–600 for:

- Body text
- Navigation
- Descriptions
- Supporting information

Avoid giant typography that makes the website feel like a fashion portfolio. The visual hierarchy should be shared between typography, photography, whitespace, and botanical color.

### Hero heading recommendation

Desktop:

`56–64px / 700–800`

Mobile:

`38–44px / 700`

Keep the hero headline to approximately 2–3 lines.

---

# Layout

## Spacing System

- **Base unit:** 4px.
- **Micro:** 2px
- **XS:** 4px
- **SM:** 8px
- **MD:** 12px
- **Base:** 16px
- **LG:** 24px
- **XL:** 32px
- **XXL:** 48px
- **Section:** 72px
- **Section Large:** 88px
- **Hero:** 96px+ where appropriate

### Section padding

Desktop:

`72–88px`

Large visual sections:

`88–112px`

Mobile:

`56–64px`

Do not make every section equally tall. Editorial image sections can breathe more; utility sections can be tighter.

### Card internal padding

- Compact cards: 16px
- Standard cards: 20px
- Large editorial cards: 24px
- Dark CTA cards: 24–32px

### Grid gaps

- Dense cards: 16px
- Standard cards: 24px
- Editorial split layouts: 32–48px

## Grid & Container

- **Maximum content width:** approximately `1200px`
- **Wide desktop:** up to `1280px`
- **Mobile horizontal padding:** `16px`
- **Tablet horizontal padding:** `24px`
- **Desktop horizontal padding:** `32px`

### Standard container

```css
.container {
  width: min(1200px, calc(100% - 48px));
  margin-inline: auto;
}
```

For mobile:

```css
.container {
  width: min(100% - 32px, 1200px);
}
```

### Common grids

Tool categories:

- Desktop: 3 or 6 items depending on card style
- Tablet: 2–3 columns
- Mobile: 1 column or horizontal scroll

Services:

- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

Resources:

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

Testimonials:

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

## Whitespace Philosophy

The website should feel open, calm, and premium.

Use larger vertical gaps around:

- Hero
- Brand story
- Community sections
- Major CTA

Use tighter gaps inside:

- Navigation
- Tool grids
- Service cards
- Resource metadata
- Footer links

The contrast creates visual rhythm without excessive whitespace.

---

# Elevation

The system uses a mostly flat visual baseline with one restrained shadow tier.

### Flat

No shadow:

- Main page canvas
- Hero
- Footer
- Large editorial sections
- Most image blocks

### Card

```css
box-shadow:
  0 0 0 1px rgba(18, 59, 28, 0.03),
  0 4px 14px rgba(18, 59, 28, 0.06);
```

Used for:

- Service cards
- Tool showcase cards
- Resource cards
- Testimonial cards
- Floating CTA cards

### Hover

```css
box-shadow:
  0 0 0 1px rgba(18, 59, 28, 0.05),
  0 10px 26px rgba(18, 59, 28, 0.12);
```

Avoid multiple progressive shadow tiers. Depth should primarily come from photography, spacing, borders, and background contrast.

---

# Components

## Buttons

### `button-primary`

- Botanical green fill
- White text
- 8–10px radius
- Minimum 44px height
- 14–15px horizontal padding
- Manrope 600

Used for:

- Get in Touch
- Request a Quote
- Explore Tools
- Ask an Expert
- Contact Us

### `button-primary-hover`

Background:

`#0E3F1C`

Optional:

`translateY(-1px)`

### `button-secondary`

- White / transparent fill
- Botanical green text
- 1px green-tinted border
- 8–10px radius

Used for:

- Learn More
- Browse Resources
- View Services

### `button-secondary-dark`

Used on dark green backgrounds:

- Transparent / white surface
- White text
- 1px rgba(255,255,255,0.55) border

### `button-tertiary-text`

Plain text link.

Example:

`View All Resources →`

No border.

Arrow moves slightly on hover.

### `button-soft`

- Sage-light background
- Botanical green text
- 8–10px radius

Used for secondary compact actions.

---

# Common Header

## `top-nav`

White / warm-white surface.

Desktop height:

`72–80px`

Structure:

```text
LOGO     HOME   ABOUT   TOOLS   SERVICES   RESOURCES   CONTACT     GET IN TOUCH
```

Optional utility strip above:

```text
Quality Tools • Better Gardens                  Mon–Sat | Phone
```

### Header characteristics

- White background
- Thin bottom hairline
- Sticky
- Maximum 1200px content width
- Clean typography
- No shopping cart
- No price indicator
- No ecommerce badges

### Active navigation

Active page:

- Botanical green text
- Optional 2px underline
- Or subtle sage pill background

Do not use heavy filled navigation tabs.

### Mobile header

Show:

- Logo
- Optional phone/contact icon
- Hamburger

The menu opens as a full-width or right-side sheet.

Navigation items:

- Home
- About
- Tools
- Services
- Resources
- Contact

Primary CTA at bottom:

`Get in Touch`

---

# Hero

## `home-hero`

The hero should be the strongest visual statement.

### Layout

Desktop:

Approximately:

`45% text / 55% image`

or an organic asymmetric layout.

### Left content

Eyebrow:

`TOOLS FOR BETTER GARDENS`

Headline:

`Everything You Need to Grow a Better Garden`

Supporting text:

`Reliable gardening tools, practical guidance, and garden solutions designed to make outdoor work easier and more enjoyable.`

Primary CTA:

`Explore Our Tools →`

Secondary CTA:

`Get in Touch`

Supporting trust line:

`Built for gardeners. Designed for lasting performance.`

### Right image

Use a premium realistic garden photograph showing:

- Gardening tools
- Healthy plants
- Garden environment
- Natural sunlight
- Gardening activity
- Warm depth of field

Use an organic curved boundary or soft overlapping image plate.

### Hero floating card

Optional:

```text
QUALITY TOOLS
Practical • Reliable • Built to Last
```

Use a white card with subtle shadow.

---

# Trust / Quick Access Bar

## `trust-bar`

Deep botanical green background.

Four items:

1. Quality Tools
2. Expert Guidance
3. Garden Solutions
4. Reliable Support

Each item:

- 32–40px circular icon
- Heading
- One-line description

Desktop:

4 columns.

Mobile:

2 columns or horizontal scroll.

The bar should create a strong visual transition from hero to content.

---

# About Preview

## `about-preview`

Two-column editorial section.

### Left

Large garden / tool image.

### Right

Eyebrow:

`WHO WE ARE`

Heading:

`Tools That Help You Grow With Confidence`

Body:

Short brand story.

Benefits:

- Quality-focused tools
- Practical garden knowledge
- Reliable support

CTA:

`Discover Our Story →`

Background:

Cream or botanical tint.

---

# Tool Categories

## `tool-category-section`

Eyebrow:

`EXPLORE OUR TOOLS`

Heading:

`Tools for Every Garden Task`

Supporting text:

`Explore practical tools designed for planting, pruning, watering, cultivating, and maintaining beautiful outdoor spaces.`

### Categories

1. Hand Tools
2. Pruning Tools
3. Digging Tools
4. Watering Tools
5. Garden Accessories
6. Professional Tools

### `tool-category-card`

Structure:

```text
Large image
Category label
Short description
Explore →
```

Do not show:

- Price
- Add to Cart
- Buy Now
- Stock quantity
- Discount
- Checkout

The card is for discovery and education.

---

# Why Choose Us

## `why-choose-section`

Split layout.

### Left

Eyebrow:

`WHY CHOOSE US`

Heading:

`Made for the Work Your Garden Demands`

Supporting paragraph.

Four benefit blocks:

01 — Durable Construction  
02 — Comfortable Handling  
03 — Practical Design  
04 — Built for Everyday Use

### Right

Large close-up tool photography.

Use a soft botanical background.

---

# Featured Tools

## `featured-tools`

Eyebrow:

`OUR TOOL RANGE`

Heading:

`Built for Every Gardening Need`

Display 4–6 tool showcase cards.

### `tool-showcase-card`

Each card includes:

- Large image
- Tool name
- Category
- Short description
- View Tool →

Example:

**Professional Pruning Shears**

`Precision cutting for healthy plant growth.`

`Pruning Tools`

`View Tool →`

No commerce controls.

---

# Services

## `services-section`

Eyebrow:

`WHAT WE OFFER`

Heading:

`More Than Just Gardening Tools`

Supporting text:

`Get practical support, guidance, and garden solutions from people who understand the work.`

### Service cards

1. **Garden Tool Selection**
   Choose the right tool for every task.

2. **Garden Setup Assistance**
   Practical help for creating productive garden spaces.

3. **Tool Care & Maintenance**
   Keep tools performing at their best.

4. **Professional Garden Support**
   Solutions for gardeners and professional teams.

### `service-card`

Structure:

```text
Image
Circular icon badge
Title
Description
Learn More →
```

Use realistic photography.

---

# Resources Preview

## `resources-section`

Eyebrow:

`LEARN & GROW`

Heading:

`Helpful Knowledge for Better Gardens`

Supporting text:

`Simple guides, practical tips, and useful information to help you get more from your garden and your tools.`

### Resource cards

1. How to Choose the Right Gardening Tool
2. Essential Tools Every Gardener Should Own
3. How to Clean and Maintain Garden Tools

Each card:

- Image
- Category
- Title
- Short excerpt
- Read Guide →

CTA:

`View All Resources →`

---

# Brand Story / Community

## `community-story`

Use a large panoramic garden image.

Overlay or adjacent content:

Eyebrow:

`GROW TOGETHER`

Heading:

`Growing Better Gardens Together`

Copy:

`We believe better tools create better gardening experiences. Our goal is to help people spend less time struggling with their tools and more time enjoying the spaces they create.`

CTA:

`Learn More About Us →`

Add very subtle botanical line-art.

---

# Testimonials

## `testimonials`

Eyebrow:

`WHAT OUR CUSTOMERS SAY`

Heading:

`Trusted by Gardeners`

Create three testimonial cards.

Each card:

- Small customer image
- Star row
- Review
- Name
- Optional location

Star color:

`#D8A92E`

Review text:

`#3F493F`

Keep reviews approximately 2–4 lines.

Do not make testimonials look like ecommerce reviews.

---

# Final CTA

## `final-cta`

Deep botanical green background.

Headline:

`Ready to Make Gardening Easier?`

Supporting text:

`Tell us what you're working on and we'll help you find the right tools and solutions.`

Primary:

`Get in Touch →`

Secondary:

`Explore Tools`

Use subtle leaf decorations at very low opacity.

This section should feel calm, premium, and helpful rather than sales-heavy.

---

# Newsletter

## `newsletter`

Light botanical background.

Left:

**Stay Connected to Your Garden**

`Get practical gardening tips, useful guides, and seasonal advice.`

Right:

```text
[ Enter your email address ] [ Subscribe → ]
```

Input:

- White surface
- 1px hairline
- 8–10px radius
- 48px height

Subscribe button:

Botanical green.

---

# Footer

## `footer-dark`

Deep botanical green:

`#0E3F1C`

Use a 4–5 column desktop structure.

### Brand

GreenTools logo.

Description:

`Quality gardening tools and practical solutions for healthier, happier garden spaces.`

Social icons.

### Quick Links

- Home
- About
- Tools
- Services
- Resources
- Contact

### Tools

- Hand Tools
- Pruning Tools
- Digging Tools
- Watering Tools
- Garden Accessories

### Contact

- Phone
- Email
- Address
- Business Hours

### Newsletter

- Short description
- Email field
- Subscribe button

### Legal Band

Bottom divider.

Include:

`© 2026 GreenTools. All Rights Reserved.`

Links:

- Privacy Policy
- Terms & Conditions

---

# Iconography

Use a consistent outline icon system.

Recommended:

- Lucide
- React Icons
- Phosphor

Preferred characteristics:

- 1.5–2px visual stroke
- Rounded geometry
- Simple outlines
- Botanical / functional appearance

Suggested icons:

- Leaf
- Sprout
- Scissors
- Shovel
- Droplets
- Sun
- Shield Check
- Wrench
- Book Open
- Users
- Phone
- Mail
- Map Pin
- Calendar
- Tool / Settings

Do not mix multiple icon styles inside the same section.

---

# Imagery

Photography is a core part of the identity.

## Photography Style

Use:

- Realistic professional photography
- Natural daylight
- Warm sunlight
- Real gardens
- Real gardening tools
- Real gardeners
- Real plants
- Shallow depth of field
- Premium editorial composition

### Color treatment

- Natural greens
- Warm highlights
- Soft shadows
- Moderate saturation
- Slightly warm color temperature

Avoid:

- Cartoon illustrations
- Generic corporate stock
- Artificial 3D renders
- Overly saturated greens
- Heavy HDR
- Cold blue lighting
- Excessive filters

## Image Ratios

Hero:

`16:7` to `16:8`

Tool category:

`4:3`

Service:

`16:10`

Resource/blog:

`4:3`

Tool showcase:

`4:3` or `1:1`

Testimonials:

`1:1`

---

# Image Treatment

Use consistent cropping and corner treatment.

### Image radius

`14–20px`

### Image hover

```css
transform: scale(1.03);
```

### Image container

```css
overflow: hidden;
border-radius: 18px;
```

Images should never feel detached from their cards.

---

# Organic Decorative Language

Botanical decorations can include:

- Fine leaf line-art
- Small branch illustrations
- Sprout motifs
- Soft curved shapes
- Botanical corner decorations
- Organic image boundaries

Use primarily:

`#A8C98D`

`#DCE9C9`

`#3F7F35`

Decorations should generally be between 8–20% visual opacity.

Never allow decorative leaves to interfere with readable content.

---

# Forms

## `text-input`

- White background
- 1px hairline
- 8–10px radius
- 48–52px height
- 14–16px horizontal padding

Label:

Inter 13–14px / 600

Placeholder:

Muted

Focus:

```css
border-color: #3F7F35;
box-shadow: 0 0 0 3px rgba(63, 127, 53, 0.10);
```

Avoid bright blue browser-like focus treatments.

## Enquiry Form

Recommended fields:

- Full Name
- Email
- Phone
- Gardening Need
- Tool / Service Interest
- Message

Primary action:

`Send Enquiry →`

Optional dropdown:

`How can we help?`

Options:

- Tool Guidance
- Garden Service
- Professional Tools
- Maintenance & Care
- General Enquiry

---

# Search

Because this is not an e-commerce website, search should be **content/resource oriented**, not product-commerce oriented.

If global search is implemented:

Placeholder:

`Search tools, guides & resources`

Results may include:

- Tool pages
- Categories
- Services
- Gardening guides
- FAQs
- Blog articles

Do not build an ecommerce search experience with price filters or shopping facets.

---

# Tool Detail Page

The Tool Detail page is a static/structured informational template.

Recommended sections:

1. Tool Hero
2. Tool Overview
3. Key Features
4. Specifications
5. How to Use
6. Care & Maintenance
7. Related Tools
8. Enquiry CTA

### Tool detail image

Large photography-first presentation.

### Tool information

Use:

- Tool name
- Category
- Description
- Key features
- Specifications
- Usage guidance

No:

- Price
- Cart
- Checkout
- Quantity selector
- Payment

Primary CTA:

`Enquire About This Tool`

Secondary:

`Explore More Tools`

---

# Service Detail Page

Recommended sections:

1. Service Hero
2. Service Overview
3. What We Provide
4. Benefits
5. Process
6. Supporting Gallery
7. FAQ
8. Enquiry CTA

Service pages should feel consultative and professional.

---

# Resource / Blog Cards

Cards should look editorial.

Structure:

```text
Image
Category
Title
Short description
Read Guide →
```

Metadata should remain quiet.

Example:

`TOOL GUIDE`

`How to Choose the Right Pruning Tool`

`Learn how blade type, handle design, and intended use affect your choice.`

---

# FAQ

Use clean accordion components.

### Closed state

- White background
- Bottom hairline
- Question
- Plus icon

### Open state

- Question remains strong
- Minus icon
- Answer appears beneath
- Slight botanical tint background if desired

Do not use heavy bordered accordion boxes.

---

# Navigation Dropdowns

Dropdowns should be clean and editorial.

Example:

**TOOLS**

- Hand Tools
- Pruning Tools
- Digging Tools
- Watering Tools
- Garden Accessories

**SERVICES**

- Tool Selection
- Garden Setup
- Maintenance
- Professional Support

**RESOURCES**

- Gardening Guides
- Tool Guides
- Seasonal Tips
- FAQ
- Blog

Dropdown:

- White surface
- 12–16px radius
- Minimal shadow
- Generous spacing
- Small botanical icon accents

---

# Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Mobile | `< 744px` | Header becomes logo + hamburger; hero stacks text/image; category grids become 1-up or horizontal scroll; service/resource cards become 1-up; footer becomes accordion/stacked columns. |
| Tablet | `744–1128px` | Navigation remains compact; hero uses 45/55 or stacked layout depending on width; cards become 2-up; footer becomes 2–3 columns. |
| Desktop | `1128–1440px` | Full navigation; hero split layout; tool/service/resource grids use 3–4 columns; footer uses 4–5 columns. |
| Wide | `> 1440px` | Content caps around 1200–1280px; additional viewport space becomes outer gutters; hero photography can expand without stretching text. |

## Touch Targets

- Primary buttons: minimum `44×44px`
- Icon buttons: minimum `44×44px`
- Mobile menu button: minimum `44×44px`
- Accordion controls: minimum `48px` high
- Form controls: minimum `48px` high

## Collapsing Strategy

- Desktop navigation collapses below 744px.
- Tool category grid can become horizontal scroll on mobile when category cards are visual and compact.
- Service/resource grids reduce columns rather than squeezing content.
- Hero moves from side-by-side to vertical.
- Large image galleries become swipeable.
- Footer columns stack cleanly.

---

# Motion & Interaction

Motion should be calm and organic.

## Timing

- Fast: `150–200ms`
- Standard: `200–300ms`
- Large reveal: `400–600ms`

## Recommended interactions

### Cards

```css
transform: translateY(-3px);
```

### Images

```css
transform: scale(1.03);
```

### Buttons

Arrow moves approximately `4px`.

### Navigation

Active underline transitions smoothly.

### Section reveal

Use:

- Fade
- Small upward movement
- Staggered card entrance

Avoid:

- Bounce
- Excessive parallax
- Constant floating elements
- Rapid animations
- Large zoom transitions

---

# Accessibility

Maintain readable contrast throughout.

### Requirements

- Deep green text on light surfaces
- White text on deep green
- Never use sage text on white for important information
- Visible keyboard focus
- Descriptive alt text
- Proper semantic headings
- Buttons with meaningful labels
- Form labels must be visible
- Do not communicate information through color alone
- Interactive elements should have adequate touch targets
- Respect `prefers-reduced-motion`

### Reduced Motion

When the user prefers reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# CSS Design Tokens

```css
:root {
  /* Brand */
  --green-900: #0E3F1C;
  --green-800: #123B1C;
  --green-700: #155A28;
  --green-600: #3F7F35;
  --green-300: #A8C98D;
  --green-200: #DCE9C9;
  --green-100: #EEF3E6;

  /* Neutral */
  --white: #FFFFFF;
  --cream: #F3F1E7;
  --off-white: #F7F7EF;
  --cream-light: #FAF9F3;

  /* Text */
  --text-primary: #1B241C;
  --text-secondary: #3F493F;
  --text-muted: #69736A;
  --text-soft: #8B948C;

  /* Borders */
  --border: #DDE2D6;
  --border-light: #E9ECE4;
  --border-strong: #B9C5B4;

  /* Accent */
  --rating: #D8A92E;
  --terracotta: #B86F4B;

  /* Semantic */
  --success: #2E6B3A;
  --error: #B63A2B;
  --warning: #A56A18;
  --info: #356A72;

  /* Typography */
  --font-heading: "Manrope", sans-serif;
  --font-body: "Inter", sans-serif;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-card:
    0 0 0 1px rgba(18, 59, 28, 0.03),
    0 4px 14px rgba(18, 59, 28, 0.06);

  --shadow-hover:
    0 0 0 1px rgba(18, 59, 28, 0.05),
    0 10px 26px rgba(18, 59, 28, 0.12);

  /* Layout */
  --container-width: 1200px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 72px;
  --space-10: 88px;
  --space-11: 112px;
}
```

---

# Recommended Page Structure

The website hierarchy should remain:

```text
COMMON HEADER
        ↓
HOME
        ↓
ABOUT
        ↓
TOOLS
        ↓
TOOL DETAIL
        ↓
SERVICES
        ↓
RESOURCES
        ↓
CONTACT
        ↓
OPTIONAL BLOG / JOURNAL
        ↓
OPTIONAL FAQ
        ↓
COMMON FOOTER
```

## Home Page Section Flow

```text
COMMON HEADER
        ↓
HERO
        ↓
TRUST / QUICK ACCESS BAR
        ↓
ABOUT PREVIEW
        ↓
FEATURED TOOL CATEGORIES
        ↓
WHY CHOOSE OUR TOOLS
        ↓
FEATURED TOOL SHOWCASE
        ↓
SERVICES
        ↓
RESOURCES
        ↓
COMMUNITY / BRAND STORY
        ↓
TESTIMONIALS
        ↓
FINAL CTA
        ↓
NEWSLETTER
        ↓
COMMON FOOTER
```

---

# Design Rules

## Do

- Use real garden photography.
- Use deep green consistently as the brand anchor.
- Use cream and sage to create visual rhythm.
- Keep typography clean and confident.
- Use Manrope for headings and Inter for body/UI.
- Keep cards rounded but not excessively playful.
- Use subtle shadows.
- Use large photography to create hierarchy.
- Keep CTAs clear and short.
- Treat tool pages as informational/editorial content.
- Make the website feel premium, trustworthy, and practical.

## Do Not

- Do not introduce ecommerce UI.
- Do not show product prices.
- Do not show Add to Cart.
- Do not show checkout.
- Do not show payment methods.
- Do not use discount badges as a major visual element.
- Do not make every section dark green.
- Do not use excessive botanical illustrations.
- Do not use too many fonts.
- Do not use aggressive animations.
- Do not make the website look like a marketplace.

---

# Brand Personality

The final interface should communicate:

**Natural**
→ Connected to gardens and outdoor spaces.

**Professional**
→ Reliable enough for serious gardeners and professionals.

**Helpful**
→ Education and guidance are as important as the tools.

**Premium**
→ Quality photography, typography, spacing, and materials.

**Trustworthy**
→ Clear information, authentic imagery, and straightforward CTAs.

**Sustainable**
→ Botanical palette and responsible visual language without using environmental clichés excessively.

---

# Final Visual Principle

> **Let the garden photography create emotion, deep green establish trust, cream and sage create warmth, and typography provide clarity.**

The website should feel like:

**Premium Gardening Tools Brand + Garden Expertise + Outdoor Lifestyle + Helpful Resource Hub**

—not an online store.

The visitor should understand within seconds:

1. What the company offers.
2. What types of gardening tools are available.
3. Why the tools/company can be trusted.
4. What services and guidance are available.
5. Where to learn more.
6. How to contact the company.
