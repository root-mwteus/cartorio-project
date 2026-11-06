# UI Baseline — Registro de Imóveis de Bom Conselho

> Retrato do site **antes** da refatoração visual. Serve de referência fixa: tudo o que mudar deve ser comparado com este documento.
>
> - **Data do levantamento:** 2026-11-06
> - **Commit de referência:** `5346135` (branch `main`)
> - **Método:** leitura do código + inspeção em `http://localhost:3000` com `agent-browser` (desktop 1440×900 e iPhone 14, 390×844).

---

## 1. Stack e infraestrutura

| Item | Valor atual | Observação |
|---|---|---|
| Framework | Next.js `^16.2.11` (App Router, RSC) | Turbopack em dev |
| React | `^19` | `useActionState` no formulário |
| CSS | Tailwind CSS `^4.2.0` via `@tailwindcss/postcss` | Sem `tailwind.config`; tokens em `@theme inline` no `globals.css` |
| Componentes base | shadcn (`style: base-nova`) sobre `@base-ui/react` | Só existe `ui/button.tsx` |
| Ícones | `lucide-react` | Usados em todas as seções |
| Animações | `tw-animate-css` | Importado, mas sem uso relevante |
| Fontes | `next/font/google`: **Geist** (`--font-geist-sans`) e **Lora** (`--font-lora`) | Servidas pelo próprio site, o que é compatível com o CSP |
| Formulário | Server Action + Supabase (`contact_submissions`) + Resend + Upstash Ratelimit | Ver §5 |
| Testes | Vitest (`validate-contact-form.test.ts`) | CI em `.github/workflows/ci.yml` |
| Analytics | `@vercel/analytics` só em produção | Exige `connect-src` liberado no CSP |

### `next.config.mjs`

- **Headers de segurança em todas as rotas:** `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`.
- **CSP só em produção:** `img-src 'self' data:`, `font-src 'self' data:`, `default-src 'self'` e nenhum `frame-src`.
  - **Impacto no redesign:** imagens externas, Google Maps em iframe, fontes de CDN e vídeos externos **quebram em produção** sem ajuste no CSP. Todo asset novo deve ir para `public/`.
- `allowedDevOrigins: ['192.168.3.9']`: libera o teste pelo celular na rede local.

### `src/app/globals.css` (tokens OKLCH)

| Token | Valor | Hex aprox. | Uso real |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `#ffffff` | Fundo geral: branco puro e frio |
| `--foreground` | `oklch(0.21 0.03 20)` | `#241313` | Texto |
| `--primary` | `oklch(0.32 0.13 20)` | `#650014` | Vinho: hero, footer, botões |
| `--secondary` / `--muted` | `oklch(0.968 0.008 20)` | `#faf2f2` | Fundo de "Prazos" e dos ícones. **Fica rosado, não lembra papel.** |
| `--muted-foreground` | `oklch(0.52 0.02 20)` | `#746564` | Texto de apoio |
| `--accent` | `oklch(0.72 0.13 85)` | `#ca9d33` | Dourado: CTA do WhatsApp **e textos pequenos** |
| `--accent-foreground` | `oklch(0.25 0.05 20)` | `#361717` | Texto sobre dourado |
| `--border` / `--input` | `oklch(0.91 0.01 20)` | — | Bordas de cards e inputs |
| `--radius` | `0.625rem` | — | Padrão do shadcn |
| `--chart-*`, `--sidebar-*` | cinzas neutros | — | **Sem uso** (sobra do template) |

- **Tema escuro:** os blocos `.dark` e `@media (prefers-color-scheme: dark)` usam os cinzas padrão do shadcn (inclusive um `--sidebar-primary` azul). Na prática **nunca são ativados**, porque o `<html>` recebe a classe `light` e o viewport força `colorScheme: 'light'`. É código morto.
- **`themeColor`:** `#5c1e22` em `layout.tsx` e em `manifest.ts`, valor diferente do `--primary` calculado (`#650014`).

---

## 2. Inventário de telas

| Rota | Arquivo | Composição |
|---|---|---|
| `/` | `src/app/page.tsx` | Header → Hero → ServicesGrid → PrepareSection → ContactSection → Footer |
| `/sobre` | `(institucional)/sobre/page.tsx` | Cabeçalho + 3 parágrafos (natureza jurídica, oficial, missão) |
| `/emolumentos` | `(institucional)/emolumentos/page.tsx` | Texto + CTA "Ver tabela oficial (PDF)" (TJPE) + WhatsApp |
| `/faq` | `(institucional)/faq/page.tsx` | 6 perguntas em `<details>` |
| `/ouvidoria` | `(institucional)/ouvidoria/page.tsx` | Texto + card "Como registrar sua manifestação" (e-mail de suporte + formulário) |
| `/agendar` | `(institucional)/agendar/page.tsx` | Texto + CTA WhatsApp |
| `/enviar-documentos` | `(institucional)/enviar-documentos/page.tsx` | Texto + CTAs WhatsApp e e-mail |
| 404 | `src/app/not-found.tsx` | Header + mensagem + "Voltar para o início" + Footer |
| Erro | `src/app/error.tsx` | Mensagem + "Tentar novamente" (sem header nem footer) |
| Loading | `src/app/loading.tsx` | Spinner genérico em tela cheia |
| Metadados | `manifest.ts`, `robots.ts`, `sitemap.ts`, `icon.png`, `apple-icon.png` | `robots` bloqueia tudo **de propósito** (ver §5) |

- **Layout institucional:** `(institucional)/layout.tsx` usa header e footer, com `main#main` de largura `max-w-3xl`.
- **Cabeçalho das páginas institucionais:** `_components/page-header.tsx` mostra a etiqueta "INSTITUCIONAL" em dourado acima do `h1` em Lora. É idêntico em todas as 6 páginas.

## 3. Inventário de componentes

### `src/components/layout/`

| Componente | O que faz | Observações |
|---|---|---|
| `site-header.tsx` (client) | Header fixo com blur; logo + "Registro de Imóveis de Bom Conselho" + "CNS 074864 — Bom Conselho/PE"; nav com âncoras `/#inicio`, `/#servicos`, `/#prazos`, `/#contato`; destaca a seção ativa com IntersectionObserver; botão "Fale conosco"; menu mobile | O menu **não tem links para as páginas institucionais**. O "Fale conosco" some abaixo de `sm`, então no celular não há CTA no header. |
| `site-footer.tsx` | Fundo vinho; logo + texto sobre fé pública; 3 colunas (Serviços, Institucional, Atendimento); CNPJ 32.146.479/0001-65 | Os 4 links de "Serviços" apontam todos para `/#servicos`. "Usucapião" não aparece na lista de serviços. No celular, as colunas empilham e o footer fica muito comprido. |

### `src/components/sections/`

| Componente | Âncora | Conteúdo |
|---|---|---|
| `hero-section.tsx` | `#inicio` | Foto com overlay `bg-primary/85`, pill "CNS 074864 • SERVIÇO PÚBLICO DELEGADO • FÉ PÚBLICA", `h1`, parágrafo, linha do Oficial Registrador, CTAs "Falar no WhatsApp" (dourado) e "Ver serviços" (outline), local e horário |
| `services-grid.tsx` | `#servicos` | 6 cards idênticos (ícone + título + descrição + "Acessar no portal ONR"), **todos levando para o mesmo `siteConfig.onrUrl`** |
| `prepare-section.tsx` | `#prazos` | 3 cards de prazo: Certidões Eletrônicas (até 4h úteis), Situação Jurídica (1 dia útil), Análise e Registro (5 a 10 dias úteis + "prenotação: 20 dias") |
| `contact-section.tsx` (client) | `#contato` | 4 cards de contato (endereço, horário, e-mail, telefone) + formulário com honeypot |

### `src/components/ui/`

| Componente | Observação |
|---|---|
| `button.tsx` | Padrão do shadcn com `@base-ui`. Os tamanhos padrão (`h-8`, `lg` = `h-9`) são pequenos, por isso todo CTA sobrescreve com `h-12 px-6 text-base`. O padrão está errado para este site. |

### Assets

| Arquivo | Dimensões | Uso | Observação |
|---|---|---|---|
| `public/cartorio-hero.jpg` | 1024×1024 (169 KB) | Fundo do hero e imagem OG/Twitter/JSON-LD | **Não é a serventia real:** é um saguão corporativo genérico com skyline de cidade grande, com cara de imagem gerada por IA. Não combina com Bom Conselho (agreste de PE). O OG declara 1200×630, mas o arquivo é quadrado. |
| `public/logo-icon-v3.png` | 1009×981 | Logo no header e footer, ícone do manifest | Pena dourada com gradiente metálico sobre um quadrado. É o único elemento de marca. |
| `public/icon-512.png` | 512×512 | Manifest | — |
| `src/app/icon.png` / `apple-icon.png` | 256 / 180 | Favicon e ícone iOS | — |
| `assets-originais/logo-icon-original.png` | 1024×1024 (paleta indexada) | Fonte do logo | Mesma arte do v3, com outro enquadramento. **Não existe versão vetorial (SVG) da marca.** |

---

## 4. Hierarquia visual observada (navegador)

### Desktop (1440×900)

1. **Primeira dobra:** o hero ocupa a tela inteira. O vinho a 85% achata a foto até ela virar textura sem leitura. O `h1` em Lora (~60px) é o elemento mais forte. Logo depois, o botão dourado do WhatsApp chama mais atenção que o próprio título. A metade direita do hero fica vazia.
2. **Serviços:** etiqueta dourada + `h2` + parágrafo, seguidos de uma grade 3×2 de cards brancos com borda e `shadow-sm`. Os 6 cards têm o mesmo peso visual e nada indica qual serviço é o principal.
3. **Prazos:** fundo `#faf2f2` (rosado), mais 3 cards iguais. O prazo aparece em dourado 24px, com contraste insuficiente.
4. **Contato:** grade 2×2 de mini-cards à esquerda e formulário em card à direita. O formulário não tem título próprio.
5. **Footer:** vinho com 4 colunas e conteúdo bem resolvido.

Todas as seções repetem a mesma fórmula: etiqueta dourada em CAIXA ALTA, `h2` em serif, parágrafo cinza e uma grade de cards. O ritmo é monótono.

### Mobile (iPhone 14, 390×844)

- **Sem rolagem horizontal:** `scrollWidth` = 390. ✔
- **Pill do hero:** quebra em 2 linhas ("FÉ / PÚBLICA").
- **Hero:** o parágrafo de 6 linhas empurra os CTAs para o fim da primeira dobra. "Ver serviços" fica quase colado na borda inferior.
- **Header:** o nome com o CNS ocupa quase toda a largura. Só aparece o botão hambúrguer, sem CTA.
- **Footer:** cerca de 1.400px de links empilhados.
- **Páginas institucionais (`/sobre`):** texto corrido, bem legível, mas sem nenhuma âncora visual além do `h1`. Parece um documento sem formatação.

### Contraste medido (WCAG 2.1)

| Par | Razão | Resultado |
|---|---|---|
| Texto `--accent` (dourado) sobre branco | **2,50 : 1** | ❌ Reprova AA, inclusive para texto grande (mínimo 3 : 1) |
| Texto `--accent` sobre `--secondary` | **2,27 : 1** | ❌ Reprova |
| `--muted-foreground` sobre branco | 5,56 : 1 | ✔ AA |
| `--foreground` sobre branco | 17,86 : 1 | ✔ AAA |
| Branco sobre `--primary` | 13,41 : 1 | ✔ AAA |
| `--accent-foreground` sobre `--accent` (botão) | 6,50 : 1 | ✔ AA |

O dourado como **cor de texto** reprova em 5 lugares:

- etiquetas das seções ("NOSSOS SERVIÇOS", "PRAZOS OFICIAIS", "CONTATO E LOCALIZAÇÃO", "INSTITUCIONAL", "ERRO 404")
- "Acessar no portal ONR"
- os prazos ("Até 4 horas úteis" etc.)
- o ícone de sucesso do formulário
- o "Erro inesperado"

---

## 5. Catálogo de "AI slop" atual

Cada item descreve o que hoje denuncia um template genérico.

### Global

- **Fórmula repetida em todas as seções:** etiqueta em CAIXA ALTA dourada (`text-sm font-semibold uppercase tracking-wide text-accent`), depois `h2` serif, parágrafo `text-lg text-muted-foreground` e `mt-14 grid` de cards. O mesmo bloco aparece 4 vezes na home e outras 6 vezes nas páginas institucionais.
- **Paleta de shadcn com outra cor:** branco puro `#fff` + bordas `oklch(0.91 0.01 20)` + `shadow-sm` + `rounded-xl` em tudo. Não há papel, textura nem hierarquia de superfícies.
- **Tokens sobrando:** `--chart-*`, `--sidebar-*` e um tema escuro cinza/azul que nunca é usado.
- **Ícone em quadradinho:** todo card começa com um ícone lucide dentro de um `h-12 w-12 rounded-lg bg-secondary`. É o cacoete mais reconhecível de UI gerada por IA.
- **Escala tipográfica pouco contrastada:** só existem `h1` (60px), `h2` (36px) e o corpo. Não há subtítulo editorial, número de destaque com tipografia própria nem notas de rodapé.

### `hero-section.tsx`

- **Foto com overlay de cor sólida:** `bg-primary/85` chapado sobre uma imagem que já é genérica. É o hero mais comum de template.
- **Foto falsa:** o saguão corporativo com arranha-céus contradiz "tradição documental" e a cidade real.
- **Pill com bullets:** `rounded-full border bg-white/10` com "CNS • SERVIÇO PÚBLICO DELEGADO • FÉ PÚBLICA". É o badge padrão de landing page de SaaS.
- **Botão dourado de WhatsApp:** amarelo chapado, sem refinamento, competindo com o `h1`.
- **Metadados em linha de ícones:** `<dl>` com pares ícone + texto. Além do visual genérico, o `<dl>` tem `<dd>` sem `<dt>`, o que é marcação inválida.
- **Metade direita vazia:** em desktop, um terço da tela só mostra a foto borrada.

### `services-grid.tsx`

- **Grade 3×2 de cards idênticos**, com ícone + título + 2 linhas + link. É o exemplo clássico.
- **Mesmo link nos 6 cards:** todos vão para `onrUrl`. A grade sugere escolha, mas o destino é sempre o mesmo.
- **Hover genérico:** só aumenta a sombra (`hover:shadow-md`) e inverte a cor do ícone.
- **Microcopy vazio:** "Soluções completas para o seu imóvel" é frase de imobiliária, não de serventia.

### `prepare-section.tsx`

- **Três cards de "estatística":** ícone + rótulo + número dourado. Prazos legais merecem a forma de **tabela oficial**, não de cards de KPI.
- **Fundo rosado** (`#faf2f2`), que lembra cosmético, não papel.
- **Nome do componente (`PrepareSection`) não corresponde ao conteúdo (`#prazos`):** isso indica que a seção foi reaproveitada de um template.

### `contact-section.tsx`

- **4 mini-cards com ícone** para endereço, horário, e-mail e telefone. É a grade de "contact cards" de template.
- **Dados de contato sem link:** e-mails, telefone e WhatsApp são texto puro, sem `mailto:`, `tel:` ou `wa.me`. O endereço não tem link para mapa.
- **Formulário sem título**, dentro de um card com a mesma sombra de todo o resto.
- **Microcopy de marketing:** "Estamos prontos para atender você".

### `site-header.tsx` / `site-footer.tsx`

- **Header com blur, borda inferior e botão vinho:** o padrão de qualquer SaaS.
- **Footer de 4 colunas com links repetidos** (os 4 de "Serviços" vão para a mesma âncora).

### Páginas institucionais

- **Mesmo cabeçalho "INSTITUCIONAL" dourado** em todas, sem sumário, data de atualização nem fundamentação legal visível.
- **FAQ em cards `rounded-xl shadow-sm`** com chevron: o acordeão padrão.
- **`loading.tsx`:** spinner circular genérico.
- **`error.tsx`:** sem header nem footer, e o usuário perde a navegação.

---

## 6. Regras intocáveis (negócio, jurídico, técnico)

Nada desta lista pode ser removido, alterado no conteúdo ou quebrado no comportamento durante a refatoração. Mudar **a aparência** é permitido; mudar **o dado ou a função** não é.

### 6.1 Identidade legal da serventia

| Dado | Onde está hoje | Regra |
|---|---|---|
| **CNS 074864** | Header (subtítulo), pill do hero, `/sobre` | Deve continuar visível no header **em todas as páginas** e na home acima da dobra |
| **Oficial Registrador: Algacyr Fernando Vieira de Barros** | Hero, `/sobre` | Nome completo e cargo exatos, visíveis na home sem interação |
| **Natureza jurídica:** serventia extrajudicial, fé pública, delegação do Poder Público, art. 236 CF, Lei nº 8.935/1994 | `/sobre`, footer | Texto juridicamente revisado. Não reescrever o sentido. |
| **CNPJ 32.146.479/0001-65** | Footer | Manter |
| **Nome oficial:** "Cartório de Registro de Imóveis de Bom Conselho" | `siteConfig.name`, metadados, JSON-LD | Manter. Variações curtas só na interface. |
| JSON-LD `@type: LegalService` | `layout.tsx` | **Não** trocar para `GovernmentOffice` (o comentário no código explica por quê) |
| Endereço, CEP, telefones, e-mails, horário (seg–sex, 08h–17h, exceto feriados) | `siteConfig` + seções | Sempre ler de `siteConfig`, nunca escrever no componente |

### 6.2 Links oficiais externos

| Link | Origem | Regra |
|---|---|---|
| Portal ONR: `https://www.registrodeimoveis.org.br/bomconselho` | `siteConfig.onrUrl` | Todo serviço solicitável on-line continua levando ao ONR, com `target="_blank" rel="noopener noreferrer"` e indicação visual de link externo |
| Tabela de emolumentos do TJPE (PDF) | `siteConfig.emolumentosTableUrl` | Manter a indicação "PDF" e "oficial". Os emolumentos são fixados por lei estadual e o texto não pode sugerir que o cartório define valores. |
| WhatsApp `wa.me/5587981198252` | `siteConfig.whatsappUrl` | Continua sendo o CTA principal de atendimento |

### 6.3 Prazos publicados

- Certidões eletrônicas: **até 4 horas úteis**
- Situação jurídica do imóvel: **1 dia útil**
- Análise e registro de títulos: **5 a 10 dias úteis**
- Prazo máximo de prenotação: **20 dias**

Os números não podem mudar sem validação do cartório. O FAQ cita a seção de prazos, então a âncora **`#prazos` deve continuar existindo**.

### 6.4 Formulário de contato

| Mecanismo | Arquivo | Regra |
|---|---|---|
| Server Action `submitContactForm` | `src/app/actions/contact.ts` | A ordem não muda: rate-limit → validação → honeypot → Supabase → Resend |
| Rate-limit: **5 envios / 10 min por IP** (Upstash sliding window) | `src/lib/rate-limit.ts` | Não remover nem afrouxar |
| Validação no servidor: campos obrigatórios, regex de e-mail, limites `name 100`, `email 254`, `subject 150`, `message 2000` | `src/lib/validate-contact-form.ts` | Os `maxLength` do HTML devem continuar iguais a `MAX_LENGTH` |
| Honeypot `name="website"` | Campo escondido fora da tela + validação | O campo continua escondido, sem foco (`tabIndex={-1}`) e com `aria-hidden`. **Não** usar `display:none`, porque alguns bots ignoram campos assim. |
| Nomes dos campos: `name`, `email`, `subject`, `message`, `website` | Formulário | Imutáveis, porque o servidor lê por nome |
| Estados: idle / enviando (`aria-busy`, botão desabilitado) / erro (`role="alert"`) / sucesso com "Enviar nova mensagem" (reset por `key`) | `contact-section.tsx` | Todos os estados devem continuar existindo e anunciados para leitores de tela |
| Testes | `validate-contact-form.test.ts` | `npm test` deve continuar passando |

### 6.5 Acessibilidade

- **Skip link** "Pular para o conteúdo" → `#main`, primeiro elemento focável do `<body>`. Toda página deve ter **um** `main#main`.
- `lang="pt-BR"` no `<html>`.
- **Navegação:** `aria-label` nas navs, `aria-current="page"` no item ativo, e `aria-expanded`/`aria-controls`/`aria-label` dinâmicos no botão do menu mobile.
- **Ícones decorativos:** `aria-hidden="true"`. O logo usa `alt=""` porque o nome aparece ao lado.
- **Formulário:** cada campo com `<label htmlFor>` visível. Não substituir por placeholder.
- **Foco visível:** `outline-ring/50` global e `focus-visible:ring` no botão.
- **Pendências** (corrigir durante o redesign, sem regredir o resto): o contraste do dourado como texto (§4) e o `<dl>` sem `<dt>` no hero.

### 6.6 Técnico, SEO e privacidade

- **`robots: noindex/nofollow` e `robots.ts` com `disallow: '/'` são TEMPORÁRIOS e intencionais:** ainda falta a autorização do cartório. Não reativar a indexação durante a refatoração.
- **CSP de produção:** assets só locais (§1). Mudanças no CSP precisam de justificativa explícita.
- **Âncoras usadas pelo header, footer e FAQ:** `#inicio`, `#servicos`, `#prazos`, `#contato`.
- **Rotas listadas no `sitemap.ts`:** nenhuma rota pode sumir sem atualizar o sitemap.
- **`siteConfig`:** é a fonte única dos dados de contato.
- **`Analytics`:** só carrega em produção.
