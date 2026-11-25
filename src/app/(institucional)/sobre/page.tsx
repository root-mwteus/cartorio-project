import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { InstitutionalPageHeader } from '../_components/page-header'

export const metadata: Metadata = {
  title: 'Sobre o Cartório',
  description:
    `Conheça a ${siteConfig.name} (${siteConfig.tradeName}), sua natureza jurídica e sua missão institucional.`,
}

export default function SobrePage() {
  return (
    <article>
      <InstitutionalPageHeader title="Sobre o Cartório" />
      <div className="mt-10 max-w-[68ch] space-y-5 text-pretty leading-relaxed text-ink-muted [&>p:first-child]:font-serif [&>p:first-child]:text-2xl [&>p:first-child]:leading-snug [&>p:first-child]:text-foreground">
        <p>
          A {siteConfig.name}, também conhecida como {siteConfig.tradeName} (CNS {siteConfig.cns}), é uma
          serventia extrajudicial dotada de fé pública, exercida em caráter privado
          por delegação do Poder Público, nos termos do art. 236 da Constituição
          Federal e da Lei nº 8.935/1994 (Lei dos Cartórios).
        </p>
        <p>
          Sob a responsabilidade {siteConfig.officer.ofTitle} {siteConfig.officer.name}, a serventia é responsável pelo registro e pela guarda dos atos
          relativos aos imóveis situados no município de Bom Conselho, garantindo
          segurança jurídica às transações imobiliárias e publicidade aos direitos
          reais.
        </p>
        <p>
          A serventia acumula as atribuições delegadas de Registro de Imóveis, Tabelionato de Notas,
          Tabelionato de Protesto de Títulos, Registro de Títulos e Documentos e Registro Civil de
          Pessoas Jurídicas da {siteConfig.comarca}. O Registro de Imóveis conta com atendimento
          digital pelo Portal ONR; os demais serviços são prestados em sua sede física, na{' '}
          {siteConfig.address.street}, {siteConfig.address.neighborhood},{' '}
          {siteConfig.address.city}/{siteConfig.address.state}.
        </p>
        <p>
          Nosso compromisso é oferecer um atendimento ágil, transparente e
          acessível — tanto presencialmente quanto pelos canais digitais — para
          cidadãos, profissionais do direito e instituições que dependem dos
          nossos serviços.
        </p>
      </div>

      <section aria-labelledby="ficha-title" className="mt-12">
        <h2 id="ficha-title" className="font-serif text-2xl text-foreground">
          Ficha da serventia
        </h2>
        <dl className="mt-4 border-t-2 border-foreground">
          {[
            { term: 'Denominação', value: siteConfig.name },
            { term: 'Nome fantasia', value: siteConfig.tradeName },
            { term: siteConfig.officer.title, value: siteConfig.officer.name },
            {
              term: 'Substitutos',
              value: (
                <ul>
                  {siteConfig.substitutes.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              ),
            },
            { term: 'CNS', value: siteConfig.cns },
            { term: 'CNPJ', value: siteConfig.cnpj },
            { term: 'Comarca', value: siteConfig.comarca },
            {
              term: 'Endereço',
              value: `${siteConfig.address.street}, ${siteConfig.address.neighborhood}, ${siteConfig.address.city}/${siteConfig.address.state}, CEP ${siteConfig.address.postalCode}`,
            },
          ].map((row) => (
            <div key={row.term} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
              <dt className="text-ink-muted">{row.term}</dt>
              <dd className="tabular-nums text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  )
}
