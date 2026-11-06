import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

type Service = {
  title: string
  description: string
  deadline: string
}

// Prazos vindos da seção #prazos; "Sob consulta" onde o cartório não publicou prazo.
const services: Service[] = [
  {
    title: 'Certidão de Matrícula',
    description:
      'Emissão de certidões com validade jurídica, comprovando a situação atualizada e a titularidade do imóvel.',
    deadline: 'Até 4 horas úteis',
  },
  {
    title: 'Matrícula On-line',
    description:
      'Visualize a imagem da matrícula idêntica à do cartório, com praticidade e sem precisar se deslocar até a serventia.',
    deadline: 'Sob consulta',
  },
  {
    title: 'Portal de Assinaturas e Digitalizações',
    description:
      'Envio seguro de documentos assinados digitalmente, garantindo agilidade e integridade em todo o processo.',
    deadline: 'Sob consulta',
  },
  {
    title: 'Pesquisa de Bens',
    description:
      'Busca por CPF ou CNPJ para detectar imóveis registrados em nome de pessoas físicas ou jurídicas.',
    deadline: 'Sob consulta',
  },
  {
    title: 'E-Protocolo',
    description:
      'Protocolo eletrônico de títulos no Registro de Imóveis, com acompanhamento do andamento à distância.',
    deadline: '5 a 10 dias úteis',
  },
  {
    title: 'Registro e Averbação',
    description:
      'Registro de compras, vendas e garantias, além de averbações de construções, quitações e alterações no imóvel.',
    deadline: '5 a 10 dias úteis',
  },
]

const columns = 'md:grid-cols-[4rem_minmax(0,1fr)_11rem_9rem]'

export function ServicesGrid() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <h2
              id="servicos-title"
              className="text-balance font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] text-foreground"
            >
              Carta de Serviços Registrais
            </h2>
            <p className="mt-3 max-w-[38rem] text-pretty text-base leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
              Os atos desta serventia são solicitados pelo Portal Integrado do Registro de
              Imóveis do Brasil (ONR). Confira o prazo médio de cada um antes de fazer o pedido.
            </p>
          </div>
          <Button
            size="lg"
            nativeButton={false}
            className="h-12 justify-self-start rounded-sm px-6 text-base"
            render={
              <a href={siteConfig.onrUrl} target="_blank" rel="noopener noreferrer">
                Abrir o Portal ONR
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            }
          />
        </div>

        <div
          aria-hidden="true"
          className={`mt-14 hidden gap-6 border-b-2 border-foreground pb-3 text-sm text-ink-muted md:grid ${columns}`}
        >
          <span>Nº</span>
          <span>Ato</span>
          <span>Prazo médio</span>
          <span className="text-right">Solicitação</span>
        </div>

        <ol role="list" className="mt-10 border-t-2 border-foreground md:mt-0 md:border-t-0">
          {services.map((service, index) => (
            <li
              key={service.title}
              className={`group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-rule py-5 md:py-6 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-primary md:items-baseline md:gap-6 ${columns}`}
            >
              <span aria-hidden="true" className="font-serif text-xl tabular-nums text-gold-text">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  <a
                    href={siteConfig.onrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="decoration-gold underline-offset-4 outline-none after:absolute after:inset-0 group-hover:underline"
                  >
                    {service.title}
                    <span className="sr-only">, solicitar no portal ONR (abre em nova aba)</span>
                  </a>
                </h3>
                <p className="mt-1.5 line-clamp-2 max-w-[52ch] text-pretty text-sm leading-relaxed text-ink-muted md:mt-2 md:line-clamp-none md:text-base">
                  {service.description}
                </p>
              </div>

              <div className="col-start-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 md:contents">
                <p className="text-sm text-ink-muted">
                  <span className="md:sr-only">Prazo médio: </span>
                  <span className="font-serif text-lg font-semibold text-foreground">
                    {service.deadline}
                  </span>
                </p>

                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary md:justify-self-end"
                >
                  <span className="hidden md:inline">Solicitar no ONR</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                </span>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-ink-muted">
          Prazos em horas ou dias úteis. Prazo máximo de prenotação: 20 dias. Para atos sob
          consulta, confirme o prazo com nossa equipe pelo{' '}
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline decoration-gold underline-offset-4 hover:decoration-primary"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  )
}
