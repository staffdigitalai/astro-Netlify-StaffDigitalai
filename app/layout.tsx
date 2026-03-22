import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { ChatwootWidget } from "@/components/chatwoot-widget"
import { FormModalProvider } from "@/components/contact-form-modals"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "StaffDigital AI - Automatizacion IA para Empresas",
  description:
    "Transforma tu negocio con soluciones inteligentes de automatizacion con IA. Potencia tu organizacion para operar a la velocidad del pensamiento.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <FormModalProvider>
          <Suspense fallback={null}>
            <NavigationTransition />
            <PageTransition>{children}</PageTransition>
          </Suspense>
          <ChatwootWidget />
          <SpeedInsights />
        </FormModalProvider>
      </body>
    </html>
  )
}
