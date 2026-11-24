import Image from 'next/image'
import { SectionHeading, sectionPad } from './primitives'

// Fotos com crianças só entram com autorização dos responsáveis (LGPD, art. 14).
const photos = [
  {
    src: '/galeria/equipe-outubro-rosa.jpg',
    alt: 'Encontro do Outubro Rosa promovido pelo Cartório Algacyr Barros com equipes de serventias parceiras',
    caption: 'Outubro Rosa, com serventias parceiras',
    height: 'sm:h-[24rem]',
  },
]

export function Gallery() {
  return (
    <section aria-labelledby="galeria-title" className={`bg-paper py-20 lg:py-28 ${sectionPad}`}>
      <SectionHeading
        id="galeria-title"
        folio="Fl. 6 · Na cidade"
        title="Presente na vida"
        accent="de Bom Conselho."
        lead="Além do balcão, a serventia participa de campanhas e ações sociais na cidade e na zona rural."
      />
      <ul
        className={`mt-12 grid gap-10 sm:items-end sm:gap-8 lg:mt-14 ${photos.length > 2 ? 'sm:grid-cols-3' : 'max-w-md'}`}
      >
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <figure>
              <div className={`relative h-80 overflow-hidden rounded-t-full ${photo.height}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink pt-3 font-grotesk">
                <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-gold-text">
                  Fl. 6.{index + 1}
                </span>
                <span className="text-right text-xl font-bold leading-tight text-ink">{photo.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
