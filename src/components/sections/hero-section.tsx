import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { ExpedienteStatus } from './expediente-status'
import { HeroLot } from './hero-lot'

const label = 'text-sm text-ink-muted'
const row = 'border-b border-rule py-4'

export function HeroSection() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <h1
              id="hero-title"
              aria-label={siteConfig.name}
              className="font-serif text-[clamp(2.5rem,7vw,6rem)] font-normal leading-[0.98] tracking-[-0.022em] text-foreground motion-safe:animate-rise"
            >
              {siteConfig.nameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 font-serif text-2xl italic text-gold-text sm:text-3xl">
              {siteConfig.tradeName}
            </p>
          </div>
          <HeroLot className="lg:col-span-4 lg:mb-2" />
        </div>

        <div className="mt-8 grid gap-10 border-t-2 border-foreground pt-8 lg:mt-10 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          <div className="lg:col-span-5">
            <p className="max-w-[34rem] text-pretty text-lg leading-relaxed text-ink-muted">
              Peça certidões, consulte matrículas e protocole títulos pelo Portal ONR, ou venha à
              nossa sede em {siteConfig.address.city}.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Falar no WhatsApp
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                }
              />
              <a
                href="#servicos"
                className="self-start py-2 text-base font-medium text-primary underline decoration-gold underline-offset-[6px] transition-colors hover:decoration-primary sm:self-auto"
              >
                Ver atos e serviços
              </a>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 border-t border-rule sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:col-span-6 lg:col-start-7 lg:border-t-0">
            <div className={`col-span-2 sm:col-span-1 ${row} lg:pt-0`}>
              <dt className={label}>{siteConfig.officer.title}</dt>
              <dd className="mt-1 font-serif text-xl italic text-foreground">
                {siteConfig.officer.name}
              </dd>
            </div>
            <div className={`${row} lg:pt-0`}>
              <dt className={label}>CNS</dt>
              <dd className="mt-1 font-serif text-xl tabular-nums text-foreground">
                {siteConfig.cns}
              </dd>
            </div>
            <div className={`col-span-2 sm:col-span-1 ${row}`}>
              <dt className={label}>Atendimento</dt>
              <dd className="mt-1 font-medium text-foreground">
                {siteConfig.hours.short}
                <ExpedienteStatus className="mt-1 font-normal" />
              </dd>
            </div>
            <div className={`col-span-2 sm:col-span-1 ${row}`}>
              <dt className={label}>Natureza</dt>
              <dd className="mt-1 font-medium text-foreground">Serviço público delegado, com fé pública</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
