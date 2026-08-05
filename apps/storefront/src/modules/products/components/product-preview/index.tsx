import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { resolveUcProductMedia } from "@lib/util/uc-product-media"
import { resolveUcRoom, type UcRoom } from "@lib/util/uc-room"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import PreviewPrice from "./price"

function finishHint(product: HttpTypes.StoreProduct) {
  const text = `${product.title} ${product.description || ""}`.toLowerCase()
  if (
    text.includes("linen") ||
    text.includes("fabric") ||
    text.includes("upholster")
  )
    return "Linen finish"
  if (text.includes("steel") || text.includes("metal")) return "Steel accent"
  if (text.includes("walnut")) return "Walnut"
  if (text.includes("oak") || text.includes("wood")) return "Oiled oak"
  return "Studio finish"
}

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
  priority = false,
  roomHint,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  priority?: boolean
  roomHint?: UcRoom | string | null
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const { primary, secondary } = resolveUcProductMedia(product)
  const room = resolveUcRoom({
    roomHint,
    categories: product.categories,
    handle: product.handle,
    title: product.title,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className={`group uc-product-card block${isFeatured ? " is-featured" : ""}`}
      data-uc-room={room}
    >
      <div data-testid="product-wrapper" className="uc-product-shell">
        <div className="uc-product-frame">
          <div className="uc-product-media">
            {primary ? (
              <Image
                src={primary}
                alt={product.title || "Product"}
                fill
                className="uc-product-primary object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
                priority={priority}
                loading={priority ? "eager" : "lazy"}
              />
            ) : (
              <span className="uc-product-fallback" aria-hidden />
            )}
            {secondary && secondary !== primary && (
              <Image
                src={secondary}
                alt=""
                fill
                className="uc-product-secondary object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
                loading="lazy"
                aria-hidden
              />
            )}
            <span className="uc-product-hover">
              <span>View piece</span>
            </span>
          </div>
        </div>
        <div className="uc-product-meta">
          <p className="uc-product-room">{room}</p>
          <Text
            as="span"
            className="uc-product-title"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="uc-product-price">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <p className="uc-product-finish">{finishHint(product)}</p>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
