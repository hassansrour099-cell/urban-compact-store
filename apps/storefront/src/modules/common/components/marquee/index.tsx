"use client"

type MarqueeProps = {
  items: string[]
  tone?: "urban" | "street"
  speed?: "slow" | "fast"
}

export default function Marquee({
  items,
  tone = "urban",
  speed = "slow",
}: MarqueeProps) {
  const row = [...items, ...items, ...items]

  return (
    <div
      className={`brand-marquee tone-${tone} speed-${speed}`}
      aria-hidden="true"
    >
      <div className="brand-marquee-track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="brand-marquee-item">
            {item}
            <span className="brand-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
