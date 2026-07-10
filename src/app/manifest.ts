import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Cartório Bom Conselho',
    description:
      'Atendimento digital e presencial do Cartório de Registro de Imóveis de Bom Conselho - PE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5c1e22',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
