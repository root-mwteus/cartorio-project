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
        src: '/logo-icon-v3.png',
        sizes: '1009x981',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
