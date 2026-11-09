'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const institutionalPages = [
  { label: 'Sobre o Cartório', href: '/sobre' },
  { label: 'Tabela de Emolumentos', href: '/emolumentos' },
  { label: 'Perguntas Frequentes', href: '/faq' },
  { label: 'Agendar visita', href: '/agendar' },
  { label: 'Enviar documentos', href: '/enviar-documentos' },
  { label: 'Ouvidoria', href: '/ouvidoria' },
  { label: 'Aviso de Privacidade', href: '/privacidade' },
]

export function InstitutionalNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Páginas institucionais" className="border-t-2 border-foreground">
      <ul>
        {institutionalPages.map((page) => {
          const current = pathname === page.href
          return (
            <li key={page.href} className="border-b border-rule">
              <Link
                href={page.href}
                aria-current={current ? 'page' : undefined}
                className={
                  current
                    ? 'block py-3 font-serif text-lg italic text-foreground'
                    : 'block py-3 font-serif text-lg text-ink-muted transition-colors hover:text-primary'
                }
              >
                {page.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
