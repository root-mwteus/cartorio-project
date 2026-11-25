'use client'

import { Printer } from 'lucide-react'

// No celular e no computador, "Imprimir" oferece "Salvar como PDF".
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="size-5 shrink-0" aria-hidden="true" />
      Salvar em PDF ou imprimir
    </button>
  )
}
