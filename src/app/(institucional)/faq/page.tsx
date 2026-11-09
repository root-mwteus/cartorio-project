import type { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description:
    'Tire suas dúvidas sobre matrícula, certidões, prazos e registro de imóveis em Bom Conselho - PE.',
}

const faqs = [
  {
    question: 'O que é a matrícula do imóvel?',
    answer:
      'A matrícula é o registro individualizado de cada imóvel, que reúne seu histórico completo: proprietários, ônus, averbações e demais atos praticados desde a sua abertura.',
  },
  {
    question: 'Como consulto a matrícula de um imóvel pela internet?',
    answer:
      (
      <>
        Pelo serviço de Matrícula On-line, no <a className="underline hover:text-foreground" href={siteConfig.onrUrl} target="_blank" rel="noopener noreferrer">
          Portal ONR<span className="sr-only"> (abre em nova aba)</span>
        </a>, você visualiza a imagem da matrícula
        idêntica à do cartório, sem precisar se deslocar até a serventia.
      </>
    ),
  },
  {
    question: 'Quais documentos preciso para registrar uma escritura?',
    answer:
      'Em geral, a escritura pública, comprovante de pagamento do ITBI e documentos pessoais das partes. Como cada ato pode ter exigências específicas, recomendamos confirmar a lista completa com nossa equipe antes de comparecer.',
  },
  {
    question: 'Qual o prazo para o registro de um título?',
    answer:
      'O prazo de prenotação é de até 20 dias. A análise e o registro costumam ocorrer entre 5 e 10 dias úteis, conforme detalhado na seção de Prazos da página inicial.',
  },
  {
    question: 'Como solicito uma certidão?',
    answer:
      (
      <>
        Solicite pelo <a className="underline hover:text-foreground" href={siteConfig.onrUrl} target="_blank" rel="noopener noreferrer">
          Portal ONR<span className="sr-only"> (abre em nova aba)</span>
        </a>. Certidões eletrônicas são emitidas em até 4 horas úteis. Se
        tiver dúvida sobre qual certidão pedir, fale com a triagem pelo <a className="underline hover:text-foreground" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
          WhatsApp oficial {siteConfig.whatsappDisplay}<span className="sr-only"> (abre em nova aba)</span>
        </a>.
      </>
    ),
  },
  {
    question: 'O cartório atende aos sábados?',
    answer:
      `Não. O atendimento presencial e digital ocorre ${siteConfig.hours.sentence}.`,
  },
]

export default function FaqPage() {
  return (
    <article>
      <InstitutionalPageHeader title="Perguntas Frequentes" />
      <div className="mt-10 border-t-2 border-foreground">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-rule">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl text-foreground transition-colors marker:content-none hover:text-primary group-open:italic sm:text-2xl [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-[62ch] pb-6 text-pretty leading-relaxed text-ink-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </article>
  )
}
