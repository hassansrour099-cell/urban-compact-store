"use client"

import { useEffect } from "react"

const TONES = ["plaster", "linen", "oak", "walnut"] as const

/**
 * Sets data-scroll-tone on <html> as homepage sections cross mid-viewport.
 */
export default function ScrollTone() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tone]")
    )
    if (!sections.length) return

    const apply = (tone: string) => {
      document.documentElement.dataset.scrollTone = tone
    }

    if (reduce) {
      apply(sections[0]?.dataset.tone || "plaster")
      return
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.45
        let current = sections[0]?.dataset.tone || "plaster"
        for (const el of sections) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= mid && rect.bottom >= mid * 0.35) {
            current = el.dataset.tone || current
          }
        }
        if (TONES.includes(current as (typeof TONES)[number])) {
          apply(current)
        }
      })
    }

    apply(sections[0]?.dataset.tone || "plaster")
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      delete document.documentElement.dataset.scrollTone
    }
  }, [])

  return null
}
