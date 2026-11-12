import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'
import { topics } from '@/lib/whatsapp'
import { SectionHeading, sectionPad } from './primitives'

const steps = [
  { title: 'Escolha o assunto', text: 'Certidão, registro, valores ou qualquer outra dúvida.' },
  { title: 'Complete e envie', text: 'A mensagem abre pronta no WhatsApp. Só preencha o que falta.' },
  { title: 'Receba o retorno', text: `A equipe responde ${siteConfig.hours.sentence}.` },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className={`bg-wine-deep py-20 text-paper lg:py-28 ${sectionPad}`}>
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-20">
        <div className="flex flex-col gap-12">
          <SectionHeading
            id="como-funciona-title"
            tone="dark"
            folio="Fl. 5 · Como funciona"
            title="Do celular ao cartório,"
            accent="em três passos."
          />
          <ol className="grid border-t border-gold/45 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={`flex flex-col gap-2.5 border-gold/30 py-7 md:py-0 md:pt-7 ${
                  index > 0 ? 'border-t md:border-l md:border-t-0 md:pl-7' : ''
                } ${index < 2 ? 'md:pr-7' : ''}`}
              >
                <span aria-hidden="true" className="font-grotesk text-[4rem] font-black leading-[0.85] text-gold">
                  {index + 1}
                </span>
                <h3 className="font-grotesk text-[1.75rem] font-black leading-tight">{step.title}</h3>
                <p className="font-grotesk text-xl font-semibold leading-snug text-paper/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure
          aria-label="Exemplo ilustrativo de conversa com a serventia no WhatsApp"
          className="overflow-hidden rounded-[1.25rem] bg-paper font-grotesk text-ink shadow-[0_0_0_1px_oklch(0.74_0.11_82/0.5),0_30px_60px_-30px_oklch(0_0_0/0.7)]"
        >
          <div className="flex items-center gap-3 bg-wine px-5 py-4 text-paper">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper">
              <Image src="/logo-icon-v3.png" alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold">{siteConfig.tradeName}</span>
              <span className="text-[0.95rem] font-semibold text-paper/75">
                WhatsApp oficial · {siteConfig.whatsappDisplay}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-3 bg-linen px-4 py-6 text-lg font-semibold leading-snug">
            <p className="max-w-[18rem] self-end rounded-xl rounded-br-sm bg-white px-4 py-2.5">
              {topics[0].message}Rua do Comércio, 45.
            </p>
            <p className="max-w-[18rem] self-start rounded-xl rounded-bl-sm border border-rule bg-paper px-4 py-2.5">
              Bom dia! Recebemos sua solicitação e já vamos orientar você.
            </p>
          </div>
          <figcaption className="border-t border-rule px-5 py-3 text-[0.95rem] font-semibold text-ink-muted">
            Exemplo ilustrativo de atendimento
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
