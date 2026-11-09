import { deadlineText, legalDeadlines, type LegalDeadline } from '@/lib/legal-deadlines'

type Deadline = LegalDeadline & {
  act: string
  note: string
}

// Valores publicados pela serventia; bases legais na redação da Lei nº 14.382/2022.
const deadlines: Deadline[] = [
  {
    act: 'Certidões eletrônicas',
    ...legalDeadlines.certidaoMatricula,
    note: 'Certidão de inteiro teor da matrícula, pedida no horário de expediente com o número da matrícula.',
  },
  {
    act: 'Situação jurídica do imóvel',
    ...legalDeadlines.situacaoJuridica,
    note: 'Certidão da situação jurídica atualizada do imóvel.',
  },
  {
    act: 'Análise e registro de títulos',
    ...legalDeadlines.registroTitulos,
    note: '5 dias para títulos simples e sem exigências, como a compra e venda sem cláusulas especiais; 10 dias nos demais casos.',
  },
  {
    act: 'Vigência da prenotação',
    ...legalDeadlines.prenotacao,
    note: 'Prazo máximo. Os efeitos da prenotação cessam se as exigências não forem atendidas.',
  },
]

// Etapas descritas com os prazos do quadro abaixo e o roteiro de /enviar-documentos.
const titlePath = [
  { step: 'Assinatura', when: 'Antes do envio', detail: 'Documento assinado com certificado ICP-Brasil.' },
  { step: 'Protocolo', when: 'Início da prenotação', detail: 'Envio do título pelo E-Protocolo no Portal ONR.' },
  { step: 'Análise', when: deadlineText(legalDeadlines.registroTitulos), detail: '5 dias para títulos simples e sem exigências; 10 nos demais casos.' },
  { step: 'Exigências', when: `Dentro de ${deadlineText(legalDeadlines.prenotacao)}`, detail: 'Se não forem atendidas, os efeitos da prenotação cessam.' },
  { step: 'Registro', when: 'Conclusão', detail: 'O ato é lançado na matrícula do imóvel.' },
]

const number = 'font-serif text-4xl font-normal tabular-nums text-foreground'
const word = 'text-sm text-ink-muted'

export function PrepareSection() {
  return (
    <section id="prazos" aria-labelledby="prazos-title" className="border-y border-rule bg-linen">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-28">
        <h2
          id="prazos-title"
          className="text-balance font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.015em] text-foreground"
        >
          Quadro oficial de prazos registrais
        </h2>
        <p className="mt-4 max-w-[38rem] text-pretty leading-relaxed text-ink-muted sm:text-lg">
          Prazos fixados pela Lei de Registros Públicos para os principais atos desta serventia.
        </p>

        <table className="mt-10 w-full border-collapse text-left max-md:block sm:mt-14">
          <caption className="sr-only">Prazos legais dos principais atos registrais</caption>
          <thead className="max-md:sr-only">
            <tr className="border-b-2 border-foreground text-sm text-ink-muted">
              <th scope="col" className="pb-3 pr-6 font-medium">
                Ato registral
              </th>
              <th scope="col" className="pb-3 pr-6 font-medium">
                Prazo legal
                <sup>
                  <a
                    href="#nota-prazos"
                    aria-label="Nota 1"
                    className="ml-0.5 font-serif text-gold-text underline-offset-2 hover:underline"
                  >
                    1
                  </a>
                </sup>
              </th>
              <th scope="col" className="pb-3 font-medium">
                Base legal / observações
              </th>
            </tr>
          </thead>
          <tbody className="max-md:block max-md:border-t-2 max-md:border-foreground">
            {deadlines.map((deadline) => (
              <tr
                key={deadline.act}
                className="border-b border-rule align-baseline max-md:grid max-md:grid-cols-[minmax(0,1fr)_auto] max-md:gap-x-4 max-md:gap-y-2 max-md:py-5"
              >
                <th
                  scope="row"
                  className="py-6 pr-6 font-serif text-lg font-semibold text-foreground max-md:p-0 md:w-[28%]"
                >
                  {deadline.act}
                </th>
                <td className="whitespace-nowrap py-6 pr-6 max-md:p-0 max-md:text-right md:w-[24%]">
                  {deadline.prefix && <span className={word}>{deadline.prefix} </span>}
                  <span className={number}>{deadline.from}</span>
                  {deadline.to && (
                    <>
                      <span className={word}> a </span>
                      <span className={number}>{deadline.to}</span>
                    </>
                  )}
                  <span className={word}> {deadline.unit}</span>
                </td>
                <td className="py-6 text-sm leading-relaxed max-md:col-span-2 max-md:p-0">
                  <span className="block font-medium text-foreground">{deadline.basis}</span>
                  <span className="mt-1 block max-w-[52ch] text-ink-muted">{deadline.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p
          id="nota-prazos"
          className="mt-6 max-w-[72ch] text-sm leading-relaxed text-ink-muted"
        >
          <sup className="mr-1 font-serif text-gold-text">1</sup>
          Prazos contados em dias e horas úteis, conforme o art. 9º, § 1º, da Lei Federal
          nº 6.015/1973 (Lei de Registros Públicos), com a redação dada pela Lei nº
          14.382/2022, que instituiu o Sistema Eletrônico dos Registros Públicos (SERP).
        </p>

        <div className="mt-16 lg:mt-24">
          <h3 className="font-serif text-3xl font-normal text-foreground">O caminho de um título</h3>
          <div className="relative mt-8">
            <div aria-hidden="true" className="path-rule absolute inset-x-0 top-0 hidden h-0.5 bg-wine md:block" />
            <ol className="grid border-l-2 border-wine md:grid-cols-5 md:gap-8 md:border-l-0">
              {titlePath.map((item) => (
                <li key={item.step} className="relative py-4 pl-5 md:pl-0 md:pt-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-6 h-2 w-2 bg-wine md:-top-[3px] md:left-0"
                  />
                  <h4 className="font-serif text-2xl font-medium text-foreground">{item.step}</h4>
                  <p className="mt-1 text-sm font-medium tabular-nums text-foreground">{item.when}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
