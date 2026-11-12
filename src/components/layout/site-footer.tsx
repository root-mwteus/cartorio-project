import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'
import { generalMessage, whatsappLink } from '@/lib/whatsapp'

const pages = [
  { label: 'Sobre a serventia', href: '/sobre' },
  { label: 'Tabela de emolumentos', href: '/emolumentos' },
  { label: 'Dúvidas frequentes', href: '/faq' },
  { label: 'Ouvidoria', href: '/ouvidoria' },
  { label: 'Aviso de Privacidade', href: '/privacidade' },
]

const heading = 'text-[0.95rem] font-extrabold uppercase tracking-[0.16em] text-gold'
const linkClass = 'inline-block py-1 text-xl font-bold text-paper transition-colors hover:text-gold'

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.2_0.06_18)] font-grotesk text-paper">
      <div className="px-5 pb-24 pt-16 sm:px-8 lg:pb-10 lg:pl-32 lg:pr-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <Image src="/logo-icon-v3.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="text-[2rem] font-black leading-none">{siteConfig.tradeName}</span>
            </div>
            <p className="max-w-md text-pretty text-xl font-semibold leading-snug text-paper/70">
              {siteConfig.name}. Serviço público exercido por delegação do Poder Judiciário (art. 236
              da Constituição Federal).
            </p>
            <a
              href={whatsappLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-2xl font-extrabold tabular-nums text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold"
            >
              WhatsApp {siteConfig.whatsappDisplay}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className={heading}>Dados legais</h2>
            <p className="text-xl font-semibold leading-snug text-paper/85">
              {siteConfig.officer.title}: {siteConfig.officer.name}
            </p>
            <p className="text-xl font-semibold tabular-nums text-paper/85">
              CNS {siteConfig.cns} · CNPJ {siteConfig.cnpj}
            </p>
            <p className="text-xl font-semibold text-paper/85">{siteConfig.comarca}</p>
            <address className="text-xl font-semibold not-italic leading-snug text-paper/85">
              {siteConfig.address.street}, {siteConfig.address.neighborhood} · CEP {siteConfig.address.postalCode}
            </address>
          </div>

          <nav aria-labelledby="footer-pages" className="flex flex-col gap-1.5">
            <h2 id="footer-pages" className={`${heading} mb-1`}>
              Páginas
            </h2>
            <ul>
              {pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={linkClass}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-1 border-t border-gold/30 pt-5 text-base font-semibold text-paper/55 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Fiscalização: Corregedoria Geral da Justiça de Pernambuco</p>
        </div>
      </div>
    </footer>
  )
}
