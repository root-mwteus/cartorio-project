import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'
import { Filled } from '../_components/pending'

export const metadata: Metadata = {
  title: 'Aviso de Privacidade',
  description:
    `Como a ${siteConfig.name} trata dados pessoais, conforme a LGPD e o Provimento CNJ nº 134/2022.`,
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

const operators = [
  ['Vercel', 'hospedagem do site e métricas agregadas de acesso'],
  ['Supabase', 'armazenamento das mensagens do formulário'],
  ['Resend', 'envio da notificação de nova mensagem à serventia'],
  ['Upstash', 'controle do limite de envios, a partir do endereço IP'],
]

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
        Este aviso explica como esta serventia trata dados pessoais neste site, em atenção à Lei
        nº 13.709/2018 (LGPD) e ao Provimento nº 134/2022 da Corregedoria Nacional de Justiça.
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
            <dt className="inline font-medium text-foreground">Endereço: </dt>
            <dd className="inline">
              <Filled value={privacy.encarregado.address} pending="endereço do Encarregado" />
            </dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">E-mail: </dt>
            <dd className="inline">
              <Filled value={privacy.encarregado.email} pending="e-mail do Encarregado" />
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="Quais dados este site coleta">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="font-medium text-foreground">Formulário de contato:</strong> nome,
            e-mail, assunto e mensagem que você escrever.
          </li>
          <li>
            <strong className="font-medium text-foreground">Endereço IP:</strong> usado ao enviar o
            formulário, para limitar envios abusivos.
          </li>
          <li>
            <strong className="font-medium text-foreground">Navegação:</strong> métricas agregadas
            de acesso. O site não usa cookies de publicidade.
          </li>
        </ul>
        <p>
          Evite incluir na mensagem dados pessoais que não sejam necessários para o atendimento.
        </p>
      </Section>

      <Section title="Para que usamos e com qual fundamento">
        <p>
          Usamos os dados para responder à sua solicitação, prestar o atendimento e proteger o
          site contra abusos. O tratamento atende à finalidade do serviço público delegado, na
          persecução do interesse público (Provimento nº 134/2022, art. 2º; LGPD, art. 23).
        </p>
      </Section>

      <Section title="Com quem os dados são compartilhados">
        <p>Estes fornecedores tratam dados em nome da serventia, e podem operar fora do Brasil:</p>
        <ul className="list-disc space-y-1 pl-5">
          {operators.map(([name, purpose]) => (
            <li key={name}>
              <strong className="font-medium text-foreground">{name}:</strong> {purpose}.
            </li>
          ))}
        </ul>
        <p>
          O Portal Integrado do ONR, o WhatsApp e outros serviços externos têm regras de privacidade
          próprias. Também pode haver compartilhamento quando exigido por lei ou por autoridade
          competente.
        </p>
      </Section>

      <Section title="Por quanto tempo guardamos">
        <p>
          Mensagens do formulário:{' '}
          <Filled value={privacy.retention} pending="prazo de conservação definido pela serventia" />
          .
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
          resposta: <Filled value={privacy.responseTime} pending="prazo definido pela serventia" />.
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
