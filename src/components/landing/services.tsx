import { cn } from '@/lib/utils'
import { whatsappLink } from '@/lib/whatsapp'
import { SectionHeading, WhatsAppLink, sectionPad } from './primitives'

// Atribuições conforme a placa da fachada da serventia.
const services = [
  {
    numeral: 'I',
    title: 'Registro de Imóveis',
    text: 'Matrícula, registro de compra e venda, averbações e certidões de imóveis.',
  },
  {
    numeral: 'II',
    title: 'Tabelionato de Notas',
    text: 'Escrituras, procurações, reconhecimento de firma e autenticação de documentos.',
  },
  {
    numeral: 'III',
    title: 'Protesto de Títulos',
    text: 'Protesto de títulos e outros documentos de dívida, consulta e cancelamento.',
  },
  {
    numeral: 'IV',
    title: 'Títulos, Documentos e Pessoas Jurídicas',
    text: 'Registro de contratos e documentos, e dos atos de associações e sociedades simples.',
  },
]

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
            <p className="font-grotesk text-xl font-semibold leading-snug text-paper/75">{service.text}</p>
            <WhatsAppLink
              href={whatsappLink(`Olá! Tenho uma dúvida sobre ${service.title}.`)}
              className="mt-auto self-start pt-2 font-grotesk text-lg font-extrabold text-gold underline decoration-gold/50 underline-offset-[6px] transition-colors hover:decoration-gold"
            >
              Perguntar sobre este serviço
            </WhatsAppLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
