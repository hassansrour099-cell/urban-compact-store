"use client"

import { Locale } from "@lib/data/locales"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import CountrySelect from "@modules/layout/components/country-select"
import LanguageSelect from "@modules/layout/components/language-select"
import NavSearch from "@modules/layout/components/nav-search"
import { usePathname } from "next/navigation"
import {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

const leftRooms = [
  { label: "Living", href: "/categories/living" },
  { label: "Sleep", href: "/categories/sleep" },
]

const rightRooms = [
  { label: "Work", href: "/categories/work" },
  { label: "Storage", href: "/categories/storage" },
  { label: "Collection", href: "/store" },
]

const megaRooms = [
  {
    label: "Living",
    href: "/categories/living",
    blurb: "Sofas, lounge, and low tables for tight footprints.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Sleep",
    href: "/categories/sleep",
    blurb: "Beds and night storage that keep clearance honest.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Work",
    href: "/categories/work",
    blurb: "Desks and seating scaled for alcoves and corners.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Storage",
    href: "/categories/storage",
    blurb: "Shelving and cabinets that stay quiet on the wall.",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Collection",
    href: "/store",
    blurb: "The full atelier — pieces with enough air.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
  },
]

function isHomePath(pathname: string) {
  return /^\/[a-z]{2}(?:\/)?$/.test(pathname)
}

function pathActive(pathname: string, href: string) {
  if (href === "/") return isHomePath(pathname)
  // Strip locale prefix so "/store" never matches ".../storage"
  const path = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/"
  return path === href || path.startsWith(`${href}/`)
}

function megaIndexForHref(href: string) {
  return megaRooms.findIndex((r) => r.href === href)
}

type NavChromeProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  cartSlot: ReactNode
}

export default function NavChrome({
  regions,
  locales,
  currentLocale,
  cartSlot,
}: NavChromeProps) {
  const pathname = usePathname() || "/"
  const [solid, setSolid] = useState(!isHomePath(pathname))
  const [compact, setCompact] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [featured, setFeatured] = useState(0)
  const megaId = useId()
  const mobileId = useId()
  const shellRef = useRef<HTMLDivElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()
  const reduceRef = useRef(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelLeaveClose = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }, [])

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  useEffect(() => () => cancelLeaveClose(), [cancelLeaveClose])

  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const home = isHomePath(pathname)
    if (!home) {
      setSolid(true)
      setCompact(false)
      return
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const hero = document.querySelector(".uc-hero-stage") as HTMLElement | null
        const threshold = hero
          ? Math.max(120, hero.offsetHeight * 0.55)
          : 280
        const y = window.scrollY
        setSolid(y > threshold)
        setCompact(y > threshold + 40)
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])

  const closeMega = useCallback(() => {
    cancelLeaveClose()
    setMegaOpen(false)
  }, [cancelLeaveClose])
  const openMega = useCallback((index?: number) => {
    cancelLeaveClose()
    if (typeof index === "number" && index >= 0) setFeatured(index)
    setMegaOpen(true)
  }, [cancelLeaveClose])
  const scheduleLeaveClose = useCallback(() => {
    cancelLeaveClose()
    leaveTimer.current = setTimeout(() => {
      closeMega()
    }, 140)
  }, [cancelLeaveClose, closeMega])
  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    menuBtnRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileOpen) closeMobile()
        else closeMega()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [megaOpen, mobileOpen, closeMega, closeMobile])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const panel = mobilePanelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    focusables?.[0]?.focus()

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusables?.length) return
      const list = Array.from(focusables)
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onTab)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onTab)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!megaOpen) return
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node
      if (megaRef.current?.contains(t) || shellRef.current?.contains(t)) return
      closeMega()
    }
    document.addEventListener("mousedown", onPointer)
    return () => document.removeEventListener("mousedown", onPointer)
  }, [megaOpen, closeMega])

  const overHero = isHomePath(pathname) && !solid
  const room = megaRooms[featured] || megaRooms[0]

  return (
    <div
      ref={shellRef}
      className={clx(
        "uc-nav-shell sticky top-0 inset-x-0 z-50",
        solid && "is-solid",
        compact && "is-compact",
        overHero && "is-over-hero",
        megaOpen && "is-mega-open",
        mobileOpen && "is-mobile-open"
      )}
      onMouseEnter={cancelLeaveClose}
      onMouseLeave={scheduleLeaveClose}
    >
      <header className="uc-nav">
        <nav
          className="content-container uc-nav-bar"
          aria-label="Primary"
        >
          <div className="uc-nav-cluster uc-nav-cluster--left">
            <button
              ref={menuBtnRef}
              type="button"
              className={clx("uc-menu-btn", mobileOpen && "is-open")}
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              data-testid="nav-menu-button"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="uc-menu-bars" aria-hidden>
                <i />
                <i />
              </span>
              <span className="sr-only">
                {mobileOpen ? "Close menu" : "Open menu"}
              </span>
            </button>

            <div className="uc-nav-left">
              {leftRooms.map((link) => {
                const idx = megaIndexForHref(link.href)
                return (
                  <LocalizedClientLink
                    key={link.href}
                    href={link.href}
                    className={clx(
                      "uc-nav-link",
                      pathActive(pathname, link.href) && "is-active"
                    )}
                    aria-haspopup="true"
                    aria-expanded={megaOpen && featured === idx}
                    aria-controls={megaId}
                    onMouseEnter={() => openMega(idx)}
                    onFocus={() => openMega(idx)}
                  >
                    {link.label}
                  </LocalizedClientLink>
                )
              })}
            </div>
          </div>

          <LocalizedClientLink
            href="/"
            className="uc-brand"
            data-testid="nav-store-link"
            onMouseEnter={() => closeMega()}
          >
            <span className="uc-brand-full">Urban Compact</span>
            <span className="uc-brand-short" aria-hidden>
              UC
            </span>
          </LocalizedClientLink>

          <div className="uc-nav-cluster uc-nav-cluster--right">
            <div className="uc-nav-right-links">
              {rightRooms.map((link) => {
                const idx = megaIndexForHref(link.href)
                return (
                  <LocalizedClientLink
                    key={link.href}
                    href={link.href}
                    className={clx(
                      "uc-nav-link",
                      pathActive(pathname, link.href) && "is-active"
                    )}
                    aria-haspopup="true"
                    aria-expanded={megaOpen && featured === idx}
                    aria-controls={megaId}
                    onMouseEnter={() => openMega(idx)}
                    onFocus={() => openMega(idx)}
                  >
                    {link.label}
                  </LocalizedClientLink>
                )
              })}
            </div>
            <div
              className="uc-nav-search-slot"
              onMouseEnter={() => closeMega()}
            >
              <NavSearch />
            </div>
            <LocalizedClientLink
              className="uc-nav-link uc-nav-account"
              href="/account"
              data-testid="nav-account-link"
              onMouseEnter={() => closeMega()}
            >
              Account
            </LocalizedClientLink>
            <div className="uc-nav-cart-slot" onMouseEnter={() => closeMega()}>
              {cartSlot}
            </div>
          </div>
        </nav>

        <div
          ref={megaRef}
          id={megaId}
          className={clx("uc-nav-mega", megaOpen && "is-open")}
          aria-hidden={!megaOpen}
          inert={!megaOpen ? true : undefined}
        >
          <div className="content-container uc-nav-mega-inner">
            <LocalizedClientLink
              href={room.href}
              className="uc-nav-mega-feature"
              onClick={() => closeMega()}
            >
              <span
                className="uc-nav-mega-media"
                style={{ backgroundImage: `url(${room.image})` }}
              />
              <span className="uc-nav-mega-feature-copy">
                <span className="uc-eyebrow">Room</span>
                <span className="uc-nav-mega-feature-title">{room.label}</span>
                <span className="uc-nav-mega-feature-blurb">{room.blurb}</span>
              </span>
            </LocalizedClientLink>
            <ul className="uc-nav-mega-list">
              {megaRooms.map((r, i) => (
                <li key={r.href}>
                  <LocalizedClientLink
                    href={r.href}
                    className={clx(
                      "uc-nav-mega-item",
                      featured === i && "is-featured",
                      pathActive(pathname, r.href) && "is-active"
                    )}
                    onMouseEnter={() => setFeatured(i)}
                    onFocus={() => setFeatured(i)}
                    onClick={() => closeMega()}
                  >
                    <strong>{r.label}</strong>
                    <span>{r.blurb}</span>
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div
        className={clx("uc-mobile-takeover", mobileOpen && "is-open")}
        id={mobileId}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Menu"
      >
        <div ref={mobilePanelRef} className="uc-mobile-panel">
          <div className="uc-mobile-panel-top">
            <span className="uc-eyebrow">Atelier</span>
            <button
              type="button"
              className="uc-icon-btn"
              aria-label="Close menu"
              data-testid="close-menu-button"
              onClick={closeMobile}
            >
              <span className="uc-menu-bars is-close" aria-hidden>
                <i />
                <i />
              </span>
            </button>
          </div>
          <nav className="uc-mobile-links" aria-label="Browse">
            {megaRooms.map((r) => (
              <LocalizedClientLink
                key={r.href}
                href={r.href}
                className="uc-mobile-link"
                onClick={closeMobile}
              >
                {r.label}
              </LocalizedClientLink>
            ))}
          </nav>
          <div className="uc-mobile-search">
            <NavSearch />
          </div>
          <div className="uc-mobile-footer">
            {!!locales?.length && (
              <div
                className="uc-mobile-meta"
                onMouseEnter={languageToggleState.open}
                onMouseLeave={languageToggleState.close}
              >
                <LanguageSelect
                  toggleState={languageToggleState}
                  locales={locales}
                  currentLocale={currentLocale}
                />
              </div>
            )}
            {regions && (
              <div
                className="uc-mobile-meta"
                onMouseEnter={countryToggleState.open}
                onMouseLeave={countryToggleState.close}
              >
                <CountrySelect
                  toggleState={countryToggleState}
                  regions={regions}
                />
              </div>
            )}
            <div className="uc-mobile-actions">
              <LocalizedClientLink
                href="/account"
                className="uc-mobile-action"
                onClick={closeMobile}
              >
                Account
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/cart"
                className="uc-mobile-action is-bag"
                onClick={closeMobile}
              >
                Bag
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
