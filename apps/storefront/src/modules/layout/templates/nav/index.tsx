import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const links = [
  { label: "Shop", href: "/store" },
  { label: "Living", href: "/categories/living" },
  { label: "Sleep", href: "/categories/sleep" },
  { label: "Work", href: "/categories/work" },
  { label: "Storage", href: "/categories/storage" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="uc-nav">
        <nav className="content-container flex h-[4.25rem] items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-5">
            <div className="small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink
              href="/"
              className="uc-brand shrink-0"
              data-testid="nav-store-link"
            >
              Urban Compact
            </LocalizedClientLink>
            <div className="hidden small:flex items-center gap-1">
              {links.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="uc-nav-link"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <LocalizedClientLink
              className="uc-nav-link hidden xsmall:inline-flex"
              href="/account"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="uc-nav-cart"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart <span className="uc-nav-count">0</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
