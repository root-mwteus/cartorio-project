import type { MetadataRoute } from 'next'
import { checklists } from '@/lib/checklists'
import { siteConfig } from '@/lib/site-config'

const routes = [
  '',
  '/checklists',
  ...checklists.map(({ slug }) => `/checklists/${slug}`),
  '/sobre',
  '/emolumentos',
  '/faq',
  '/ouvidoria',
  '/agendar',
  '/enviar-documentos',
  '/privacidade',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }))
}
