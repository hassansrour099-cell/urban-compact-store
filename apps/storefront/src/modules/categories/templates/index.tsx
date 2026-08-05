import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { resolveUcRoom } from "@lib/util/uc-room"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  const room = resolveUcRoom({ roomHint: category.handle })

  return (
    <div
      className="store-page uc-store-page uc-category-page uc-listing-page"
      data-testid="category-container"
      data-uc-room={room}
    >
      <div className="content-container uc-store-layout relative z-[1]">
        <header className="uc-page-head uc-listing-head">
          <div className="uc-listing-crumbs">
            {parents.map((parent) => (
              <span key={parent.id} className="inline-flex items-center gap-2">
                <LocalizedClientLink
                  className="uc-text-link"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                <span aria-hidden>/</span>
              </span>
            ))}
          </div>
          <p className="uc-eyebrow">Room</p>
          <h1 data-testid="category-page-title">{category.name}</h1>
          {category.description && <p>{category.description}</p>}
        </header>

        {!!category.category_children?.length && (
          <ul className="uc-listing-children">
            {category.category_children?.map((c) => (
              <li key={c.id}>
                <InteractiveLink href={`/categories/${c.handle}`}>
                  {c.name}
                </InteractiveLink>
              </li>
            ))}
          </ul>
        )}

        <div className="uc-listing-filters">
          <RefinementList sortBy={sort} data-testid="sort-by-container" />
        </div>

        <div className="uc-listing-grid">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
              roomHint={room}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
