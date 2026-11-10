import { Ratelimit } from '@upstash/ratelimit'
import { createRedis } from './redis'

export type RateLimitResult = 'allowed' | 'limited' | 'unavailable'

let limiters: { perIp: Ratelimit; global: Ratelimit } | undefined

// Criados sob demanda: sem as chaves, a falha fica no envio, tratada por quem chama.
function getLimiters() {
  if (limiters) return limiters

  const redis = createRedis()
  limiters = {
    // Limita a 5 envios a cada 10 minutos, por IP.
    perIp: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      prefix: 'ratelimit:contact-form',
    }),
    // Protege as cotas de Supabase e Resend contra ataques com vários IPs.
    global: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 h'),
      prefix: 'ratelimit:contact-form:global',
    }),
  }
  return limiters
}

async function check(limiter: Ratelimit, identifier: string): Promise<RateLimitResult> {
  const { success, reason } = await limiter.limit(identifier)
  // Em timeout a biblioteca devolve success: true; aqui o envio é bloqueado.
  if (reason === 'timeout') return 'unavailable'
  return success ? 'allowed' : 'limited'
}

export function checkIpRateLimit(ip: string) {
  return check(getLimiters().perIp, ip)
}

export function checkGlobalRateLimit() {
  return check(getLimiters().global, 'global')
}
