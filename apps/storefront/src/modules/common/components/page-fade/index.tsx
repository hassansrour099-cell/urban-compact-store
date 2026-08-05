"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<"in" | "ready">("in")

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setPhase("in")
    if (reduce) {
      setPhase("ready")
      return
    }
    const id = window.requestAnimationFrame(() => setPhase("ready"))
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div className={`brand-page-fade is-${phase}`} key={pathname}>
      {children}
    </div>
  )
}
