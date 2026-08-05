import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Instrument_Serif, Manrope } from "next/font/google"
import "styles/globals.css"
import "styles/urban-identity.css"
import "styles/smooth-ui.css"
import "styles/editorial-system.css"

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-uc-display",
  display: "swap",
})

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-uc-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Urban Compact",
    template: "%s · Urban Compact",
  },
  description:
    "Quiet material furniture for compact city living — oak, linen, steel, plaster.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      data-brand="urban"
      className={`${display.variable} ${sans.variable}`}
    >
      <body className={`${sans.className} brand-body uc-atelier`}>
        <main className="relative z-[1]">{props.children}</main>
      </body>
    </html>
  )
}
