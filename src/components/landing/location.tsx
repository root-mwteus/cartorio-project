import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { CopyValue } from '@/components/sections/copy-value'
import { ExpedienteStatus } from '@/components/sections/expediente-status'
import { Folio, WhatsAppLink, sectionPad } from './primitives'

const { address } = siteConfig
const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postalCode}`
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
const digits = (value: string) => value.replace(/\D/g, '')

const term = 'font-grotesk text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-ink-muted'
const value = 'font-grotesk text-2xl font-extrabold leading-tight text-ink'
const row = 'grid gap-1 border-b border-rule py-5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-6'
const link = 'underline decoration-rule underline-offset-[6px] transition-colors hover:decoration-wine'

export function Location() {
  return (
    <section id="contato" aria-labelledby="contato-title" className={`border-t border-rule bg-linen py-20 lg:py-28 ${sectionPad}`}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-18">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Folio>Fl. 7 · Onde estamos</Folio>
            <h2
              id="contato-title"
              className="text-balance font-grotesk text-[clamp(2.75rem,6vw,4.75rem)] font-black leading-[0.88] tracking-[-0.03em] text-ink"
            >
              Prefere ser atendido <span className="text-wine">no balcão?</span>
            </h2>
          </div>

          <dl className="border-t-2 border-ink">
            <div className={row}>
              <dt className={term}>Endereço</dt>
              <dd className={value}>
                <address className="not-italic">
                  {address.street} · {address.neighborhood}, {address.city}/{address.state} · CEP{' '}
                  <span className="tabular-nums">{address.postalCode}</span>
                </address>
                <CopyValue value={fullAddress} label="endereço" />
              </dd>
            </div>
            <div className={row}>
              <dt className={term}>Horário</dt>
              <dd className={value}>
                {siteConfig.hours.label}
                <span className="block text-lg font-semibold text-ink-muted">{siteConfig.hours.exceptions}</span>
                <ExpedienteStatus className="mt-1 font-sans font-normal" />
              </dd>
            </div>
            <div className={row}>
              <dt className={term}>WhatsApp</dt>
              <dd className={`${value} tabular-nums text-wine`}>
                <WhatsAppLink href={siteConfig.whatsappUrl} className={link}>
                  {siteConfig.whatsappDisplay}
                </WhatsAppLink>
              </dd>
            </div>
            <div className={row}>
              <dt className={term}>Telefone</dt>
              <dd className={`${value} tabular-nums`}>
                <a href={`tel:+55${digits(siteConfig.phoneDisplay)}`} className={link}>
                  {siteConfig.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className={`${row} border-b-0`}>
              <dt className={term}>E-mails</dt>
              <dd className={`${value} flex min-w-0 flex-col items-start gap-1 text-xl`}>
                <a href={`mailto:${siteConfig.email.general}`} className={`break-all ${link}`}>
                  {siteConfig.email.general}
                </a>
                <a href={`mailto:${siteConfig.email.notes}`} className={`break-all ${link}`}>
                  {siteConfig.email.notes}
                  <span className="ml-2 font-semibold text-ink-muted">(notas)</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-t-full border border-rule bg-paper lg:min-h-[34rem]"
        >
          {/* Mapa desenhado: o CSP não permite iframe do Google Maps. */}
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <path d="M-20 360 L500 300" stroke="var(--color-rule)" strokeWidth="22" />
            <path d="M180 -20 L240 620" stroke="var(--color-rule)" strokeWidth="16" />
            <path d="M-20 140 L500 200" stroke="var(--color-linen)" strokeWidth="10" />
            <path d="M380 -20 L330 620" stroke="var(--color-linen)" strokeWidth="10" />
            <path d="M60 -20 L110 620" stroke="var(--color-linen)" strokeWidth="8" />
            <path d="M-20 500 L500 470" stroke="var(--color-linen)" strokeWidth="8" />
          </svg>
          <span aria-hidden="true" className="absolute left-1/2 top-[42%] flex size-11 -translate-x-1/2 -rotate-45 items-center justify-center rounded-[50%_50%_50%_0] bg-wine shadow-[0_0_0_6px_oklch(0.34_0.12_18/0.15)]">
            <span className="size-3.5 rounded-full bg-gold" />
          </span>
          <span className="relative flex items-center justify-between bg-wine-deep px-6 py-5 font-grotesk text-xl font-extrabold text-paper transition-colors group-hover:bg-wine">
            Abrir no mapa
            <ArrowUpRight className="h-5 w-5 text-gold" aria-hidden="true" />
          </span>
          <span className="sr-only"> (abre o Google Maps em nova aba)</span>
        </a>
      </div>
    </section>
  )
}
