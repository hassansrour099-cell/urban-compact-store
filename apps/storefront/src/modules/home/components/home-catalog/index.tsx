import { HttpTypes } from "@medusajs/types"
import ParallaxMedia from "@modules/common/components/parallax-media"
import Reveal from "@modules/common/components/reveal"
import StaggerGrid from "@modules/common/components/stagger-grid"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import ScrollTone from "@modules/home/components/scroll-tone"
import RoomsReveal from "@modules/home/components/rooms-reveal"

const categoryArt: Record<string, string> = {
  living:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
  sleep:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  work:
    "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80",
  storage:
    "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
}

const roomBlurb: Record<string, string> = {
  living: "Sofas, lounge chairs, and low tables for tight footprints.",
  sleep: "Beds and night storage that keep clearance honest.",
  work: "Desks and seating scaled for alcoves and corners.",
  storage: "Slim shelves and cabinets that earn their wall.",
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
  const lead = tops[0]
  const stack = tops.slice(1, 3)
  const featured = products.slice(0, 6)

  return (
    <div className="uc-home">
      <ScrollTone />

      <section
        className="uc-section uc-section--plaster uc-surface-oak-wash"
        data-tone="plaster"
      >
        <div className="uc-rooms content-container">
          <Reveal>
            <div className="mb-10 max-w-xl">
              <p className="uc-eyebrow">Rooms</p>
              <h2
                className="font-display text-uc-ink"
                style={{ fontSize: "var(--type-display-lg)" }}
              >
                Shop by how you live, not by catalog noise.
              </h2>
            </div>
          </Reveal>

          <RoomsReveal>
            <div className="uc-rooms-grid">
              {lead && (
                <LocalizedClientLink
                  href={`/categories/${lead.handle}`}
                  className="uc-room-lead"
                >
                  <span
                    className="uc-room-media"
                    style={{
                      backgroundImage: `url(${
                        categoryArt[lead.handle || ""] || categoryArt.living
                      })`,
                    }}
                  />
                  <span className="uc-room-copy">
                    <span className="uc-eyebrow">Lead room</span>
                    <h3>{lead.name}</h3>
                    <p>
                      {roomBlurb[lead.handle || ""] ||
                        "Explore the collection."}
                    </p>
                  </span>
                </LocalizedClientLink>
              )}

              <div className="uc-room-stack">
                {stack.map((c, i) => (
                  <LocalizedClientLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    style={{ ["--stack-i" as string]: String(i) }}
                  >
                    <span
                      className="uc-room-media"
                      style={{
                        backgroundImage: `url(${
                          categoryArt[c.handle || ""] || categoryArt.living
                        })`,
                      }}
                    />
                    <span className="uc-room-copy">
                      <span className="uc-eyebrow">Room</span>
                      <h3>{c.name}</h3>
                      <p>{roomBlurb[c.handle || ""] || "Open collection."}</p>
                    </span>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          </RoomsReveal>

          {tops.length > 3 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {tops.slice(3).map((c) => (
                <LocalizedClientLink
                  key={c.id}
                  href={`/categories/${c.handle}`}
                  className="uc-link-underline"
                >
                  {c.name} →
                </LocalizedClientLink>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="uc-featured" data-tone="oak">
        <div className="uc-featured-ground" aria-hidden />
        <div className="content-container uc-featured-inner">
          <Reveal>
            <div className="uc-featured-head">
              <div className="max-w-lg">
                <p className="uc-eyebrow">Featured pieces</p>
                <h2 className="uc-featured-title">
                  Pieces with enough air to be seen.
                </h2>
              </div>
              <LocalizedClientLink href="/store" className="uc-featured-link">
                Full collection →
              </LocalizedClientLink>
            </div>
          </Reveal>

          <StaggerGrid className="uc-featured-grid">
            {featured.map((p, i) => (
              <ProductPreview
                key={p.id}
                product={p}
                region={region}
                isFeatured={i === 0}
                priority
              />
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section data-tone="linen">
        <Reveal>
          <div className="uc-material-band">
            <ParallaxMedia
              image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80"
              className="absolute inset-0"
              intensity={16}
            />
            <div className="content-container flex min-h-[420px] items-end py-10">
              <div className="uc-material-band-copy">
                <p className="uc-eyebrow">Materials</p>
                <h2>
                  Oak. Linen. Steel. Chosen for how they age in small rooms.
                </h2>
                <p>
                  We keep the finish list short on purpose — each surface is
                  meant to expand perceived space, not decorate over a cramped
                  plan.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="uc-atelier-close uc-closing uc-kit-close" data-tone="walnut">
        <div className="content-container uc-atelier-close-inner">
          <p className="uc-eyebrow">Atelier</p>
          <h2 className="uc-atelier-close-title uc-kit-close-title">
            Leave the room quieter than you found it.
          </h2>
          <p className="mt-4 max-w-md text-[var(--uc-graphite)]">
            Quiet pieces for compact plans — oak, linen, and steel, finished to
            hold their composure in small rooms.
          </p>
          <div className="mt-8">
            <LocalizedClientLink href="/store" className="uc-btn-primary">
              Browse the collection
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}
