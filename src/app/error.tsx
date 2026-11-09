'use client'

import { useEffect } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <h1 className="max-w-[16ch] text-balance font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-muted">
          Tente novamente. Se o problema continuar, fale conosco pelo WhatsApp{' '}
          <span className="tabular-nums">{siteConfig.whatsappDisplay}</span>.
        </p>
        <Button size="lg" className="mt-8" onClick={() => reset()}>
          Tentar novamente
        </Button>
      </main>
      <SiteFooter />
    </div>
  )
}
