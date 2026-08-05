import { listCategories } from "@lib/data/categories"
import { Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const productCategories = await listCategories()
  const tops = productCategories?.filter((c) => !c.parent_category) || []

  return (
    <footer className="uc-footer w-full">
      <div className="content-container flex flex-col w-full py-16 small:py-20">
        <div className="uc-footer-grid">
          <div>
            <LocalizedClientLink href="/" className="uc-brand">
              Urban Compact
            </LocalizedClientLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">
              An atelier for compact city living — furniture in oak, linen, and
              steel, designed to leave the room feeling larger than the plan.
            </p>
          </div>

          <div className="flex flex-col gap-y-3 text-sm">
            <span className="uc-eyebrow" style={{ color: "#d4cdc2" }}>
              Rooms
            </span>
            <ul className="flex flex-col gap-2 opacity-90">
              <li>
                <LocalizedClientLink href="/store">
                  Full collection
                </LocalizedClientLink>
              </li>
              {tops.map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-y-3 text-sm">
            <span className="uc-eyebrow" style={{ color: "#d4cdc2" }}>
              Visit
            </span>
            <ul className="flex flex-col gap-2 opacity-90">
              <li>
                <LocalizedClientLink href="/account">Account</LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/cart">Bag</LocalizedClientLink>
              </li>
              <li>
                <a href="mailto:hello@urbancompact.studio">
                  hello@urbancompact.studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex w-full flex-col gap-2 border-t border-white/10 pt-6 text-sm opacity-60 small:flex-row small:justify-between">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Urban Compact
          </Text>
          <Text className="txt-compact-small">
            Oak · Linen · Steel
          </Text>
        </div>
      </div>
    </footer>
  )
}
