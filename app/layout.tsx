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
  title: {
    default: "StaffDigital AI - Agentes IA con Voz Humana",
    template: "%s | StaffDigital AI",
  },
  description:
    "Agentes IA con voz humana para atender llamadas, WhatsApp y chat web. Tus clientes reciben trato humano 24/7. Solicita demo.",
  metadataBase: new URL("https://www.staffdigital.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.staffdigital.ai",
    siteName: "StaffDigital AI",
    title: "StaffDigital AI - Agentes IA con Voz Humana para Empresas",
    description:
      "Agentes IA con voz humana para llamadas, WhatsApp y chat web. Atencion personalizada 24/7 para tu empresa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StaffDigital AI - Agentes IA con Voz Humana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StaffDigital AI - Agentes IA con Voz Humana",
    description:
      "Agentes IA con voz humana para llamadas, WhatsApp y chat web. Atencion personalizada 24/7.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="Uw0vYKoZylDM8S2GioiNZbwGdoWYgeywihU5jNrgnvc" />
        {/* Cookiebot domain verification */}
        <meta name="cookiebot-domain-verify" content="53835036-9914-4249-a422-05644e8eb2c8" />
        {/* Cookiebot CMP — must load BEFORE any tracking scripts */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="53835036-9914-4249-a422-05644e8eb2c8"
          data-blockingmode="auto"
          type="text/javascript"
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MDB34SRP');`,
          }}
        />
      </head>
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDB34SRP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "StaffDigital AI",
              url: "https://www.staffdigital.ai",
              logo: "https://www.staffdigital.ai/logo.png",
              description:
                "Agentes IA con voz humana para empresas. Atencion telefonica, WhatsApp, chat web y consultoria de seguridad IA.",
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "Carrer d'Aragó, 308, 1o 2a",
                  addressLocality: "Barcelona",
                  postalCode: "08009",
                  addressCountry: "ES",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Afonso Costa 22 B, Lisbon Business Center",
                  addressLocality: "Lisboa",
                  postalCode: "1900-036",
                  addressCountry: "PT",
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/staffdigitalai",
                "https://www.instagram.com/staffdigitalai",
                "https://www.facebook.com/staffdigitalai",
                "https://www.youtube.com/@staffdigitalai",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                availableLanguage: ["Spanish", "Portuguese", "English"],
              },
            }),
          }}
        />
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
