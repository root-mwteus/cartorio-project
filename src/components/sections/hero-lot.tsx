'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// three.js só é baixado depois que o hero fica visível e o navegador fica ocioso.
const LotCanvas = dynamic(() => import('./lot-canvas'), { ssr: false })

// Pontos médios das divisas projetados pela câmera fixa da cena (aspecto 16:9).
const boundaries = [
  { label: 'Norte', left: '61.3%', top: '25.9%' },
  { label: 'Leste', left: '76.7%', top: '76.5%' },
  { label: 'Sul', left: '24.3%', top: '77.7%' },
  { label: 'Oeste', left: '8.9%', top: '27.1%' },
]

export function HeroLot({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancel = () => {}
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = () => setLoad(true)
      if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(start, { timeout: 2000 })
        cancel = () => cancelIdleCallback(id)
      } else {
        const id = setTimeout(start, 600)
        cancel = () => clearTimeout(id)
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancel()
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={`relative aspect-video w-full ${className}`}>
      <Image
        src="/hero-lote.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 30rem, 100vw"
        className={`object-contain transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      {load && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <LotCanvas onReady={() => setReady(true)} />
        </div>
      )}
      {boundaries.map((b) => (
        <span
          key={b.label}
          style={{ left: b.left, top: b.top }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-serif text-sm tracking-[0.08em] text-ink-muted [font-variant-caps:all-small-caps]"
        >
          {b.label}
        </span>
      ))}
    </div>
  )
}
