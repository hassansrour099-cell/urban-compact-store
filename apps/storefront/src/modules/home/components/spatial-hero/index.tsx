"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useRef, useState } from "react"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"

const finishes = [
  {
    id: "oak",
    label: "Oiled oak",
    detail: "Warm grain · matte oil finish",
    tint: "rgba(92, 64, 51, 0.42)",
    grain: "rgba(62, 40, 28, 0.22)",
    strip: "rgba(92, 64, 51, 0.12)",
    grade: "linear-gradient(135deg, #7a5640, #5c4033 55%, #3f2b22)",
  },
  {
    id: "linen",
    label: "Raw linen",
    detail: "Soft textile · natural weave",
    tint: "rgba(212, 205, 194, 0.55)",
    grain: "rgba(180, 170, 155, 0.28)",
    strip: "rgba(212, 205, 194, 0.22)",
    grade: "linear-gradient(135deg, #e4ddd2, #d4cdc2 50%, #c2b9ab)",
  },
  {
    id: "steel",
    label: "Brushed steel",
    detail: "Hardware & frame accents",
    tint: "rgba(142, 144, 140, 0.48)",
    grain: "rgba(90, 92, 88, 0.25)",
    strip: "rgba(142, 144, 140, 0.18)",
    grade: "linear-gradient(135deg, #b8bab6, #8e908c 45%, #6f716e)",
  },
] as const

export default function SpatialHero() {
  const [ready, setReady] = useState(false)
  const [finish, setFinish] = useState<(typeof finishes)[number]["id"]>("oak")
  const [reduce, setReduce] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduce(mq.matches)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener("change", onChange)
    const boot = window.setTimeout(
      () => setReady(true),
      mq.matches ? 0 : 180
    )
    return () => {
      mq.removeEventListener("change", onChange)
      window.clearTimeout(boot)
    }
  }, [])

  useEffect(() => {
    const active = finishes.find((f) => f.id === finish) || finishes[0]
    document.documentElement.style.setProperty("--uc-finish", finish)
    document.documentElement.style.setProperty("--uc-finish-strip", active.strip)
    document.documentElement.dataset.ucFinish = finish
  }, [finish])

  useEffect(() => {
    if (reduce) return
    const media = mediaRef.current
    const copy = copyRef.current
    const stage = stageRef.current
    if (!media || !copy || !stage) return

    const mobile = window.matchMedia("(max-width: 768px)").matches
    if (mobile) return
    const intensity = 0.22
    let raf = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect()
        const viewH = window.innerHeight || 1
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height + viewH * 0.35)))
        const y = progress * 48 * intensity * 4
        media.style.transform = `translate3d(0, ${y}px, 0)`
        copy.style.transform = `translate3d(0, ${y * 0.35}px, 0)`
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      media.style.transform = ""
      copy.style.transform = ""
    }
  }, [reduce])

  const active = finishes.find((f) => f.id === finish) || finishes[0]

  return (
    <div
      ref={stageRef}
      className={`uc-hero-stage${ready ? " is-ready" : ""}${reduce ? " is-reduced" : ""}`}
      data-finish={finish}
    >
      <section className="uc-atelier-hero">
        <div className="uc-atelier-hero-media" ref={mediaRef} aria-hidden>
          <div
            className="uc-atelier-hero-frame is-static"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className="uc-atelier-hero-veil" />
          <div
            className="uc-atelier-finish-tint"
            style={{ background: active.tint }}
            data-finish={finish}
          />
          <div
            className="uc-atelier-finish-grain"
            style={{ backgroundColor: active.grain }}
            data-finish={finish}
          />
        </div>

        <div className="content-container uc-atelier-hero-copy" ref={copyRef}>
          <p
            className="uc-eyebrow uc-hero-line"
            style={{ ["--d" as string]: "0" }}
          >
            Urban Compact · Atelier
          </p>
          <h1 className="uc-hero-title">
            <span
              className="uc-hero-line uc-hero-title-line"
              style={{ ["--d" as string]: "1" }}
            >
              Furniture that lets
            </span>
            <span
              className="uc-hero-line uc-hero-title-line"
              style={{ ["--d" as string]: "2" }}
            >
              the room breathe.
            </span>
          </h1>
          <p
            className="uc-atelier-hero-sub uc-hero-line"
            style={{ ["--d" as string]: "3" }}
          >
            Quiet pieces in oak, linen, and steel — scaled for compact city
            footprints, photographed with air.
          </p>
          <div
            className="uc-atelier-hero-actions uc-hero-line"
            style={{ ["--d" as string]: "4" }}
          >
            <LocalizedClientLink href="/store" className="uc-btn-primary">
              Browse the collection
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/categories/living"
              className="uc-btn-ghost"
            >
              Living room
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      <div
        className="uc-finish-strip"
        aria-label="Material finishes — select to preview on the room"
        role="listbox"
        aria-activedescendant={`finish-${finish}`}
        style={{ ["--strip-tint" as string]: active.strip }}
      >
        {finishes.map((f, i) => (
          <button
            key={f.id}
            id={`finish-${f.id}`}
            type="button"
            role="option"
            aria-selected={finish === f.id}
            className={`uc-finish-chip${finish === f.id ? " is-active" : ""}`}
            style={{ ["--i" as string]: String(i) }}
            onMouseEnter={() => !reduce && setFinish(f.id)}
            onFocus={() => setFinish(f.id)}
            onClick={() => setFinish(f.id)}
          >
            <span
              className="uc-finish-swatch"
              style={{ background: f.grade }}
              aria-hidden
            />
            <span>
              <strong>{f.label}</strong>
              <span>{f.detail}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
