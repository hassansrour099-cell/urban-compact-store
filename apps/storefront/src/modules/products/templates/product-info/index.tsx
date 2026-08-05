import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { UcRoom } from "@lib/util/uc-room"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  room?: UcRoom
}

const ProductInfo = ({ product, room = "collection" }: ProductInfoProps) => {
  return (
    <div id="product-info" className="flex flex-col gap-4">
      <p className="uc-eyebrow uc-pdp-room">{room}</p>
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="uc-text-link"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}
      <h1 className="uc-pdp-title" data-testid="product-title">
        {product.title}
      </h1>
      <p className="uc-pdp-desc" data-testid="product-description">
        {product.description}
      </p>
      <dl className="uc-spec-table">
        <dt>Material</dt>
        <dd>Oak · linen · steel finishes</dd>
        <dt>Scale</dt>
        <dd>Compact footprint for city rooms</dd>
        <dt>Care</dt>
        <dd>Wipe dry; oil oak yearly</dd>
      </dl>
    </div>
  )
}

export default ProductInfo
