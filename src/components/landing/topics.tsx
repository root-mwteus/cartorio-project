import { MessageCircle } from 'lucide-react'
import { topics, whatsappLink } from '@/lib/whatsapp'
import { SectionHeading, WhatsAppLink, sectionPad } from './primitives'

export function Topics() {
  return (
    <section id="assuntos" aria-labelledby="assuntos-title" className={`bg-paper py-20 lg:py-28 ${sectionPad}`}>
      <SectionHeading
        id="assuntos-title"
        folio="Fl. 2 · Mensagens prontas"
        title="Diga o assunto."
        accent="A mensagem já sai pronta."
        lead="Toque em um dos temas para abrir o WhatsApp com o texto preenchido. Basta completar os dados e enviar."
      />

      <ol className="mt-12 grid border-t-2 border-ink md:grid-cols-2 lg:mt-14">
        {topics.map((topic, index) => (
          <li key={topic.id} className={`border-b border-rule ${index % 2 === 1 ? 'md:border-l md:pl-8' : 'md:pr-8'}`}>
            <WhatsAppLink
              href={whatsappLink(topic.message)}
              className="group flex items-start gap-5 py-7"
            >
              <span aria-hidden="true" className="w-10 shrink-0 pt-1 font-grotesk text-[1.4rem] font-black tabular-nums text-gold-text">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="flex flex-1 flex-col gap-1.5">
                <span className="font-grotesk text-[2rem] font-black leading-none tracking-[-0.01em] text-ink transition-colors group-hover:text-wine">
                  {topic.title}
                </span>
                <span className="font-grotesk text-xl font-semibold leading-snug text-ink-muted">
                  “{topic.message.trim()}{topic.message.endsWith(' ') ? ' …' : ''}”
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`flex size-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-wine transition-colors group-hover:bg-wine group-hover:text-paper ${
                  index === 0 ? 'bg-wine text-paper' : 'text-wine'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
              </span>
            </WhatsAppLink>
          </li>
        ))}
      </ol>
    </section>
  )
}
