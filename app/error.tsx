'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">
        Erro inesperado
      </span>
      <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Algo deu errado
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Ocorreu um erro ao carregar esta página. Tente novamente — se o problema
        persistir, entre em contato conosco.
      </p>
      <Button size="lg" className="mt-8 h-12 px-6 text-base" onClick={() => reset()}>
        Tentar novamente
      </Button>
    </div>
  )
}
