import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Lora } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Registro de Imóveis de Bom Conselho - PE',
    template: '%s | Cartório de Registro de Imóveis de Bom Conselho',
  },
  description:
    'Atendimento digital e presencial do Cartório de Registro de Imóveis de Bom Conselho - PE. Registro de imóveis, certidões, averbações e mais.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Cartório de Registro de Imóveis de Bom Conselho',
    title: 'Registro de Imóveis de Bom Conselho - PE',
    description:
      'Atendimento digital e presencial com segurança jurídica. Certidões, matrícula on-line, e-Protocolo e mais.',
    images: [
      {
        url: '/cartorio-hero.png',
        width: 1200,
        height: 630,
        alt: 'Cartório de Registro de Imóveis de Bom Conselho - PE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Registro de Imóveis de Bom Conselho - PE',
    description:
      'Atendimento digital e presencial com segurança jurídica. Certidões, matrícula on-line, e-Protocolo e mais.',
    images: ['/cartorio-hero.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#5c1e22',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOffice',
  name: siteConfig.name,
  image: `${siteConfig.url}/cartorio-hero.png`,
  url: siteConfig.url,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email.general,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postalCode,
    addressCountry: 'BR',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${lora.variable} light scroll-smooth bg-background`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
