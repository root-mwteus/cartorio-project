import type { Metadata } from 'next'
import { InstitutionalPageHeader } from '../_components/page-header'

export const metadata: Metadata = {
  title: 'Sobre o Cartório',
  description:
    'Conheça o Cartório de Registro de Imóveis de Bom Conselho - PE, sua natureza jurídica e sua missão institucional.',
}

export default function SobrePage() {
  return (
    <article>
      <InstitutionalPageHeader title="Sobre o Cartório" />
      <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
        <p>
          O Cartório de Registro de Imóveis de Bom Conselho — PE (CNS 074864) é uma
          serventia extrajudicial dotada de fé pública, exercida em caráter privado
          por delegação do Poder Público, nos termos do art. 236 da Constituição
          Federal e da Lei nº 8.935/1994 (Lei dos Cartórios).
        </p>
        <p>
          Sob a responsabilidade do Oficial Registrador Algacyr Fernando Vieira de
          Barros, a serventia é responsável pelo registro e pela guarda dos atos
          relativos aos imóveis situados no município de Bom Conselho, garantindo
          segurança jurídica às transações imobiliárias e publicidade aos direitos
          reais.
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
