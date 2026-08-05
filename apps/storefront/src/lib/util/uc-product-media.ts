/**
 * Presentational media helpers for Urban Compact.
 * Ensures every piece has a primary + distinct detail/hover crop.
 */

const DETAIL: Record<string, { primary: string; detail: string }> = {
  "compact-2-seater-sofa": {
    primary:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80",
  },
  "nesting-coffee-table-set": {
    primary:
      "https://images.unsplash.com/photo-1578962648525-9bed89f4d826?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1400&q=80",
  },
  "fold-down-wall-desk": {
    primary:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
  },
  "slim-bookcase-5-shelf": {
    primary:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
  },
  "under-bed-storage-drawer": {
    primary:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  "modular-nightstand": {
    primary:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1400&q=80",
  },
  "space-saving-dining-set": {
    primary:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1400&q=80",
  },
  "entryway-shoe-bench": {
    primary:
      "https://images.unsplash.com/photo-1683181181300-44c0c991a2cf?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1697998907021-196c2ebc0370?auto=format&fit=crop&w=1400&q=80",
  },
  "alcove-writing-desk": {
    primary:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1400&q=80",
  },
  "task-lamp-stand": {
    primary:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1400&q=80",
  },
  "cable-ready-monitor-shelf": {
    primary:
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
  },
  "compact-desk-chair": {
    primary:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1400&q=80",
  },
  "wall-peg-rail": {
    primary:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=1400&q=80",
  },
  "modular-shelf-unit": {
    primary:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1400&q=80",
  },
  "slim-wardrobe-cabinet": {
    primary:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
  },
  "storage-ottoman": {
    primary:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80",
  },
  "ladder-shelf": {
    primary:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1400&q=80",
  },
  "lounge-accent-chair": {
    primary:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
  },
  "low-media-console": {
    primary:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
  },
  "side-table-pair": {
    primary:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=1400&q=80",
  },
  "platform-daybed-frame": {
    primary:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
  },
  "slim-headboard-panel": {
    primary:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
  },
  "linen-bedding-bench": {
    primary:
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  "bedside-wall-shelf": {
    primary:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1400&q=80",
  },
  "compact-dresser-3-drawer": {
    primary:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80",
    detail:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1400&q=80",
  },
}

function asDetailCrop(url: string) {
  if (url.includes("images.unsplash.com")) {
    const base = url.split("?")[0]
    return `${base}?auto=format&fit=crop&w=1200&h=1500&q=80&crop=entropy`
  }
  return url
}

export function resolveUcProductMedia(product: {
  handle?: string | null
  thumbnail?: string | null
  images?: { url?: string | null }[] | null
}) {
  const handle = product.handle || ""
  const override = DETAIL[handle]
  const apiPrimary = product.thumbnail || product.images?.[0]?.url || null
  const apiSecondary =
    product.images?.[1]?.url &&
    product.images[1].url !== product.images[0]?.url
      ? product.images[1].url
      : null

  const primary = override?.primary || apiPrimary
  const secondary =
    override?.detail ||
    apiSecondary ||
    (primary ? asDetailCrop(primary) : null)

  return { primary, secondary }
}
