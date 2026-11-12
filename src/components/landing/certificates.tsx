import { deadlineText, legalDeadlines } from '@/lib/legal-deadlines'
import { whatsappLink } from '@/lib/whatsapp'
import { Folio, WhatsAppLink, sectionPad } from './primitives'

const rows = [
  {
    name: 'Inteiro teor da matrícula',
    use: 'Mostra a descrição do imóvel, os proprietários e todo o histórico de registros e averbações.',
    deadline: deadlineText(legalDeadlines.certidaoMatricula),
  },
  {
    name: 'Situação jurídica e ônus',
    use: 'Informa se há penhora, hipoteca, ação judicial ou outra restrição sobre o imóvel. Costuma ser exigida em compra e venda e financiamento.',
    deadline: deadlineText(legalDeadlines.situacaoJuridica),
  },
  {
    name: 'Negativa de propriedade',
    use: 'Confirma que não há imóvel registrado nesta serventia em nome de uma pessoa ou empresa.',
    deadline: null,
  },
]

export function Certificates() {
  return (
    <section id="prazos" aria-labelledby="prazos-title" className={`bg-paper py-20 lg:py-28 ${sectionPad}`}>
      <div className="grid gap-12 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-5">
          <Folio>Fl. 4 · Certidões e prazos</Folio>
          <h2
            id="prazos-title"
            className="text-balance font-grotesk text-[clamp(2.75rem,5vw,4.25rem)] font-black leading-[0.88] tracking-[-0.03em] text-ink"
          >
            Qual certidão <span className="text-wine">você precisa?</span>
          </h2>
          <p className="text-pretty font-grotesk text-xl font-semibold leading-snug text-ink-muted">
            As mais solicitadas no Registro de Imóveis. Na dúvida, conte para que vai usá-la e a equipe
            indica a mais adequada.
          </p>
          <WhatsAppLink
            href={whatsappLink('Olá! Preciso de uma certidão, mas não sei qual pedir. Ela é para: ')}
            icon
            className="mt-2 inline-flex min-h-13 items-center gap-2.5 self-start rounded-sm bg-wine px-6 font-grotesk text-xl font-extrabold text-paper transition-colors hover:bg-wine-deep"
          >
            Perguntar qual pedir
          </WhatsAppLink>
        </div>

        <div>
          <table className="w-full border-collapse text-left font-grotesk">
            <caption className="sr-only">Certidões de imóvel, finalidade e prazo legal de emissão</caption>
            <thead>
              <tr className="border-b-2 border-ink text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-ink-muted">
                <th scope="col" className="pb-3 pr-6 font-extrabold">Certidão</th>
                <th scope="col" className="hidden pb-3 pr-6 font-extrabold md:table-cell">Serve para</th>
                <th scope="col" className="pb-3 text-right font-extrabold">
                  Prazo legal<sup>1</sup>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-rule align-baseline">
                  <th scope="row" className="py-6 pr-6 md:w-60">
                    <span className="block text-[1.85rem] font-black leading-none text-ink">{row.name}</span>
                    <span className="mt-2 block text-lg font-semibold leading-snug text-ink-muted md:hidden">{row.use}</span>
                  </th>
                  <td className="hidden py-6 pr-6 text-xl font-semibold leading-snug text-ink-muted md:table-cell">{row.use}</td>
                  <td
                    className={`whitespace-nowrap py-6 pl-4 text-right leading-tight ${
                      row.deadline ? 'text-[1.6rem] font-black text-wine' : 'text-xl font-extrabold text-ink-muted'
                    }`}
                  >
                    {row.deadline ?? 'consulte a equipe'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-grotesk text-lg font-semibold leading-snug text-ink-muted">
            <sup>1</sup> {legalDeadlines.certidaoMatricula.basis} e II. Registro de títulos:{' '}
            {deadlineText(legalDeadlines.registroTitulos)} ({legalDeadlines.registroTitulos.basis}). A
            prenotação vale por {deadlineText(legalDeadlines.prenotacao)} ({legalDeadlines.prenotacao.basis}).
          </p>
        </div>
      </div>
    </section>
  )
}
