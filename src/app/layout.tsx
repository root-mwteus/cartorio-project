import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Lora } from 'next/font/google'
import { WhatsAppFloating } from '@/components/ui/whatsapp-floating'
import { serializeJsonLd } from '@/lib/json-ld'
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

const pageTitle = `${siteConfig.name} | ${siteConfig.tradeName}`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `Atendimento digital e presencial da ${siteConfig.name} (${siteConfig.tradeName}). Registro de imóveis, certidões, averbações e mais.`,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: siteConfig.name,
    title: pageTitle,
    description:
      'Atendimento digital e presencial com segurança jurídica. Certidões, matrícula on-line, e-Protocolo e mais.',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description:
      'Atendimento digital e presencial com segurança jurídica. Certidões, matrícula on-line, e-Protocolo e mais.',
    images: ['/opengraph-image'],
  },
  // TEMPORÁRIO: site ainda não tem autorização do cartório para ficar
  // indexável publicamente. Reative index/follow depois de confirmado.
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#460913',
}

const jsonLd = {
  '@context': 'https://schema.org',
  // LegalService, não GovernmentOffice: cartórios são serventias privadas
  // que exercem serviço público por delegação (art. 236 da CF), não são
  // órgãos do governo.
  '@type': 'LegalService',
  name: siteConfig.name,
  alternateName: siteConfig.tradeName,
  image: `${siteConfig.url}/opengraph-image`,
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
    dayOfWeek: siteConfig.hours.dayOfWeek,
    opens: siteConfig.hours.opens,
    closes: siteConfig.hours.closes,
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
        <WhatsAppFloating />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </body>
    </html>
  )
}
