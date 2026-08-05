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
              className="uc-brand text-[#eef2f7] hover:opacity-80"
            >
              <span className="uc-brand-mark">UC</span>
              Urban Compact
            </LocalizedClientLink>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#9aa8ba]">
              A spatial system for apartments that can&apos;t afford wasted
              millimeters.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="flex flex-col gap-y-3">
              <span className="uc-eyebrow text-[#ff5a1f]">Zones</span>
              <ul className="flex flex-col gap-2 text-[#c9d2de]">
                <li>
                  <LocalizedClientLink className="hover:text-white" href="/store">
                    Full catalog
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
              <span className="uc-eyebrow text-[#ff5a1f]">Account</span>
              <ul className="flex flex-col gap-2 text-[#c9d2de]">
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
                    Bag
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between border-t border-white/10 py-6 text-[#8b98a8]">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Urban Compact · Spatial OS
          </Text>
          <Text className="txt-compact-small font-[family-name:var(--font-uc-mono)] tracking-wider uppercase text-[0.65rem]">
            Spec units: mm
          </Text>
        </div>
      </div>
    </footer>
  )
}
