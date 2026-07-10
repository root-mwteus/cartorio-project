// Site 100% estático (sem dado por usuário), então o CSP usa 'unsafe-inline'
// só em script-src — o único script inline é o JSON-LD, que nunca contém
// dado vindo de formulário/banco. Isso evita precisar de nonce por
// requisição, o que forçaria o site inteiro a virar renderização dinâmica.
//
// Sem 'upgrade-insecure-requests': em dev/LAN o site roda em HTTP puro
// (sem TLS); essa diretiva forçava o navegador a tentar HTTPS em cada
// script/fonte e quebrava o carregamento inteiro.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

// O CSP só é aplicado em produção: em dev, o Turbopack usa scripts/eval
// que uma política estrita pode bloquear, e o acesso via IP da rede local
// (LAN, para testar no celular) roda sobre HTTP sem TLS.
if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({ key: 'Content-Security-Policy', value: csp })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.3.9'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
