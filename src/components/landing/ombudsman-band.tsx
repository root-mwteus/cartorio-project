import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { sectionPad } from './primitives'

export function OmbudsmanBand() {
  const { responseTime } = siteConfig.ouvidoria
  return (
    <section aria-labelledby="ouvidoria-title" className={`bg-gold py-12 text-wine-deep ${sectionPad}`}>
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
    </section>
  )
}
