import type { Metadata } from 'next'
import { checklists } from '@/lib/checklists'
import { siteConfig } from '@/lib/site-config'
import { Folio, sectionPad } from '@/components/landing/primitives'
import { ChecklistBrowser } from '@/components/checklists/checklist-browser'

export const metadata: Metadata = {
  title: 'Checklists de documentos',
  description: `Lista de documentos de cada ato da ${siteConfig.name}, para conferir antes de enviar pelo WhatsApp ou vir ao cartório.`,
}

export default function ChecklistsPage() {
  return (
    <div className={`py-16 lg:py-24 ${sectionPad}`}>
      <div className="flex flex-col gap-4">
        <Folio>Checklists de documentos</Folio>
        <h1 className="text-balance font-grotesk text-[clamp(2.75rem,6vw,4.75rem)] font-black leading-[0.88] tracking-[-0.03em] text-ink">
          Junte os documentos <span className="text-wine">antes de começar.</span>
        </h1>
        <p className="max-w-2xl text-pretty font-grotesk text-xl font-semibold leading-snug text-ink-muted sm:text-[1.4rem]">
          Escolha o ato, marque o que você já tem e salve em PDF. Depois, envie os documentos pelo
          WhatsApp para a equipe conferir.
        </p>
      </div>

      <ChecklistBrowser
        items={checklists.map(({ slug, specialty, title, forWhom }) => ({ slug, specialty, title, forWhom }))}
      />
    </div>
  )
}
