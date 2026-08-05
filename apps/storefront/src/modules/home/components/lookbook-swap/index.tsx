"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

const frames = [
  {
    label: "Living",
    href: "/categories/living",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
    note: "Seat deep. Footprint small.",
  },
  {
    label: "Work",
    href: "/categories/work",
    image:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1400&q=80",
    note: "Fold away when the day ends.",
  },
  {
    label: "Sleep",
    href: "/categories/sleep",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    note: "Clear the floor. Keep the calm.",
  },
]

export default function LookbookSwap({ tone = "urban" }: { tone?: "urban" | "street" }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % frames.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [])

  const frame = frames[active]

  return (
    <section className={`lookbook tone-${tone}`}>
      <div className="lookbook-stage">
        {frames.map((f, i) => (
          <div
            key={f.label}
            className={`lookbook-frame ${i === active ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${f.image})` }}
          />
        ))}
        <div className="lookbook-veil" />
        <div className="lookbook-copy content-container">
          <p className={tone === "urban" ? "uc-eyebrow" : "ps-eyebrow"}>
            Lookbook
          </p>
          <h2 className="lookbook-title font-display">{frame.label}</h2>
          <p className="lookbook-note">{frame.note}</p>
          <LocalizedClientLink
            href={frame.href}
            className={tone === "urban" ? "uc-btn-primary" : "ps-btn-primary"}
          >
            Enter {frame.label}
          </LocalizedClientLink>
        </div>
      </div>
      <div className="lookbook-tabs content-container">
        {frames.map((f, i) => (
          <button
            key={f.label}
            type="button"
            className={`lookbook-tab ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="lookbook-tab-index">0{i + 1}</span>
            {f.label}
          </button>
        ))}
      </div>
    </section>
  )
}
