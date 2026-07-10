import { Clock, FileCheck, ScrollText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Deadline = {
  icon: LucideIcon
  service: string
  time: string
  note?: string
}

const deadlines: Deadline[] = [
  {
    icon: Clock,
    service: 'Certidões Eletrônicas',
    time: 'Até 4 horas úteis',
  },
  {
    icon: FileCheck,
    service: 'Situação Jurídica do Imóvel',
    time: '1 dia útil',
  },
  {
    icon: ScrollText,
    service: 'Análise e Registro de Títulos',
    time: '5 a 10 dias úteis',
    note: 'Prazo máximo de prenotação: 20 dias.',
  },
]

export function PrepareSection() {
  return (
    <section id="prazos" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Prazos oficiais
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Transparência nos prazos de atendimento
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Trabalhamos para entregar cada serviço dentro dos prazos legais. Confira abaixo
            o tempo estimado para os principais atos da serventia.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {deadlines.map((deadline) => {
            const Icon = deadline.icon
            return (
              <article
                key={deadline.service}
                className="flex flex-col rounded-xl border border-border bg-card p-7 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold text-card-foreground">
                  {deadline.service}
                </h3>
                <p className="mt-3 text-2xl font-semibold text-accent">{deadline.time}</p>
                {deadline.note ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {deadline.note}
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
