import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Fraunces, Outfit } from "next/font/google"
import "styles/globals.css"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-uc-display",
  display: "swap",
})

const sans = Outfit({
  subsets: ["latin"],
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
    <html lang="en" data-mode="light" className={`${display.variable} ${sans.variable}`}>
      <body className={sans.className}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
