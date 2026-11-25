import type { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { faqs } from '@/lib/faq'
import { InstitutionalPageHeader } from '../_components/page-header'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description:
    'Tire suas dúvidas sobre agendamento, documentos, valores, certidões, prazos e serviços on-line da serventia de Bom Conselho - PE.',
}

export default function FaqPage() {
  return (
    <article>
      <InstitutionalPageHeader title="Perguntas Frequentes" />
      <div className="mt-10 border-t-2 border-foreground">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-rule">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl text-foreground transition-colors marker:content-none hover:text-primary group-open:italic sm:text-2xl [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-[62ch] pb-6 text-pretty leading-relaxed text-ink-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </article>
  )
}
