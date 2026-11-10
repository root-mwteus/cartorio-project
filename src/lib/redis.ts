import { Redis } from '@upstash/redis'
import { readEnv } from './env'

export function getRedisConfig() {
  return {
    url: readEnv('UPSTASH_REDIS_REST_URL'),
    token: readEnv('UPSTASH_REDIS_REST_TOKEN'),
  }
}

export function createRedis() {
  const { url, token } = getRedisConfig()
  if (!url || !token) throw new Error('Variáveis do Upstash ausentes')
  return new Redis({ url, token })
}

// Formato da configuração para o log, sem expor nenhum valor.
export function describeRedisConfig() {
  const rawUrl = process.env.UPSTASH_REDIS_REST_URL ?? ''
  const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
  const { url, token } = getRedisConfig()
  return {
    urlComHttps: url.startsWith('https://'),
    urlDoUpstash: /^https:\/\/[^/\s]+\.upstash\.io\/?$/.test(url),
    urlTinhaAspasOuEspacos: rawUrl !== url,
    tokenTinhaAspasOuEspacos: rawToken !== token,
    tokenTemEspacoInterno: /\s/.test(token),
    tamanhoDoToken: token.length,
  }
}
