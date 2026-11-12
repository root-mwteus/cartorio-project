import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'
import { legalDeadlines } from '@/lib/legal-deadlines'
import { generalMessage, topics, whatsappLink } from '@/lib/whatsapp'
import { Folio, WhatsAppLink } from './primitives'

const quickTopics = topics.filter((topic) => ['certidao', 'registro', 'documentos', 'valores'].includes(topic.id))

const { certidaoMatricula, registroTitulos, prenotacao } = legalDeadlines
const ledger = [
  { value: `${certidaoMatricula.from}h`, label: 'úteis para a certidão de matrícula' },
  { value: `${registroTitulos.from}–${registroTitulos.to}`, label: 'dias úteis para registrar um título' },
  { value: prenotacao.from, label: 'dias de validade da prenotação' },
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="bg-wine-deep text-paper">
      <div className="flex">
        <div
          aria-hidden="true"
          className="hidden w-16 shrink-0 flex-col items-center justify-between border-r border-gold/25 py-8 font-grotesk text-[0.95rem] font-extrabold text-gold lg:flex"
        >
          <span>Fl. 1</span>
          <span className="rotate-180 text-xs uppercase tracking-[0.2em] text-paper/55 [writing-mode:vertical-rl]">
            Livro de atendimento · {siteConfig.address.city}
          </span>
          <span>§</span>
        </div>

        <div className="grid flex-1 gap-12 px-5 pb-14 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16 lg:px-16 lg:pb-16 lg:pt-14 xl:grid-cols-[minmax(0,1fr)_30rem]">
          <div className="flex flex-col justify-center gap-7">
            <Folio tone="dark">{siteConfig.name}</Folio>
            <h1
              id="hero-title"
              className="text-balance font-grotesk text-[clamp(3.25rem,6.4vw,5.75rem)] font-black leading-[0.84] tracking-[-0.03em] motion-safe:animate-rise"
            >
              Seu atendimento no cartório começa <span className="text-gold">com uma mensagem.</span>
            </h1>
            <p className="max-w-xl text-pretty font-grotesk text-xl font-semibold leading-snug text-paper/85 sm:text-[1.55rem]">
              Certidões, registros, escrituras e dúvidas: escolha o assunto e converse direto com a
              equipe da serventia, sem precisar sair de casa.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <WhatsAppLink
                href={whatsappLink(generalMessage)}
                icon
                className="inline-flex min-h-14 items-center justify-center gap-2.5 self-start rounded-sm bg-gold px-7 font-grotesk text-2xl font-extrabold text-wine-deep transition-colors hover:bg-paper"
              >
                Falar no WhatsApp
              </WhatsAppLink>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-grotesk text-[2rem] font-extrabold tabular-nums text-paper transition-colors hover:text-gold"
              >
                {siteConfig.whatsappDisplay}
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-grotesk text-xl font-bold">
              <span className="text-paper/60">Assuntos frequentes:</span>
              {quickTopics.map((topic) => (
                <WhatsAppLink
                  key={topic.id}
                  href={whatsappLink(topic.message)}
                  className="py-1 text-paper underline decoration-gold/60 underline-offset-[6px] transition-colors hover:decoration-gold"
                >
                  {topic.short}
                </WhatsAppLink>
              ))}
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-sm self-center lg:max-w-none">
            <div className="rounded-t-full border border-gold p-4">
              <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full">
                <Image
                  src="/galeria/fachada-cartorios-de-luz.jpg"
                  alt={`Fachada do ${siteConfig.tradeName}, no Centro de ${siteConfig.address.city}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 30rem, 24rem"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="absolute -left-4 bottom-12 flex size-32 flex-col items-center justify-center rounded-full border border-gold bg-wine-deep font-grotesk shadow-[0_0_0_6px_var(--color-wine-deep),0_0_0_7px_oklch(0.74_0.11_82/0.5)] sm:-left-10">
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold">CNS</span>
              <span className="text-[1.9rem] font-black leading-none tabular-nums">{siteConfig.cns}</span>
              <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-gold">
                {siteConfig.address.city}
              </span>
            </div>
            <figcaption className="mt-4 flex justify-between gap-4 font-grotesk">
              <span className="shrink-0 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.14em] text-gold">Fl. 01 · Sede</span>
              <span className="text-right text-lg font-semibold leading-tight text-paper/80">
                {siteConfig.address.street}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <dl id="prazos-resumo" className="grid border-t border-gold/40 bg-[oklch(0.22_0.08_18)] sm:grid-cols-3 lg:pl-16">
        {ledger.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-baseline gap-4 px-5 py-6 sm:px-8 ${index > 0 ? 'border-t border-gold/25 sm:border-l sm:border-t-0' : ''}`}
          >
            <dt className="order-2 max-w-40 font-grotesk text-lg font-semibold leading-tight text-paper/80">
              {item.label}
            </dt>
            <dd className="order-1 font-grotesk text-[3.5rem] font-black leading-none tabular-nums text-gold">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
