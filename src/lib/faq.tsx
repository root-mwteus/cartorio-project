import type { ReactNode } from 'react'
import Link from 'next/link'
import { deadlineText, legalDeadlines } from './legal-deadlines'
import { siteConfig } from './site-config'
import { generalMessage, whatsappLink } from './whatsapp'

const link = 'font-semibold underline decoration-current/40 underline-offset-4 hover:decoration-current'

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}

const WhatsApp = () => (
  <External href={whatsappLink(generalMessage)}>WhatsApp {siteConfig.whatsappDisplay}</External>
)

// Fonte única: a home mostra as marcadas com `home`; a página /faq mostra todas.
export const faqs: { question: string; answer: ReactNode; home?: boolean }[] = [
  {
    question: 'Preciso agendar para ser atendido?',
    home: true,
    answer: (
      <>
        Não é obrigatório. O atendimento presencial é {siteConfig.hours.sentence}. Para esperar
        menos, ou para escrituras e atos mais complexos, combine antes pelo <WhatsApp />.
      </>
    ),
  },
  {
    question: 'Quais documentos levo para uma escritura ou um registro?',
    home: true,
    answer: (
      <>
        Veja os{' '}
        <Link href="/checklists" className={link}>
          checklists de documentos
        </Link>{' '}
        de cada ato. Depois, envie os documentos pelo <WhatsApp /> para a equipe conferir antes da
        sua visita.
      </>
    ),
  },
  {
    question: 'Quanto custa um ato?',
    home: true,
    answer: (
      <>
        Os valores (emolumentos) são fixados pelo Tribunal de Justiça de Pernambuco e estão na{' '}
        <External href={siteConfig.emolumentosTableUrl}>tabela oficial do TJPE</External>. Para saber o
        valor do seu caso, peça um orçamento pelo <WhatsApp />.
      </>
    ),
  },
  {
    question: 'Posso pedir certidões ou fazer atos pela internet?',
    home: true,
    answer: (
      <>
        Sim. Certidões de matrícula e protocolo de títulos são feitos pelo{' '}
        <External href={siteConfig.onrUrl}>Portal ONR</External>, e escrituras e procurações podem ser
        assinadas por videoconferência pelo e-Notariado. Veja todos os{' '}
        <Link href="/#servicos-online" className={link}>
          serviços online
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Como confiro se um ato é autêntico?',
    home: true,
    answer: (
      <>
        Todo ato recebe um selo de fiscalização. Digite o número do selo no{' '}
        <External href={siteConfig.oversight.seloUrl}>site do TJPE</External> para conferir.
      </>
    ),
  },
  {
    question: 'Vocês fazem registro de nascimento, casamento ou óbito?',
    home: true,
    answer:
      'Não. Esta serventia não faz registro civil de pessoas naturais. Para nascimento, casamento e óbito, procure o cartório de registro civil do seu município.',
  },
  {
    question: 'Como protesto ou cancelo um protesto?',
    answer: (
      <>
        Para protestar, apresente o título ou documento de dívida. Para cancelar, apresente a
        carta de anuência do credor ou o título quitado. Confirme os documentos do seu caso pelo{' '}
        <WhatsApp />. A consulta de protestos em todo o país é gratuita no{' '}
        <External href="https://www.pesquisaprotesto.com.br/">CENPROT</External>.
      </>
    ),
  },
  {
    question: 'O que é a matrícula do imóvel?',
    answer:
      'É o registro individualizado de cada imóvel, que reúne seu histórico completo: proprietários, ônus, averbações e demais atos praticados desde a sua abertura.',
  },
  {
    question: 'Qual o prazo para o registro de um título?',
    answer: `O registro é feito em ${deadlineText(legalDeadlines.registroTitulos)}, contados do protocolo. Se houver exigência, ela precisa ser cumprida dentro de ${deadlineText(legalDeadlines.prenotacao)}, prazo de validade da prenotação.`,
  },
  {
    question: 'O cartório atende aos sábados?',
    answer: `Não. O atendimento é ${siteConfig.hours.sentence}.`,
  },
]
