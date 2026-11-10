import { Redis } from '@upstash/redis'

// Chamado uma vez por dia pelo Vercel Cron (vercel.json): bancos gratuitos do
// Upstash são apagados após 14 dias sem uso, e o site só usa o banco quando
// alguém envia o formulário.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Não autorizado', { status: 401 })
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new Response('Upstash não configurado', { status: 503 })
  }

  try {
    await Redis.fromEnv().set('keepalive:last-run', new Date().toISOString())
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Keep-alive do Upstash falhou:', error instanceof Error ? error.name : 'desconhecido')
    return new Response('Falha ao acessar o Upstash', { status: 502 })
  }
}
