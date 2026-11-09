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
    </article>
  )
}
