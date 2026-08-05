export type UcRoom =
  | "living"
  | "sleep"
  | "work"
  | "storage"
  | "collection"

const ROOMS: UcRoom[] = ["living", "sleep", "work", "storage"]

/** Catalog handles mapped to rooms for reliable accents. */
const HANDLE_ROOM: Record<string, UcRoom> = {
  "compact-2-seater-sofa": "living",
  "nesting-coffee-table-set": "living",
  "space-saving-dining-set": "living",
  "entryway-shoe-bench": "living",
  "storage-ottoman": "storage",
  "modular-nightstand": "sleep",
  "under-bed-storage-drawer": "sleep",
  "fold-down-wall-desk": "work",
  "alcove-writing-desk": "work",
  "task-lamp-stand": "work",
  "cable-ready-monitor-shelf": "work",
  "compact-desk-chair": "work",
  "wall-peg-rail": "work",
  "slim-bookcase-5-shelf": "storage",
  "modular-shelf-unit": "storage",
  "slim-wardrobe-cabinet": "storage",
  "ladder-shelf": "storage",
}

export function isUcRoom(value: string | null | undefined): value is UcRoom {
  return !!value && (ROOMS as string[]).includes(value)
}

/** Infer room from product title/handle when categories aren't loaded. */
export function inferUcRoomFromText(text: string): UcRoom {
  const t = text.toLowerCase()
  if (
    t.includes("sofa") ||
    t.includes("lounge") ||
    t.includes("coffee") ||
    t.includes("dining") ||
    t.includes("entryway") ||
    t.includes("shoe")
  ) {
    return "living"
  }
  if (
    t.includes("nightstand") ||
    t.includes("bed") ||
    t.includes("sleep") ||
    t.includes("mattress")
  ) {
    return "sleep"
  }
  if (
    t.includes("bookcase") ||
    t.includes("shelf") ||
    t.includes("storage") ||
    t.includes("cabinet")
  ) {
    return "storage"
  }
  if (t.includes("desk") || t.includes("work") || t.includes("office")) {
    return "work"
  }
  return "collection"
}

export function resolveUcRoom(input: {
  roomHint?: string | null
  categories?: { handle?: string | null }[] | null
  handle?: string | null
  title?: string | null
}): UcRoom {
  if (isUcRoom(input.roomHint || "")) {
    return input.roomHint as UcRoom
  }

  const handle = input.handle || ""
  if (HANDLE_ROOM[handle]) return HANDLE_ROOM[handle]

  const fromCats = (input.categories || [])
    .map((c) => c.handle || "")
    .find((h) => isUcRoom(h))
  if (fromCats) return fromCats

  return inferUcRoomFromText(`${handle} ${input.title || ""}`)
}
