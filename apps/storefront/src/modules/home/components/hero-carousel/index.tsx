"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

type Slide = {
  image: string
  eyebrow: string
  title: string
  subtitle: string
  cta: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export default function HeroCarousel({
  slides,
  tone = "urban",
}: {
  slides: Slide[]
  tone?: "urban" | "street"
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [slides.length])

  const slide = slides[index]
  const isUrban = tone === "urban"

  return (
    <section
      className={`${isUrban ? "uc-hero" : "ps-hero"} relative h-[92vh] min-h-[560px] w-full overflow-hidden`}
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`${isUrban ? "uc-hero-media" : "ps-hero-media"} absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={i !== index}
        />
      ))}
      <div
        className={`${isUrban ? "uc-hero-veil" : "ps-hero-veil"} absolute inset-0`}
        aria-hidden
      />
      {!isUrban && <div className="ps-scanline absolute inset-0" aria-hidden />}

      <div className="relative z-10 flex h-full flex-col justify-end content-container pb-16 small:pb-24">
        <div key={index} className="hero-slide-copy">
          <p
            className={`${isUrban ? "uc-eyebrow" : "ps-eyebrow"} mb-4`}
          >
            {slide.eyebrow}
          </p>
          <h1
            className={`font-display leading-[1.05] max-w-3xl ${
              isUrban
                ? "text-5xl text-uc-ink small:text-7xl"
                : "text-6xl text-ps-paper small:text-8xl leading-[0.92]"
            }`}
          >
            {slide.title.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className={`mt-5 max-w-md text-base leading-relaxed small:text-lg ${
              isUrban ? "text-uc-ink/80" : "text-ps-paper/75"
            }`}
          >
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LocalizedClientLink
              href={slide.cta.href}
              className={isUrban ? "uc-btn-primary" : "ps-btn-primary"}
            >
              {slide.cta.label}
            </LocalizedClientLink>
            {slide.secondary && (
              <LocalizedClientLink
                href={slide.secondary.href}
                className={isUrban ? "uc-btn-ghost" : "ps-btn-ghost"}
              >
                {slide.secondary.label}
              </LocalizedClientLink>
            )}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`hero-dot ${i === index ? "is-active" : ""} ${tone}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
