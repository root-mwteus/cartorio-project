import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Ouvidoria',
  description:
    'Canal de ouvidoria do Cartório de Registro de Imóveis de Bom Conselho - PE para reclamações, sugestões e elogios.',
}

export default function OuvidoriaPage() {
  return (
    <article>
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">
        Institucional
      </span>
      <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Ouvidoria
      </h1>
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
        <p>
          A ouvidoria é o canal destinado a receber reclamações, sugestões, elogios
          e denúncias relacionadas aos serviços prestados por esta serventia,
          conforme as normas do Conselho Nacional de Justiça (CNJ) para os serviços
          notariais e de registro.
        </p>
        <p>
          Sua manifestação é tratada com sigilo e encaminhada diretamente ao
          Oficial Registrador para análise e resposta.
        </p>
      </div>
      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-semibold text-card-foreground">
          Como registrar sua manifestação
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Envie um e-mail para{' '}
          <a className="underline hover:text-foreground" href={`mailto:${siteConfig.email.support}`}>
            {siteConfig.email.support}
          </a>{' '}
          com o assunto &quot;Ouvidoria&quot;, descrevendo sua manifestação. Você
          também pode usar o{' '}
          <Link className="underline hover:text-foreground" href="/#contato">
            formulário de contato
          </Link>
          .
        </p>
      </div>
    </article>
  )
}
