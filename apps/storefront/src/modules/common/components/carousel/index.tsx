"use client"

import { clx } from "@modules/common/components/ui"
import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

type CarouselProps = {
  children: ReactNode
  className?: string
  trackClassName?: string
  itemClassName?: string
  /** Brand skin: urban | street */
  tone?: "urban" | "street"
  autoPlayMs?: number
  showControls?: boolean
  label?: string
}

export default function Carousel({
  children,
  className,
  trackClassName,
  itemClassName,
  tone = "urban",
  autoPlayMs,
  showControls = true,
  label = "Carousel",
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const items = Children.toArray(children)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth - 4
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max)
  }, [])

  const scrollByPage = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.85, 280)
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update, items.length])

  useEffect(() => {
    if (!autoPlayMs) return
    const id = window.setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const max = el.scrollWidth - el.clientWidth - 4
      if (el.scrollLeft >= max) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        scrollByPage(1)
      }
    }, autoPlayMs)
    return () => window.clearInterval(id)
  }, [autoPlayMs])

  return (
    <div className={clx("brand-carousel relative", `tone-${tone}`, className)}>
      {showControls && (
        <div className="brand-carousel-controls">
          <button
            type="button"
            aria-label={`${label} previous`}
            className="brand-carousel-btn"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
          >
            ←
          </button>
          <button
            type="button"
            aria-label={`${label} next`}
            className="brand-carousel-btn"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
          >
            →
          </button>
        </div>
      )}
      <div
        ref={trackRef}
        className={clx("brand-carousel-track no-scrollbar", trackClassName)}
        role="region"
        aria-label={label}
      >
        {items.map((child, i) => (
          <div key={i} className={clx("brand-carousel-item", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
