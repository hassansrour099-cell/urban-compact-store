import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, Syne } from "next/font/google"
import "styles/globals.css"
import "styles/urban-identity.css"

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-uc-display",
  display: "swap",
})

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-uc-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-uc-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Urban Compact",
    template: "%s · Urban Compact",
  },
  description: "Furniture engineered for small-city footprints.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      data-brand="urban"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className={`${sans.className} brand-body uc-spatial`}>
        <div className="uc-grid-bg" aria-hidden />
        <main className="relative z-[1]">{props.children}</main>
      </body>
    </html>
  )
}
