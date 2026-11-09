export type LegalDeadline = {
  prefix?: string
  from: string
  to?: string
  unit: string
  basis: string
}

// Fonte única dos prazos legais exibidos no site (Lei nº 6.015/1973, com a
// redação da Lei nº 14.382/2022). Triagem, Carta de Serviços e Quadro leem daqui.
export const legalDeadlines = {
  certidaoMatricula: { prefix: 'Até', from: '4', unit: 'horas úteis', basis: 'Lei nº 6.015/1973, art. 19, § 10, I' },
  situacaoJuridica: { from: '1', unit: 'dia útil', basis: 'Lei nº 6.015/1973, art. 19, § 10, II' },
  registroTitulos: { from: '5', to: '10', unit: 'dias úteis', basis: 'Lei nº 6.015/1973, art. 188' },
  prenotacao: { from: '20', unit: 'dias', basis: 'Lei nº 6.015/1973, art. 205' },
} satisfies Record<string, LegalDeadline>

export function deadlineText({ prefix, from, to, unit }: LegalDeadline) {
  return [prefix, to ? `${from} a ${to}` : from, unit].filter(Boolean).join(' ')
}
