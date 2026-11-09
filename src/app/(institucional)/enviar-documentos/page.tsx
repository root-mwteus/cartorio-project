import type { Metadata } from 'next'
import { FileSignature, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'

export const metadata: Metadata = {
  title: 'Enviar Documentos',
  description:
    `Saiba como assinar digitalmente e enviar documentos para a ${siteConfig.name}.`,
}

export default function EnviarDocumentosPage() {
  return (
    <article>
      <InstitutionalPageHeader title="Enviar Documentos" />
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-ink-muted">
        <p>
          Dê prioridade ao envio eletrônico, com assinatura digital no padrão ICP-Brasil. Assim
          você não precisa se deslocar até a serventia.
        </p>
      </div>

      <ol className="mt-8 border-t border-rule">
        <li className="border-b border-rule py-4">
          <h2 className="font-medium text-foreground">Assine o documento</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            Use seu certificado digital ICP-Brasil. O Portal de Assinaturas e Digitalizações do
            Registro de Imóveis do Brasil é uma ferramenta gratuita para assinar documentos.
          </p>
        </li>
        <li className="border-b border-rule py-4">
          <h2 className="font-medium text-foreground">Protocole o título</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            Com o documento assinado, faça o envio pelo{' '}
            <a
              className="underline hover:text-foreground"
              href={siteConfig.onrUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              E-Protocolo no Portal ONR<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
        </li>
      </ol>

      <p className="mt-6 text-pretty text-sm leading-relaxed text-ink-muted">
        Se tiver dúvida sobre a assinatura ou sobre o documento exigido para o seu caso, fale com
        nossa equipe antes de enviar.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          nativeButton={false}
          className="h-12 px-6 text-base"
          render={
            <a href={siteConfig.signaturePortalUrl} target="_blank" rel="noopener noreferrer">
              <FileSignature className="h-5 w-5" aria-hidden="true" />
              Acessar o Portal de Assinaturas
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          }
        />
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          className="h-12 px-6 text-base"
          render={
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Tirar dúvidas pelo WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          }
        />
      </div>
    </article>
  )
}
