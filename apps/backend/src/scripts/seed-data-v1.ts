/**
 * Urban Compact — Store 1 catalog v1
 * Small-apartment furniture. Prices in USD (major units).
 */

export const STORE_NAME = "Urban Compact"
export const SEED_VERSION = "v3"

function finishVariants(
  skuBase: string,
  prices: { Oak: number; Walnut: number; White: number },
  qty = 20
): SeedVariant[] {
  return (["Oak", "Walnut", "White"] as Finish[]).map((finish) => ({
    title: finish,
    sku: `${skuBase}-${finish.slice(0, 3).toUpperCase()}`,
    finish,
    amount: prices[finish],
    inventory_quantity: qty,
  }))
}

export type Finish = "Oak" | "Walnut" | "White"

export type SeedCategory = {
  name: string
  handle: string
  description: string
}

export type SeedVariant = {
  title: string
  sku: string
  finish: Finish
  amount: number
  inventory_quantity: number
}

export type SeedProduct = {
  title: string
  handle: string
  description: string
  categoryHandles: string[]
  images: string[]
  finishes: Finish[]
  variants: SeedVariant[]
}

export const categories: SeedCategory[] = [
  {
    name: "Living",
    handle: "living",
    description: "Compact seating and tables for small living rooms.",
  },
  {
    name: "Sleep",
    handle: "sleep",
    description: "Bedroom pieces that keep floors clear.",
  },
  {
    name: "Work",
    handle: "work",
    description: "Fold-away desks and slim storage for WFH nooks.",
  },
  {
    name: "Storage",
    handle: "storage",
    description: "Vertical and under-utilized space solutions.",
  },
]

export const products: SeedProduct[] = [
  {
    title: "Compact 2-Seater Sofa",
    handle: "compact-2-seater-sofa",
    description:
      "A deep-seat loveseat under 60 inches wide—built for studio living rooms without sacrificing comfort.",
    categoryHandles: ["living"],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-SOFA-OAK",
        finish: "Oak",
        amount: 649,
        inventory_quantity: 12,
      },
      {
        title: "Walnut",
        sku: "UC-SOFA-WAL",
        finish: "Walnut",
        amount: 699,
        inventory_quantity: 10,
      },
      {
        title: "White",
        sku: "UC-SOFA-WHT",
        finish: "White",
        amount: 649,
        inventory_quantity: 8,
      },
    ],
  },
  {
    title: "Nesting Coffee Table Set",
    handle: "nesting-coffee-table-set",
    description:
      "Two tables that tuck into each other. Pull them apart for guests, nest them when you need floor space.",
    categoryHandles: ["living"],
    images: [
      "https://images.unsplash.com/photo-1578962648525-9bed89f4d826?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut"],
    variants: [
      {
        title: "Oak",
        sku: "UC-NEST-OAK",
        finish: "Oak",
        amount: 189,
        inventory_quantity: 20,
      },
      {
        title: "Walnut",
        sku: "UC-NEST-WAL",
        finish: "Walnut",
        amount: 219,
        inventory_quantity: 16,
      },
    ],
  },
  {
    title: "Fold-Down Wall Desk",
    handle: "fold-down-wall-desk",
    description:
      "Mounts to the wall and folds flat when closed. Cable pass-through and a shallow shelf for a laptop.",
    categoryHandles: ["work"],
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-DESK-OAK",
        finish: "Oak",
        amount: 279,
        inventory_quantity: 15,
      },
      {
        title: "Walnut",
        sku: "UC-DESK-WAL",
        finish: "Walnut",
        amount: 299,
        inventory_quantity: 12,
      },
      {
        title: "White",
        sku: "UC-DESK-WHT",
        finish: "White",
        amount: 269,
        inventory_quantity: 18,
      },
    ],
  },
  {
    title: "Slim Bookcase (5-shelf)",
    handle: "slim-bookcase-5-shelf",
    description:
      "Twelve inches deep, five adjustable shelves. Vertical storage that fits beside a door or radiator.",
    categoryHandles: ["storage", "work"],
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-BOOK-OAK",
        finish: "Oak",
        amount: 159,
        inventory_quantity: 22,
      },
      {
        title: "Walnut",
        sku: "UC-BOOK-WAL",
        finish: "Walnut",
        amount: 179,
        inventory_quantity: 18,
      },
      {
        title: "White",
        sku: "UC-BOOK-WHT",
        finish: "White",
        amount: 149,
        inventory_quantity: 25,
      },
    ],
  },
  {
    title: "Under-Bed Storage Drawer",
    handle: "under-bed-storage-drawer",
    description:
      "Rolling drawer with soft-close runners. Fits under most platform beds; low-profile lid keeps dust out.",
    categoryHandles: ["sleep", "storage"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-UBED-OAK",
        finish: "Oak",
        amount: 99,
        inventory_quantity: 30,
      },
      {
        title: "White",
        sku: "UC-UBED-WHT",
        finish: "White",
        amount: 89,
        inventory_quantity: 35,
      },
    ],
  },
  {
    title: "Modular Nightstand",
    handle: "modular-nightstand",
    description:
      "Narrow nightstand with one drawer and an open cubby. Stack two for a taller bedside tower.",
    categoryHandles: ["sleep"],
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-NITE-OAK",
        finish: "Oak",
        amount: 129,
        inventory_quantity: 24,
      },
      {
        title: "Walnut",
        sku: "UC-NITE-WAL",
        finish: "Walnut",
        amount: 149,
        inventory_quantity: 20,
      },
      {
        title: "White",
        sku: "UC-NITE-WHT",
        finish: "White",
        amount: 119,
        inventory_quantity: 28,
      },
    ],
  },
  {
    title: "Space-Saving Dining Set",
    handle: "space-saving-dining-set",
    description:
      "Drop-leaf table for two to four plus two slim chairs that tuck fully underneath.",
    categoryHandles: ["living"],
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-DINE-OAK",
        finish: "Oak",
        amount: 549,
        inventory_quantity: 8,
      },
      {
        title: "Walnut",
        sku: "UC-DINE-WAL",
        finish: "Walnut",
        amount: 599,
        inventory_quantity: 6,
      },
      {
        title: "White",
        sku: "UC-DINE-WHT",
        finish: "White",
        amount: 529,
        inventory_quantity: 7,
      },
    ],
  },
  {
    title: "Entryway Shoe Bench",
    handle: "entryway-shoe-bench",
    description:
      "Sit-to-lace bench with two open shoe cubbies and a slim top shelf for keys and bags.",
    categoryHandles: ["storage", "living"],
    images: [
      "https://images.unsplash.com/photo-1683181181300-44c0c991a2cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1697998907021-196c2ebc0370?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-SHOE-OAK",
        finish: "Oak",
        amount: 139,
        inventory_quantity: 16,
      },
      {
        title: "Walnut",
        sku: "UC-SHOE-WAL",
        finish: "Walnut",
        amount: 159,
        inventory_quantity: 12,
      },
      {
        title: "White",
        sku: "UC-SHOE-WHT",
        finish: "White",
        amount: 129,
        inventory_quantity: 18,
      },
    ],
  },
  {
    title: "Alcove Writing Desk",
    handle: "alcove-writing-desk",
    description:
      "A 42-inch desk with a shallow drawer and rounded corners — sized for a bedroom alcove or hallway nook.",
    categoryHandles: ["work"],
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-ALCOVE-OAK",
        finish: "Oak",
        amount: 319,
        inventory_quantity: 14,
      },
      {
        title: "Walnut",
        sku: "UC-ALCOVE-WAL",
        finish: "Walnut",
        amount: 349,
        inventory_quantity: 10,
      },
      {
        title: "White",
        sku: "UC-ALCOVE-WHT",
        finish: "White",
        amount: 299,
        inventory_quantity: 16,
      },
    ],
  },
  {
    title: "Task Lamp Stand",
    handle: "task-lamp-stand",
    description:
      "Weighted base and adjustable arm for focused light without crowding a compact desktop.",
    categoryHandles: ["work"],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-LAMP-OAK",
        finish: "Oak",
        amount: 89,
        inventory_quantity: 28,
      },
      {
        title: "Walnut",
        sku: "UC-LAMP-WAL",
        finish: "Walnut",
        amount: 99,
        inventory_quantity: 22,
      },
      {
        title: "White",
        sku: "UC-LAMP-WHT",
        finish: "White",
        amount: 85,
        inventory_quantity: 30,
      },
    ],
  },
  {
    title: "Cable-Ready Monitor Shelf",
    handle: "cable-ready-monitor-shelf",
    description:
      "Raises a monitor and routes cables through a rear channel so the desk surface stays clear.",
    categoryHandles: ["work"],
    images: [
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-MON-OAK",
        finish: "Oak",
        amount: 119,
        inventory_quantity: 20,
      },
      {
        title: "Walnut",
        sku: "UC-MON-WAL",
        finish: "Walnut",
        amount: 129,
        inventory_quantity: 16,
      },
      {
        title: "White",
        sku: "UC-MON-WHT",
        finish: "White",
        amount: 109,
        inventory_quantity: 24,
      },
    ],
  },
  {
    title: "Compact Desk Chair",
    handle: "compact-desk-chair",
    description:
      "Low-profile seat with a quiet swivel base — designed for tight corners, not open-plan offices.",
    categoryHandles: ["work"],
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-CHAIR-OAK",
        finish: "Oak",
        amount: 249,
        inventory_quantity: 18,
      },
      {
        title: "Walnut",
        sku: "UC-CHAIR-WAL",
        finish: "Walnut",
        amount: 269,
        inventory_quantity: 14,
      },
      {
        title: "White",
        sku: "UC-CHAIR-WHT",
        finish: "White",
        amount: 239,
        inventory_quantity: 20,
      },
    ],
  },
  {
    title: "Wall Peg Rail",
    handle: "wall-peg-rail",
    description:
      "A 36-inch oak rail with removable pegs for bags, headphones, and coats beside a desk.",
    categoryHandles: ["work", "storage"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-PEG-OAK",
        finish: "Oak",
        amount: 69,
        inventory_quantity: 40,
      },
      {
        title: "Walnut",
        sku: "UC-PEG-WAL",
        finish: "Walnut",
        amount: 79,
        inventory_quantity: 32,
      },
      {
        title: "White",
        sku: "UC-PEG-WHT",
        finish: "White",
        amount: 65,
        inventory_quantity: 36,
      },
    ],
  },
  {
    title: "Modular Shelf Unit",
    handle: "modular-shelf-unit",
    description:
      "Open cubbies you can stack two high. Keeps books and baskets off the floor without a bulky wardrobe.",
    categoryHandles: ["storage"],
    images: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-SHELF-OAK",
        finish: "Oak",
        amount: 199,
        inventory_quantity: 18,
      },
      {
        title: "Walnut",
        sku: "UC-SHELF-WAL",
        finish: "Walnut",
        amount: 229,
        inventory_quantity: 14,
      },
      {
        title: "White",
        sku: "UC-SHELF-WHT",
        finish: "White",
        amount: 189,
        inventory_quantity: 20,
      },
    ],
  },
  {
    title: "Slim Wardrobe Cabinet",
    handle: "slim-wardrobe-cabinet",
    description:
      "Twenty-four inches wide with a hanging rod and two lower drawers — closet capacity without a full wall.",
    categoryHandles: ["storage"],
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-WARD-OAK",
        finish: "Oak",
        amount: 449,
        inventory_quantity: 9,
      },
      {
        title: "Walnut",
        sku: "UC-WARD-WAL",
        finish: "Walnut",
        amount: 489,
        inventory_quantity: 7,
      },
      {
        title: "White",
        sku: "UC-WARD-WHT",
        finish: "White",
        amount: 429,
        inventory_quantity: 10,
      },
    ],
  },
  {
    title: "Storage Ottoman",
    handle: "storage-ottoman",
    description:
      "Upholstered seat with a lift-off lid — hides throws and board games under a living-room footprint.",
    categoryHandles: ["storage", "living"],
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-OTTO-OAK",
        finish: "Oak",
        amount: 179,
        inventory_quantity: 15,
      },
      {
        title: "Walnut",
        sku: "UC-OTTO-WAL",
        finish: "Walnut",
        amount: 199,
        inventory_quantity: 12,
      },
      {
        title: "White",
        sku: "UC-OTTO-WHT",
        finish: "White",
        amount: 169,
        inventory_quantity: 16,
      },
    ],
  },
  {
    title: "Ladder Shelf",
    handle: "ladder-shelf",
    description:
      "Leaning five-tier shelf that uses vertical space with a light footprint against the wall.",
    categoryHandles: ["storage"],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: [
      {
        title: "Oak",
        sku: "UC-LADDER-OAK",
        finish: "Oak",
        amount: 149,
        inventory_quantity: 22,
      },
      {
        title: "Walnut",
        sku: "UC-LADDER-WAL",
        finish: "Walnut",
        amount: 169,
        inventory_quantity: 18,
      },
      {
        title: "White",
        sku: "UC-LADDER-WHT",
        finish: "White",
        amount: 139,
        inventory_quantity: 24,
      },
    ],
  },
  {
    title: "Lounge Accent Chair",
    handle: "lounge-accent-chair",
    description:
      "Compact lounge chair with a sculpted seat and oak legs. Soft presence for a reading corner.",
    categoryHandles: ["living"],
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-LOUNGE", { Oak: 349, Walnut: 379, White: 329 }),
  },
  {
    title: "Low Media Console",
    handle: "low-media-console",
    description:
      "Low console with cable pass-through and soft-close doors. Keeps the living wall quiet.",
    categoryHandles: ["living"],
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-LMEDIA", { Oak: 429, Walnut: 459, White: 399 }),
  },
  {
    title: "Side Table Pair",
    handle: "side-table-pair",
    description:
      "Two nesting side tables that stack into one footprint when not needed.",
    categoryHandles: ["living"],
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-SIDET", { Oak: 189, Walnut: 209, White: 169 }),
  },
  {
    title: "Platform Daybed Frame",
    handle: "platform-daybed-frame",
    description:
      "Low platform daybed that reads as seating by day and a guest bed by night.",
    categoryHandles: ["sleep", "living"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-DAYBED", {
      Oak: 599,
      Walnut: 649,
      White: 569,
    }),
  },
  {
    title: "Slim Headboard Panel",
    handle: "slim-headboard-panel",
    description:
      "Wall-mounted headboard panel with soft linen wrap. Adds height without eating floor.",
    categoryHandles: ["sleep"],
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-HEADBD", {
      Oak: 249,
      Walnut: 269,
      White: 229,
    }),
  },
  {
    title: "Linen Bedding Bench",
    handle: "linen-bedding-bench",
    description:
      "End-of-bed bench with a lift-top for spare linens. Quiet oak frame, linen seat.",
    categoryHandles: ["sleep"],
    images: [
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-LBENCH", {
      Oak: 279,
      Walnut: 299,
      White: 259,
    }),
  },
  {
    title: "Bedside Wall Shelf",
    handle: "bedside-wall-shelf",
    description:
      "Floating bedside shelf with a discreet lip. Phone, book, and lamp — no nightstand needed.",
    categoryHandles: ["sleep"],
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-BWALL", { Oak: 89, Walnut: 99, White: 79 }),
  },
  {
    title: "Compact Dresser 3-Drawer",
    handle: "compact-dresser-3-drawer",
    description:
      "Three-drawer dresser scaled for alcoves. Soft-close drawers, calm flush fronts.",
    categoryHandles: ["sleep", "storage"],
    images: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
    ],
    finishes: ["Oak", "Walnut", "White"],
    variants: finishVariants("UC-DRESSR", {
      Oak: 449,
      Walnut: 479,
      White: 419,
    }),
  },
]
