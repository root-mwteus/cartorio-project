import { createRedis, describeRedisConfig, getRedisConfig } from '@/lib/redis'

// Chamado uma vez por dia pelo Vercel Cron (vercel.json): bancos gratuitos do
// Upstash são apagados após 14 dias sem uso, e o site só usa o banco quando
// alguém envia o formulário.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Não autorizado', { status: 401 })
  }

  const { url, token } = getRedisConfig()
  if (!url || !token) {
    return new Response('Upstash não configurado', { status: 503 })
  }

  try {
    await createRedis().set('keepalive:last-run', new Date().toISOString())
    return Response.json({ ok: true })
  } catch (error) {
    // Só nome, código da causa e formato da configuração: a mensagem pode conter o token.
    const cause = error instanceof Error ? (error.cause as { code?: string } | undefined)?.code : undefined
    console.error(
      'Keep-alive do Upstash falhou:',
      error instanceof Error ? error.name : 'desconhecido',
      cause ?? 'sem código',
      JSON.stringify(describeRedisConfig()),
    )
    return new Response('Falha ao acessar o Upstash', { status: 502 })
  }
}
