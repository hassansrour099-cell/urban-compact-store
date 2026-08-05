import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

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
      <section className="content-container py-16 small:py-24">
        <div className="uc-section-head mb-10">
          <p className="uc-eyebrow">Shop by room</p>
          <h2 className="font-display text-3xl text-uc-ink small:text-4xl">
            Four spaces. One footprint.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 small:grid-cols-4 small:gap-4">
          {tops.map((c, i) => (
            <LocalizedClientLink
              key={c.id}
              href={`/categories/${c.handle}`}
              className="uc-cat-tile uc-reveal"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <span className="font-display text-2xl text-uc-ink">{c.name}</span>
              <span className="mt-2 text-sm text-uc-muted">Browse →</span>
            </LocalizedClientLink>
          ))}
        </div>
      </section>

      <section className="uc-band py-16 small:py-20">
        <div className="content-container">
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
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 small:grid-cols-4 small:gap-x-6">
            {products.slice(0, 8).map((p) => (
              <li key={p.id} className="uc-product-card">
                <ProductPreview product={p} region={region} isFeatured />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="uc-split relative overflow-hidden">
        <div
          className="uc-split-media absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80)",
          }}
          aria-hidden
        />
        <div className="uc-split-veil absolute inset-0" aria-hidden />
        <div className="relative z-10 content-container flex min-h-[420px] items-center py-16">
          <div className="max-w-lg">
            <p className="uc-eyebrow">Made for city living</p>
            <h2 className="font-display text-3xl text-uc-ink small:text-5xl">
              Quiet forms. Honest materials.
            </h2>
            <p className="mt-4 text-uc-ink/75 leading-relaxed">
              Oak, walnut, and white finishes—chosen to calm small rooms instead
              of crowding them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
