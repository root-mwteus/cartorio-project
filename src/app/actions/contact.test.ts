import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  limit: vi.fn(),
  getLimiter: vi.fn(),
  insert: vi.fn(),
  send: vi.fn(),
}))

vi.mock('next/headers', () => ({ headers: async () => new Headers() }))
vi.mock('@/lib/rate-limit', () => ({ getContactFormRateLimit: mocks.getLimiter }))
vi.mock('@/lib/supabase', () => ({
  createSupabaseServerClient: () => ({ from: () => ({ insert: mocks.insert }) }),
}))
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mocks.send }
  },
}))

import { submitContactForm } from './contact'

const values = {
  name: 'Maria',
  email: 'maria@example.com',
  subject: 'Certidão',
  message: 'Preciso de uma certidão.',
}

function submit(extra: Record<string, string> = {}) {
  const formData = new FormData()
  for (const [key, value] of Object.entries({ ...values, ...extra })) formData.set(key, value)
  return submitContactForm({ status: 'idle' }, formData)
}

const unavailable = expect.objectContaining({ status: 'error', fallback: true, values })

describe('submitContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('CONTACT_NOTIFICATION_EMAIL', 'destino@example.com')
    mocks.limit.mockResolvedValue({ success: true })
    mocks.getLimiter.mockReturnValue({ limit: mocks.limit })
    mocks.insert.mockResolvedValue({ error: null })
    mocks.send.mockResolvedValue({ data: { id: '1' }, error: null })
  })

  it('grava e notifica quando tudo funciona', async () => {
    await expect(submit()).resolves.toEqual({ status: 'success' })
    expect(mocks.insert).toHaveBeenCalledOnce()
    expect(mocks.send).toHaveBeenCalledOnce()
  })

  it('oferece outros canais quando o rate-limit não inicializa', async () => {
    mocks.getLimiter.mockImplementation(() => {
      throw new Error('sem chaves')
    })
    await expect(submit()).resolves.toEqual(unavailable)
    expect(mocks.insert).not.toHaveBeenCalled()
  })

  it.each(['RESEND_API_KEY', 'CONTACT_NOTIFICATION_EMAIL'])(
    'não grava a mensagem sem %s',
    async (name) => {
      vi.stubEnv(name, '  ')
      await expect(submit()).resolves.toEqual(unavailable)
      expect(mocks.insert).not.toHaveBeenCalled()
    },
  )

  it('oferece outros canais quando o banco falha', async () => {
    mocks.insert.mockResolvedValue({ error: { message: 'falhou' } })
    await expect(submit()).resolves.toEqual(unavailable)
    expect(mocks.send).not.toHaveBeenCalled()
  })

  it('não declara sucesso quando o Resend recusa o envio', async () => {
    mocks.send.mockResolvedValue({ data: null, error: { message: 'recusado' } })
    await expect(submit()).resolves.toEqual(unavailable)
  })

  it('mantém o texto sem oferecer outros canais quando excede o limite', async () => {
    mocks.limit.mockResolvedValue({ success: false })
    const result = await submit()
    expect(result).toMatchObject({ status: 'error', values })
    expect(result.fallback).toBeUndefined()
  })

  it('mantém o texto em erro de validação', async () => {
    const result = await submit({ email: 'invalido' })
    expect(result).toMatchObject({ status: 'error', values: { ...values, email: 'invalido' } })
    expect(mocks.insert).not.toHaveBeenCalled()
  })

  it('finge sucesso para bots sem gravar', async () => {
    await expect(submit({ website: 'spam' })).resolves.toEqual({ status: 'success' })
    expect(mocks.insert).not.toHaveBeenCalled()
  })
})
