import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavChrome from "@modules/layout/components/nav-chrome"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <NavChrome
      regions={regions}
      locales={locales}
      currentLocale={currentLocale}
      cartSlot={
        <Suspense
          fallback={
            <LocalizedClientLink
              className="nav-cart-trigger"
              href="/cart"
              data-testid="nav-cart-link"
            >
              Bag <span className="nav-cart-count">0</span>
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
      }
    />
  )
}
