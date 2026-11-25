import type { ReactNode } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { sectionPad } from './primitives'

const { oversight, privacy } = siteConfig

const channelLink =
  'font-extrabold underline decoration-wine-deep/40 underline-offset-4 transition-colors hover:decoration-wine-deep'

function Channel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-wine-deep/30 pt-4">
      <h3 className="text-[0.95rem] font-extrabold uppercase tracking-[0.16em]">{title}</h3>
      <div className="flex flex-col gap-1 text-lg font-semibold leading-snug">{children}</div>
    </div>
  )
}

const external = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`self-start ${channelLink}`}>
    {label}
    <span className="sr-only"> (abre em nova aba)</span>
  </a>
)

export function OmbudsmanBand() {
  const { responseTime } = siteConfig.ouvidoria
  return (
    <section aria-labelledby="ouvidoria-title" className={`bg-gold py-12 text-wine-deep lg:py-16 ${sectionPad}`}>
      <div className="flex flex-col gap-6 font-grotesk md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex flex-col gap-1.5">
          <p className="text-[0.95rem] font-extrabold uppercase tracking-[0.16em]">Ouvidoria</p>
          <h2 id="ouvidoria-title" className="text-balance text-[clamp(2rem,3.5vw,2.75rem)] font-black leading-none tracking-[-0.02em]">
            Reclamação, sugestão ou elogio? Sua opinião melhora o atendimento.
          </h2>
        </div>
        <div className="flex shrink-0 flex-col gap-2 md:items-end">
          <Link
            href="/ouvidoria"
            className="inline-flex min-h-13 items-center self-start rounded-sm bg-wine-deep px-6 text-xl font-extrabold text-paper transition-colors hover:bg-wine md:self-auto"
          >
            Registrar manifestação
          </Link>
          {responseTime && <p className="text-lg font-bold">Resposta em até {responseTime}</p>}
        </div>
      </div>

      <div className="mt-10 grid gap-6 font-grotesk md:grid-cols-3 md:gap-8">
        <Channel title="Ouvidoria do TJPE">
          <p className="tabular-nums">
            Tele-Ouvidoria {oversight.ouvidoriaPhone} ou {oversight.ouvidoriaShortPhone}, {oversight.ouvidoriaHours}
          </p>
          <a href={oversight.ouvidoriaWhatsappUrl} target="_blank" rel="noopener noreferrer" className={`self-start tabular-nums ${channelLink}`}>
            WhatsApp {oversight.ouvidoriaWhatsappDisplay}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          {external(oversight.ouvidoriaUrl, 'Portal da Ouvidoria')}
        </Channel>

        <Channel title="Corregedoria Geral da Justiça">
          <p>Fiscaliza os cartórios de Pernambuco.</p>
          {external(oversight.corregedoriaFaleComUrl, 'Registrar no FaleCom')}
          <p className="tabular-nums">Central de Atendimento {oversight.corregedoriaPhone}</p>
        </Channel>

        <Channel title="Seus dados pessoais (LGPD)">
          <p>Pedidos de acesso, correção ou exclusão vão ao Encarregado, por canal próprio, separado do WhatsApp.</p>
          <a href={`mailto:${privacy.encarregado.email}`} className={`self-start break-all ${channelLink}`}>
            {privacy.encarregado.email}
          </a>
          <Link href="/privacidade" className={`self-start ${channelLink}`}>
            Aviso de Privacidade
          </Link>
        </Channel>
      </div>
    </section>
  )
}
