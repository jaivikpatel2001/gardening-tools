import type { PowerSource, ToolCategory, ToolGroup } from "@/types/content";

/**
 * The complete GreenTools range.
 *
 * Two groups: the traditional and hand tools Indian gardens have always been
 * worked with, and the electric, battery and petrol machinery that modern
 * lawns, estates, farms and grounds teams rely on. Every category exists
 * because it has a genuine gardening or landscaping use, not to pad the count.
 *
 * Indian names are the most widely understood Hindi terms. Regional names vary
 * (a phawda is a kassi in Punjab, for example), so `localName` is a helpful
 * signpost rather than a complete glossary.
 *
 * `image` is added only once a category has been photographed; see
 * `resources/image-generation.md` for the pending slots. `featured` categories
 * with an image appear as cards on the Home page. Every category, photographed
 * or not, appears in the complete range index.
 */

export const toolGroups: readonly ToolGroup[] = [
  {
    id: "hand",
    title: "Traditional & hand tools",
    description: "Khurpis, phawdas, sickles and secateurs: the manual tools behind every bed, border and field.",
  },
  {
    id: "machinery",
    title: "Power & garden machinery",
    description: "Electric, battery and petrol equipment for lawns, hedges, trees, soil, spraying and water.",
  },
];

export const powerSourceLabels: Record<PowerSource, string> = {
  manual: "Manual",
  electric: "Electric",
  battery: "Battery",
  petrol: "Petrol",
};

export const toolCategories: readonly ToolCategory[] = [
  /* ------------------------------------------------------------------------ */
  /* Traditional & hand tools                                                 */
  /* ------------------------------------------------------------------------ */
  {
    slug: "hand-tools",
    group: "hand",
    title: "Hand Tools & Planting",
    shortTitle: "Hand Tools",
    description:
      "Khurpis, trowels, forks and weeders for close work in grow bags, terrace pots and kitchen garden beds.",
    tools: [
      { localName: "Khurpi", name: "hand hoe and weeder" },
      { name: "Hand trowel" },
      { name: "Transplanter" },
      { name: "Hand fork" },
      { name: "Hand cultivator" },
      { name: "Hand weeder" },
      { name: "Dibber" },
    ],
    image: {
      src: "/images/category-hand-tools.webp",
      alt: "A hand trowel, hand fork and weeder with hardwood handles laid out on a weathered wooden bench beside potted herbs",
    },
    featured: true,
  },
  {
    slug: "digging-tools",
    group: "hand",
    title: "Digging & Soil Preparation",
    shortTitle: "Digging Tools",
    description:
      "Phawdas, kudalis, gaitis and spades for breaking, turning and levelling black cotton, red and laterite soil.",
    tools: [
      { localName: "Phawda", name: "digging spade" },
      { localName: "Kudali", name: "hoe" },
      { localName: "Gaiti", name: "pickaxe" },
      { localName: "Belcha", name: "shovel" },
      { localName: "Sabbal", name: "crowbar" },
      { name: "Garden spade" },
      { name: "Digging fork" },
      { name: "Rake" },
    ],
    image: {
      src: "/images/category-digging-tools.webp",
      alt: "A garden spade and digging fork standing upright in freshly turned dark soil",
    },
    featured: true,
  },
  {
    slug: "pruning-tools",
    group: "hand",
    title: "Pruning & Cutting",
    shortTitle: "Pruning Tools",
    description:
      "Secateurs, loppers, saws, sickles and axes that cut hibiscus, mango branches and thick grass cleanly.",
    tools: [
      { name: "Secateurs (pruning shears)" },
      { localName: "Kainchi", name: "garden scissors" },
      { name: "Loppers" },
      { name: "Hedge and grass shears" },
      { name: "Pruning saw" },
      { localName: "Daranti", name: "sickle" },
      { localName: "Kulhadi", name: "axe" },
    ],
    image: {
      src: "/images/category-pruning-tools.webp",
      alt: "Bypass secateurs and loppers resting beside a freshly pruned shrub with cuttings on the ground",
    },
    featured: true,
  },
  {
    slug: "watering-tools",
    group: "hand",
    title: "Watering Tools",
    shortTitle: "Watering Tools",
    description:
      "Watering cans, hose pipes, reels, nozzles and sprinklers that keep beds alive through a long pre-monsoon summer.",
    tools: [
      { name: "Watering cans" },
      { name: "Garden hose pipes" },
      { name: "Hose reels" },
      { name: "Spray guns and nozzles" },
      { name: "Sprinklers" },
      { name: "Hose connectors" },
    ],
    image: {
      src: "/images/category-watering-tools.webp",
      alt: "A galvanised watering can with a brass rose beside a bed of freshly watered seedlings",
    },
    featured: true,
  },
  {
    slug: "garden-utility",
    group: "hand",
    title: "Garden Utility & Harvesting",
    shortTitle: "Garden Utility",
    description:
      "Taslas, wheelbarrows, trolleys and fruit pickers for moving soil, shifting heavy pots and bringing in the mango crop.",
    tools: [
      { localName: "Tasla", name: "iron carrying pan" },
      { name: "Wheelbarrow" },
      { name: "Garden and pot trolleys" },
      { name: "Fruit picker" },
      { name: "Harvesting knife" },
      { name: "Leaf collector" },
    ],
  },
  {
    slug: "garden-accessories",
    group: "hand",
    title: "Garden Accessories & Safety",
    shortTitle: "Garden Accessories",
    description:
      "Gloves, grow bags, jute twine, labels, tool storage and the safety gear that every power tool calls for.",
    tools: [
      { name: "Gardening gloves" },
      { name: "Knee pads" },
      { name: "Grow bags" },
      { name: "Jute twine and plant ties" },
      { name: "Plant labels" },
      { name: "Tool storage" },
      { name: "Safety goggles and ear protection" },
    ],
    image: {
      src: "/images/category-garden-accessories.webp",
      alt: "Gardening gloves, jute twine and wooden plant labels arranged on a potting bench",
    },
    featured: true,
  },

  /* ------------------------------------------------------------------------ */
  /* Power & garden machinery                                                 */
  /* ------------------------------------------------------------------------ */
  {
    slug: "lawn-mowers",
    group: "machinery",
    title: "Lawn Mowers & Lawn Cutters",
    shortTitle: "Lawn Mowers",
    description:
      "Cylinder, rotary and self-propelled mowers for bungalow lawns, society greens, schools and sports grounds.",
    tools: [
      { name: "Manual cylinder mowers" },
      { name: "Electric rotary mowers" },
      { name: "Battery lawn mowers" },
      { name: "Petrol lawn mowers" },
      { name: "Self-propelled mowers" },
    ],
    powerSources: ["manual", "electric", "battery", "petrol"],
  },
  {
    slug: "brush-cutters",
    group: "machinery",
    title: "Brush Cutters & Grass Trimmers",
    shortTitle: "Brush Cutters",
    description:
      "Grass cutting machines and trimmers for overgrown plots, farm bunds, orchard floors and roadside verges.",
    tools: [
      { name: "Petrol brush cutters" },
      { name: "Backpack brush cutters" },
      { name: "Battery grass trimmers" },
      { name: "Electric line trimmers" },
      { name: "Blades, heads and trimmer line" },
    ],
    powerSources: ["electric", "battery", "petrol"],
  },
  {
    slug: "hedge-trimmers",
    group: "machinery",
    title: "Hedge Trimmers",
    shortTitle: "Hedge Trimmers",
    description:
      "Electric, battery and petrol trimmers for boundary hedges, topiary and long compound-wall plantings.",
    tools: [
      { name: "Electric hedge trimmers" },
      { name: "Battery hedge trimmers" },
      { name: "Petrol hedge trimmers" },
      { name: "Telescopic hedge trimmers" },
    ],
    powerSources: ["electric", "battery", "petrol"],
  },
  {
    slug: "chainsaws",
    group: "machinery",
    title: "Chainsaws & Pole Saws",
    shortTitle: "Chainsaws",
    description:
      "Chainsaws, pole saws and tree pruners for storm-damaged trees, overhanging branches and seasonal pruning.",
    tools: [
      { name: "Petrol chainsaws" },
      { name: "Electric chainsaws" },
      { name: "Battery chainsaws" },
      { name: "Pole saws" },
      { name: "Tree pruners" },
    ],
    powerSources: ["manual", "electric", "battery", "petrol"],
  },
  {
    slug: "tillers",
    group: "machinery",
    title: "Tillers & Cultivators",
    shortTitle: "Tillers",
    description:
      "Mini tillers, power weeders and earth augers for bed preparation, kitchen gardens, orchards and fencing work.",
    tools: [
      { name: "Mini tillers" },
      { name: "Power weeders" },
      { name: "Electric cultivators" },
      { name: "Earth augers" },
    ],
    powerSources: ["electric", "petrol"],
  },
  {
    slug: "sprayers",
    group: "machinery",
    title: "Sprayers & Plant Protection",
    shortTitle: "Sprayers",
    description:
      "Knapsack, pressure, battery and power sprayers for neem oil, bio-pesticides and liquid fertiliser.",
    tools: [
      { name: "Knapsack sprayers" },
      { name: "Pressure sprayers" },
      { name: "Battery sprayers" },
      { name: "Petrol power sprayers" },
      { name: "Mist blowers" },
    ],
    powerSources: ["manual", "battery", "petrol"],
  },
  {
    slug: "blowers",
    group: "machinery",
    title: "Blowers, Vacuums & Shredders",
    shortTitle: "Blowers & Shredders",
    description:
      "Leaf blowers, garden vacuums and shredders that clear leaf fall and turn prunings into mulch and compost.",
    tools: [
      { name: "Leaf blowers" },
      { name: "Blower vacuums" },
      { name: "Garden vacuum machines" },
      { name: "Garden shredders" },
      { name: "Wood chippers" },
    ],
    powerSources: ["electric", "battery", "petrol"],
  },
  {
    slug: "irrigation",
    group: "machinery",
    title: "Irrigation & Water Pumps",
    shortTitle: "Irrigation",
    description:
      "Drip kits, rain guns, timers and water pumps that stretch every litre across terraces, farms and nurseries.",
    tools: [
      { name: "Drip irrigation kits" },
      { name: "Micro sprinklers" },
      { name: "Rain guns" },
      { name: "Irrigation timers" },
      { name: "Electric water pumps" },
      { name: "Petrol water pumps" },
    ],
    powerSources: ["electric", "petrol"],
  },
];
