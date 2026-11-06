# Design Target — Registro de Imóveis de Bom Conselho

> Para onde o redesign vai. Leia junto com [`UI_BASELINE.md`](./UI_BASELINE.md): o baseline diz **de onde** saímos e o que é intocável; este documento diz **aonde** queremos chegar e como verificar que chegamos.

---

## 1. Visão editorial cartorial

### A ideia em uma frase

**O site deve parecer um livro de registro bem diagramado, não uma landing page.** A autoridade vem da precisão: dados exatos, fundamentação legal visível, tipografia cuidadosa, papel e tinta. Brilho, gradiente e marketing não entram.

### Princípios

1. **Fé pública antes de persuasão.** O cidadão não está sendo "convertido": ele precisa encontrar um ato, um prazo ou um canal. Cada seção responde a uma pergunta concreta ("o que posso pedir?", "em quanto tempo?", "onde e quando?", "quem responde?").
2. **Tradição documental.** Referências visuais: matrícula, livro de protocolo, certidão, carimbo, selo de tabelionato, tabela de emolumentos. Valem filetes, colunas numeradas, notas de rodapé, numeração de folhas, versaletes e referências a artigos de lei. Ficam de fora o card de SaaS, o badge pill e o gradiente.
3. **Sobriedade com calor.** O fundo é papel quente, não branco hospitalar. O vinho é a tinta institucional. O ouro velho é o selo e aparece pouco: filetes, numerais e o logo. Quase nunca em texto pequeno.
4. **Hierarquia por tipografia, não por caixas.** O que é importante fica maior, mais escuro ou serifado. Uma borda em volta não basta. Cards só quando o conteúdo é, de fato, um objeto separável.
5. **Densidade honesta.** Prazo é tabela. Contato é ficha. Serviço é índice. A forma segue o tipo do dado.
6. **Local e real.** Bom Conselho, agreste pernambucano. Nada de skyline, saguão corporativo ou banco de imagens. Se não houver foto real da serventia, a composição se sustenta só com tipografia e papel.

### Tom de voz

| Faça | Evite |
|---|---|
| Frases declarativas e curtas: "Certidões eletrônicas são emitidas em até 4 horas úteis." | Promessas de marketing: "Soluções completas para o seu imóvel" |
| Termos técnicos corretos, explicados na primeira menção: *prenotação*, *averbação*, *matrícula* | Jargão de startup: "plataforma", "experiência", "jornada" |
| Tratamento por "você", cordial e impessoal | "Estamos prontos para atender você!", exclamações |
| Citar a base legal quando ela der segurança: "art. 236 da CF", "Lei nº 8.935/1994" | Selos de "confiança" genéricos (estrelas, "100% seguro") |
| Verbos de ação nos CTAs: "Solicitar certidão no ONR", "Agendar pelo WhatsApp" | CTAs vagos: "Saiba mais", "Ver serviços" |

### Tipografia

| Papel | Família | Uso |
|---|---|---|
| Títulos e display | **Lora** (`--font-serif`) | `h1`/`h2`/`h3`, numerais de destaque (prazos), epígrafes em *itálico*, assinatura do Oficial Registrador |
| Texto e interface | **Geist** (`--font-sans`) | Corpo, formulário, navegação, rótulos, tabelas |
| Dados | Geist com `font-variant-numeric: tabular-nums` | CNS, CNPJ, telefones, prazos em tabela, CEP |

Escala sugerida (mobile → desktop):

| Nível | Tamanho | Família | Detalhes |
|---|---|---|---|
| Display (`h1` da home) | `clamp(2.5rem, 6vw, 4.5rem)` | Lora 600 | `leading-[1.05]`, `tracking-tight` |
| `h2` de seção | `clamp(1.75rem, 3.5vw, 2.75rem)` | Lora 500/600 | — |
| `h3` | `1.25rem` | Lora 600 | — |
| Lead | `1.125rem` → `1.25rem` | Geist | `leading-relaxed`, até ~60 caracteres por linha |
| Corpo | `1rem` | Geist | `leading-relaxed`, até ~70 caracteres por linha |
| Rótulo / sobrelinha | `0.75rem` | Geist 600 | `uppercase` com `tracking-[0.14em]` **ou** versalete, em cor de tinta (`--ink-muted`) ou `--gold-text`, **nunca o `--accent` atual** |
| Nota de rodapé / base legal | `0.8125rem` | Geist | `--ink-muted`, opcionalmente com numeração |

Regras:

- No máximo **duas** famílias. Nenhuma fonte nova sem motivo, até porque o CSP exige fontes locais.
- Itálico do Lora reservado para citações, epígrafes e a assinatura do Oficial. Nunca em parágrafo inteiro.
- Sem `font-bold` em Lora acima de 600. O peso pesado deixa o serif com cara de "blog".

---

## 2. Mapeamento de cores e tokens (OKLCH)

### Estratégia

- **Neutros** saem do matiz 20 (rosado) para o matiz **80–85** (papel e linho), com croma baixo.
- **Vinho** continua no matiz ~18, um pouco mais claro e menos saturado para o uso em texto, com uma variante profunda para superfícies grandes (hero e footer).
- **Ouro** se divide em dois tokens: um **ornamental** (filetes, numerais grandes, logo, botão sobre vinho) e um **de texto** (escurecido para passar em AA sobre papel).

### Paleta proposta

Valores calculados e com contraste conferido pela fórmula WCAG 2.1.

| Token novo | OKLCH | Hex aprox. | Papel |
|---|---|---|---|
| `--paper` | `oklch(0.975 0.012 85)` | `#faf6ee` | Fundo principal (papel) |
| `--linen` | `oklch(0.945 0.018 80)` | `#f3ece0` | Superfície alternada (seções, tabelas, inputs) |
| `--rule` | `oklch(0.86 0.025 80)` | `#dad0bf` | Filetes, bordas, divisores |
| `--ink` | `oklch(0.22 0.025 30)` | `#251614` | Texto principal (tinta sépia escura) |
| `--ink-muted` | `oklch(0.47 0.025 40)` | `#685650` | Texto secundário, notas, rótulos |
| `--wine` | `oklch(0.34 0.12 18)` | `#68101f` | Vinho institucional: links, botão primário, títulos de destaque |
| `--wine-deep` | `oklch(0.26 0.09 18)` | `#460913` | Superfícies grandes escuras (hero, footer) |
| `--gold` | `oklch(0.74 0.11 82)` | `#cda454` | Ouro velho **ornamental**: filetes, numerais ≥ 24px sobre vinho, selo, CTA sobre vinho |
| `--gold-text` | `oklch(0.50 0.09 75)` | `#815b1f` | Ouro **para texto** sobre papel ou linho (sobrelinhas, links secundários) |

### Contrastes verificados

| Combinação | Razão | Nível |
|---|---|---|
| `--ink` sobre `--paper` | 16,21 : 1 | AAA |
| `--ink-muted` sobre `--paper` | 6,41 : 1 | AA |
| `--ink-muted` sobre `--linen` | 5,87 : 1 | AA |
| `--gold-text` sobre `--paper` | 5,67 : 1 | AA |
| `--gold-text` sobre `--linen` | 5,18 : 1 | AA |
| `--wine` sobre `--paper` (e o inverso) | 11,59 : 1 | AAA |
| `--paper` sobre `--wine-deep` | 14,94 : 1 | AAA |
| `--gold` sobre `--wine-deep` (e o inverso) | 6,90 : 1 | AA |
| *Hoje:* `--accent` sobre branco | *2,50 : 1* | *❌ reprova* |

### Ligação com os tokens do shadcn (`globals.css`)

Os nomes que os componentes já usam ficam iguais e só mudam de valor. Assim o refactor é incremental.

| Token shadcn | Recebe |
|---|---|
| `--background` | `var(--paper)` |
| `--foreground`, `--card-foreground`, `--popover-foreground` | `var(--ink)` |
| `--card`, `--popover` | `var(--paper)`, ou `oklch(0.99 0.006 85)` se precisar de um degrau acima do papel |
| `--primary` | `var(--wine)` |
| `--primary-foreground` | `var(--paper)` |
| `--secondary`, `--muted` | `var(--linen)` |
| `--secondary-foreground` | `var(--wine)` |
| `--muted-foreground` | `var(--ink-muted)` |
| `--accent` | `var(--gold)`, **só para fundos e ornamentos** |
| `--accent-foreground` | `var(--wine-deep)` |
| `--border`, `--input` | `var(--rule)` |
| `--ring` | `var(--wine)` |
| `--radius` | `0.25rem` (documentos têm canto quase reto) |

Limpeza combinada:

- Remover `--chart-*`, `--sidebar-*` e os blocos `.dark` / `prefers-color-scheme: dark`, que nunca são aplicados. Se um tema escuro vier a ser desejado, ele será desenhado do zero com tinta e papel invertidos, não com os cinzas do shadcn.
- Expor no `@theme inline`: `--color-paper`, `--color-linen`, `--color-rule`, `--color-ink`, `--color-ink-muted`, `--color-wine`, `--color-wine-deep`, `--color-gold`, `--color-gold-text`.
- Alinhar `themeColor` (em `layout.tsx` e `manifest.ts`) ao hex de `--wine-deep` (`#460913`) e `background_color` ao de `--paper` (`#faf6ee`).
- **Regra de uso:** `text-accent` / `text-gold` em texto menor que 24px é proibido. Para texto dourado, use `text-gold-text`.

### Sombras e superfícies

- **Hierarquia de superfície:** `paper` → `linen` → filete `rule`. Sombra não é o recurso principal.
- **Elevação real** (menu mobile, popover): sombra dupla de baixa opacidade e matiz quente, por exemplo `0 1px 0 oklch(0.86 0.025 80), 0 12px 32px -12px oklch(0.26 0.09 18 / 0.18)`. Nada de `shadow-sm` cinza padrão.
- **Textura opcional:** um grão de papel em SVG inline (`data:` passa no CSP), com opacidade ≤ 4%, só em `paper`.

---

## 3. Direção por seção

Indicações de rumo, não especificação final.

| Seção | De (baseline) | Para |
|---|---|---|
| **Header** | Blur + botão vinho; CNS em subtítulo cinza | Barra em papel com filete inferior em `--rule`. Logo + nome em Lora. CNS em numerais tabulares. Nav inclui as páginas institucionais. CTA de WhatsApp visível também no celular (ícone + rótulo curto). |
| **Hero** | Foto genérica + overlay 85% + pill + 2 botões | Composição tipográfica em papel ou `wine-deep` sem foto falsa. Bloco de "cabeçalho de certidão": serventia, CNS, comarca, Oficial Registrador em itálico do Lora, com filete dourado. Um CTA primário (WhatsApp) e um secundário em texto (Portal ONR). Foto, só se for real da serventia ou da cidade. |
| **Serviços** | Grade 3×2 de cards iguais | **Índice numerado** (01–06) em lista de duas colunas com filetes, como um sumário. Cada linha leva título + descrição + "Solicitar no ONR ↗". O serviço mais procurado (certidão de matrícula) pode ganhar destaque tipográfico. |
| **Prazos** | 3 cards de "KPI" em fundo rosado | **Tabela de prazos** em `linen`, no estilo da tabela oficial: ato · prazo · observação, numerais tabulares em Lora, nota de rodapé com a base legal do prazo de prenotação. |
| **Contato** | 4 mini-cards com ícone + formulário em card | **Ficha cadastral**: lista de definição (`<dl>` com `<dt>`/`<dd>`) com endereço (link para mapa), horário, telefones (`tel:`), WhatsApp, e-mails (`mailto:`). Formulário com título próprio, campos sobre `linen` e filete inferior. |
| **Footer** | 4 colunas com links repetidos | Rodapé de documento: dados legais (nome, CNS, CNPJ, Oficial) em destaque. Links sem duplicatas. No celular, colunas compactadas (2 colunas ou acordeão). |
| **Institucionais** | "INSTITUCIONAL" dourado + texto corrido | Cabeçalho com trilha de navegação, `h1` em Lora, lead e "Fundamentação" em nota. FAQ como lista com filetes, sem cards. |
| **Loading / Erro / 404** | Spinner genérico; erro sem layout | Estados em papel com a tipografia da casa. O erro mantém header e footer. |

---

## 4. Checklist de aceitação visual

Uma seção só deixa de ser "genérica" e vira "premium de alto padrão" quando **todos** os itens obrigatórios passam. Use em cada PR de seção, com capturas de desktop (1440×900) e mobile (390×844) feitas com `agent-browser`.

### A. Integridade (obrigatório, bloqueia merge)

- [ ] Todos os itens de [`UI_BASELINE.md` §6](./UI_BASELINE.md#6-regras-intocáveis-negócio-jurídico-técnico) continuam presentes e funcionando.
- [ ] CNS 074864 visível no header; Oficial Registrador visível na home sem interação.
- [ ] Links do ONR, TJPE e WhatsApp com `target="_blank" rel="noopener noreferrer"` e indicação de link externo.
- [ ] As âncoras `#inicio`, `#servicos`, `#prazos` e `#contato` continuam funcionando no header e no footer.
- [ ] O formulário envia, mostra erro, mostra sucesso e reseta. Honeypot e `maxLength` sem mudança. `npm test` e `npm run lint` passam.
- [ ] `npm run build` passa. Nenhum asset externo novo (CSP).
- [ ] `robots` continua `noindex` até autorização formal.

### B. Acessibilidade (obrigatório)

- [ ] Todo texto passa em **WCAG AA**: 4,5 : 1 em geral; 3 : 1 para ≥ 24px, ou ≥ 18,66px em negrito. Nenhum `text-accent` em texto pequeno.
- [ ] O skip link funciona e é o primeiro foco. Existe um único `main#main` por página.
- [ ] Hierarquia de headings sem saltos (`h1` → `h2` → `h3`).
- [ ] Foco visível em todos os interativos, com o mesmo estilo em todo o site.
- [ ] Área de toque ≥ 44×44px no mobile.
- [ ] Animações respeitam `prefers-reduced-motion`.
- [ ] Marcação semântica correta para o tipo de dado: `<table>` com `<th scope>` para prazos, `<dl>` com `<dt>` para contato, `<ol>` para listas numeradas.

### C. Linguagem visual (obrigatório)

- [ ] **Sem a fórmula repetida:** nenhuma seção nova usa "etiqueta dourada + h2 + parágrafo + grade de cards".
- [ ] **Sem ícone em quadradinho** (`h-12 w-12 rounded-lg bg-*` com ícone lucide) como abertura de bloco.
- [ ] **Sem badge pill** (`rounded-full border bg-white/10`) para informação institucional.
- [ ] **Sem overlay de cor chapado** sobre foto genérica. Imagem só se for real e só se informar algo.
- [ ] **Sem `shadow-sm` cinza padrão:** a hierarquia vem de superfície (papel/linho) e filete.
- [ ] O fundo é papel quente (`--paper`), não `#fff`.
- [ ] O dourado aparece em no máximo **um** elemento ornamental por dobra (filete, numeral, selo, CTA).
- [ ] A forma segue o tipo do dado: prazo em tabela, contato em ficha, serviços em índice.

### D. Tipografia e ritmo (obrigatório)

- [ ] Só Lora e Geist. O Lora carrega todos os títulos e numerais de destaque.
- [ ] Linhas de texto corrido com até ~70 caracteres (`max-w-prose` ou equivalente).
- [ ] Numerais tabulares em CNS, CNPJ, telefones, prazos e CEP.
- [ ] A escala tem pelo menos **4 níveis** visíveis na página (display, h2, lead, corpo, nota), com contraste claro entre eles.
- [ ] O espaçamento vertical entre seções segue uma escala única definida em token, não valores avulsos.

### E. Conteúdo e tom (obrigatório)

- [ ] Nenhuma frase de marketing genérico ("soluções completas", "prontos para atender", "experiência").
- [ ] Os CTAs dizem a ação e o destino ("Solicitar no Portal ONR", "Agendar pelo WhatsApp").
- [ ] Dados de contato clicáveis (`tel:`, `mailto:`, `wa.me`, link de mapa).
- [ ] Sem links duplicados ou falsos (vários itens para a mesma âncora sem motivo).

### F. Teste do olhar (qualitativo, revisão humana)

- [ ] **Teste de remoção da marca:** sem o logo e o nome, a página ainda parece **um cartório**, e não "qualquer empresa de serviços"?
- [ ] **Teste da impressão:** impressa em A4, a página pareceria um documento oficial bem diagramado?
- [ ] **Teste dos 5 segundos (mobile):** um cidadão encontra em até 5 segundos *como falar com o cartório* e *quanto tempo leva uma certidão*?
- [ ] **Teste de comparação:** lado a lado com a captura do baseline, a diferença é óbvia para alguém leigo em design?
- [ ] **Teste da sobriedade:** nada na tela brilha, pisca ou "vende". O destaque vem de precisão e espaço.
