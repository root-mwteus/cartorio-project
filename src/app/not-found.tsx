import Link from 'next/link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wide text-accent">
          Erro 404
        </span>
        <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          A página que você tentou acessar não existe ou foi movida. Confira o
          endereço digitado ou volte para o início.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          className="mt-8 h-12 px-6 text-base"
          render={<Link href="/">Voltar para o início</Link>}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
