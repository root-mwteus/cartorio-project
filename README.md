# Cartório de Registro de Imóveis de Bom Conselho — PE

Site institucional desenvolvido como projeto de portfólio para o Cartório de Registro de Imóveis de Bom Conselho — PE. **Não é o site oficial do cartório** — foi construído de forma independente para demonstração de habilidades técnicas, com a identidade visual real da serventia.

🔗 Deploy: [cartorio-project-topaz.vercel.app](https://cartorio-project-topaz.vercel.app)

> O site está temporariamente marcado como `noindex` (não aparece em buscadores) até que o cartório autorize sua publicação pública.

## Stack técnica

- **[Next.js 16](https://nextjs.org)** (App Router, React Server Components)
- **TypeScript** em modo estrito
- **Tailwind CSS v4**
- **[Supabase](https://supabase.com)** — armazenamento das mensagens do formulário de contato
- **[Resend](https://resend.com)** — envio de e-mail de notificação
- **[Upstash Redis](https://upstash.com)** — rate limiting do formulário de contato
- **Vitest** — testes automatizados
- **Vercel** — hospedagem

## Funcionalidades

- Formulário de contato funcional: valida os dados, salva no banco, envia e-mail de notificação, com proteção antispam (honeypot + rate limiting de 5 envios/10min por IP)
- SEO completo (Open Graph, Twitter Card, dados estruturados JSON-LD, sitemap)
- Cabeçalhos de segurança (CSP, X-Frame-Options, etc.)
- Totalmente responsivo, com menu mobile e navegação acessível (skip-link, `aria-current`, leitor de tela)
- Páginas institucionais (Sobre, Emolumentos, FAQ, Ouvidoria, Agendamento, Envio de documentos)
- Cards de serviço linkados ao [Portal Integrado do ONR](https://www.registrodeimoveis.org.br/bomconselho) para as solicitações reais

## Rodando localmente

```bash
npm install
```

Crie um arquivo `.env.local` na raiz com as seguintes variáveis (veja `.env.example`):

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
RESEND_API_KEY=
CONTACT_NOTIFICATION_EMAIL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

```bash
npm run dev       # servidor de desenvolvimento
npm run test      # testes automatizados
npm run lint      # lint
npm run build     # build de produção
```

## Estrutura do projeto

```
src/
  app/            # rotas (App Router) e Server Actions
  components/
    layout/       # cabeçalho e rodapé, usados em todo o site
    sections/     # blocos de conteúdo da página inicial
    ui/           # componentes de interface reutilizáveis
  lib/            # utilitários, configuração central (site-config.ts), integrações
```
