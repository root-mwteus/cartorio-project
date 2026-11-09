import { describe, expect, it } from 'vitest'
import { serializeJsonLd } from './json-ld'

describe('serializeJsonLd', () => {
  it('não deixa o conteúdo fechar a tag script', () => {
    const output = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
    expect(output).not.toContain('<')
  })

  it('continua sendo JSON equivalente', () => {
    const data = { name: 'a<b', nested: { value: 1 } }
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data)
  })
})
