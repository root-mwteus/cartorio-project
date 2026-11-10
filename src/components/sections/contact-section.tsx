import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'
import { CopyValue } from './copy-value'
import { ExpedienteStatus } from './expediente-status'

const { address } = siteConfig
const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postalCode}`
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
const digits = (value: string) => value.replace(/\D/g, '')

const link =
  'font-medium text-primary underline decoration-rule underline-offset-4 transition-colors hover:decoration-primary'

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-28">
        <h2
          id="contato-title"
          className="text-balance font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.015em] text-foreground"
        >
          Central de atendimento
        </h2>
        <p className="mt-3 max-w-[38rem] text-pretty text-base leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
          Fale com a serventia pelo WhatsApp ou use um dos canais abaixo. Retornamos em até um
          dia útil.
        </p>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 sm:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h3 className="font-serif text-2xl font-medium text-foreground">
              Ficha da serventia
            </h3>
            <dl className="mt-4 border-t-2 border-foreground text-sm sm:text-base">
              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">Endereço</dt>
                <dd className="text-foreground">
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.neighborhood}, {address.city}/{address.state}, CEP{' '}
                    <span className="tabular-nums">{address.postalCode}</span>
                  </address>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-block py-1 text-sm ${link}`}>
                    Ver no mapa<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                  <CopyValue value={fullAddress} label="endereço" />
                </dd>
              </div>

              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">Horário</dt>
                <dd className="text-foreground">
                  {siteConfig.hours.label}
                  <span className="block text-sm text-ink-muted">{siteConfig.hours.exceptions}</span>
                  <ExpedienteStatus className="mt-1" />
                </dd>
              </div>

              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">Telefones</dt>
                <dd className="flex flex-col items-start gap-1 tabular-nums">
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className={link}>
                    {siteConfig.whatsappDisplay} (WhatsApp)<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                  <a href={`tel:+55${digits(siteConfig.phoneDisplay)}`} className={link}>
                    {siteConfig.phoneDisplay}
                  </a>
                </dd>
              </div>

              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">E-mails</dt>
                <dd className="flex min-w-0 flex-col items-start gap-1">
                  <span>
                    <a href={`mailto:${siteConfig.email.general}`} className={`break-all ${link}`}>
                      {siteConfig.email.general}
                    </a>
                    <CopyValue value={siteConfig.email.general} label="e-mail geral" />
                  </span>
                  <span>
                    <a href={`mailto:${siteConfig.email.notes}`} className={`break-all ${link}`}>
                      {siteConfig.email.notes}
                    </a>
                    <CopyValue value={siteConfig.email.notes} label="e-mail do tabelionato de notas" />
                  </span>
                </dd>
              </div>

              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">Registros</dt>
                <dd className="flex flex-col items-start gap-1 tabular-nums text-foreground">
                  <span>
                    CNS {siteConfig.cns}
                    <CopyValue value={siteConfig.cns} label="CNS" />
                  </span>
                  <span>
                    CNPJ {siteConfig.cnpj}
                    <CopyValue value={siteConfig.cnpj} label="CNPJ" />
                  </span>
                </dd>
              </div>

              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">Ouvidoria</dt>
                <dd className="text-foreground">
                  Reclamações, sugestões e elogios, com sigilo.{' '}
                  <Link href="/ouvidoria" className={link}>
                    Registrar manifestação
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col self-start bg-linen p-6 sm:p-10">
            <h3 className="font-serif text-2xl font-medium text-foreground">Fale pelo WhatsApp</h3>
            <p className="mt-2 text-pretty leading-relaxed text-ink-muted">
              Tire dúvidas, peça orientações sobre documentos e agende seu atendimento com a
              equipe da serventia.
            </p>

            <dl className="mt-6 border-t border-rule text-sm">
              <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                <dt className="text-ink-muted">Número oficial</dt>
                <dd className="font-medium tabular-nums text-foreground">{siteConfig.whatsappDisplay}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                <dt className="text-ink-muted">Atendimento</dt>
                <dd className="text-right text-foreground">
                  {siteConfig.hours.short}
                  <ExpedienteStatus className="mt-1 justify-end" />
                </dd>
              </div>
            </dl>

            <Button
              size="lg"
              nativeButton={false}
              className="mt-8 w-full"
              render={
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Iniciar conversa no WhatsApp
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              }
            />

            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Prefere e-mail? Escreva para{' '}
              <a href={`mailto:${siteConfig.email.general}`} className={`break-all ${link}`}>
                {siteConfig.email.general}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
