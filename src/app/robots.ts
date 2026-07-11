import type { MetadataRoute } from 'next'

// TEMPORÁRIO: site ainda não tem autorização do cartório para ficar
// indexável publicamente. Reverta para `allow: '/'` (+ sitemap) depois
// de confirmado.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
