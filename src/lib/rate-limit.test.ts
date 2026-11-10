import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  limit: vi.fn(),
  configs: [] as { limiter: string; prefix: string }[],
}))

vi.mock('@upstash/redis', () => ({ Redis: class {} }))
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: class {
    static slidingWindow = (tokens: number, window: string) => `${tokens}/${window}`
    limit = mocks.limit
    constructor(config: { limiter: string; prefix: string }) {
      mocks.configs.push(config)
    }
  },
}))

import { checkGlobalRateLimit, checkIpRateLimit } from './rate-limit'

describe('rate limit do formulário', () => {
  beforeEach(() => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://example.upstash.io')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'token')
    mocks.limit.mockReset()
  })
  afterEach(() => vi.unstubAllEnvs())

  it('lança erro tratável quando as chaves estão vazias', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    expect(() => checkIpRateLimit('1.1.1.1')).toThrow('Upstash')
  })

  it('usa 5 envios em 10 minutos por IP e 100 por hora no global', async () => {
    mocks.limit.mockResolvedValue({ success: true })
    await checkIpRateLimit('1.1.1.1')
    expect(mocks.configs).toEqual([
      expect.objectContaining({ limiter: '5/10 m', prefix: 'ratelimit:contact-form' }),
      expect.objectContaining({ limiter: '100/1 h', prefix: 'ratelimit:contact-form:global' }),
    ])
  })

  it('consulta o IP e a chave global separadamente', async () => {
    mocks.limit.mockResolvedValue({ success: true })
    await checkIpRateLimit('1.1.1.1')
    await checkGlobalRateLimit()
    expect(mocks.limit.mock.calls).toEqual([['1.1.1.1'], ['global']])
  })

  it.each([
    [{ success: true }, 'allowed'],
    [{ success: false }, 'limited'],
    [{ success: true, reason: 'timeout' }, 'unavailable'],
  ])('resposta %j resulta em %s', async (response, expected) => {
    mocks.limit.mockResolvedValue(response)
    await expect(checkIpRateLimit('1.1.1.1')).resolves.toBe(expected)
  })
})
