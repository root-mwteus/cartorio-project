import type { ReactNode } from 'react'
import { ArrowUpRight, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deadlineText, legalDeadlines } from '@/lib/legal-deadlines'
import { siteConfig } from '@/lib/site-config'
import { whatsappLink } from '@/lib/whatsapp'
import { ExpedienteStatus } from './expediente-status'

const messages = {
  certidao: 'Olá! Gostaria de solicitar uma certidão de inteiro teor da matrícula nº ',
  consulta: 'Olá! Preciso de ajuda para consultar uma matrícula ou fazer uma pesquisa de bens.',
  registro: 'Olá! Tenho uma dúvida sobre o registro de uma escritura ou título.',
  registrar: 'Olá! Quero registrar um imóvel. Quais documentos preciso apresentar?',
  duvida: 'Olá! Tenho uma dúvida sobre os serviços do cartório.',
}

const quickMessages = [
  { label: 'Solicitar certidão', message: messages.certidao },
  { label: 'Registrar imóvel', message: messages.registrar },
  { label: 'Tirar dúvida geral', message: messages.duvida },
]

// As células encostam umas nas outras; o fundo do grid aparece no gap de 1px como filete.
const cell =
  'flex flex-col p-6 transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_oklch(0.74_0.11_82/0.6)] motion-reduce:transition-none sm:p-8'
const badge =
  'inline-flex items-center gap-1.5 border border-rule px-2.5 py-1 text-sm font-medium tabular-nums text-foreground'
const cellTitle = 'font-serif text-2xl font-normal leading-tight text-foreground'

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline decoration-rule underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
        aria-hidden="true"
      />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}

export function ServicesBento() {
  const { certidaoMatricula, registroTitulos, prenotacao } = legalDeadlines

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-28">
        <h2
          id="servicos-title"
          className="text-balance font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.015em] text-foreground"
        >
          Atos e serviços
        </h2>
        <p className="mt-4 max-w-[38rem] text-pretty leading-relaxed text-ink-muted sm:text-lg">
          Escolha o que precisa. O pedido segue pelo Portal ONR ou direto com a equipe, no WhatsApp.
        </p>

        <div className="mt-10 grid gap-px border border-rule bg-rule lg:mt-14 lg:grid-cols-12">
          <article className={`${cell} bg-paper lg:col-span-7 lg:row-span-2`}>
            <h3 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-tight text-foreground">
              Certidão de matrícula
            </h3>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className={`${badge} bg-linen`}>
                <Clock className="h-4 w-4 text-gold-text" aria-hidden="true" />
                {deadlineText(certidaoMatricula)}
              </span>
              <span className="text-sm text-ink-muted">{certidaoMatricula.basis}</span>
            </p>
            <p className="mt-5 max-w-[46ch] text-pretty leading-relaxed text-ink-muted">
              Inteiro teor em formato digital, com validade jurídica. Tenha o número da matrícula
              em mãos.
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row sm:items-center sm:gap-6">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a href={whatsappLink(messages.certidao)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Pedir certidão pelo WhatsApp
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                }
              />
              <ExternalLink href={siteConfig.onrUrl}>Solicitar no Portal ONR</ExternalLink>
            </div>
          </article>

          <article className={`${cell} bg-linen lg:col-span-5`}>
            <h3 className={cellTitle}>Matrícula on-line e pesquisa de bens</h3>
            <p className="mt-3">
              <span className={`${badge} bg-paper`}>Prazo sob consulta</span>
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
              Veja a imagem da matrícula ou encontre imóveis por CPF ou CNPJ, sem sair de casa.
            </p>
            <div className="mt-auto flex flex-wrap gap-x-6 pt-6">
              <ExternalLink href={siteConfig.onrUrl}>Acessar o Portal ONR</ExternalLink>
              <ExternalLink href={whatsappLink(messages.consulta)}>Ajuda pelo WhatsApp</ExternalLink>
            </div>
          </article>

          <article className={`${cell} bg-linen lg:col-span-5`}>
            <h3 className={cellTitle}>Registro de escrituras e títulos</h3>
            <p className="mt-3 flex flex-wrap gap-2">
              <span className={`${badge} bg-paper`}>
                <Clock className="h-4 w-4 text-gold-text" aria-hidden="true" />
                {deadlineText(registroTitulos)}
              </span>
              <span className={`${badge} bg-paper`}>Prenotação: {deadlineText(prenotacao)}</span>
            </p>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li className="flex gap-3">
                <span aria-hidden="true" className="font-serif text-base tabular-nums text-gold-text">1</span>
                <span>
                  Assine o título com certificado ICP-Brasil, se preciso pelo{' '}
                  <a
                    href={siteConfig.signaturePortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline decoration-rule underline-offset-4 hover:decoration-primary"
                  >
                    Portal de Assinaturas<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="font-serif text-base tabular-nums text-gold-text">2</span>
                <span>Protocole pelo E-Protocolo, no Portal ONR.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="font-serif text-base tabular-nums text-gold-text">3</span>
                <span>Cumpra eventuais exigências dentro do prazo da prenotação.</span>
              </li>
            </ol>
            <div className="mt-auto flex flex-wrap gap-x-6 pt-6">
              <ExternalLink href={siteConfig.onrUrl}>Dar entrada no E-Protocolo</ExternalLink>
              <ExternalLink href={whatsappLink(messages.registro)}>Dúvidas pelo WhatsApp</ExternalLink>
            </div>
          </article>

          <article
            className={`${cell} bg-wine-deep text-paper lg:col-span-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-10`}
          >
            <div>
              <h3 className="font-serif text-xl font-normal text-paper/85">Atendimento pelo WhatsApp</h3>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-none tabular-nums text-paper transition-colors hover:text-gold"
              >
                {siteConfig.whatsappDisplay}
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
              <ExpedienteStatus tone="dark" className="mt-4" />
            </div>

            <div className="mt-8 lg:mt-0">
              <p className="text-sm text-paper/75">Mensagens prontas, com um toque:</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {quickMessages.map((item) => (
                  <li key={item.label}>
                    <a
                      href={whatsappLink(item.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/30 px-4 text-sm font-medium text-paper transition-colors hover:border-gold hover:bg-paper/10"
                    >
                      <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
                      {item.label}
                      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
