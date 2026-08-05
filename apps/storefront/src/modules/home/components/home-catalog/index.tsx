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
          "Living",
          "Sleep",
          "Work",
          "Storage",
          "Studio-ready",
          "Quiet materials",
        ]}
      />

      <section className="content-container py-16 small:py-24">
        <Reveal>
          <div className="uc-section-head mb-10">
            <p className="uc-eyebrow">Shop by room</p>
            <h2 className="font-display text-3xl text-uc-ink small:text-4xl">
              Four spaces. One footprint.
            </h2>
          </div>
        </Reveal>

        <Carousel
          tone="urban"
          label="Rooms"
          itemClassName="basis-[78%] small:basis-[42%] medium:basis-[28%]"
          autoPlayMs={5200}
        >
          {tops.map((c) => (
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
                <span className="font-display text-2xl text-uc-ink">
                  {c.name}
                </span>
                <span className="text-sm text-uc-muted">Browse →</span>
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
                <p className="uc-eyebrow">Featured pieces</p>
                <h2 className="font-display text-3xl text-uc-ink small:text-4xl">
                  Designed to take less space
                </h2>
              </div>
              <LocalizedClientLink href="/store" className="uc-link-underline">
                View all
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
              <p className="uc-eyebrow">Made for city living</p>
              <h2 className="font-display text-3xl text-uc-ink small:text-5xl">
                Quiet forms. Honest materials.
              </h2>
              <p className="mt-4 text-uc-ink/75 leading-relaxed">
                Oak, walnut, and white finishes—chosen to calm small rooms
                instead of crowding them.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Marquee
        tone="urban"
        speed="slow"
        items={["Under 60″ sofas", "Nesting tables", "Wall desks", "Slim storage"]}
      />
    </div>
  )
}
