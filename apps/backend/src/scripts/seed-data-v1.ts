/**
 * Urban Compact — Store 1 catalog v1
 * Small-apartment furniture. Prices in USD (major units).
 */

export const STORE_NAME = "Urban Compact"
export const SEED_VERSION = "v1"

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
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
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
]
