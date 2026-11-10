import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const set = vi.hoisted(() => vi.fn())
vi.mock('@upstash/redis', () => ({
  Redis: class {
    set = set
  },
}))

import { GET } from './route'

const call = (authorization?: string) =>
  GET(new Request('https://example.com/api/cron/keepalive', { headers: authorization ? { authorization } : {} }))

describe('keep-alive do Upstash', () => {
  beforeEach(() => {
    set.mockReset().mockResolvedValue('OK')
    vi.stubEnv('CRON_SECRET', 'segredo')
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://example.upstash.io')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'token')
  })
  afterEach(() => vi.unstubAllEnvs())

  it('recusa chamada sem o segredo', async () => {
    expect((await call()).status).toBe(401)
    expect((await call('Bearer errado')).status).toBe(401)
    expect(set).not.toHaveBeenCalled()
  })

  it('recusa tudo se CRON_SECRET não estiver configurado', async () => {
    vi.stubEnv('CRON_SECRET', '')
    expect((await call('Bearer ')).status).toBe(401)
    expect(set).not.toHaveBeenCalled()
  })

  it('grava no Redis quando chamado pelo cron', async () => {
    const response = await call('Bearer segredo')
    expect(response.status).toBe(200)
    expect(set).toHaveBeenCalledWith('keepalive:last-run', expect.any(String))
  })

  it('avisa quando o Upstash não está configurado', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    expect((await call('Bearer segredo')).status).toBe(503)
  })

  it('responde 502 sem quebrar quando o Upstash falha', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    set.mockRejectedValue(new TypeError('Headers.append: "Bearer token" is an invalid header value.'))
    expect((await call('Bearer segredo')).status).toBe(502)
    const logged = JSON.stringify(log.mock.calls)
    expect(logged).toContain('TypeError')
    expect(logged).toContain('urlDoUpstash')
    expect(logged).not.toContain('Bearer token')
  })
})
