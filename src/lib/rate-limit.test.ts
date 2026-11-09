import { afterEach, describe, expect, it, vi } from 'vitest'
import { getContactFormRateLimit } from './rate-limit'

describe('getContactFormRateLimit', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('lança erro tratável quando as chaves estão vazias', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    expect(() => getContactFormRateLimit()).toThrow('Upstash')
  })
})
