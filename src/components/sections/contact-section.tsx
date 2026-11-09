'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Loader2, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { siteConfig } from '@/lib/site-config'
import { CopyValue } from './copy-value'
import { ExpedienteStatus } from './expediente-status'

const { address } = siteConfig
const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postalCode}`
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
const digits = (value: string) => value.replace(/\D/g, '')

const link =
  'font-medium text-primary underline decoration-rule underline-offset-4 transition-colors hover:decoration-primary'

const inputClass =
  'w-full border-0 border-b border-ink-muted/60 bg-transparent px-0 py-2.5 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-ink-muted/70 focus:border-wine focus:shadow-[0_1px_0_var(--color-wine)]'

const labelClass = 'text-sm font-medium text-foreground'

const initialState: ContactFormState = { status: 'idle' }

// shortcut: corta em 1500 caracteres porque URLs longas falham em alguns apps; o texto inteiro continua no formulário.
function fallbackLinks({ name, email, subject, message }: NonNullable<ContactFormState['values']>) {
  const body = encodeURIComponent(
    `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\n${message}`.slice(0, 1500),
  )
  return {
    whatsapp: `${siteConfig.whatsappUrl}?text=${body}`,
    email: `mailto:${siteConfig.email.general}?subject=${encodeURIComponent(subject)}&body=${body}`,
  }
}

function ContactForm({ onRequestReset }: { onRequestReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const links = state.fallback && state.values ? fallbackLinks(state.values) : null

  if (state.status === 'success') {
    return (
      <div role="status" className="border-t-4 border-double border-gold pt-6">
        <h3 className="font-serif text-3xl font-normal text-foreground">Mensagem enviada</h3>
        <p className="mt-2 max-w-sm text-pretty leading-relaxed text-ink-muted">
          Nossa equipe responderá o seu e-mail em até um dia útil.
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
          defaultValue={state.values?.name}
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
          defaultValue={state.values?.email}
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
          defaultValue={state.values?.subject}
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
          defaultValue={state.values?.message}
          rows={5}
          placeholder="Descreva sua dúvida ou solicitação"
          className={`${inputClass} resize-none`}
        />
      </div>

      {state.status === 'error' && (
        <div role="alert" className="grid gap-3">
          <p className="text-sm text-destructive">{state.message}</p>
          {links && (
            <div className="grid gap-2">
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                className="h-11 bg-paper px-4"
                render={
                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Enviar mensagem direto pelo WhatsApp
                  </a>
                }
              />
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                className="h-11 bg-paper px-4"
                render={
                  <a href={links.email}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Enviar por e-mail
                  </a>
                }
              />
            </div>
          )}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="mt-1 w-full"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isPending ? 'Enviando...' : 'Enviar mensagem'}
      </Button>

      <p className="text-xs leading-relaxed text-ink-muted">
        Usamos seus dados para responder a esta mensagem. Saiba mais no{' '}
        <Link href="/privacidade" className="underline underline-offset-2 hover:text-foreground">
          Aviso de Privacidade
        </Link>
        .
      </p>
    </form>
  )
}

export function ContactSection() {
  const [resetToken, setResetToken] = useState(0)

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
          Envie sua dúvida pelo formulário ou use um dos canais da serventia. Retornamos em
          até um dia útil.
        </p>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
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

          <div className="bg-linen p-6 sm:p-10">
            <h3 className="font-serif text-2xl font-medium text-foreground">Escreva para a serventia</h3>
            <p className="mb-6 mt-1 text-sm text-ink-muted">Todos os campos são obrigatórios.</p>
            <ContactForm key={resetToken} onRequestReset={() => setResetToken((t) => t + 1)} />
          </div>
        </div>
      </div>
    </section>
  )
}
