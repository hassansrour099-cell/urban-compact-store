import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="store-page uc-store-page uc-listing-page"
      data-testid="category-container"
      data-uc-room="collection"
    >
      <div className="content-container uc-store-layout relative z-[1]">
        <header className="uc-page-head uc-listing-head">
          <p className="uc-eyebrow">Collection</p>
          <h1 data-testid="store-page-title">All pieces</h1>
          <p>
            Browse by room, material, and scale — photographed with space so
            each piece can be judged honestly.
          </p>
        </header>
        <div className="uc-listing-filters">
          <RefinementList sortBy={sort} />
        </div>
        <div className="uc-listing-grid">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
