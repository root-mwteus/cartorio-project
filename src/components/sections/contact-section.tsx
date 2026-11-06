'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { siteConfig } from '@/lib/site-config'

const { address } = siteConfig
const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postalCode}`
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
const digits = (value: string) => value.replace(/\D/g, '')

const link =
  'font-medium text-primary underline decoration-rule underline-offset-4 transition-colors hover:decoration-primary'

const inputClass =
  'w-full rounded-lg border border-rule bg-paper px-3.5 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-ink-muted/70 focus:border-wine-deep focus:ring-2 focus:ring-wine-deep/20 sm:text-sm'

const labelClass = 'text-sm font-medium text-foreground'

const initialState: ContactFormState = { status: 'idle' }

function ContactForm({ onRequestReset }: { onRequestReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-gold-text">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">
          Mensagem enviada!
        </h3>
        <p className="mt-2 max-w-sm text-pretty leading-relaxed text-ink-muted">
          Obrigado pelo contato. Nossa equipe responderá o seu e-mail em até um dia útil.
        </p>
        <Button variant="outline" className="mt-6 h-11 bg-transparent px-5" onClick={onRequestReset}>
          Enviar nova mensagem
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-5" aria-busy={isPending}>
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-0">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <label htmlFor="name" className={labelClass}>
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Seu nome"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className={labelClass}>
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="voce@email.com"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="subject" className={labelClass}>
          Assunto
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={150}
          placeholder="Ex: Emissão de certidão"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="Descreva sua dúvida ou solicitação"
          className={`${inputClass} resize-none`}
        />
      </div>

      {state.status === 'error' && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="mt-1 h-12 w-full rounded-lg bg-wine-deep text-base text-paper hover:bg-primary"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {isPending ? 'Enviando...' : 'Enviar mensagem'}
      </Button>
    </form>
  )
}

export function ContactSection() {
  const [resetToken, setResetToken] = useState(0)

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <h2
          id="contato-title"
          className="text-balance font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] text-foreground"
        >
          Central de Atendimento
        </h2>
        <p className="mt-3 max-w-[38rem] text-pretty text-base leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
          Envie sua dúvida pelo formulário ou use um dos canais da serventia. Retornamos em
          até um dia útil.
        </p>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Identificação e plantão da serventia
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
                </dd>
              </div>

              <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-muted">Horário</dt>
                <dd className="text-foreground">
                  Segunda a sexta-feira, das <span className="tabular-nums">08h às 17h</span>
                  <span className="block text-sm text-ink-muted">Exceto feriados</span>
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
                  <a href={`mailto:${siteConfig.email.general}`} className={`break-all ${link}`}>
                    {siteConfig.email.general}
                  </a>
                  <a href={`mailto:${siteConfig.email.support}`} className={`break-all ${link}`}>
                    {siteConfig.email.support}
                  </a>
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

          <div className="border border-rule bg-linen p-6 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground">Formulário institucional</h3>
            <p className="mb-6 mt-1 text-sm text-ink-muted">Todos os campos são obrigatórios.</p>
            <ContactForm key={resetToken} onRequestReset={() => setResetToken((t) => t + 1)} />
          </div>
        </div>
      </div>
    </section>
  )
}
