import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'
import { whatsappLink } from '@/lib/whatsapp'
import { SectionHeading, sectionPad } from './primitives'

// whatsapp: abre a conversa com a mensagem pronta; site: plataforma oficial; page: página deste site.
type Action = { label: string; kind: 'whatsapp' | 'site' | 'page'; href: string }

const wa = (label: string, message: string): Action => ({ label, kind: 'whatsapp', href: whatsappLink(message) })

// Atribuições conforme a placa da fachada da serventia.
const services: { numeral: string; title: string; text: string; actions: Action[] }[] = [
  {
    numeral: 'I',
    title: 'Registro de Imóveis',
    text: 'Matrícula, registro de compra e venda, averbações e certidões de imóveis.',
    actions: [
      { label: 'Pedir certidão de matrícula', kind: 'site', href: siteConfig.onrUrl },
      { label: 'Registrar escritura ou contrato', kind: 'page', href: '/checklists/registro-de-escritura' },
      wa('Averbar construção ou mudança de dados', 'Olá! Preciso averbar uma construção ou mudança de dados na matrícula do meu imóvel. Quais documentos devo enviar?'),
    ],
  },
  {
    numeral: 'II',
    title: 'Tabelionato de Notas',
    text: 'Escrituras, procurações, reconhecimento de firma e autenticação de documentos.',
    actions: [
      { label: 'Escritura de compra e venda', kind: 'page', href: '/checklists/compra-e-venda-imovel-urbano' },
      { label: 'Procuração pública', kind: 'page', href: '/checklists/procuracao-publica' },
      wa('Reconhecer firma ou autenticar', 'Olá! Preciso reconhecer firma ou autenticar documentos. Como funciona?'),
    ],
  },
  {
    numeral: 'III',
    title: 'Protesto de Títulos',
    text: 'Protesto de títulos e outros documentos de dívida, consulta e cancelamento.',
    actions: [
      wa('Protestar um título', 'Olá! Quero protestar um título ou documento de dívida. Quais documentos preciso apresentar?'),
      wa('Cancelar um protesto', 'Olá! Quero cancelar um protesto. Quais documentos preciso apresentar?'),
      { label: 'Consultar protesto (gratuito)', kind: 'site', href: 'https://www.pesquisaprotesto.com.br/' },
    ],
  },
  {
    numeral: 'IV',
    title: 'Títulos, Documentos e Pessoas Jurídicas',
    text: 'Registro de contratos e documentos, e dos atos de associações e sociedades simples.',
    actions: [
      wa('Registrar contrato ou documento', 'Olá! Quero registrar um contrato ou documento em Títulos e Documentos. Como funciona?'),
      wa('Registrar associação ou ata', 'Olá! Preciso registrar o estatuto ou uma ata de associação. Quais documentos devo enviar?'),
      { label: 'Registro pela internet (RTD Brasil)', kind: 'site', href: 'https://www.rtdbrasil.org.br/' },
    ],
  },
]

const icons = { whatsapp: MessageCircle, site: ArrowUpRight, page: ArrowRight }
const actionClass =
  'group/action flex min-h-11 items-start gap-2.5 py-1.5 font-grotesk text-lg font-extrabold leading-snug text-paper transition-colors hover:text-gold'

function ServiceAction({ action }: { action: Action }) {
  const Icon = icons[action.kind]
  const content = (
    <>
      <Icon className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
      <span className="underline decoration-gold/40 underline-offset-[5px] group-hover/action:decoration-gold">
        {action.label}
      </span>
    </>
  )
  if (action.kind === 'page') {
    return (
      <Link href={action.href} className={actionClass}>
        {content}
      </Link>
    )
  }
  return (
    <a href={action.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
      {content}
      <span className="sr-only">{action.kind === 'whatsapp' ? ' (abre o WhatsApp em nova aba)' : ' (abre em nova aba)'}</span>
    </a>
  )
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className={`bg-wine-deep pt-20 text-paper lg:pt-28 ${sectionPad}`}>
      <SectionHeading
        id="servicos-title"
        tone="dark"
        folio="Fl. 3 · Atribuições"
        title="Registro e notas,"
        accent="reunidos em um só endereço."
        lead="Não sabe por onde começar? Envie uma mensagem e a equipe indica o serviço certo para o seu caso."
      />

      <ul className="mt-12 grid border-t border-gold/45 sm:grid-cols-2 lg:-mr-16 lg:mt-14 lg:grid-cols-4">
        {services.map((service, index) => (
          <li
            key={service.title}
            className={cn(
              'flex flex-col gap-4 border-gold/30 py-10 lg:border-t-0 lg:px-8 lg:pb-24',
              index > 0 && 'border-t lg:border-l',
              index < 2 && 'sm:border-t-0',
              index % 2 === 1 ? 'sm:border-l sm:pl-8' : 'sm:pr-8',
              index === 0 && 'lg:pl-0',
            )}
          >
            <span aria-hidden="true" className="font-grotesk text-[4.5rem] font-black leading-[0.8] text-gold">
              {service.numeral}
            </span>
            <h3 className="font-grotesk text-[2rem] font-black leading-none lg:min-h-16">{service.title}</h3>
            <p className="font-grotesk text-xl font-semibold leading-snug text-paper/75 lg:min-h-[5.5rem]">{service.text}</p>
            <ul aria-label={`Ações de ${service.title}`} className="mt-2 flex flex-col border-t border-gold/25 pt-4">
              {service.actions.map((action) => (
                <li key={action.label}>
                  <ServiceAction action={action} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
