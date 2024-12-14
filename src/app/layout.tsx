import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
// import { NavLinks } from "@/components/shared/NavLinks"
import MainMenu from "@/components/shared/MainMenu"
import { ThemeModeScript } from "flowbite-react"
import Providers from "@/components/shared/Providers"

// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

import dynamic from "next/dynamic"
const TostifyDynamic = dynamic(() => import("@/components/shared/Tostify"), { ssr: true })
const ScreenSizeOverlayDynamic = dynamic(() => import("screen-size-overlay").then((module) => module.ScreenSizeOverlay))

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <header className="bg-gray-200 text-white p-2">
            {/* <div className="container mx-auto flex justify-between items-center">
            <NavLinks />
          </div> */}
            <MainMenu />
          </header>

          <main className="flex-grow p-4">{children}</main>
          <footer className="bg-white dark:bg-gray-800 text-gray-500 dark:text-white p-4 text-center text-balance">© 2024 Все права защищены</footer>
        </Providers>
        {/* <ToastContainer /> */}
        <TostifyDynamic />
        {process.env.NODE_ENV === "development" && <ScreenSizeOverlayDynamic />}
      </body>
    </html>
  )
}
