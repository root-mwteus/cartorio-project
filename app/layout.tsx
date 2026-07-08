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
  themeColor: '#1e293b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${lora.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
