import type { Metadata } from 'next'
import { Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Enviar Documentos',
  description:
    'Saiba como enviar documentos assinados digitalmente para o Cartório de Registro de Imóveis de Bom Conselho - PE.',
}

export default function EnviarDocumentosPage() {
  return (
    <article>
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">
        Institucional
      </span>
      <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Enviar Documentos
      </h1>
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
        <p>
          O nosso Portal de Assinaturas e Digitalizações permite o envio seguro de
          documentos assinados digitalmente, garantindo agilidade e integridade em
          todo o processo — sem que você precise se deslocar até a serventia.
        </p>
        <p>
          Enquanto o portal dedicado está em desenvolvimento, você já pode enviar
          seus documentos pelo WhatsApp ou por e-mail, e nossa equipe dá andamento
          à solicitação normalmente.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              Enviar pelo WhatsApp
            </a>
          }
        />
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          className="h-12 px-6 text-base"
          render={
            <a href={`mailto:${siteConfig.email.general}`}>
              <Mail className="h-5 w-5" aria-hidden="true" />
              Enviar por e-mail
            </a>
          }
        />
      </div>
    </article>
  )
}
