import type { Metadata } from 'next'
import { FileText, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'

export const metadata: Metadata = {
  title: 'Tabela de Emolumentos',
  description:
    'Entenda como são fixados os emolumentos cobrados pelos atos do Registro de Imóveis de Bom Conselho - PE.',
}

export default function EmolumentosPage() {
  return (
    <article>
      <InstitutionalPageHeader title="Tabela de Emolumentos" />
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
        <p>
          Os emolumentos são os valores cobrados pela prática dos atos notariais e
          registrais. Eles não são definidos pelo cartório: a tabela é fixada por
          lei estadual, sob responsabilidade do Tribunal de Justiça de Pernambuco
          (TJPE), e é revisada periodicamente.
        </p>
        <p>
          Consulte abaixo a tabela oficial, publicada pelo Tribunal de Justiça de
          Pernambuco (TJPE). Em caso de dúvida sobre qual ato se aplica à sua
          situação, nossa equipe pode te ajudar pelo WhatsApp.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          nativeButton={false}
          className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
          render={
            <a
              href={siteConfig.emolumentosTableUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              Ver tabela oficial (PDF)
            </a>
          }
        />
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          className="h-12 px-6 text-base"
          render={
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Tirar dúvidas pelo WhatsApp
            </a>
          }
        />
      </div>
    </article>
  )
}
