import { describe, expect, it } from 'vitest'
import { deadlineText, legalDeadlines } from './legal-deadlines'

describe('prazos legais', () => {
  it('mantém o texto publicado e aprovado', () => {
    expect(deadlineText(legalDeadlines.certidaoMatricula)).toBe('Até 4 horas úteis')
    expect(deadlineText(legalDeadlines.situacaoJuridica)).toBe('1 dia útil')
    expect(deadlineText(legalDeadlines.registroTitulos)).toBe('5 a 10 dias úteis')
    expect(deadlineText(legalDeadlines.prenotacao)).toBe('20 dias')
  })

  it('mantém as bases legais aprovadas', () => {
    expect(Object.values(legalDeadlines).map((d) => d.basis)).toEqual([
      'Lei nº 6.015/1973, art. 19, § 10, I',
      'Lei nº 6.015/1973, art. 19, § 10, II',
      'Lei nº 6.015/1973, art. 188',
      'Lei nº 6.015/1973, art. 205',
    ])
  })
})
