import { deadlineText, legalDeadlines } from './legal-deadlines'

export const specialties = {
  notas: 'Tabelionato de Notas',
  imoveis: 'Registro de Imóveis',
  rtdpj: 'Títulos e Documentos e Pessoas Jurídicas',
  protesto: 'Protesto de Títulos',
} as const

export type Specialty = keyof typeof specialties

export type ChecklistGroup = {
  title: string
  items: { text: string; detail?: string }[]
  notes?: string[]
}

export type Checklist = {
  slug: string
  specialty: Specialty
  title: string
  // Como o cidadão descreve o que quer fazer, para a home.
  situation: string
  forWhom: string
  basis: string
  groups: ChecklistGroup[]
  tips?: string[]
  whatsapp: string
  // Rascunho redigido a partir da lei. Só vira false depois da revisão da serventia.
  draft: boolean
}

// Fonte única: a página de cada ato e a versão para imprimir/salvar em PDF leem daqui.
export const checklists: Checklist[] = [
  {
    slug: 'compra-e-venda-imovel-urbano',
    specialty: 'notas',
    title: 'Escritura de compra e venda de imóvel urbano',
    situation: 'Comprar ou vender um imóvel',
    forWhom: 'Para quem vai comprar ou vender casa, apartamento ou terreno na cidade.',
    basis: 'Código Civil, arts. 481 e seguintes, 496 e 1.647 · Lei nº 7.433/1985 · Decreto nº 93.240/1986',
    groups: [
      {
        title: 'Quem vende e quem compra (pessoa física)',
        items: [
          { text: 'RG e CPF ou CNH', detail: 'também do cônjuge ou companheiro, se houver' },
          { text: 'Certidão de nascimento ou de casamento', detail: 'com o pacto antenupcial, se houver' },
          { text: 'Profissão, endereço e e-mail', detail: 'também do cônjuge ou companheiro' },
        ],
        notes: [
          'Quem vende e é casado precisa da assinatura do cônjuge, salvo no regime de separação absoluta de bens.',
          'Solteiros, divorciados e viúvos informam se vivem em união estável.',
        ],
      },
      {
        title: 'Empresa (pessoa jurídica)',
        items: [
          { text: 'Contrato social ou estatuto e a última alteração' },
          { text: 'Certidão simplificada da Junta Comercial', detail: 'atualizada' },
          { text: 'RG e CPF ou CNH de quem assina pela empresa' },
        ],
      },
      {
        title: 'Sobre o imóvel',
        items: [
          { text: 'Certidão de inteiro teor da matrícula, com ônus reais', detail: 'emitida há no máximo 30 dias' },
          { text: 'Número de inscrição do imóvel na Prefeitura', detail: 'consta no carnê do IPTU' },
          { text: 'Certidão negativa de débitos de IPTU' },
        ],
      },
      {
        title: 'Casos especiais',
        items: [
          {
            text: 'Venda de pais ou avós para filho ou neto',
            detail: 'os demais descendentes e o cônjuge de quem vende concordam com a venda',
          },
          { text: 'Venda por procuração', detail: 'certidão atualizada da procuração, se for de outro cartório' },
        ],
      },
      {
        title: 'Impostos e pagamento',
        items: [
          { text: 'Guia do ITBI paga', detail: 'emitida pela Prefeitura do município do imóvel' },
          { text: 'Forma de pagamento do preço', detail: 'valor, data e meio de pagamento' },
        ],
      },
    ],
    tips: [
      'A escritura também pode ser feita on-line, por videoconferência, pelo e-Notariado. Pergunte à equipe.',
      'Depois de assinada, a escritura precisa ser registrada no Registro de Imóveis para transferir a propriedade.',
    ],
    whatsapp: 'Olá! Vou fazer uma escritura de compra e venda de imóvel urbano e quero enviar meus documentos para conferência.',
    draft: true,
  },
  {
    slug: 'procuracao-publica',
    specialty: 'notas',
    title: 'Procuração pública',
    situation: 'Fazer uma procuração',
    forWhom: 'Para quem precisa autorizar outra pessoa a agir em seu nome.',
    basis: 'Código Civil, arts. 653 a 692',
    groups: [
      {
        title: 'Quem dá a procuração (outorgante)',
        items: [
          { text: 'RG e CPF ou CNH' },
          { text: 'Certidão de nascimento ou de casamento' },
          { text: 'Profissão, endereço e e-mail' },
        ],
        notes: ['A procuração é assinada pessoalmente por quem a dá, no cartório ou por videoconferência.'],
      },
      {
        title: 'Quem recebe a procuração (procurador)',
        items: [
          { text: 'Nome completo, CPF e RG' },
          { text: 'Estado civil, profissão e endereço' },
        ],
        notes: ['O procurador não precisa comparecer.'],
      },
      {
        title: 'Sobre os poderes',
        items: [
          { text: 'O que o procurador poderá fazer', detail: 'por exemplo, vender um imóvel, receber valores ou representar em um órgão' },
          { text: 'Dados do bem envolvido, se houver', detail: 'número da matrícula ou endereço do imóvel; placa e Renavam do veículo' },
        ],
        notes: [
          'Procuração para vender imóvel de pessoa casada exige também a assinatura do cônjuge, salvo no regime de separação absoluta de bens.',
        ],
      },
      {
        title: 'Empresa (pessoa jurídica)',
        items: [
          { text: 'Contrato social ou estatuto e a última alteração' },
          { text: 'Certidão simplificada da Junta Comercial', detail: 'atualizada' },
          { text: 'RG e CPF ou CNH de quem assina pela empresa' },
        ],
      },
    ],
    whatsapp: 'Olá! Preciso fazer uma procuração pública e quero enviar meus documentos para conferência.',
    draft: true,
  },
  {
    slug: 'registro-de-escritura',
    specialty: 'imoveis',
    title: 'Registro de escritura de compra e venda',
    situation: 'Registrar uma escritura',
    forWhom: 'Para quem já tem a escritura assinada e precisa registrá-la para se tornar dono do imóvel.',
    basis: `Lei nº 6.015/1973, arts. 167, 176 e 182 a 205 · ${legalDeadlines.registroTitulos.basis}`,
    groups: [
      {
        title: 'O título',
        items: [
          { text: 'Traslado ou certidão da escritura pública', detail: 'original em papel ou documento eletrônico assinado' },
        ],
        notes: ['Escrituras eletrônicas são enviadas pelo E-Protocolo do Portal ONR.'],
      },
      {
        title: 'Impostos',
        items: [{ text: 'Comprovante de pagamento do ITBI', detail: 'se não estiver transcrito na escritura' }],
      },
      {
        title: 'Imóvel rural',
        items: [
          { text: 'CCIR quitado', detail: 'Certificado de Cadastro de Imóvel Rural, do Incra' },
          { text: 'Certidão negativa de débitos do ITR', detail: 'Receita Federal' },
          { text: 'Recibo de inscrição no CAR', detail: 'Cadastro Ambiental Rural' },
        ],
        notes: ['Conforme a área, pode ser exigido o georreferenciamento certificado pelo Incra.'],
      },
    ],
    tips: [
      `Prazo de registro: ${deadlineText(legalDeadlines.registroTitulos)}, contados do protocolo.`,
      `Se houver exigência, cumpra-a dentro de ${deadlineText(legalDeadlines.prenotacao)}; depois disso, o protocolo perde a validade.`,
    ],
    whatsapp: 'Olá! Tenho uma escritura de compra e venda para registrar e quero saber se meus documentos estão completos.',
    draft: true,
  },
]

export const findChecklist = (slug: string) => checklists.find((item) => item.slug === slug)
