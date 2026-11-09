import Link from 'next/link'

export function InstitutionalPageHeader({ title }: { title: string }) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="text-sm text-ink-muted">
        <Link href="/" className="underline decoration-rule underline-offset-4 hover:text-primary">
          Início
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span aria-current="page">{title}</span>
      </nav>
      <h1 className="mt-4 text-balance font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
        {title}
      </h1>
    </>
  )
}
