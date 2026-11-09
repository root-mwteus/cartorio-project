export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-4">
      <div role="status" className="w-48">
        <p className="font-serif text-xl italic text-foreground">Carregando</p>
        <div aria-hidden="true" className="loading-rule mt-2 h-0.5 bg-wine" />
      </div>
    </div>
  )
}
