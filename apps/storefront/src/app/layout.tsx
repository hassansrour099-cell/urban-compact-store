import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Cormorant_Garamond, Figtree } from "next/font/google"
import "styles/globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-uc-display",
  display: "swap",
})

const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-uc-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Urban Compact",
    template: "%s | Urban Compact",
  },
  description: "Furniture sized for small apartments.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      data-brand="urban"
      className={`${display.variable} ${sans.variable}`}
    >
      <body className={`${sans.className} brand-body`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
