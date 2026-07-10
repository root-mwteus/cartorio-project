import type { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'
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
      'Pelo nosso serviço de Matrícula On-line você visualiza a imagem da matrícula idêntica à do cartório, sem precisar se deslocar até a serventia. Entre em contato pelo WhatsApp para solicitar o acesso.',
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
      'Certidões eletrônicas são emitidas em até 4 horas úteis. Você pode solicitar pelo formulário de contato, WhatsApp ou presencialmente.',
  },
  {
    question: 'O cartório atende aos sábados?',
    answer:
      'Não. O atendimento presencial e digital ocorre de segunda a sexta-feira, das 08h às 17h, exceto feriados.',
  },
]

export default function FaqPage() {
  return (
    <article>
      <InstitutionalPageHeader title="Perguntas Frequentes" />
      <div className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-card-foreground marker:content-none">
              {faq.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </article>
  )
}
