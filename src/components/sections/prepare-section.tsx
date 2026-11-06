type Deadline = {
  act: string
  prefix?: string
  from: string
  to?: string
  unit: string
  basis: string
  note: string
}

// Valores publicados pela serventia; bases legais na redação da Lei nº 14.382/2022.
const deadlines: Deadline[] = [
  {
    act: 'Certidões eletrônicas',
    prefix: 'Até',
    from: '4',
    unit: 'horas úteis',
    basis: 'Lei nº 6.015/1973, art. 19, § 10, I',
    note: 'Certidão de inteiro teor da matrícula, pedida no horário de expediente com o número da matrícula.',
  },
  {
    act: 'Situação jurídica do imóvel',
    from: '1',
    unit: 'dia útil',
    basis: 'Lei nº 6.015/1973, art. 19, § 10, II',
    note: 'Certidão da situação jurídica atualizada do imóvel.',
  },
  {
    act: 'Análise e registro de títulos',
    from: '5',
    to: '10',
    unit: 'dias úteis',
    basis: 'Lei nº 6.015/1973, art. 188',
    note: '5 dias para títulos simples e sem exigências, como a compra e venda sem cláusulas especiais; 10 dias nos demais casos.',
  },
  {
    act: 'Vigência da prenotação',
    from: '20',
    unit: 'dias',
    basis: 'Lei nº 6.015/1973, art. 205',
    note: 'Prazo máximo. Os efeitos da prenotação cessam se as exigências não forem atendidas.',
  },
]

const number = 'font-serif text-3xl font-semibold tabular-nums text-foreground'
const word = 'text-sm text-ink-muted'

export function PrepareSection() {
  return (
    <section id="prazos" aria-labelledby="prazos-title" className="border-y border-rule bg-linen">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <h2
          id="prazos-title"
          className="text-balance font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] text-foreground"
        >
          Quadro Oficial de Prazos Registrais
        </h2>
        <p className="mt-3 max-w-[38rem] text-pretty text-base leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
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
          className="mt-8 max-w-[72ch] border-l-2 border-gold pl-4 text-sm leading-relaxed text-ink-muted"
        >
          <sup className="mr-1 font-serif text-gold-text">1</sup>
          Prazos contados em dias e horas úteis, conforme o art. 9º, § 1º, da Lei Federal
          nº 6.015/1973 (Lei de Registros Públicos), com a redação dada pela Lei nº
          14.382/2022, que instituiu o Sistema Eletrônico dos Registros Públicos (SERP).
        </p>
      </div>
    </section>
  )
}
