'use client'

import { useSyncExternalStore } from 'react'
import { siteConfig } from '@/lib/site-config'

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Sempre no fuso da serventia, seja qual for o fuso de quem acessa.
function readStatus(): 'open' | 'closed' {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Recife',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  const now = Number(get('hour')) * 60 + Number(get('minute'))
  const { dayOfWeek, opens, closes } = siteConfig.hours
  return dayOfWeek.includes(get('weekday')) && now >= toMinutes(opens) && now < toMinutes(closes)
    ? 'open'
    : 'closed'
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000)
  return () => clearInterval(id)
}

// Feriados não são conhecidos aqui: o texto fala do horário, não de porta aberta.
export function ExpedienteStatus({ className = '' }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, readStatus, () => null)
  if (!status) return null

  return (
    <span className={`flex items-center gap-2 text-sm text-ink-muted ${className}`}>
      <span
        aria-hidden="true"
        className={`h-2 w-2 ${status === 'open' ? 'bg-wine' : 'border border-ink-muted'}`}
      />
      {status === 'open' ? 'Agora: dentro do horário' : 'Agora: fora do horário'}
    </span>
  )
}
