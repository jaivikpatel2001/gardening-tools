import type { PowerSource, ProductCategory, ProductGroup } from "@/types/content";

/**
 * The Jiva Greens product range, as the client publishes it.
 *
 * This list is the client's own, taken entry for entry from the Products menu
 * on jivagreens.com: their products, their names, their order and their two
 * nested ranges. CLAUDE.md makes that site authoritative for product names and
 * terminology, and this file follows it literally. Nothing is added that they
 * do not sell, and nothing they do sell is folded away under a heading of our
 * own invention. An earlier version grouped the range into fourteen categories
 * that read well but were ours rather than theirs; that was replaced in review.
 *
 * Every entry is a product with its own page at `/products/<slug>`. Two of them
 * are ranges the client nests a level deeper, lawn mowers by type and watering
 * by what is on the end of the hose, and those children carry `parent` and get
 * their own pages too. Someone who picks "Garden Solar Lights" lands on garden
 * solar lights, not on a bucket that happens to contain them.
 *
 * `items` is what is inside a range and is omitted on the leaf products, where
 * there is nothing to list. `image` is added only once a product has been
 * photographed; `resources/image-generation.md` holds the slot for every
 * product and the list of the ones still pending. No model name, model number,
 * SKU or measured specification appears anywhere here: `features` and
 * `applications` describe the product, never a data sheet.
 */

export const productGroups: readonly ProductGroup[] = [
  {
    id: "machinery",
    title: "Garden machinery",
    description: "Mowers, cutters, saws, trimmers, blowers and sprayers for lawns, hedges, trees and plots.",
  },
  {
    id: "hand",
    title: "Hand tools & garden care",
    description: "Cutting tools, hand tools, watering, planters, plant protection and garden lighting.",
  },
];

export const powerSourceLabels: Record<PowerSource, string> = {
  manual: "Manual",
  electric: "Electric",
  battery: "Battery",
  petrol: "Petrol",
};

export const productCategories: readonly ProductCategory[] = [
  /* ------------------------------------------------------------------------ */
  /* Lawn mowers, and the six types the client lists under them               */
  /* ------------------------------------------------------------------------ */
  {
    slug: "lawn-mowers",
    group: "machinery",
    title: "Lawn Mowers",
    shortTitle: "Lawn Mowers",
    description:
      "Wheel, rotary, roller and zero-cut mowers for bungalow lawns, society greens, schools and sports grounds.",
    intro:
      "Mowers are chosen by type here, the way the trade actually sells them: wheel-type for a small lawn worked by hand, rotary for general cutting, roller for the striped finish a society green is judged on, and zero-cut where the grass has to come down close. Cutting height matters more to how an Indian lawn looks than motor size ever does.",
    items: [
      { name: "Wheel-type manual lawn mowers" },
      { name: "Rotary type electric lawn mowers" },
      { name: "Roller type electric lawn mowers" },
      { name: "Roller type petrol lawn mowers" },
      { name: "Zero cut lawn mowers" },
      { name: "Other lawn mowers" },
    ],
    features: [
      "Stepped cutting heights, set for Indian grass rather than European lawn turf",
      "Roller types for the striped finish societies and institutions ask for",
      "Grass boxes, spares and blade servicing available long after the sale",
    ],
    applications: [
      "Bungalow and farmhouse lawns",
      "Housing society greens and common plots",
      "School, college and campus grounds",
      "Resort lawns and sports surfaces",
    ],
    powerSources: ["manual", "electric", "battery", "petrol"],
    image: {
      src: "/images/product-lawn-mowers.webp",
      alt: "A green rotary lawn mower with its grass box attached, standing at the crisp edge of a half-mown lawn",
    },
    featured: true,
  },
  {
    slug: "wheel-type-manual-lawn-mower",
    parent: "lawn-mowers",
    group: "machinery",
    title: "Wheel Type Manual Lawn Mower",
    shortTitle: "Wheel Type Manual",
    description: "A push mower with no motor and nothing to go wrong, for small lawns cut often.",
    intro:
      "The quietest mower there is, and the one most Indian bungalow lawns were kept on before power reached the garden. The blades turn off the wheels, so it cuts when you walk and stops when you stop. On a small lawn cut every week it gives a finish a rotary cannot, because it scissors the grass instead of tearing it.",
    features: [
      "No fuel, no cable and no battery, so it starts every time",
      "Scissor cut from a reel and bed knife, which leaves a clean tip",
      "Light enough to carry up terrace steps single handed",
    ],
    applications: [
      "Small bungalow and villa lawns",
      "Terrace and podium lawns with no power point",
      "Weekly cutting where the grass is never long",
      "Quiet early-morning work near bedrooms",
    ],
    powerSources: ["manual"],
  },
  {
    slug: "rotary-type-electric-lawn-mower",
    parent: "lawn-mowers",
    group: "machinery",
    title: "Rotary Type Electric Lawn Mower",
    shortTitle: "Rotary Type Electric",
    description: "A single-phase mower with a grass box, for general cutting on a lawn near a socket.",
    intro:
      "The mower most people mean when they say lawn mower. A blade spins under a deck and throws the cuttings into a box behind, which makes it forgiving on grass that has been left a week too long. Electric, so it wants a cable and a lawn close enough to a socket to reach.",
    features: [
      "Deck and rear grass box, so the lawn is cut and cleared in one pass",
      "Stepped cutting heights for the first cut after the monsoon",
      "Blades that can be sharpened rather than replaced",
    ],
    applications: [
      "Bungalow lawns within reach of a power point",
      "Society gardens with a maintenance socket",
      "Grass that has grown past reel-mower height",
      "Regular cutting through the growing season",
    ],
    powerSources: ["electric"],
    image: {
      src: "/images/product-rotary-type-electric-lawn-mower.webp",
      alt: "A green rotary electric lawn mower with a folding handle and grass box standing on a striped society lawn",
    },
  },
  {
    slug: "roller-type-electric-lawn-mower",
    parent: "lawn-mowers",
    group: "machinery",
    title: "Roller Type Electric Lawn Mower",
    shortTitle: "Roller Type Electric",
    description: "An electric mower with a rear roller, for the striped finish a formal lawn is judged on.",
    intro:
      "The roller behind the blade flattens the grass as the mower passes, which is what lays the stripe. It is the difference between a lawn that is cut and a lawn that looks kept, and it is why societies, clubs and institutions ask for this type by name. The roller also lets the mower run along an edge without a wheel dropping off it.",
    features: [
      "Rear roller that lays the stripe as it cuts",
      "Runs along a bed edge without dropping a wheel",
      "Electric drive, so it stays quiet enough for early mornings",
    ],
    applications: [
      "Society greens and club lawns",
      "Institutional and campus frontages",
      "Formal lawns where the finish is the point",
      "Edges along borders and pathways",
    ],
    powerSources: ["electric"],
  },
  {
    slug: "roller-type-petrol-lawn-mower",
    parent: "lawn-mowers",
    group: "machinery",
    title: "Roller Type Petrol Lawn Mower",
    shortTitle: "Roller Type Petrol",
    description: "The same striped finish without a cable, for lawns too big or too far from a socket.",
    intro:
      "Everything the roller electric does, with a petrol engine instead of a cable. That matters once a lawn is larger than an extension lead or a long way from the nearest socket, which describes most farmhouse lawns, resort grounds and school fields. It is the machine a grounds team reaches for when the whole morning is mowing.",
    features: [
      "Rear roller for the striped finish, with no cable to work around",
      "Sized for continuous work rather than for a single lawn",
      "Filters, plugs and blades stocked, because they are what wear",
    ],
    applications: [
      "Farmhouse and resort lawns",
      "School and college playing fields",
      "Large society greens on a maintenance round",
      "Grounds with no reliable power point",
    ],
    powerSources: ["petrol"],
  },
  {
    slug: "zero-cut-lawn-mower",
    parent: "lawn-mowers",
    group: "machinery",
    title: "Zero Cut Lawn Mower",
    shortTitle: "Zero Cut",
    description: "For grass that has to come down close, on fine lawns and prepared surfaces.",
    intro:
      "A zero cut takes the grass down near the soil, which is what a fine lawn or a prepared playing surface needs and what an ordinary mower cannot do without scalping. It asks for a level lawn in return: on uneven ground it will find every hump. Used properly it is the difference between a lawn and a surface.",
    features: [
      "Cuts close without scalping on a level lawn",
      "Fine adjustment, because at this height a millimetre shows",
      "Blade setting and sharpening handled in-house",
    ],
    applications: [
      "Fine lawns and display grass",
      "Prepared sports and play surfaces",
      "Pre-season renovation cuts",
      "Level, well-established lawns",
    ],
    powerSources: ["electric", "petrol"],
  },
  {
    slug: "other-lawn-mowers",
    parent: "lawn-mowers",
    group: "machinery",
    title: "Other Lawn Mowers",
    shortTitle: "Other Lawn Mowers",
    description: "Battery mowers and the rest of the range, including whatever a particular site turns out to need.",
    intro:
      "The mowers that do not sit neatly in the five types above: battery machines for gardens where a cable is a nuisance and petrol is overkill, and the odd sizes and configurations a particular lawn asks for. This is the entry on the counter list that exists because real gardens keep producing requirements the list did not anticipate.",
    features: [
      "Battery machines with no cable and no fuel to store",
      "Sizes and configurations outside the standard five types",
      "Sourced to the site rather than to the shelf",
    ],
    applications: [
      "Gardens where a trailing cable is impractical",
      "Small grounds with no fuel storage",
      "Replacing a machine that is no longer made",
      "Anything the five standard types do not cover",
    ],
    powerSources: ["manual", "electric", "battery", "petrol"],
  },

  /* ------------------------------------------------------------------------ */
  /* The rest of the machinery, in the client's order                         */
  /* ------------------------------------------------------------------------ */
  {
    slug: "brush-cutters",
    group: "machinery",
    title: "Brush Cutters",
    shortTitle: "Brush Cutters",
    description:
      "Grass cutting machines and trimmers for overgrown plots, farm bunds, orchard floors and roadside verges.",
    intro:
      "Where a mower cannot go and a sickle would take a week. Side-pack and backpack brush cutters for scrub and monsoon growth, lighter trimmers for edges and verges, and the blades, heads and line that are the real running cost of owning one.",
    items: [
      { name: "Petrol brush cutters" },
      { name: "Backpack brush cutters" },
      { name: "Electric and battery grass trimmers" },
      { name: "Blades, heads and trimmer line" },
    ],
    features: [
      "Straight-shaft petrol machines with a harness, for long clearing sessions",
      "Blade and nylon head options for scrub, grass and edging",
      "Consumables and spares kept in stock, not ordered in after a failure",
    ],
    applications: [
      "Clearing plots after the monsoon",
      "Farm bunds and orchard floors",
      "Roadside verges and compound boundaries",
      "Edging around lawns, kerbs and trees",
    ],
    powerSources: ["electric", "battery", "petrol"],
    image: {
      src: "/images/product-brush-cutters.webp",
      alt: "A petrol brush cutter with a bike-style handlebar lying where tall grass meets a freshly cleared strip on a farm bund",
    },
    featured: true,
  },
  {
    slug: "branch-cutters",
    group: "hand",
    title: "Branch Cutters",
    shortTitle: "Branch Cutters",
    description: "Long-handled loppers that take a branch the secateurs cannot, without climbing for it.",
    intro:
      "A branch cutter is what the trade calls a lopper, and it covers the gap between secateurs and a saw: from roughly twenty millimetres of green wood up to a thumb-thick limb. The long handles do the work, which is the whole point, and the telescopic ones reach into a mango or a gulmohar from the ground.",
    items: [
      { name: "Bypass branch cutters" },
      { name: "Anvil branch cutters" },
      { name: "Telescopic branch cutters" },
      { name: "Replacement blades and springs" },
    ],
    features: [
      "Bypass jaws for green wood, anvil for dead, because they are not the same cut",
      "Long handles that put the leverage in the arms rather than the wrists",
      "Telescopic reach for limbs above head height",
    ],
    applications: [
      "Mango, guava and citrus pruning between seasons",
      "Thinning flowering shrubs once they finish",
      "Clearing limbs over a compound wall",
      "Storm damage a saw would be too much for",
    ],
  },
  {
    slug: "chain-saws",
    group: "machinery",
    title: "Chain Saws",
    shortTitle: "Chain Saws",
    description: "Chainsaws and pole saws for storm-damaged trees, overhanging branches and seasonal pruning.",
    intro:
      "For wood, and only for wood. Petrol saws where there is no power and the work is heavy, electric and battery saws for compound and campus use, and pole saws for the overhanging branch that would otherwise need a ladder and a bad idea.",
    items: [
      { name: "Petrol chainsaws" },
      { name: "Electric and battery chainsaws" },
      { name: "Pole saws and tree pruners" },
      { name: "Bars, chains and sharpening" },
    ],
    features: [
      "Bar and chain options matched to the wood actually being cut",
      "Pole saws that reach overhanging limbs from the ground",
      "Chain sharpening, bars and spares supplied alongside the machine",
    ],
    applications: [
      "Storm damage clearance after heavy rain",
      "Seasonal tree pruning on campuses and estates",
      "Overhanging branches above compound walls",
      "Firewood and timber cutting on farms",
    ],
    powerSources: ["electric", "battery", "petrol"],
    image: {
      src: "/images/product-chain-saws.webp",
      alt: "A petrol chainsaw resting on a freshly cut log with a telescopic pole saw leaning against the trunk beside it",
    },
  },
  {
    slug: "hedge-trimmers",
    group: "machinery",
    title: "Hedge Trimmers",
    shortTitle: "Hedge Trimmers",
    description: "Electric, battery and petrol trimmers for boundary hedges, topiary and compound-wall plantings.",
    intro:
      "A hedge is only as good as the last cut down its length. Double-sided blades for straight runs, telescopic reach for the top of a boundary hedge, and a choice of power that depends mostly on how far you are from a socket.",
    items: [
      { name: "Electric hedge trimmers" },
      { name: "Battery hedge trimmers" },
      { name: "Petrol hedge trimmers" },
      { name: "Telescopic hedge trimmers" },
    ],
    features: [
      "Double-sided blades for working both ways along a run",
      "Telescopic shafts for tall boundary hedges without a ladder",
      "Blade sharpening and servicing handled in-house",
    ],
    applications: [
      "Compound wall and boundary hedges",
      "Topiary and formal shaping in institutional gardens",
      "Society landscaping maintenance rounds",
      "Resort and hotel garden upkeep",
    ],
    powerSources: ["electric", "battery", "petrol"],
    image: {
      src: "/images/product-hedge-trimmers.webp",
      alt: "A cordless hedge trimmer with a long double-sided blade resting on top of a neatly squared boundary hedge",
    },
    featured: true,
  },
  {
    slug: "hedge-shears",
    group: "hand",
    title: "Hedge Shears",
    shortTitle: "Hedge Shears",
    description: "Drop-forged shears that shape a hedge by hand, where a machine would be too blunt an instrument.",
    intro:
      "A trimmer cuts a hedge fast. Shears cut it well. On topiary, on a young hedge still being trained, and on the last pass down a formal run, a pair of long drop-forged blades gives a line no powered head will match, and makes no noise doing it.",
    items: [
      { name: "Drop-forged hedge shears" },
      { name: "Wavy-edge hedge shears" },
      { name: "Grass and edging shears" },
      { name: "Single-hand shears" },
    ],
    features: [
      "Drop-forged blades with a wavy edge that holds leaf instead of tearing it",
      "A notch at the pivot for the stem that is thicker than the rest",
      "Shock buffers, because an hour of shearing is felt in the elbows",
    ],
    applications: [
      "Topiary and formal shaping",
      "Training a young hedge to a line",
      "Finishing passes after a powered trimmer",
      "Quiet work close to windows and balconies",
    ],
    image: {
      src: "/images/product-hedge-shears.webp",
      alt: "Drop-forged hedge shears with long wooden handles resting open on top of a clipped flowering hedge",
    },
  },
  {
    slug: "mist-blowers-and-sprayers",
    group: "machinery",
    title: "Mist Blowers & Sprayers",
    shortTitle: "Mist Blowers",
    description: "Powered mist blowers that carry spray up into a canopy a knapsack cannot reach.",
    intro:
      "A knapsack sprayer wets what you can point it at. A mist blower turns the same tank into a cloud and pushes it up into a canopy, through a hedge or down a row, which is what an orchard, a plantation or a tall compound planting needs. It is also how a large area gets covered before the wind picks up.",
    items: [
      { name: "Backpack mist blowers" },
      { name: "Petrol mist blower sprayers" },
      { name: "Nozzles, lances and spare tanks" },
    ],
    features: [
      "Throws spray up into a canopy rather than onto the underside of one leaf",
      "Covers a large area on one tank, before the wind turns",
      "Supplied with the goggles, gloves and mask it needs",
    ],
    applications: [
      "Orchard and plantation spraying rounds",
      "Tall hedges and avenue trees",
      "Mosquito and pest control on campuses",
      "Large society and resort grounds",
    ],
    powerSources: ["battery", "petrol"],
  },
  {
    slug: "blowers",
    group: "machinery",
    title: "Blowers",
    shortTitle: "Blowers",
    description: "Leaf blowers and garden vacuums that clear leaf fall from lawns, paths and parking.",
    intro:
      "Clearing is half of grounds work, and burning leaves is not an answer. A blower moves a morning of leaf fall into a heap in minutes, and a vacuum takes it away shredded, which is the half of the job a rake never finishes.",
    items: [
      { name: "Electric leaf blowers" },
      { name: "Battery leaf blowers" },
      { name: "Petrol blowers" },
      { name: "Blower vacuums" },
    ],
    features: [
      "Blower and vacuum modes in one machine where the site needs both",
      "Shredding on the vacuum, so what comes off the path can go on the beds",
      "Sized for a round rather than for one driveway",
    ],
    applications: [
      "Leaf clearance on campuses, societies and resorts",
      "Path, driveway and parking cleaning",
      "Clearing up after a round of pruning",
      "Gathering material for composting",
    ],
    powerSources: ["electric", "battery", "petrol"],
    image: {
      src: "/images/product-blowers.webp",
      alt: "A leaf blower resting on a paved garden path that is half covered in fallen leaves and petals and half blown clean",
    },
  },
  {
    slug: "sprinklers",
    group: "hand",
    title: "Sprinklers",
    shortTitle: "Sprinklers",
    description: "Rotating, oscillating and impact sprinklers that water a lawn while you do something else.",
    intro:
      "Once a lawn is bigger than a hose and a thumb, a sprinkler is the difference between watering and standing there. Four-arm rotaries for a bungalow lawn, oscillating heads for a rectangle, and brass impact sprinklers where the water is hard and the area is open.",
    items: [
      { name: "Four-arm rotating sprinklers" },
      { name: "Oscillating sprinklers" },
      { name: "Brass impact sprinklers" },
      { name: "Sprinkler bases, spikes and connectors" },
    ],
    features: [
      "Brass bodies, which survive hard water where plastic clouds and sticks",
      "Spike and sled bases, so the same head suits a bed or a lawn",
      "Throw patterns that match a rectangle without watering the path",
    ],
    applications: [
      "Bungalow and society lawns",
      "Open beds and newly laid turf",
      "Nursery standing ground",
      "Watering through a pre-monsoon April",
    ],
  },
  {
    slug: "spray-pumps",
    group: "machinery",
    title: "Spray Pumps",
    shortTitle: "Spray Pumps",
    description: "Knapsack, pressure and battery sprayers for neem oil, bio-pesticides and liquid feed.",
    intro:
      "The sixteen-litre knapsack is the workhorse of Indian plant protection, and most gardens never need anything else. Pressure sprayers for a terrace, battery sprayers once the lever arm has become the limiting factor, and petrol power sprayers when the area is measured in acres.",
    items: [
      { name: "16-litre knapsack spray pumps" },
      { name: "Hand pressure sprayers" },
      { name: "Battery sprayers" },
      { name: "Petrol power sprayers" },
      { name: "Nozzles, lances and seal kits" },
    ],
    features: [
      "Nozzle sets for fine foliar spraying and for coarse drenching",
      "Seals, lances and spares stocked, which is what keeps a sprayer working",
      "Safety goggles, gloves and masks specified with every sprayer",
    ],
    applications: [
      "Pest and disease control in kitchen gardens",
      "Foliar feeding and liquid fertiliser application",
      "Terrace and balcony container plants",
      "Society and campus landscape maintenance",
    ],
    powerSources: ["manual", "battery", "petrol"],
    image: {
      src: "/images/product-spray-pumps.webp",
      alt: "A knapsack spray pump standing between rows of brinjal plants with an amber bottle of neem oil on the soil beside it",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Hand tools and garden care                                               */
  /* ------------------------------------------------------------------------ */
  {
    slug: "plastic-planters-and-stands",
    group: "hand",
    title: "Plastic Planters & Stands",
    shortTitle: "Planters & Stands",
    description: "UV-stable planters, grow bags and metal stands that survive an open terrace.",
    intro:
      "A terrace is a hard place for a pot: full sun from March, forty degrees coming off the floor, and a monsoon that fills anything without a drain hole. Plastic planters that do not go brittle in that, and stands that lift them off the floor so the roots are not cooked and the water can get away.",
    items: [
      { name: "Plastic planters and troughs" },
      { name: "Railing and balcony planters" },
      { name: "Two-tier and multi-pot planter stands" },
      { name: "Grow bags" },
      { name: "Saucers and drip trays" },
    ],
    features: [
      "UV-stable plastic that does not go brittle on an open terrace",
      "Drainage that still works through six weeks of monsoon",
      "Stands that lift a pot off a hot floor and let air under it",
    ],
    applications: [
      "Terrace and balcony container gardens",
      "Railing planting on apartment balconies",
      "Nursery potting on and display",
      "Kitchen gardens grown in bags rather than beds",
    ],
  },
  {
    slug: "cutting-tools",
    group: "hand",
    title: "Cutting Tools",
    shortTitle: "Cutting Tools",
    description: "Secateurs, saws, sickles and grafting knives that cut cleanly and heal fast.",
    intro:
      "A clean cut heals. A crushed one dies back and invites rot, which is why the cutting range is organised by what you are cutting rather than by price. Bypass secateurs for green stems, a saw where a blade would bind, and a daranti for long grass that nothing else beats.",
    items: [
      { name: "Bypass and roll-cut secateurs" },
      { localName: "Kainchi", name: "garden scissors" },
      { name: "Folding and fixed pruning saws" },
      { name: "Bonsai cutters" },
      { name: "Grafting knives and tools" },
      { localName: "Daranti", name: "sickle" },
      { localName: "Kulhadi", name: "axe" },
    ],
    features: [
      "Hardened carbon steel edges that come back with a stone rather than a replacement",
      "Replaceable blades and springs across the secateur range",
      "Bypass and anvil actions stocked separately, because they are different cuts",
    ],
    applications: [
      "Shaping hibiscus, bougainvillea and curry leaf",
      "Mango, guava and citrus pruning between seasons",
      "Grafting and propagation on a nursery bench",
      "Clearing long grass and light scrub by hand",
    ],
    image: {
      src: "/images/product-cutting-tools.webp",
      alt: "Secateurs, a branch cutter, hedge shears and a curved daranti standing against a freshly clipped hedge in flower",
    },
    featured: true,
  },
  {
    slug: "hand-tools",
    group: "hand",
    title: "Hand Tools",
    shortTitle: "Hand Tools",
    description: "Khurpis, trowels, forks, spades and weeders for everything done kneeling or by arm.",
    intro:
      "The tools you pick up first and put down last. Khurpis and trowels for potting on and weeding, forks and cultivators for working a bed over, and the phawda and kudali that break Indian soil once it has set hard. The khurpi has done most of this work in Indian gardens for generations and still does it better than anything brought in to replace it.",
    items: [
      { localName: "Khurpi", name: "hand hoe and weeder" },
      { name: "Hand trowel and transplanter" },
      { name: "Hand fork and cultivator" },
      { localName: "Phawda", name: "digging spade" },
      { localName: "Kudali", name: "hoe" },
      { localName: "Gaiti", name: "pickaxe" },
      { name: "Garden spade and digging fork" },
      { name: "Rake" },
      { localName: "Tasla", name: "iron carrying pan" },
      { name: "Gardening gloves" },
    ],
    features: [
      "Forged and solid-socket heads, so the blade cannot work loose from the handle",
      "Seasoned hardwood grips that stay comfortable at forty degrees",
      "Sized for grow bags and pots as well as for open beds",
    ],
    applications: [
      "Balcony and terrace container gardens",
      "Kitchen garden beds and seed drills",
      "Breaking and turning hard-set black cotton soil",
      "Nursery potting benches and transplanting",
    ],
    image: {
      src: "/images/product-hand-tools.webp",
      alt: "A hand trowel, cultivator, weeder and dibber with wooden handles laid in a row on a weathered bench beside terracotta pots",
    },
    featured: true,
  },

  /* ------------------------------------------------------------------------ */
  /* Watering, and the four the client lists under it                         */
  /* ------------------------------------------------------------------------ */
  {
    slug: "watering-solutions",
    group: "hand",
    title: "Watering Solutions",
    shortTitle: "Watering Solutions",
    description: "Pipes, cans, reels and coiling hose that keep beds alive through a long pre-monsoon summer.",
    intro:
      "Between March and June, watering stops being a chore and becomes the whole job. Garden pipes and reels for a garden you walk around, cans with a fine rose for seedlings, and a coiling hose for a terrace with nowhere to hang anything.",
    items: [
      { name: "Garden pipes" },
      { name: "Watering cans" },
      { name: "Hose reels" },
      { name: "Self coiling hose" },
      { name: "Connectors and spray nozzles" },
    ],
    features: [
      "Reinforced pipe that does not kink at the tap in the first hot week",
      "Fine brass roses that break the flow into rain rather than a jet",
      "Connectors that fit each other, which is not a given",
    ],
    applications: [
      "Terrace and balcony containers through summer",
      "Society lawns and garden borders",
      "Seedlings, nursery trays and young beds",
      "Washing down paths, pots and equipment",
    ],
    image: {
      src: "/images/product-watering-solutions.webp",
      alt: "A galvanised watering can, a wall-mounted hose reel and a rotating sprinkler on a freshly watered terrace",
    },
    featured: true,
  },
  {
    slug: "garden-pipes",
    parent: "watering-solutions",
    group: "hand",
    title: "Garden Pipes",
    shortTitle: "Garden Pipes",
    description: "Reinforced hose in the lengths a real garden needs, sold by the metre or the coil.",
    intro:
      "What most customers call a hose, and the single most replaced item in an Indian garden, because a cheap pipe kinks at the tap, hardens in the sun and splits in the second summer. Reinforced braiding is what stops all three, and the right diameter is what stops the pressure disappearing on a long run.",
    features: [
      "Braided reinforcement, so it does not kink at the tap or split in the sun",
      "Diameters that hold pressure over a long terrace run",
      "Sold by the metre, so a garden gets the length it actually needs",
    ],
    applications: [
      "Terrace and bungalow garden watering",
      "Long runs from a tank or a single tap",
      "Washing down paths, vehicles and equipment",
      "Feeding sprinklers and spray nozzles",
    ],
  },
  {
    slug: "watering-cans",
    parent: "watering-solutions",
    group: "hand",
    title: "Watering Cans",
    shortTitle: "Watering Cans",
    description: "Galvanised and plastic cans with a fine rose, for seedlings a hose would flatten.",
    intro:
      "There is no hose setting gentle enough for a tray of seedlings. A fine brass rose breaks the flow into rain, so the soil surface stays where you put it and the seedlings stay upright. Galvanised for a can that lives outdoors, plastic where weight matters more than life.",
    features: [
      "Fine brass rose that waters like rain instead of a jet",
      "Galvanised bodies that survive being left out in the monsoon",
      "Balanced full or half full, which is what a long spout is for",
    ],
    applications: [
      "Seedlings, nursery trays and young beds",
      "Balcony pots a hose will not reach",
      "Liquid feed measured into the can",
      "Indoor and shaded plants",
    ],
    image: {
      src: "/images/product-watering-cans.webp",
      alt: "A galvanised watering can with a brass rose beside pots of chilli seedlings",
    },
  },
  {
    slug: "hose-reels",
    parent: "watering-solutions",
    group: "hand",
    title: "Hose Reels",
    shortTitle: "Hose Reels",
    description: "Wall-mounted and trolley reels that keep a pipe off the floor and out of the sun.",
    intro:
      "A pipe left lying on a terrace is a pipe that will be replaced next year: it gets walked on, cooked in the sun and kinked where it coils. A reel is the cheapest thing you can do about all three, and a wall-mounted one takes the whole run off the floor.",
    features: [
      "Wall-mounted and trolley types, for a fixed tap or a garden you walk around",
      "Guides the pipe as it winds, which is what stops the kink",
      "Keeps the run off a hot floor and out of the sun",
    ],
    applications: [
      "Terrace gardens with one fixed tap",
      "Bungalow gardens watered on a walk round",
      "Nursery standing ground",
      "Anywhere a pipe is currently coiled on the floor",
    ],
  },
  {
    slug: "self-coiling-hose",
    parent: "watering-solutions",
    group: "hand",
    title: "Self Coiling Hose",
    shortTitle: "Self Coiling Hose",
    description: "A spring hose that pulls itself back, for balconies with nowhere to hang anything.",
    intro:
      "Made for the garden that has no wall to mount a reel on and no floor to spare. It stretches to where you are watering and pulls itself back to the tap when you let go, which on a small balcony is the difference between a hose and a nuisance.",
    features: [
      "Recoils to the tap on its own, so nothing is left underfoot",
      "Stretches to several times its resting length",
      "Light enough to carry out and put away with the pots",
    ],
    applications: [
      "Balconies and small terraces",
      "Apartment gardens with a single tap",
      "Watering a few pots without unrolling a full pipe",
      "Rented spaces where nothing can be wall-mounted",
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Plant care and the last of the counter list                              */
  /* ------------------------------------------------------------------------ */
  {
    slug: "pesticides-and-fertilisers",
    group: "hand",
    title: "Pesticides & Fertilisers",
    shortTitle: "Pesticides & Fertilisers",
    description: "Neem oil, bio-pesticides and plant feed, with honest advice on what a plant actually needs.",
    intro:
      "Most plant problems brought to the counter are a watering problem or a light problem wearing a disguise, and the first job is to say so. For the ones that are not, neem oil and bio-pesticides handle the majority of what an Indian kitchen garden meets, and a measured feed does more than a heavy one.",
    items: [
      { name: "Neem oil and bio-pesticides" },
      { name: "Liquid and granular fertilisers" },
      { name: "Organic manure and soil conditioners" },
      { name: "Micronutrient and foliar feeds" },
    ],
    features: [
      "Bio-pesticides first, because a kitchen garden is food",
      "Feeds sold with the dilution explained, not just the bottle handed over",
      "Stocked alongside the sprayer that will apply them",
    ],
    applications: [
      "Pest and disease control in kitchen gardens",
      "Foliar feeding through the growing season",
      "Soil conditioning before a monsoon sowing",
      "Orchard and plantation rounds",
    ],
  },
  {
    slug: "fountain-nozzles",
    group: "hand",
    title: "Fountain Nozzles",
    shortTitle: "Fountain Nozzles",
    description: "Brass and plastic nozzles that give a water feature its shape.",
    intro:
      "A fountain is a pump, a pipe and a nozzle, and the nozzle is the part anyone actually looks at. Different heads throw a bell, a column, a spray or a ring, and the right one depends as much on how much wind a courtyard gets as on taste.",
    items: [
      { name: "Bell and mushroom nozzles" },
      { name: "Column and jet nozzles" },
      { name: "Spray and ring nozzles" },
      { name: "Adaptors and extension pipes" },
    ],
    features: [
      "Brass bodies, which hold their shape and survive hard water",
      "Patterns chosen for the wind a courtyard actually gets",
      "Standard threads, so a head can be changed without changing the pump",
    ],
    applications: [
      "Courtyard and lobby water features",
      "Temple and institutional fountains",
      "Society garden centrepieces",
      "Resort and hotel landscaping",
    ],
  },
  {
    slug: "garden-solar-lights",
    group: "hand",
    title: "Garden Solar Lights",
    shortTitle: "Garden Solar Lights",
    description: "Path, spike and wall lights that charge all day and need no cable trench.",
    intro:
      "Lighting a garden used to mean digging a trench and calling an electrician. A solar light means pushing a spike into the ground. They charge through the day and come on by themselves at dusk, which is the whole appeal, and the thing that really decides how well one works is how much sun the spot gets, not how bright the box claims to be.",
    items: [
      { name: "Spike path lights" },
      { name: "Wall and pillar lights" },
      { name: "Decorative and string lights" },
      { name: "Replacement batteries" },
    ],
    features: [
      "No cable, no trench and no electrician",
      "Charge through the day and switch on at dusk by themselves",
      "Replaceable batteries, which is what decides how long one lasts",
    ],
    applications: [
      "Garden paths and driveways",
      "Society common plots and walkways",
      "Terrace and balcony ambience",
      "Boundary walls and gateposts",
    ],
  },
];
