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
    <div className="store-page uc-store-page" data-testid="category-container">
      <div className="store-page-glow" aria-hidden />
      <div className="content-container uc-store-layout flex flex-col small:flex-row small:items-start gap-8 relative z-[1]">
        <RefinementList sortBy={sort} />
        <div className="w-full min-w-0">
          <div className="uc-page-head">
            <p className="uc-eyebrow">Catalog index</p>
            <h1 data-testid="store-page-title">All pieces</h1>
            <p>Engineered for footprints under pressure.</p>
          </div>
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
