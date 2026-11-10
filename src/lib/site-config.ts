const generalEmail = 'cart1bcab@gmail.com'

const address = {
  street: 'Av. Ten. Raul de Holanda Cavalcante, 108',
  neighborhood: 'Centro',
  city: 'Bom Conselho',
  state: 'PE',
  postalCode: '55330-000',
}

const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city}/${address.state}, CEP ${address.postalCode}`

// Fonte única dos dados da serventia. Dados institucionais só mudam aqui.
export const siteConfig = {
  // Defina NEXT_PUBLIC_SITE_URL quando o domínio próprio for registrado.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cartorio-project-topaz.vercel.app',
  name: 'Serventia Notarial e Registral de Bom Conselho',
  nameLines: ['Serventia Notarial', 'e Registral de', 'Bom Conselho'],
  tradeName: 'Cartório Algacyr Barros',
  cns: '074864',
  cnpj: '32.146.479/0001-65',
  comarca: 'Comarca de Bom Conselho — PE',
  officer: {
    name: 'Algacyr Fernando Vieira de Barros',
    title: 'Oficial Registrador e Tabelião Titular',
    // Formas com artigo, para o texto concordar se o cargo mudar de gênero.
    ofTitle: 'do Oficial Registrador e Tabelião Titular',
    toTitle: 'ao Oficial Registrador e Tabelião Titular',
  },
  whatsappUrl: 'https://wa.me/5587981198252',
  onrUrl: 'https://www.registrodeimoveis.org.br/bomconselho',
  // Ato TJPE nº 1556/2025: tabela do exercício de 2026.
  emolumentosTableUrl:
    'https://portal.tjpe.jus.br/documents/d/portal/ato-1556-tab-emolumentos-dj390-2025-pdf',
  signaturePortalUrl: 'https://www.registrodeimoveis.org.br/servicos-interno/assinaturas-e-digitalizacoes',
  whatsappDisplay: '(87) 98119-8252',
  phoneDisplay: '(87) 3771-1740',
  email: {
    general: generalEmail,
    notes: 'cart2oficionotasbcab@hotmail.com',
  },
  address,
  hours: {
    short: 'Seg. a sex., das 08h às 17h',
    label: 'Segunda a sexta-feira, das 08h às 17h',
    exceptions: 'Exceto feriados',
    sentence: 'de segunda a sexta-feira, das 08h às 17h, exceto feriados',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  // Canal provisório indicado pela serventia.
  ouvidoria: {
    email: generalEmail,
    responseTime: '15 dias úteis' as string | null,
  },
  oversight: {
    provimentoUrl:
      'https://portal.tjpe.jus.br/c/document_library/get_file?uuid=d40ef27b-907a-c2f0-ccf3-a3e082dcd030&groupId=29010',
    corregedoriaUrl: 'https://portal.tjpe.jus.br/web/corregedoria/perguntas-frequentes',
    ouvidoriaUrl: 'https://portal.tjpe.jus.br/web/ouvidoria',
  },
  // Provimento CNJ 134/2022, arts. 17 e 18. Campo null aparece marcado como pendente em /privacidade.
  privacy: {
    // Encarregado terceirizado (Provimento 134, art. 10, I). Razão social e endereço
    // conforme o cadastro do CNPJ na Receita Federal.
    encarregado: {
      name: 'DPONet (DPONET DESENVOLVIMENTO DE SISTEMAS E CONSULTORIA EM SEGURANÇA DA INFORMAÇÃO LTDA.)',
      cnpj: '36.487.128/0001-79',
      responsible: 'Renata Mercadante (suplente: Natália Caroline Batista)',
      address:
        'Avenida Perimetral, s/n, Lote 1A, Bloco 1, Térreo, Distrito Industrial Luiz Pedro Caffer, Pompéia/SP, CEP 17586-220',
      email: 'dpo@dponet.com.br',
    },
    // Art. 17: o canal do titular pode ser o do próprio Encarregado, se terceirizado.
    requestChannel: `dpo@dponet.com.br ou presencialmente na serventia, em ${fullAddress}`,
    responseTime: '15 dias' as string | null,
    updatedAt: 'Novembro de 2026' as string | null,
  },
}
