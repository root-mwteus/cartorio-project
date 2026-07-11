import {
  FileText,
  Monitor,
  FileSignature,
  Search,
  ClipboardList,
  ShieldCheck,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: FileText,
    title: 'Certidão de Matrícula',
    description:
      'Emissão de certidões com validade jurídica, comprovando a situação atualizada e a titularidade do imóvel.',
  },
  {
    icon: Monitor,
    title: 'Matrícula On-line',
    description:
      'Visualize a imagem da matrícula idêntica à do cartório, com praticidade e sem precisar se deslocar até a serventia.',
  },
  {
    icon: FileSignature,
    title: 'Portal de Assinaturas e Digitalizações',
    description:
      'Envio seguro de documentos assinados digitalmente, garantindo agilidade e integridade em todo o processo.',
  },
  {
    icon: Search,
    title: 'Pesquisa de Bens',
    description:
      'Busca por CPF ou CNPJ para detectar imóveis registrados em nome de pessoas físicas ou jurídicas.',
  },
  {
    icon: ClipboardList,
    title: 'E-Protocolo',
    description:
      'Protocolo eletrônico de títulos no Registro de Imóveis, com acompanhamento do andamento à distância.',
  },
  {
    icon: ShieldCheck,
    title: 'Registro e Averbação',
    description:
      'Registro de compras, vendas e garantias, além de averbações de construções, quitações e alterações no imóvel.',
  },
]

export function ServicesGrid() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-accent">
          Nossos serviços
        </span>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Soluções completas para o seu imóvel
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Reunimos os principais serviços da serventia em um só lugar. Conheça o que
          oferecemos e acesse o Portal Integrado do Registro de Imóveis do Brasil (ONR)
          para solicitar.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <a
              key={service.title}
              href={siteConfig.onrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Acessar no portal ONR
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
