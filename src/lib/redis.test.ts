import { afterEach, describe, expect, it, vi } from 'vitest'

const constructed = vi.hoisted(() => [] as { url: string; token: string }[])
vi.mock('@upstash/redis', () => ({
  Redis: class {
    constructor(config: { url: string; token: string }) {
      constructed.push(config)
    }
  },
}))

import { createRedis, describeRedisConfig, getRedisConfig } from './redis'

describe('configuração do Upstash', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    constructed.length = 0
  })

  it.each([
    ['"https://x.upstash.io"', '"tok123"'],
    ["'https://x.upstash.io'", "'tok123'"],
    ['  https://x.upstash.io\n', '\ttok123  '],
    [' "https://x.upstash.io" ', ' "tok123"\n'],
  ])('limpa %j e %j', (url, token) => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', url)
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', token)
    expect(getRedisConfig()).toEqual({ url: 'https://x.upstash.io', token: 'tok123' })
    createRedis()
    expect(constructed[0]).toEqual({ url: 'https://x.upstash.io', token: 'tok123' })
  })

  it('lança erro tratável sem as chaves', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '""')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    expect(() => createRedis()).toThrow('Upstash')
  })

  it('descreve o formato sem expor os valores', () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '"https://x.upstash.io"')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'segredo-do-token')
    const description = describeRedisConfig()
    expect(description).toEqual({
      urlComHttps: true,
      urlDoUpstash: true,
      urlTinhaAspasOuEspacos: true,
      tokenTinhaAspasOuEspacos: false,
      tokenTemEspacoInterno: false,
      tamanhoDoToken: 16,
    })
    expect(JSON.stringify(description)).not.toContain('segredo')
    expect(JSON.stringify(description)).not.toContain('x.upstash.io')
  })
})
