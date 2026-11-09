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

const columns = 'md:grid-cols-[3rem_minmax(0,1fr)_10rem_1.25rem]'

export function ServicesGrid() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2
            id="servicos-title"
            className="text-balance font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.015em] text-foreground"
          >
            Carta de serviços registrais
          </h2>
          <p className="mt-4 max-w-[30rem] text-pretty leading-relaxed text-ink-muted">
            Os atos desta serventia são solicitados pelo Portal Integrado do Registro de Imóveis do
            Brasil (ONR). Confira o prazo médio de cada um antes de fazer o pedido.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            className="mt-7"
            render={
              <a href={siteConfig.onrUrl} target="_blank" rel="noopener noreferrer">
                Abrir o Portal ONR
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            }
          />
          <p className="mt-8 max-w-[30rem] text-sm leading-relaxed text-ink-muted">
            Prazos em horas ou dias úteis. Prazo máximo de prenotação: 20 dias. Para atos sob
            consulta, confirme o prazo com nossa equipe pelo{' '}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline decoration-gold underline-offset-4 hover:decoration-primary"
            >
              WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-8">
          <div
            aria-hidden="true"
            className={`hidden gap-6 pb-3 text-sm text-ink-muted md:grid ${columns}`}
          >
            <span>Nº</span>
            <span>Ato</span>
            <span>Prazo médio</span>
          </div>

          <ol role="list" className="border-t-2 border-foreground">
            {services.map((service, index) => (
              <li
                key={service.title}
                className={`index-row group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-rule py-6 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-primary md:items-baseline md:gap-6 ${columns}`}
              >
                <span aria-hidden="true" className="font-serif text-xl tabular-nums text-gold-text">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="pr-7 md:pr-0">
                  <h3
                    className={`font-serif font-medium leading-tight text-foreground ${index === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}
                  >
                    <a
                      href={siteConfig.onrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outline-none after:absolute after:inset-0"
                    >
                      {service.title}
                      <span className="sr-only">, solicitar no portal ONR (abre em nova aba)</span>
                    </a>
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-pretty text-sm leading-relaxed text-ink-muted md:text-base">
                    {service.description}
                  </p>
                </div>

                <p className="col-start-2 text-sm text-ink-muted md:col-start-auto">
                  <span className="md:sr-only">Prazo médio: </span>
                  <span className="font-serif text-lg text-foreground">{service.deadline}</span>
                </p>

                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute right-0 top-7 h-5 w-5 text-primary transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 md:static"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
