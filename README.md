# Serventia Notarial e Registral de Bom Conselho — Cartório Algacyr Barros

[![CI](https://github.com/root-mwteus/cartorio-project/actions/workflows/ci.yml/badge.svg)](https://github.com/root-mwteus/cartorio-project/actions/workflows/ci.yml)

Site institucional da Serventia Notarial e Registral de Bom Conselho — PE.

🔗 Deploy: [cartorio-project-topaz.vercel.app](https://cartorio-project-topaz.vercel.app)

> O site está temporariamente marcado como `noindex` (não aparece em buscadores) até que o cartório autorize sua publicação pública.

## Stack técnica

- **[Next.js 16](https://nextjs.org)** (App Router, React Server Components), com todas as páginas geradas de forma estática
- **TypeScript** em modo estrito
- **Tailwind CSS v4**
- **three.js** — lote 3D do hero, carregado sob demanda
- **Vitest** — testes automatizados
- **Vercel** — hospedagem

## Funcionalidades

- Atendimento direcionado ao WhatsApp oficial da serventia, com botão flutuante em todas as páginas. O site não tem formulários e não guarda dados pessoais
- Triagem "O que você precisa fazer?", Carta de Serviços e Quadro de Prazos com base legal, ligados ao [Portal Integrado do ONR](https://www.registrodeimoveis.org.br/bomconselho)
- Páginas institucionais (Sobre, Emolumentos, FAQ, Ouvidoria, Agendamento, Envio de documentos, Aviso de Privacidade)
- SEO (Open Graph, Twitter Card, dados estruturados JSON-LD, sitemap)
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, entre outros)
- Responsivo e acessível (skip-link, `aria-current`, foco visível, `prefers-reduced-motion`)

## Rodando localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run test      # testes automatizados
npm run lint      # lint
npm run build     # build de produção
```

Nenhuma variável de ambiente é obrigatória. `NEXT_PUBLIC_SITE_URL` (veja `.env.example`) define a URL pública quando houver domínio próprio.

## Estrutura do projeto

```
src/
  app/            # rotas (App Router), metadados e card de compartilhamento
  components/
    layout/       # cabeçalho e rodapé, usados em todo o site
    sections/     # blocos de conteúdo da página inicial
    ui/           # componentes de interface reutilizáveis
  lib/            # configuração central (site-config.ts), prazos legais e utilitários
```

Os dados da serventia (nome, CNS, titular, contatos e horários) ficam todos em `src/lib/site-config.ts`.
