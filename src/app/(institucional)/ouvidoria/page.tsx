import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'
import { Filled } from '../_components/pending'

export const metadata: Metadata = {
  title: 'Ouvidoria',
  description:
    'Canal de ouvidoria do Cartório de Registro de Imóveis de Bom Conselho - PE para reclamações, sugestões e elogios.',
}

const { ouvidoria, oversight } = siteConfig

const externalLink = 'underline hover:text-foreground'

export default function OuvidoriaPage() {
  return (
    <article>
      <InstitutionalPageHeader title="Ouvidoria" />
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-ink-muted">
        <p>
          A ouvidoria é o canal destinado a receber reclamações, sugestões, elogios e denúncias
          relacionadas aos serviços prestados por esta serventia.
        </p>
        <p>
          Sua manifestação é tratada com sigilo e encaminhada diretamente{' '}
          {siteConfig.officer.toTitle} para análise e resposta.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Como registrar sua manifestação
        </h2>
        <ol className="mt-4 border-t border-rule">
          <li className="border-b border-rule py-4">
            <h3 className="font-medium text-foreground">Envio</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Escreva para{' '}
              <a className={externalLink} href={`mailto:${ouvidoria.email}?subject=Ouvidoria`}>
                {ouvidoria.email}
              </a>{' '}
              com o assunto &quot;Ouvidoria&quot;, seu nome, um meio de contato e o relato dos
              fatos.
            </p>
          </li>
          <li className="border-b border-rule py-4">
            <h3 className="font-medium text-foreground">Protocolo preliminar</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              A serventia responde ao seu contato com o número de protocolo preliminar da
              manifestação. Guarde esse número para acompanhar o andamento.
            </p>
          </li>
          <li className="border-b border-rule py-4">
            <h3 className="font-medium text-foreground">Análise e resposta</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Prazo estimado de resposta:{' '}
              <Filled value={ouvidoria.responseTime} pending="prazo definido pela serventia" />.
            </p>
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-foreground">Canais complementares</h2>
        <div className="mt-3 space-y-4 text-pretty text-sm leading-relaxed text-ink-muted">
          <p>
            Se preferir, você pode recorrer aos órgãos de orientação e fiscalização dos serviços
            delegados, conforme o{' '}
            <a className={externalLink} href={oversight.provimentoUrl} target="_blank" rel="noopener noreferrer">
              Provimento TJPE nº 04/2014<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
          <p>
            <strong className="font-medium text-foreground">
              Corregedoria Geral da Justiça de Pernambuco:
            </strong>{' '}
            recebe reclamações sobre cartórios presencialmente na Central de Atendimento, no Fórum
            Thomaz de Aquino, Av. Martins de Barros, 593, térreo, Santo Antônio, Recife/PE, ou por
            carta ao Corregedor Geral, no mesmo endereço, CEP 50010-230. Não recebe reclamações por
            e-mail ou telefone. Veja os{' '}
            <a className={externalLink} href={oversight.corregedoriaUrl} target="_blank" rel="noopener noreferrer">
              documentos necessários<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
          <p>
            <strong className="font-medium text-foreground">
              Ouvidoria do Tribunal de Justiça de Pernambuco:
            </strong>{' '}
            consulte os{' '}
            <a className={externalLink} href={oversight.ouvidoriaUrl} target="_blank" rel="noopener noreferrer">
              canais de atendimento<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
        </div>
      </section>
    </article>
  )
}
