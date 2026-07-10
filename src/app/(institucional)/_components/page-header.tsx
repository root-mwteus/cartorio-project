export function InstitutionalPageHeader({ title }: { title: string }) {
  return (
    <>
      <span className="text-sm font-semibold uppercase tracking-wide text-accent">
        Institucional
      </span>
      <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h1>
    </>
  )
}
