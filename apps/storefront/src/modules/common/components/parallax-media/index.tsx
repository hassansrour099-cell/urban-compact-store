"use client"

import { useEffect, useRef } from "react"

export default function ParallaxMedia({
  image,
  className = "",
  intensity = 18,
}: {
  image: string
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const view = window.innerHeight || 1
      const progress = (view - rect.top) / (view + rect.height)
      const offset = (progress - 0.5) * intensity
      el.style.setProperty("--parallax-y", `${offset.toFixed(2)}%`)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [intensity])

  return (
    <div ref={ref} className={`parallax-media ${className}`} aria-hidden>
      <div
        className="parallax-media-inner"
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  )
}
