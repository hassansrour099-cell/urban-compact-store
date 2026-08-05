import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Carousel from "@modules/common/components/carousel"
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
    limit: 8,
    is_giftcard: false,
  }
  if (region?.id) {
    queryParams.region_id = region.id
  }

  let products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) =>
    response.products.filter((p) => p.id !== product.id)
  )

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container py-16 small:py-20">
      <Reveal>
        <div className="mb-10">
          <p className="uc-eyebrow">More to explore</p>
          <h2 className="font-display text-3xl text-uc-ink small:text-4xl">
            You might also like
          </h2>
        </div>
      </Reveal>

      <Carousel
        tone="urban"
        label="Related products"
        itemClassName="basis-[72%] xsmall:basis-[46%] small:basis-[30%] medium:basis-[23%]"
      >
        {products.map((p) => (
          <Product key={p.id} region={region} product={p} isFeatured />
        ))}
      </Carousel>
    </div>
  )
}
