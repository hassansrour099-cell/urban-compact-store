import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { resolveUcProductMedia } from "@lib/util/uc-product-media"
import { resolveUcRoom } from "@lib/util/uc-room"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const media = resolveUcProductMedia(product)
  const room = resolveUcRoom({
    categories: product.categories,
    handle: product.handle,
    title: product.title,
  })
  const galleryImages: HttpTypes.StoreProductImage[] = media.primary
    ? [
        {
          id: `${product.id}-primary`,
          url: media.primary,
        } as HttpTypes.StoreProductImage,
        ...(media.secondary
          ? [
              {
                id: `${product.id}-detail`,
                url: media.secondary,
              } as HttpTypes.StoreProductImage,
            ]
          : []),
      ]
    : images

  return (
    <div className="uc-pdp-page" data-uc-room={room}>
      <div className="uc-pdp" data-testid="product-container">
        <div className="uc-pdp-gallery">
          <ImageGallery images={galleryImages} tone="urban" />
        </div>
        <div className="uc-pdp-info">
          <ProductInfo product={product} room={room} />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <ProductTabs product={product} />
        </div>
      </div>
      <div className="uc-related" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
