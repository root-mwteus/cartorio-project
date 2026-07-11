import { describe, expect, it } from 'vitest'
import { MAX_LENGTH, validateContactForm } from './validate-contact-form'

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value)
  }
  return formData
}

const validFields = {
  name: 'Maria Silva',
  email: 'maria@example.com',
  subject: 'Emissão de certidão',
  message: 'Gostaria de solicitar uma certidão de matrícula.',
}

describe('validateContactForm', () => {
  it('aceita um envio válido e retorna os dados normalizados', () => {
    const result = validateContactForm(buildFormData(validFields))
    expect(result).toEqual({ valid: true, isBot: false, data: validFields })
  })

  it('remove espaços em branco das pontas dos campos', () => {
    const result = validateContactForm(
      buildFormData({ ...validFields, name: '  Maria Silva  ' }),
    )
    expect(result.valid && !result.isBot && result.data.name).toBe('Maria Silva')
  })

  it('detecta bot pelo honeypot, sem expor isso como erro', () => {
    const result = validateContactForm(buildFormData({ ...validFields, website: 'http://spam.com' }))
    expect(result).toEqual({ valid: true, isBot: true })
  })

  it.each(['name', 'email', 'subject', 'message'])(
    'rejeita quando o campo "%s" está vazio',
    (field) => {
      const fields = { ...validFields, [field]: '' }
      const result = validateContactForm(buildFormData(fields))
      expect(result).toEqual({ valid: false, message: 'Preencha todos os campos.' })
    },
  )

  it('rejeita e-mail sem formato válido', () => {
    const result = validateContactForm(buildFormData({ ...validFields, email: 'não-é-email' }))
    expect(result).toEqual({ valid: false, message: 'Informe um e-mail válido.' })
  })

  it.each(Object.keys(MAX_LENGTH) as (keyof typeof MAX_LENGTH)[])(
    'rejeita quando "%s" excede o tamanho máximo',
    (field) => {
      // Para "email", o texto extra precisa manter um formato válido
      // (com @ e domínio), senão cai no erro de formato antes do de tamanho.
      const tooLong =
        field === 'email'
          ? `${'a'.repeat(MAX_LENGTH.email - 'x@b.co'.length + 1)}x@b.co`
          : 'a'.repeat(MAX_LENGTH[field] + 1)
      const fields = { ...validFields, [field]: tooLong }
      const result = validateContactForm(buildFormData(fields))
      expect(result).toEqual({
        valid: false,
        message: 'Um dos campos excede o tamanho máximo permitido.',
      })
    },
  )

  it('aceita campos exatamente no limite máximo', () => {
    const atLimit = {
      name: 'a'.repeat(MAX_LENGTH.name),
      email: `${'a'.repeat(MAX_LENGTH.email - 'x@b.co'.length)}x@b.co`,
      subject: 'a'.repeat(MAX_LENGTH.subject),
      message: 'a'.repeat(MAX_LENGTH.message),
    }
    const result = validateContactForm(buildFormData(atLimit))
    expect(result.valid).toBe(true)
  })
})
