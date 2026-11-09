import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let limiter: Ratelimit | undefined

// Criado sob demanda: sem as chaves, a falha fica no envio, tratada por quem chama.
export function getContactFormRateLimit() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Variáveis do Upstash ausentes')
  }

  // Limita a 5 envios a cada 10 minutos, por IP.
  limiter ??= new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'ratelimit:contact-form',
  })
  return limiter
}
