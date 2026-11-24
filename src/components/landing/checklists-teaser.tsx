import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { checklists, specialties } from '@/lib/checklists'
import { SectionHeading, sectionPad } from './primitives'

export function ChecklistsTeaser() {
  return (
    <section id="checklists" aria-labelledby="checklists-title" className={`bg-linen py-20 lg:py-28 ${sectionPad}`}>
      <SectionHeading
        id="checklists-title"
        folio="Fl. 6 · Checklists"
        title="O que você"
        accent="precisa fazer?"
        lead="Escolha a situação para ver os documentos, marcar o que já tem e salvar em PDF antes de enviar."
      />

      <ul className="mt-12 border-t-2 border-ink lg:mt-14">
        {checklists.map((item) => (
          <li key={item.slug} className="border-b border-rule">
            <Link href={`/checklists/${item.slug}`} className="group flex items-center gap-5 py-6">
              <FileText className="size-7 shrink-0 text-gold-text" aria-hidden="true" />
              <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <span className="font-grotesk text-[1.75rem] font-black leading-none tracking-[-0.01em] text-ink transition-colors group-hover:text-wine sm:text-[2rem]">
                  {item.situation}
                </span>
                <span className="font-grotesk text-lg font-semibold text-ink-muted">
                  {item.title} · {specialties[item.specialty]}
                </span>
              </span>
              <ArrowRight
                className="size-6 shrink-0 text-wine transition-transform motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/checklists"
        className="mt-8 inline-flex min-h-13 items-center gap-2.5 rounded-sm border-[1.5px] border-wine px-6 font-grotesk text-xl font-extrabold text-wine transition-colors hover:bg-wine hover:text-paper"
      >
        Ver todos os checklists
        <ArrowRight className="size-5" aria-hidden="true" />
      </Link>
    </section>
  )
}
