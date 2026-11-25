import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { checklists, findChecklist, specialties } from '@/lib/checklists'
import { siteConfig } from '@/lib/site-config'
import { whatsappLink } from '@/lib/whatsapp'
import { Folio, WhatsAppLink, sectionPad } from '@/components/landing/primitives'
import { PrintButton } from '@/components/checklists/print-button'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return checklists.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const checklist = findChecklist((await params).slug)
  return checklist
    ? { title: `Checklist: ${checklist.title}`, description: `${checklist.forWhom} Lista de documentos para conferir antes de começar.` }
    : {}
}

const button =
  'inline-flex min-h-13 items-center justify-center gap-2.5 rounded-sm px-6 font-grotesk text-xl font-extrabold transition-colors'

export default async function ChecklistPage({ params }: Props) {
  const checklist = findChecklist((await params).slug)
  if (!checklist) notFound()

  return (
    <article className={`py-12 lg:py-20 print:p-0 ${sectionPad} print:px-0`}>
      <nav aria-label="Trilha de navegação" className="font-grotesk text-lg font-semibold text-ink-muted print:hidden">
        <Link href="/checklists" className="inline-flex min-h-11 items-center gap-2 hover:text-wine">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Todos os checklists
        </Link>
      </nav>

      {/* Cabeçalho que só aparece no papel/PDF, onde o menu do site não sai. */}
      <div className="mb-6 hidden items-center gap-3 border-b-2 border-ink pb-4 font-grotesk print:flex">
        <Image src="/logo-icon-v3.png" alt="" width={40} height={40} className="size-10 object-contain" />
        <p className="leading-tight">
          <span className="block text-xl font-black text-ink">{siteConfig.tradeName}</span>
          <span className="block text-sm font-semibold tabular-nums text-ink-muted">
            {siteConfig.name} · CNS {siteConfig.cns}
          </span>
        </p>
      </div>

      <header className="mt-6 flex flex-col gap-4 print:mt-0 print:gap-2">
        <Folio>{specialties[checklist.specialty]}</Folio>
        <h1 className="max-w-4xl text-balance font-grotesk text-[clamp(2.5rem,5.5vw,4.25rem)] font-black leading-[0.9] tracking-[-0.03em] text-ink print:text-4xl">
          {checklist.title}
        </h1>
        <p className="max-w-2xl text-pretty font-grotesk text-xl font-semibold leading-snug text-ink-muted sm:text-[1.4rem] print:text-base">
          {checklist.forWhom}
        </p>
        <p className="text-base tabular-nums text-ink-muted print:text-xs">{checklist.basis}</p>
      </header>

      {checklist.draft && (
        <p role="note" className="mt-8 max-w-3xl border-l-4 border-gold bg-linen px-5 py-4 font-grotesk text-lg font-semibold text-ink print:mt-4 print:bg-transparent print:py-2 print:text-sm">
          Rascunho em revisão pela serventia. Antes de reunir os documentos, confirme a lista com a
          equipe pelo WhatsApp.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
        <WhatsAppLink href={whatsappLink(checklist.whatsapp)} icon className={`${button} bg-wine text-paper hover:bg-wine-deep`}>
          Enviar meus documentos pelo WhatsApp
        </WhatsAppLink>
        <PrintButton className={`${button} border-[1.5px] border-wine text-wine hover:bg-wine hover:text-paper`} />
      </div>

      <div className="mt-12 grid max-w-4xl gap-10 print:mt-6 print:gap-5">
        {checklist.groups.map((group, index) => (
          <section key={group.title} aria-labelledby={`grupo-${index}`} className="break-inside-avoid">
            <h2
              id={`grupo-${index}`}
              className="border-b-2 border-ink pb-2 font-grotesk text-sm font-extrabold uppercase tracking-[0.14em] text-gold-text print:text-xs"
            >
              {group.title}
            </h2>
            <ul className="divide-y divide-rule">
              {group.items.map((item) => (
                <li key={item.text}>
                  <label className="flex cursor-pointer items-start gap-4 py-4 print:py-1.5">
                    <input
                      type="checkbox"
                      className="mt-1 size-5 shrink-0 cursor-pointer rounded-sm accent-wine print:size-4"
                    />
                    <span className="font-grotesk text-xl leading-snug text-ink print:text-sm">
                      <span className="font-bold">{item.text}</span>
                      {item.detail && <span className="font-semibold text-ink-muted"> ({item.detail})</span>}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {group.notes && (
              <ul className="mt-2 space-y-1.5 border-t border-rule pt-3">
                {group.notes.map((note) => (
                  <li key={note} className="text-pretty text-base leading-relaxed text-ink-muted print:text-xs">
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {checklist.tips && (
          <section aria-labelledby="dicas-t" className="break-inside-avoid border border-gold bg-linen p-6 print:p-3">
            <h2 id="dicas-t" className="font-grotesk text-sm font-extrabold uppercase tracking-[0.14em] text-gold-text print:text-xs">
              Bom saber
            </h2>
            <ul className="mt-3 space-y-2">
              {checklist.tips.map((tip) => (
                <li key={tip} className="text-pretty font-grotesk text-lg font-semibold leading-snug text-ink print:text-sm">
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="enviar-t" className="break-inside-avoid bg-wine-deep p-6 text-paper print:border print:border-ink print:bg-transparent print:p-3 print:text-ink">
          <h2 id="enviar-t" className="font-grotesk text-sm font-extrabold uppercase tracking-[0.14em] text-gold print:text-xs print:text-ink">
            Envie seus documentos e tire dúvidas
          </h2>
          <p className="mt-3 font-grotesk text-[1.75rem] font-black tabular-nums leading-none print:text-xl">
            WhatsApp {siteConfig.whatsappDisplay}
          </p>
          <p className="mt-2 text-pretty font-grotesk text-lg font-semibold leading-snug text-paper/80 print:text-sm print:text-ink-muted">
            Mande fotos ou PDFs dos documentos. A equipe confere e responde antes de você vir ao
            cartório. {siteConfig.hours.short}.
          </p>
        </section>
      </div>

      <footer className="mt-10 max-w-4xl border-t border-rule pt-4 text-sm leading-relaxed text-ink-muted print:mt-6 print:text-xs">
        <p className="font-semibold">Material informativo. Não substitui o exame do caso pela serventia.</p>
        <p className="mt-1 tabular-nums">
          {siteConfig.tradeName} · CNS {siteConfig.cns} · {siteConfig.address.street}, {siteConfig.address.neighborhood},{' '}
          {siteConfig.address.city}/{siteConfig.address.state} · {siteConfig.phoneDisplay}
        </p>
      </footer>
    </article>
  )
}
