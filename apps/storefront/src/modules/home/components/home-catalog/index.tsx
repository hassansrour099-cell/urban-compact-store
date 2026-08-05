import { HttpTypes } from "@medusajs/types"
import Carousel from "@modules/common/components/carousel"
import Marquee from "@modules/common/components/marquee"
import ParallaxMedia from "@modules/common/components/parallax-media"
import Reveal from "@modules/common/components/reveal"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LookbookSwap from "@modules/home/components/lookbook-swap"
import ProductPreview from "@modules/products/components/product-preview"

const categoryArt: Record<string, string> = {
  living:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  sleep:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  work:
    "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=900&q=80",
  storage:
    "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=80",
}

export default function HomeCatalog({
  products,
  categories,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  categories: HttpTypes.StoreProductCategory[]
  region: HttpTypes.StoreRegion
}) {
  const tops = categories.filter((c) => !c.parent_category)

  return (
    <div className="uc-home">
      <Marquee
        tone="urban"
        items={[
          "MEASURE TWICE",
          "FOLD FLAT",
          "STACK HIGH",
          "CLEAR FLOOR",
          "STUDIO FIT",
          "MM HONEST",
        ]}
      />

      <section className="content-container py-16 small:py-24">
        <Reveal>
          <div className="uc-section-head mb-10">
            <p className="uc-eyebrow">Zones · 01–04</p>
            <h2 className="font-display text-uc-ink" style={{ fontSize: "var(--type-display-lg)" }}>
              Plan by room, not by vibe.
            </h2>
          </div>
        </Reveal>

        <Carousel
          tone="urban"
          label="Rooms"
          itemClassName="basis-[78%] small:basis-[42%] medium:basis-[28%]"
          autoPlayMs={5200}
        >
          {tops.map((c, i) => (
            <LocalizedClientLink
              key={c.id}
              href={`/categories/${c.handle}`}
              className="uc-cat-card"
            >
              <span
                className="uc-cat-card-media"
                style={{
                  backgroundImage: `url(${
                    categoryArt[c.handle || ""] || categoryArt.living
                  })`,
                }}
              />
              <span className="uc-cat-card-body">
                <span className="uc-eyebrow" style={{ color: "var(--uc-muted)" }}>
                  Zone 0{i + 1}
                </span>
                <span className="font-display text-uc-ink">{c.name}</span>
                <span className="text-sm text-uc-muted">Open spec →</span>
              </span>
            </LocalizedClientLink>
          ))}
        </Carousel>
      </section>

      <LookbookSwap tone="urban" />

      <section className="uc-band py-16 small:py-20">
        <div className="content-container">
          <Reveal>
            <div className="uc-section-head mb-10 flex flex-col gap-4 small:flex-row small:items-end small:justify-between">
              <div>
                <p className="uc-eyebrow">Kit index</p>
                <h2
                  className="font-display text-uc-ink"
                  style={{ fontSize: "var(--type-display-lg)" }}
                >
                  Pieces that earn their footprint.
                </h2>
              </div>
              <LocalizedClientLink href="/store" className="uc-link-underline">
                Full index
              </LocalizedClientLink>
            </div>
          </Reveal>

          <Carousel
            tone="urban"
            label="Featured products"
            itemClassName="basis-[72%] xsmall:basis-[46%] small:basis-[30%] medium:basis-[23%]"
          >
            {products.slice(0, 8).map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductPreview product={p} region={region} isFeatured />
              </Reveal>
            ))}
          </Carousel>
        </div>
      </section>

      <Reveal>
        <section className="uc-split relative overflow-hidden min-h-[460px]">
          <ParallaxMedia
            image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80"
            className="absolute inset-0"
            intensity={22}
          />
          <div className="uc-split-veil absolute inset-0" aria-hidden />
          <div className="relative z-10 content-container flex min-h-[460px] items-center py-16">
            <div className="max-w-lg uc-glass-panel">
              <p className="uc-eyebrow">Material protocol</p>
              <h2
                className="font-display text-uc-ink"
                style={{ fontSize: "var(--type-display-md)" }}
              >
                Oak. Walnut. White. No filler finishes.
              </h2>
              <p className="mt-4 text-uc-muted leading-relaxed">
                Every finish exists to expand perceived space—not decorate over
                a bad footprint.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Marquee
        tone="urban"
        speed="slow"
        items={["1480mm SOFAS", "NESTING SETS", "WALL DESKS", "5-SHELF SLIM"]}
      />
    </div>
  )
}
