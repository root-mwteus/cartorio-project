import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Limita a 5 envios a cada 10 minutos, por IP.
export const contactFormRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  prefix: 'ratelimit:contact-form',
})
