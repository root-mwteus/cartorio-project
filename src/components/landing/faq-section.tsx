import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { faqs } from '@/lib/faq'
import { SectionHeading, sectionPad } from './primitives'

export function FaqSection() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className={`border-t border-rule bg-paper py-20 lg:py-28 ${sectionPad}`}>
      <SectionHeading
        id="duvidas-title"
        folio="Fl. 9 · Dúvidas"
        title="Perguntas"
        accent="frequentes."
        lead="As dúvidas mais comuns no balcão, respondidas antes da sua visita."
      />

      <div className="mt-12 border-t-2 border-ink lg:mt-14">
        {faqs
          .filter((faq) => faq.home)
          .map((faq) => (
            <details key={faq.question} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-grotesk text-[1.6rem] font-black leading-tight text-ink transition-colors marker:content-none hover:text-wine sm:text-[1.9rem] [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  className="size-6 shrink-0 text-wine transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-3xl pb-7 text-pretty font-grotesk text-xl font-semibold leading-snug text-ink-muted">
                {faq.answer}
              </p>
            </details>
          ))}
      </div>

      <Link
        href="/faq"
        className="mt-8 inline-flex min-h-13 items-center gap-2.5 rounded-sm border-[1.5px] border-wine px-6 font-grotesk text-xl font-extrabold text-wine transition-colors hover:bg-wine hover:text-paper"
      >
        Ver todas as perguntas
        <ArrowRight className="size-5" aria-hidden="true" />
      </Link>
    </section>
  )
}
