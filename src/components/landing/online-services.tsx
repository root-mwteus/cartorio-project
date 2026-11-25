import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { SectionHeading, sectionPad } from './primitives'

// Plataformas oficiais. Endereços conferidos em 24/11/2026.
const platforms = [
  {
    name: 'ONR',
    text: 'Registro de Imóveis: certidões de matrícula e protocolo eletrônico de títulos.',
    href: siteConfig.onrUrl,
  },
  {
    name: 'e-Notariado',
    text: 'Escrituras e procurações por videoconferência, com assinatura digital.',
    note: 'Observadas as regras de competência territorial do CNJ.',
    href: 'https://www.e-notariado.org.br/',
  },
  {
    name: 'CENSEC',
    text: 'Busca de escrituras, procurações e testamentos feitos em qualquer cartório do país.',
    href: 'https://censec.org.br/',
  },
  {
    name: 'RTD Brasil',
    text: 'Registro eletrônico de títulos e documentos e de pessoas jurídicas.',
    href: 'https://www.rtdbrasil.org.br/',
  },
  {
    name: 'CENPROT',
    text: 'Consulta gratuita da existência de protesto em nome de pessoa ou empresa.',
    note: 'A certidão de protesto é paga.',
    href: 'https://www.pesquisaprotesto.com.br/',
  },
  {
    name: 'Selo do TJPE',
    text: 'Confira se um ato desta ou de outra serventia de Pernambuco é autêntico, pelo número do selo.',
    href: siteConfig.oversight.seloUrl,
  },
]

export function OnlineServices() {
  return (
    <section id="servicos-online" aria-labelledby="servicos-online-title" className={`bg-paper py-20 lg:py-28 ${sectionPad}`}>
      <SectionHeading
        id="servicos-online-title"
        folio="Fl. 7 · Pela internet"
        title="Serviços online"
        accent="oficiais."
        lead="Plataformas mantidas pelos cartórios e pelo Tribunal de Justiça. Os links abrem em nova aba."
      />

      <ul className="mt-12 grid border-t-2 border-ink md:grid-cols-2 lg:mt-14">
        {platforms.map((platform, index) => (
          <li key={platform.name} className={`border-b border-rule ${index % 2 === 1 ? 'md:border-l md:pl-8' : 'md:pr-8'}`}>
            <a href={platform.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-5 py-7">
              <span className="flex flex-1 flex-col gap-1.5">
                <span className="font-grotesk text-[2rem] font-black leading-none tracking-[-0.01em] text-ink transition-colors group-hover:text-wine">
                  {platform.name}
                </span>
                <span className="font-grotesk text-xl font-semibold leading-snug text-ink-muted">{platform.text}</span>
                {platform.note && <span className="text-base text-ink-muted">{platform.note}</span>}
              </span>
              <ArrowUpRight
                className="mt-1 size-6 shrink-0 text-wine transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
