'use client'

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import Image from 'next/image'
import {
  Accessibility,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Landmark,
  Pause,
  Play,
  Users,
} from 'lucide-react'

type Slide = {
  tag: string
  title: string
  text: string
  icon: ComponentType<{ className?: string }>
  // Foto real: salve o arquivo em public/galeria/ e preencha image e alt.
  // Sem image, o slide mostra o painel vinho no lugar da foto.
  image?: string
  alt?: string
}

const slides: Slide[] = [
  {
    tag: 'Colaboradores',
    title: 'Nossa equipe de atendimento',
    text: 'Equipe preparada para orientar você com agilidade e segurança jurídica.',
    icon: Users,
  },
  {
    tag: 'Ação institucional',
    title: 'Campanha Solo Seguro, do CNJ',
    text: 'Apoiando a regularização fundiária e a cidadania patrimonial em Bom Conselho.',
    icon: Landmark,
  },
  {
    tag: 'Dia a dia da serventia',
    title: 'Conferência e fé pública',
    text: 'Rigor técnico e cuidado na conferência de títulos e escrituras.',
    icon: FileCheck2,
  },
  {
    tag: 'Compromisso',
    title: 'Atendimento acessível',
    text: 'Canais digitais e recepção presencial dedicados à população.',
    icon: Accessibility,
  },
]

const INTERVAL_MS = 5000

const control =
  'inline-flex size-11 items-center justify-center rounded-sm border border-gold/60 text-gold-text transition-colors hover:border-gold hover:bg-paper active:translate-y-px'

export function GalleryCarousel() {
  const trackRef = useRef<HTMLUListElement>(null)
  // Slide pedido por seta, ponto ou autoplay; arrasto e roda do mouse o anulam.
  const targetRef = useRef<number | null>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const [reduced, setReduced] = useState(false)

  // Movimento reduzido: sem autoplay e sem rolagem animada.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setReduced(query.matches)
      if (query.matches) setPlaying(false)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      const slide = track?.children[index] as HTMLElement | undefined
      if (!track || !slide) return
      targetRef.current = index
      setActive(index)
      track.scrollTo({ left: slide.offsetLeft, behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced],
  )

  // O slide ativo vem da posição de rolagem, então o arrasto no celular também conta.
  const onScroll = () => {
    const track = trackRef.current
    if (!track || track.children.length < 2) return
    const step = (track.children[1] as HTMLElement).offsetLeft
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
    // No desktop os dois últimos slides cabem juntos no fim da trilha: vale o que foi pedido.
    setActive(atEnd ? (targetRef.current ?? slides.length - 1) : Math.round(track.scrollLeft / step))
  }

  useEffect(() => {
    if (!playing || held) return
    const id = setTimeout(() => goTo((active + 1) % slides.length), INTERVAL_MS)
    return () => clearTimeout(id)
  }, [active, playing, held, goTo])

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-title"
      aria-roledescription="carrossel"
      className="border-y border-rule bg-linen"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <h2
              id="galeria-title"
              className="text-balance font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.05] tracking-[-0.015em] text-foreground"
            >
              Vida na serventia
            </h2>
            <p className="mt-2 max-w-[38rem] text-pretty leading-relaxed text-ink-muted">
              A equipe, o trabalho diário e as campanhas de que a serventia participa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={control}
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? 'Pausar a passagem automática' : 'Retomar a passagem automática'}
            >
              {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              className={control}
              onClick={() => goTo((active - 1 + slides.length) % slides.length)}
              aria-label="Slide anterior"
              aria-controls="galeria-trilha"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={control}
              onClick={() => goTo((active + 1) % slides.length)}
              aria-label="Próximo slide"
              aria-controls="galeria-trilha"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          id="galeria-trilha"
          ref={trackRef}
          onScroll={onScroll}
          onTouchStart={() => {
            targetRef.current = null
            setPlaying(false)
          }}
          onWheel={() => {
            targetRef.current = null
          }}
          aria-live={playing && !held ? 'off' : 'polite'}
          className="relative mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] sm:gap-6 lg:mt-8 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => {
            const Icon = slide.icon
            return (
              <li
                key={slide.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${slides.length}`}
                className="w-[85%] shrink-0 snap-start sm:w-[62%] lg:w-[calc((100%-3rem)/2.6)]"
              >
                <article className="group h-full border border-rule bg-paper transition-colors duration-200 hover:border-gold/60 motion-reduce:transition-none">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-sm bg-wine-deep">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.alt ?? ''}
                        fill
                        sizes="(min-width: 1024px) 36vw, (min-width: 640px) 62vw, 85vw"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-3 border border-gold/30 sm:inset-4" />
                        <Icon className="size-12 text-gold transition-transform duration-500 motion-safe:group-hover:scale-[1.06] sm:size-14" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-base font-medium tracking-wide text-gold-text [font-variant-caps:all-small-caps]">
                      {slide.tag}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-normal leading-tight text-foreground">
                      {slide.title}
                    </h3>
                    <p className="mt-2 text-pretty leading-relaxed text-ink-muted">{slide.text}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <div className="mt-2 flex justify-center gap-1" role="group" aria-label="Escolher slide">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir para o slide ${index + 1}: ${slide.title}`}
              aria-current={index === active ? 'true' : undefined}
              className="group/dot inline-flex size-11 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  index === active ? 'w-6 bg-wine' : 'w-1.5 bg-ink-muted/40 group-hover/dot:bg-gold-text'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
