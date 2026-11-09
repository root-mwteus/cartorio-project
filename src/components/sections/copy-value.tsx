'use client'

import { useEffect, useRef, useState } from 'react'

export function CopyValue({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="-my-2.5 ml-3 inline-block py-2.5 text-sm text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
    >
      <span aria-hidden="true">
        {state === 'copied' ? 'Copiado' : state === 'failed' ? 'Não copiou' : 'Copiar'}
      </span>
      <span className="sr-only" aria-live="polite">
        {state === 'copied'
          ? `${label} copiado`
          : state === 'failed'
            ? `Não foi possível copiar ${label}`
            : `Copiar ${label}`}
      </span>
    </button>
  )
}
