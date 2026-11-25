import { describe, expect, it } from 'vitest'
import { checklists, findChecklist, specialties } from './checklists'

describe('checklists', () => {
  it('tem slugs únicos e válidos para a URL', () => {
    const slugs = checklists.map((item) => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('usa só especialidades conhecidas e não tem grupo vazio', () => {
    for (const item of checklists) {
      expect(Object.keys(specialties)).toContain(item.specialty)
      expect(item.groups.length).toBeGreaterThan(0)
      for (const group of item.groups) expect(group.items.length).toBeGreaterThan(0)
    }
  })

  it('encontra pelo slug e devolve undefined para slug desconhecido', () => {
    expect(findChecklist('procuracao-publica')?.title).toBe('Procuração pública')
    expect(findChecklist('nao-existe')).toBeUndefined()
  })
})
