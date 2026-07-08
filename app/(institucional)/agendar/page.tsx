import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Agendar Visita',
  description:
    'Agende seu atendimento presencial no Cartório de Registro de Imóveis de Bom Conselho - PE.',
}

export default function AgendarPage() {
  return (
    <article>
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">
        Institucional
      </span>
      <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Agendar Visita
      </h1>
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
        <p>
          O atendimento presencial pode ser agendado com antecedência, o que
          reduz o tempo de espera na serventia. Nosso horário de funcionamento é
          de segunda a sexta-feira, das 08h às 17h, exceto feriados.
        </p>
        <p>
          Para agendar, envie uma mensagem pelo WhatsApp informando o serviço
          desejado e o melhor horário para você — nossa equipe confirma a data e
          o horário do atendimento.
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
              Agendar pelo WhatsApp
            </a>
          }
        />
      </div>
    </article>
  )
}
