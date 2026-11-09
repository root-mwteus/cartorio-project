import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

const quickLinks = [
  { label: 'Sobre o Cartório', href: '/sobre' },
  { label: 'Tabela de Emolumentos', href: '/emolumentos' },
  { label: 'Perguntas Frequentes', href: '/faq' },
  { label: 'Ouvidoria', href: '/ouvidoria' },
  { label: 'Aviso de Privacidade', href: '/privacidade' },
  { label: 'Agendar visita', href: '/agendar' },
  { label: 'Enviar documentos', href: '/enviar-documentos' },
  { label: 'Portal ONR', href: siteConfig.onrUrl, external: true },
  { label: 'Fale no WhatsApp', href: siteConfig.whatsappUrl, external: true },
]

const linkClass =
  'inline-block py-1.5 text-sm text-paper/80 underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline-gold'

const headingClass = 'font-serif text-lg font-medium text-paper'

export function SiteFooter() {
  return (
    <footer className="bg-wine-deep text-paper">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 lg:px-8 lg:pt-20">
        <p className="font-serif text-[clamp(2.75rem,8vw,7.25rem)] font-normal italic leading-none tracking-[-0.025em]">
          {siteConfig.tradeName}
        </p>

        <div className="mt-10 grid gap-10 border-t border-paper/25 pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo-icon-v3.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              <span className={headingClass}>{siteConfig.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-paper/80">
              Serventia extrajudicial dotada de fé pública, a serviço da segurança jurídica e
              da cidadania.
            </p>
            <p className="mt-3 text-sm text-paper/80">
              {siteConfig.officer.title}:{' '}
              <span className="font-serif text-base italic text-paper">{siteConfig.officer.name}</span>
            </p>
          </div>

          <nav aria-labelledby="footer-links" className="lg:col-span-4">
            <h2 id="footer-links" className={headingClass}>
              Links rápidos
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-6">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className={headingClass}>Competência territorial</h2>
            <p className="mt-2 text-sm leading-relaxed text-paper/80">
              {siteConfig.comarca}. Registro dos atos relativos aos imóveis situados no município de{' '}
              {siteConfig.address.city}.
            </p>
            <h2 className={`mt-5 ${headingClass}`}>Endereço e atendimento</h2>
            <address className="mt-2 text-sm not-italic leading-relaxed text-paper/80">
              {siteConfig.address.street}, {siteConfig.address.neighborhood}
              <br />
              {siteConfig.address.city}/{siteConfig.address.state}, CEP {siteConfig.address.postalCode}
            </address>
            <p className="mt-1 text-sm text-paper/80">{siteConfig.hours.short}</p>
            <p className="mt-1 flex flex-wrap gap-x-4 text-sm tabular-nums text-paper/80">
              <span>{siteConfig.phoneDisplay}</span>
              <span>WhatsApp {siteConfig.whatsappDisplay}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-paper/25 pt-5 text-xs text-paper/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}.</p>
          <p className="flex gap-4 tabular-nums">
            <span>CNS {siteConfig.cns}</span>
            <span>CNPJ {siteConfig.cnpj}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
