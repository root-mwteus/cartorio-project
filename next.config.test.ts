import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

async function loadConfig() {
  const { default: config } = await import('./next.config.mjs')
  const [{ headers }] = await config.headers!()
  return { config, headers: Object.fromEntries(headers.map((h: { key: string; value: string }) => [h.key, h.value])) }
}

describe('next.config', () => {
  beforeEach(() => vi.resetModules())
  afterEach(() => vi.unstubAllEnvs())

  it('endurece os cabeçalhos em produção', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    const { config, headers } = await loadConfig()
    expect(config.poweredByHeader).toBe(false)
    expect(headers['Strict-Transport-Security']).toBe('max-age=63072000; includeSubDomains')
    expect(headers['Cross-Origin-Opener-Policy']).toBe('same-origin')
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'self'")
    expect(headers['X-Content-Type-Options']).toBe('nosniff')
  })

  it('não força HTTPS em desenvolvimento, para o teste pela rede local', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    const { headers } = await loadConfig()
    expect(headers['Strict-Transport-Security']).toBeUndefined()
    expect(headers['Content-Security-Policy']).toBeUndefined()
  })
})
