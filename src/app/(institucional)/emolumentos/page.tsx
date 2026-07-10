import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
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
          Como os valores podem ser reajustados ao longo do ano, a forma mais
          confiável de consultar o valor atualizado de um ato específico é entrar
          em contato diretamente com a nossa equipe, informando o tipo de ato que
          você precisa realizar.
        </p>
      </div>
      <div className="mt-8">
        <Button
          size="lg"
          nativeButton={false}
          className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
          render={
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Consultar valores pelo WhatsApp
            </a>
          }
        />
      </div>
    </article>
  )
}
