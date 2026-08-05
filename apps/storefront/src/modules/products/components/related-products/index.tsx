import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Reveal from "@modules/common/components/reveal"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 5,
    is_giftcard: false,
  }
  if (region?.id) {
    queryParams.region_id = region.id
  }

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) =>
    response.products.filter((p) => p.id !== product.id).slice(0, 5)
  )

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container uc-related-inner">
      <Reveal>
        <div className="uc-related-head mb-10 max-w-xl">
          <p className="uc-eyebrow">Complete the room</p>
          <h2>Pieces that sit well beside this one.</h2>
        </div>
      </Reveal>

      <ul className="uc-products-grid is-collection uc-related-grid">
        {products.map((p) => (
          <li key={p.id}>
            <Product region={region} product={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
