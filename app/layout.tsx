import type { Metadata, Viewport } from "next"
import { Dancing_Script, Playfair_Display } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "For Arpita ♥",
  description: "A special gift, just for you",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "For Arpita",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0014",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${playfair.variable} ${dancing.variable} min-h-dvh touch-manipulation overscroll-none antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
