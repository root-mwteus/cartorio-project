'use client'

import { useActionState, useState } from 'react'
import { MapPin, Clock, Mail, Phone, Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { siteConfig } from '@/lib/site-config'

const contactCards = [
  {
    icon: MapPin,
    title: 'Endereço',
    lines: [
      siteConfig.address.street,
      `${siteConfig.address.neighborhood} — ${siteConfig.address.city}/${siteConfig.address.state}, CEP ${siteConfig.address.postalCode}`,
    ],
  },
  {
    icon: Clock,
    title: 'Horário de funcionamento',
    lines: ['Segunda a sexta-feira', 'Das 08h às 17h (exceto feriados)'],
  },
  {
    icon: Mail,
    title: 'E-mail',
    lines: [siteConfig.email.general, siteConfig.email.support],
  },
  {
    icon: Phone,
    title: 'Telefone / WhatsApp',
    lines: [`${siteConfig.whatsappDisplay} (WhatsApp)`, siteConfig.phoneDisplay],
  },
]

const inputClass =
  'w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30'

const initialState: ContactFormState = { status: 'idle' }

function ContactForm({ onRequestReset }: { onRequestReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-card-foreground">
          Mensagem enviada!
        </h3>
        <p className="mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Obrigado pelo contato. Nossa equipe responderá o seu e-mail em até um dia útil.
        </p>
        <Button variant="outline" className="mt-6 bg-transparent" onClick={onRequestReset}>
          Enviar nova mensagem
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-5" aria-busy={isPending}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-card-foreground">
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Seu nome"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-card-foreground">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="voce@email.com"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-card-foreground">
          Assunto
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Ex: Emissão de certidão"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-card-foreground">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
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
        className="mt-1 h-12 w-full text-base"
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
    <section id="contato" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-accent">
          Contato e localização
        </span>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Estamos prontos para atender você
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Envie sua dúvida pelo formulário ou utilize um de nossos canais de atendimento.
          Retornamos em até um dia útil.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {contactCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-card-foreground">{card.title}</h3>
                <div className="mt-1.5 space-y-0.5">
                  {card.lines.map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <ContactForm key={resetToken} onRequestReset={() => setResetToken((t) => t + 1)} />
        </div>
      </div>
    </section>
  )
}
