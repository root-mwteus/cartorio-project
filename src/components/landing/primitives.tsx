import type { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'light' | 'dark'

// Recuo das seções: no desktop, o texto alinha com a margem de "livro" do hero.
export const sectionPad = 'px-5 sm:px-8 lg:pl-32 lg:pr-16'

export function Folio({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <p className="flex items-center gap-4">
      <span aria-hidden="true" className={cn('h-px w-12', tone === 'dark' ? 'bg-gold' : 'bg-gold-text')} />
      <span
        className={cn(
          'font-grotesk text-[0.95rem] font-extrabold uppercase tracking-[0.16em]',
          tone === 'dark' ? 'text-gold' : 'text-gold-text',
        )}
      >
        {children}
      </span>
    </p>
  )
}

export function SectionHeading({
  id,
  folio,
  title,
  accent,
  lead,
  tone = 'light',
}: {
  id: string
  folio: string
  title: ReactNode
  accent: ReactNode
  lead?: ReactNode
  tone?: Tone
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
      <div className="flex flex-col gap-4">
        <Folio tone={tone}>{folio}</Folio>
        <h2
          id={id}
          className={cn(
            'text-balance font-grotesk text-[clamp(2.75rem,6vw,4.75rem)] font-black leading-[0.88] tracking-[-0.03em]',
            tone === 'dark' ? 'text-paper' : 'text-ink',
          )}
        >
          {title} <span className={tone === 'dark' ? 'text-gold' : 'text-wine'}>{accent}</span>
        </h2>
      </div>
      {lead && (
        <p
          className={cn(
            'max-w-md shrink-0 text-pretty font-grotesk text-xl font-semibold leading-snug sm:text-[1.4rem] lg:w-96',
            tone === 'dark' ? 'text-paper/75' : 'text-ink-muted',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

// Todo link de WhatsApp abre em nova aba e avisa o leitor de tela.
export function WhatsAppLink({
  href,
  className,
  children,
  icon = false,
}: {
  href: string
  className?: string
  children: ReactNode
  icon?: boolean
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {icon && <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />}
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  )
}
