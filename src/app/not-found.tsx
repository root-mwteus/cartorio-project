import Link from 'next/link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <p className="font-serif text-2xl italic tabular-nums text-gold-text">Folha 404</p>
        <h1 className="mt-3 max-w-[16ch] text-balance font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
          Esta página não consta em nossos livros
        </h1>
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-muted">
          O endereço pode ter sido digitado errado ou a página foi movida.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          className="mt-8"
          render={<Link href="/">Voltar para o início</Link>}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
