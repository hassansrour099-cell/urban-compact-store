import { listCategories } from "@lib/data/categories"
import { Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const productCategories = await listCategories()
  const tops = productCategories?.filter((c) => !c.parent_category) || []

  return (
    <footer className="uc-footer w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-20">
          <div>
            <LocalizedClientLink
              href="/"
              className="uc-brand text-[#f4f7f5] hover:opacity-80"
            >
              Urban Compact
            </LocalizedClientLink>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#9aada3]">
              Furniture sized for small apartments—living, sleep, work, and
              storage.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="flex flex-col gap-y-3">
              <span className="uc-eyebrow text-[#9aada3]">Shop</span>
              <ul className="flex flex-col gap-2 text-[#d7e0da]">
                <li>
                  <LocalizedClientLink className="hover:text-white" href="/store">
                    All products
                  </LocalizedClientLink>
                </li>
                {tops.map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="hover:text-white"
                      href={`/categories/${c.handle}`}
                    >
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="uc-eyebrow text-[#9aada3]">Account</span>
              <ul className="flex flex-col gap-2 text-[#d7e0da]">
                <li>
                  <LocalizedClientLink
                    className="hover:text-white"
                    href="/account"
                  >
                    Sign in
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-white" href="/cart">
                    Cart
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between border-t border-white/10 py-6 text-[#9aada3]">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Urban Compact
          </Text>
          <Text className="txt-compact-small">Made for city living</Text>
        </div>
      </div>
    </footer>
  )
}
