'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deadlineText, legalDeadlines } from '@/lib/legal-deadlines'
import { siteConfig } from '@/lib/site-config'

type Need = {
  id: string
  need: string
  act: string
  description: string
  deadline: string
  basis?: string
  actionLabel: string
  actionUrl: string
}

// Prazos e bases legais iguais aos de #servicos e #prazos.
const needs: Need[] = [
  {
    id: 'titularidade',
    need: 'Comprovar de quem é um imóvel',
    act: 'Certidão de Matrícula',
    description:
      'Certidão com validade jurídica, que comprova a situação atualizada e a titularidade do imóvel. Tenha em mãos o número da matrícula.',
    deadline: deadlineText(legalDeadlines.certidaoMatricula),
    basis: legalDeadlines.certidaoMatricula.basis,
    actionLabel: 'Solicitar no Portal ONR',
    actionUrl: siteConfig.onrUrl,
  },
  {
    id: 'situacao',
    need: 'Saber a situação jurídica atual',
    act: 'Certidão de Situação Jurídica',
    description: 'Certidão da situação jurídica atualizada do imóvel.',
    deadline: deadlineText(legalDeadlines.situacaoJuridica),
    basis: legalDeadlines.situacaoJuridica.basis,
    actionLabel: 'Solicitar no Portal ONR',
    actionUrl: siteConfig.onrUrl,
  },
  {
    id: 'consulta',
    need: 'Ver a matrícula sem sair de casa',
    act: 'Matrícula On-line',
    description: 'Visualize a imagem da matrícula idêntica à do cartório, sem se deslocar até a serventia.',
    deadline: 'Sob consulta',
    actionLabel: 'Consultar no Portal ONR',
    actionUrl: siteConfig.onrUrl,
  },
  {
    id: 'bens',
    need: 'Descobrir imóveis em nome de alguém',
    act: 'Pesquisa de Bens',
    description: 'Busca por CPF ou CNPJ de imóveis registrados em nome de pessoas físicas ou jurídicas.',
    deadline: 'Sob consulta',
    actionLabel: 'Pesquisar no Portal ONR',
    actionUrl: siteConfig.onrUrl,
  },
  {
    id: 'registro',
    need: 'Registrar compra, venda ou garantia',
    act: 'Registro e E-Protocolo',
    description:
      'Protocolo eletrônico do título. São 5 dias para títulos simples e sem exigências, e 10 dias nos demais casos.',
    deadline: deadlineText(legalDeadlines.registroTitulos),
    basis: legalDeadlines.registroTitulos.basis,
    actionLabel: 'Protocolar no Portal ONR',
    actionUrl: siteConfig.onrUrl,
  },
  {
    id: 'assinatura',
    need: 'Assinar um documento digitalmente',
    act: 'Portal de Assinaturas e Digitalizações',
    description:
      'Ferramenta gratuita do Registro de Imóveis do Brasil para assinar documentos digitalmente.',
    deadline: 'Sob consulta',
    actionLabel: 'Acessar o Portal de Assinaturas',
    actionUrl: siteConfig.signaturePortalUrl,
  },
]

export function TriagemSection() {
  const [selectedId, setSelectedId] = useState(needs[0].id)
  const selected = needs.find((item) => item.id === selectedId) ?? needs[0]

  return (
    <section id="triagem" aria-labelledby="triagem-title" className="bg-wine-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        <fieldset className="min-w-0 lg:col-span-6">
          <legend className="contents">
            <h2
              id="triagem-title"
              className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.015em]"
            >
              O que você precisa fazer?
            </h2>
          </legend>

          <div className="mt-8 border-t border-paper/25">
            {needs.map((item) => (
              <label
                key={item.id}
                className="flex min-h-14 cursor-pointer items-center border-b border-paper/15 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold"
              >
                <input
                  type="radio"
                  name="necessidade"
                  value={item.id}
                  checked={item.id === selectedId}
                  onChange={() => setSelectedId(item.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="h-px w-0 shrink-0 bg-gold transition-[width,margin] duration-300 ease-out peer-checked:mr-4 peer-checked:w-8"
                />
                <span className="font-serif text-xl text-paper/75 transition-colors hover:text-paper peer-checked:italic peer-checked:text-paper sm:text-2xl">
                  {item.need}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <div
            aria-live="polite"
            className="flex flex-col border-t-4 border-double border-gold bg-paper p-6 text-foreground sm:p-10 lg:min-h-[29rem]"
          >
            <div key={selected.id} className="ficha-in flex flex-1 flex-col">
              <p className="text-sm text-ink-muted">Ato indicado</p>
              <h3 className="mt-1 text-balance font-serif text-3xl font-medium leading-tight">
                {selected.act}
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-ink-muted">{selected.description}</p>

              <dl className="mt-6 border-t border-rule">
                <div className="flex items-baseline justify-between gap-6 border-b border-rule py-3">
                  <dt className="text-sm text-ink-muted">Prazo</dt>
                  <dd className="text-right font-serif text-2xl font-medium tabular-nums">
                    {selected.deadline}
                  </dd>
                </div>
                {selected.basis && (
                  <div className="flex items-baseline justify-between gap-6 border-b border-rule py-3">
                    <dt className="text-sm text-ink-muted">Base legal</dt>
                    <dd className="text-right text-sm font-medium">{selected.basis}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={
                    <a href={selected.actionUrl} target="_blank" rel="noopener noreferrer">
                      {selected.actionLabel}
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  }
                />
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start whitespace-nowrap py-2 text-sm font-medium text-primary underline decoration-gold underline-offset-4 hover:decoration-primary sm:self-auto"
                >
                  Tirar dúvida no WhatsApp
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
