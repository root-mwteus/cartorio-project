// Mostra o dado da serventia ou, enquanto não informado, um marcador visível de pendência.
export function Filled({ value, pending }: { value: string | null; pending: string }) {
  if (value) return <>{value}</>
  return <mark className="bg-accent/30 px-1 text-foreground">[{pending}]</mark>
}
