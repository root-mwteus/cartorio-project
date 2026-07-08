import { Landmark } from 'lucide-react'

const footerLinks = [
  {
    title: 'Serviços',
    links: ['Registro de Imóveis', 'Emissão de Certidões', 'Averbação', 'Usucapião'],
  },
  {
    title: 'Institucional',
    links: ['Sobre o Cartório', 'Tabela de Emolumentos', 'Perguntas Frequentes', 'Ouvidoria'],
  },
  {
    title: 'Atendimento',
    links: ['Fale no WhatsApp', 'Agendar visita', 'Enviar documentos', 'Localização'],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground/10">
                <Landmark className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-base font-semibold">
                Cartório de Registro de Imóveis
              </span>
            </div>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-primary-foreground/70">
              Serventia extrajudicial dotada de fé pública, a serviço da segurança
              jurídica e da cidadania em Bom Conselho — PE.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-primary-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cartório de Registro de Imóveis de Bom Conselho.</p>
          <p>CNPJ: 12.345.678/0001-90 · Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
