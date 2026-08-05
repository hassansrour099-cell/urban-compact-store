"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CSSProperties, useEffect, useState } from "react"

const frames = [
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
    callouts: [
      { label: "W 1480mm", style: { top: "18%", left: "8%" } },
      { label: "Fit: studio", style: { top: "72%", left: "12%" }, tape: true },
      { label: "D 780mm", style: { top: "28%", right: "10%" } },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1600&q=80",
    callouts: [
      { label: "Fold flat", style: { top: "20%", left: "10%" }, tape: true },
      { label: "Cable pass", style: { top: "68%", left: "14%" } },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    callouts: [
      { label: "Under-bed clear", style: { top: "22%", left: "8%" }, tape: true },
      { label: "Stack ×2", style: { top: "70%", right: "12%" } },
    ],
  },
]

export default function SpatialHero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % frames.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="uc-spatial-hero">
      <div className="uc-spatial-hero-copy">
        <p className="uc-spatial-kicker">Spatial OS · city apartments</p>
        <h1 className="uc-spatial-title">Furniture that respects the plan.</h1>
        <p className="uc-spatial-sub">
          Urban Compact builds living systems for footprints under pressure—
          measured, modular, and honest about millimeters.
        </p>
        <div className="uc-spatial-actions">
          <LocalizedClientLink href="/store" className="uc-btn-primary">
            Open catalog
          </LocalizedClientLink>
          <LocalizedClientLink href="/categories/living" className="uc-btn-ghost">
            Living specs
          </LocalizedClientLink>
        </div>
        <div className="uc-spatial-specs">
          <div className="uc-spatial-spec">
            <span>Max width</span>
            <strong>1480</strong>
          </div>
          <div className="uc-spatial-spec">
            <span>Rooms</span>
            <strong>04</strong>
          </div>
          <div className="uc-spatial-spec">
            <span>Finishes</span>
            <strong>03</strong>
          </div>
        </div>
      </div>

      <div className="uc-spatial-hero-media">
        {frames.map((frame, i) => (
          <div
            key={frame.image}
            className="uc-spatial-hero-frame"
            style={{
              backgroundImage: `url(${frame.image})`,
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}
        <div className="uc-spatial-overlay" />
        {frames[index].callouts.map((c) => (
          <span
            key={c.label}
            className={`uc-spatial-callout ${c.tape ? "is-tape" : ""}`}
            style={c.style as CSSProperties}
          >
            {c.label}
          </span>
        ))}
        <div className="absolute bottom-4 right-4 z-[2] flex gap-1">
          {frames.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Frame ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 w-6 border-0"
              style={{
                background: i === index ? "#ff5a1f" : "rgba(238,242,247,0.55)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
