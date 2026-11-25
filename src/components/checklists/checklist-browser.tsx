'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, Search } from 'lucide-react'
import { specialties, type Checklist, type Specialty } from '@/lib/checklists'
import { cn } from '@/lib/utils'

type Item = Pick<Checklist, 'slug' | 'specialty' | 'title' | 'forWhom'>

// Busca sem acento e sem diferença de maiúsculas: "procuracao" acha "Procuração".
const normalize = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function ChecklistBrowser({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Specialty | 'todos'>('todos')

  const present = (Object.keys(specialties) as Specialty[]).filter((key) =>
    items.some((item) => item.specialty === key),
  )
  const terms = normalize(query.trim())
  const visible = items.filter(
    (item) =>
      (filter === 'todos' || item.specialty === filter) &&
      normalize(`${item.title} ${item.forWhom}`).includes(terms),
  )

  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 font-grotesk text-lg font-bold transition-colors',
      active ? 'border-wine bg-wine text-paper' : 'border-rule text-ink hover:border-wine',
    )

  return (
    <div className="mt-12 lg:mt-14">
      <label className="flex max-w-2xl items-center gap-3 rounded-sm border border-rule bg-paper px-4 focus-within:border-wine">
        <Search className="size-5 shrink-0 text-ink-muted" aria-hidden="true" />
        <span className="sr-only">Buscar checklist</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Digite o que você precisa: escritura, procuração..."
          className="min-h-13 w-full bg-transparent font-grotesk text-xl font-semibold text-ink outline-none placeholder:text-ink-muted/70"
        />
      </label>

      <div role="group" aria-label="Filtrar por especialidade" className="mt-5 flex flex-wrap gap-2">
        <button type="button" aria-pressed={filter === 'todos'} onClick={() => setFilter('todos')} className={chip(filter === 'todos')}>
          Todos <span className="tabular-nums opacity-70">{items.length}</span>
        </button>
        {present.map((key) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)} className={chip(filter === key)}>
            {specialties[key]}{' '}
            <span className="tabular-nums opacity-70">{items.filter((item) => item.specialty === key).length}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} checklists encontrados
      </p>

      {visible.length > 0 ? (
        <ul className="mt-10 border-t-2 border-ink">
          {visible.map((item) => (
            <li key={item.slug} className="border-b border-rule">
              <Link href={`/checklists/${item.slug}`} className="group flex items-start gap-5 py-7">
                <FileText className="mt-1 size-7 shrink-0 text-gold-text" aria-hidden="true" />
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-gold-text">
                    {specialties[item.specialty]}
                  </span>
                  <span className="font-grotesk text-[1.75rem] font-black leading-none tracking-[-0.01em] text-ink transition-colors group-hover:text-wine sm:text-[2rem]">
                    {item.title}
                  </span>
                  <span className="font-grotesk text-xl font-semibold leading-snug text-ink-muted">{item.forWhom}</span>
                </span>
                <ArrowRight
                  className="mt-2 size-6 shrink-0 text-wine transition-transform motion-safe:group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 border-t-2 border-ink pt-7 font-grotesk text-xl font-semibold text-ink-muted">
          Nenhum checklist para “{query}”. Tente outra palavra ou pergunte à equipe pelo WhatsApp.
        </p>
      )}
    </div>
  )
}
