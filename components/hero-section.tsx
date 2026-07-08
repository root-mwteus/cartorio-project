import Image from 'next/image'
import { MessageCircle, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <Image
        src="/cartorio-hero.png"
        alt="Interior do cartório de registro de imóveis"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-primary/85" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground">
            CNS 074864 • SERVIÇO PÚBLICO DELEGADO • FÉ PÚBLICA
          </span>
          <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Registro de Imóveis de Bom Conselho
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85">
            Atendimento digital e presencial com segurança jurídica. Solicite certidões,
            consulte matrículas on-line, envie documentos assinados e protocole títulos
            sem sair de casa ou aqui em nossa serventia.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/75">
            Oficial Registrador: Algacyr Fernando Vieira de Barros
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
              render={
                <a
                  href="https://wa.me/5587981198252"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-12 border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<a href="#servicos">Ver serviços</a>}
            />
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-primary-foreground/85">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <dd>Bom Conselho — PE</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <dd>Seg a Sex, 08h às 17h</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
