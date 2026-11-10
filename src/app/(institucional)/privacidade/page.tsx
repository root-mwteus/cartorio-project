import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'
import { Filled } from '../_components/pending'

export const metadata: Metadata = {
  title: 'Aviso de Privacidade',
  description:
    `Como a ${siteConfig.name} trata dados pessoais na navegação deste site, conforme a LGPD e o Provimento CNJ nº 134/2022.`,
}

const { address, privacy, officer } = siteConfig

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-pretty leading-relaxed text-ink-muted">{children}</div>
    </section>
  )
}

const rights = [
  'confirmação da existência de tratamento e acesso aos dados;',
  'correção de dados incompletos, inexatos ou desatualizados;',
  'anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;',
  'portabilidade, nos termos da regulamentação;',
  'informação sobre com quem os dados foram compartilhados;',
  'revogação do consentimento, quando for essa a base do tratamento;',
  'petição à Autoridade Nacional de Proteção de Dados (ANPD).',
]

export default function PrivacidadePage() {
  return (
    <article>
      <InstitutionalPageHeader title="Aviso de Privacidade" />
      <p className="mt-8 text-pretty leading-relaxed text-ink-muted">
        Este aviso explica como esta serventia trata dados pessoais na navegação deste site, em
        atenção à Lei nº 13.709/2018 (LGPD) e ao Provimento nº 134/2022 da Corregedoria Nacional
        de Justiça. O site não tem formulários e não pede dados pessoais.
      </p>

      <Section title="Quem é o responsável pelos seus dados">
        <p>
          O controlador é o responsável pela delegação (Provimento nº 134/2022, art. 4º):{' '}
          {officer.name}, {officer.title} da {siteConfig.name} ({siteConfig.tradeName}), CNS {siteConfig.cns}, CNPJ{' '}
          {siteConfig.cnpj}, {address.street}, {address.neighborhood}, {address.city}/
          {address.state}, CEP {address.postalCode}.
        </p>
      </Section>

      <Section title="Encarregado pelo tratamento de dados">
        <dl className="space-y-1">
          <div>
            <dt className="inline font-medium text-foreground">Nome: </dt>
            <dd className="inline">
              <Filled value={privacy.encarregado.name} pending="nome do Encarregado" />
            </dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">CNPJ: </dt>
            <dd className="inline tabular-nums">{privacy.encarregado.cnpj}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">Responsável: </dt>
            <dd className="inline">{privacy.encarregado.responsible}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">Endereço: </dt>
            <dd className="inline">
              <Filled value={privacy.encarregado.address} pending="endereço do Encarregado" />
            </dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">E-mail: </dt>
            <dd className="inline">
              <a className="underline hover:text-foreground" href={`mailto:${privacy.encarregado.email}`}>
                {privacy.encarregado.email}
              </a>
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="O que é registrado quando você navega">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="font-medium text-foreground">Dados técnicos de acesso:</strong>{' '}
            endereço IP, navegador e página visitada, registrados pela hospedagem por tempo limitado
            para manter o site seguro e funcionando.
          </li>
          <li>
            <strong className="font-medium text-foreground">Métricas de acesso:</strong> números
            agregados de visitas e páginas mais vistas, sem cookies.
          </li>
        </ul>
        <p>O site não usa cookies de publicidade nem de rastreamento.</p>
      </Section>

      <Section title="Para que usamos e com qual fundamento">
        <p>
          Usamos esses dados para manter o site seguro, corrigir falhas e entender, de forma
          agregada, como ele é usado. O tratamento atende à finalidade do serviço público delegado,
          na persecução do interesse público (Provimento nº 134/2022, art. 2º; LGPD, art. 23).
        </p>
      </Section>

      <Section title="Com quem os dados são compartilhados">
        <p>
          A Vercel hospeda o site e gera as métricas de acesso em nome da serventia, e pode operar
          fora do Brasil. Também pode haver compartilhamento quando exigido por lei ou por autoridade
          competente.
        </p>
      </Section>

      <Section title="Quando você entra em contato">
        <p>
          Os botões de WhatsApp, telefone e e-mail levam você aos canais da serventia, fora deste
          site. O que você enviar por esses canais é tratado pela serventia para responder ao seu
          atendimento.
        </p>
        <p>
          O WhatsApp, o seu provedor de e-mail, o Portal Integrado do ONR, o Tribunal de Justiça de
          Pernambuco e o Google Maps têm regras de privacidade próprias.
        </p>
      </Section>

      <Section title="Registros públicos">
        <p>
          Os dados dos atos registrais seguem a legislação própria, como a Lei nº 6.015/1973. O
          exercício dos direitos previstos na LGPD não autoriza alterar ou eliminar assentos fora
          das hipóteses legais.
        </p>
      </Section>

      <Section title="Seus direitos">
        <p>Nos termos do art. 18 da LGPD, você pode solicitar:</p>
        <ul className="list-disc space-y-1 pl-5">
          {rights.map((right) => (
            <li key={right}>{right}</li>
          ))}
        </ul>
      </Section>

      <Section title="Como exercer seus direitos">
        <p>
          Canal de atendimento ao titular:{' '}
          <Filled value={privacy.requestChannel} pending="canal eletrônico específico" />. Prazo de
          resposta: <Filled value={privacy.responseTime} pending="prazo definido pela serventia" />, contados do requerimento (LGPD, art. 19, II).
        </p>
        <p>
          Reclamações sobre o atendimento também podem ser feitas pela{' '}
          <Link className="underline hover:text-foreground" href="/ouvidoria">
            Ouvidoria
          </Link>
          .
        </p>
      </Section>

      <p className="mt-10 border-t border-rule pt-4 text-sm text-ink-muted">
        Última atualização: <Filled value={privacy.updatedAt} pending="data de aprovação" />.
      </p>
    </article>
  )
}
