import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { HeroLot } from './hero-lot'

const shortcuts = [
  { title: 'Certidão de matrícula', detail: 'Eletrônica, emitida em até 4 horas úteis' },
  { title: 'Matrícula on-line', detail: 'Imagem idêntica à do cartório, sem sair de casa' },
  { title: 'E-Protocolo', detail: 'Protocolo eletrônico de títulos para registro' },
]

const facts = [
  { label: 'Atendimento', value: siteConfig.hours.short },
  { label: 'Localização', value: `${siteConfig.address.city} — ${siteConfig.address.state}` },
  { label: 'CNS', value: siteConfig.cns },
]

export function HeroSection() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="border-b border-rule bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_30rem] lg:grid-rows-[auto_1fr_auto] lg:gap-x-16 lg:gap-y-0 lg:py-20">
        <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <p className="inline-flex items-center gap-3 border-y-[3px] border-double border-gold py-1.5 font-serif text-base tracking-[0.06em] text-gold-text [font-variant-caps:all-small-caps] motion-safe:animate-rule-draw">
            <span>Serviço Público Delegado</span>
            <span aria-hidden="true" className="text-gold">
              •
            </span>
            <span>Fé Pública</span>
          </p>

          <h1
            id="hero-title"
            className="mt-8 max-w-[15ch] text-balance font-serif text-[clamp(2.75rem,7vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.015em] text-foreground motion-safe:animate-rise"
          >
            Registro de Imóveis de Bom Conselho
          </h1>

          <p className="mt-6 max-w-[36rem] text-pretty text-lg leading-relaxed text-ink-muted">
            Atendimento digital e presencial com segurança jurídica. Solicite certidões,
            consulte matrículas on-line, envie documentos assinados e protocole títulos
            sem sair de casa ou aqui em nossa serventia.
          </p>

          <p className="mt-8 border-l-2 border-gold pl-4">
            <span className="block text-sm text-ink-muted">{siteConfig.officer.title}</span>
            <span className="mt-0.5 block font-serif text-xl italic text-foreground">
              {siteConfig.officer.name}
            </span>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 rounded-sm px-6 text-base"
              render={
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              }
            />
            <a
              href="#servicos"
              className="self-start py-2 text-base font-medium text-primary underline decoration-gold underline-offset-[6px] transition-colors hover:decoration-primary sm:self-auto"
            >
              Ver a carta de serviços
            </a>
          </div>
        </div>

        <HeroLot className="lg:col-start-2 lg:row-start-1" />

        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-rule pt-6 text-sm sm:grid-cols-3 lg:col-start-1 lg:row-start-3 lg:mt-12 lg:self-end">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-ink-muted">{fact.label}</dt>
              <dd className="mt-1 font-medium tabular-nums text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <nav
          aria-labelledby="triagem-title"
          className="relative z-10 border-t-2 border-gold bg-wine-deep text-paper lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-8 lg:self-start"
        >
          <div className="px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
            <h2 id="triagem-title" className="font-serif text-2xl font-semibold">
              O que você precisa?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-paper/75">
              Atalhos para os pedidos feitos no Portal Integrado do Registro de Imóveis (ONR).
            </p>
          </div>
          <ul className="border-t border-paper/15">
            {shortcuts.map((shortcut) => (
              <li key={shortcut.title} className="border-b border-paper/15 last:border-b-0">
                <a
                  href={siteConfig.onrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 px-6 py-5 transition-colors hover:bg-paper/[0.06] focus-visible:bg-paper/[0.06] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold sm:px-8"
                >
                  <span>
                    <span className="block font-serif text-lg font-semibold decoration-gold underline-offset-4 group-hover:underline">
                      {shortcut.title}
                    </span>
                    <span className="mt-1 block text-sm text-paper/75">{shortcut.detail}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(abre o portal ONR em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
