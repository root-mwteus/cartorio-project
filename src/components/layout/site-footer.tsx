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
  'inline-block py-1 text-sm text-paper/75 underline-offset-4 transition-colors hover:text-paper hover:underline'

const headingClass = 'font-serif text-base font-semibold text-paper'

export function SiteFooter() {
  return (
    <footer className="bg-wine-deep text-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid divide-y divide-paper/15 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-12 lg:divide-y-0">
          <div className="pb-6 lg:pb-0">
            <div className="flex items-center gap-2.5">
              <Image src="/logo-icon-v3.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              <span className="font-serif text-base font-semibold">{siteConfig.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-paper/75">
              Serventia extrajudicial dotada de fé pública, a serviço da segurança jurídica e
              da cidadania.
            </p>
            <p className="mt-3 text-sm text-paper/75">
              {siteConfig.officer.title}:{' '}
              <span className="font-serif italic text-paper">{siteConfig.officer.name}</span>
            </p>
          </div>

          <nav aria-labelledby="footer-links" className="py-6 lg:py-0">
            <h2 id="footer-links" className={headingClass}>
              Links rápidos
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 lg:mt-3">
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

          <div className="pt-6 lg:pt-0">
            <h2 className={headingClass}>Competência territorial</h2>
            <p className="mt-2 text-sm leading-relaxed text-paper/75 lg:mt-3">
              Registro dos atos relativos aos imóveis situados no município de{' '}
              {siteConfig.address.city} — {siteConfig.address.state}.
            </p>
            <h2 className={`mt-5 ${headingClass}`}>Endereço e atendimento</h2>
            <address className="mt-2 text-sm not-italic leading-relaxed text-paper/75">
              {siteConfig.address.street}, {siteConfig.address.neighborhood}
              <br />
              {siteConfig.address.city}/{siteConfig.address.state}, CEP {siteConfig.address.postalCode}
            </address>
            <p className="mt-1 text-sm text-paper/75">{siteConfig.hours.short}</p>
            <p className="mt-1 text-sm tabular-nums text-paper/75">
              {siteConfig.phoneDisplay} · WhatsApp {siteConfig.whatsappDisplay}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-paper/15 pt-5 text-xs text-paper/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}.</p>
          <p className="tabular-nums">CNS {siteConfig.cns} · CNPJ {siteConfig.cnpj}</p>
        </div>
      </div>
    </footer>
  )
}
