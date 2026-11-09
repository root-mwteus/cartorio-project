import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

const routes = ['', '/sobre', '/emolumentos', '/faq', '/ouvidoria', '/agendar', '/enviar-documentos', '/privacidade']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }))
}
