import { afterEach, describe, expect, it, vi } from 'vitest'
import { readEnv, redactEmails } from './env'

describe('readEnv', () => {
  afterEach(() => vi.unstubAllEnvs())

  it.each(['"cart1bcab@gmail.com"', "'cart1bcab@gmail.com'", ' cart1bcab@gmail.com\n', ' "cart1bcab@gmail.com" '])(
    'limpa %j',
    (value) => {
      vi.stubEnv('CONTACT_NOTIFICATION_EMAIL', value)
      expect(readEnv('CONTACT_NOTIFICATION_EMAIL')).toBe('cart1bcab@gmail.com')
    },
  )

  it('devolve vazio quando não existe', () => {
    expect(readEnv('VARIAVEL_QUE_NAO_EXISTE')).toBe('')
  })
})

describe('redactEmails', () => {
  it('oculta e-mails e mantém o motivo', () => {
    const message =
      'You can only send testing emails to your own email address (dono@gmail.com). To send to maria@example.com verify a domain.'
    expect(redactEmails(message)).toBe(
      'You can only send testing emails to your own email address ([e-mail]). To send to [e-mail] verify a domain.',
    )
  })
})
