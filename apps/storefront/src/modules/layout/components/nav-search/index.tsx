"use client"

import { getProductPrice } from "@lib/util/get-product-price"
import { resolveUcProductMedia } from "@lib/util/uc-product-media"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

type SearchHit = {
  id: string
  handle: string
  title: string
  thumbnail: string | null
  price: string | null
}

async function queryCatalog(q: string): Promise<SearchHit[]> {
  const backend =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9002"
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

  const regionRes = await fetch(`${backend}/store/regions`, {
    headers: {
      "x-publishable-api-key": key,
      accept: "application/json",
    },
    cache: "no-store",
  })
  const regionData = regionRes.ok
    ? ((await regionRes.json()) as { regions?: { id: string }[] })
    : { regions: [] }
  const regionId = regionData.regions?.[0]?.id

  const params = new URLSearchParams({
    q,
    limit: "8",
    fields:
      "id,handle,title,thumbnail,*images,*variants.calculated_price,+variants.prices",
  })
  if (regionId) params.set("region_id", regionId)

  const res = await fetch(`${backend}/store/products?${params}`, {
    headers: {
      "x-publishable-api-key": key,
      accept: "application/json",
    },
    cache: "no-store",
  })
  if (!res.ok) return []
  const data = (await res.json()) as { products?: HttpTypes.StoreProduct[] }
  return (data.products || []).map((p) => {
    const media = resolveUcProductMedia(p)
    let price: string | null = null
    try {
      const { cheapestPrice } = getProductPrice({ product: p })
      price = cheapestPrice?.calculated_price || null
    } catch {
      price = null
    }
    return {
      id: p.id,
      handle: p.handle || "",
      title: p.title || "Untitled",
      thumbnail: media.primary,
      price,
    }
  })
}

export default function NavSearch() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const [hits, setHits] = useState<SearchHit[]>([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const pathname = usePathname()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQ("")
    setHits([])
    setActive(0)
    triggerRef.current?.focus()
  }, [])

  const openSearch = useCallback(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 40)
      return () => window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t))
        return
      close()
    }
    document.addEventListener("mousedown", onPointer)
    return () => document.removeEventListener("mousedown", onPointer)
  }, [open, close])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const term = q.trim()
    if (!open || term.length < 2) {
      setHits([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(() => {
      queryCatalog(term)
        .then((list) => {
          setHits(list)
          setActive(0)
        })
        .finally(() => setLoading(false))
    }, 180)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [q, open])

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault()
      const link = document.querySelector<HTMLAnchorElement>(
        `[data-search-hit="${hits[active].id}"]`
      )
      link?.click()
    }
  }

  return (
    <div className="uc-nav-search">
      <button
        ref={triggerRef}
        type="button"
        className={clx("uc-nav-search-trigger", open && "is-open")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : openSearch())}
      >
        Search
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          className="uc-nav-search-panel"
          role="dialog"
          aria-label="Search the atelier"
        >
          <label className="uc-nav-search-field">
            <span className="uc-eyebrow">Search</span>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Piece, room, or finish…"
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <div className="uc-nav-search-results" role="listbox">
            {loading && (
              <p className="uc-nav-search-empty">Looking through the atelier…</p>
            )}
            {!loading && q.trim().length >= 2 && hits.length === 0 && (
              <p className="uc-nav-search-empty">
                Nothing in the atelier matched that. Try a piece name, a room,
                or a finish — oak, linen, steel.
              </p>
            )}
            {!loading &&
              hits.map((hit, i) => (
                <LocalizedClientLink
                  key={hit.id}
                  href={`/products/${hit.handle}`}
                  className={clx(
                    "uc-nav-search-hit",
                    i === active && "is-active"
                  )}
                  role="option"
                  aria-selected={i === active}
                  data-search-hit={hit.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={close}
                >
                  <span className="uc-nav-search-thumb">
                    {hit.thumbnail ? (
                      <Image
                        src={hit.thumbnail}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                        unoptimized
                      />
                    ) : null}
                  </span>
                  <span className="uc-nav-search-meta">
                    <strong>{hit.title}</strong>
                    {hit.price && <span>{hit.price}</span>}
                  </span>
                </LocalizedClientLink>
              ))}
            {!loading && q.trim().length < 2 && (
              <p className="uc-nav-search-empty">
                Type at least two characters to search the collection.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
