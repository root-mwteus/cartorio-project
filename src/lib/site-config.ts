// Fonte única dos dados da serventia. Dados institucionais só mudam aqui.
export const siteConfig = {
  url: 'https://cartorio-project-topaz.vercel.app',
  name: 'Cartório de Registro de Imóveis de Bom Conselho',
  // Aguardando confirmação da serventia: cns, comarca e officer.
  cns: '074864',
  cnpj: '32.146.479/0001-65',
  comarca: 'Comarca de Bom Conselho — PE',
  officer: {
    name: 'Algacyr Fernando Vieira de Barros',
    title: 'Oficial Registrador',
    // Formas com artigo, para o texto concordar se o cargo mudar de gênero.
    ofTitle: 'do Oficial Registrador',
    toTitle: 'ao Oficial Registrador',
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
    general: 'cart1bcab@gmail.com',
    support: 'suportecartoriobc@gmail.com',
  },
  address: {
    street: 'Av. Ten. Raul de Holanda Cavalcante, 108',
    neighborhood: 'Centro',
    city: 'Bom Conselho',
    state: 'PE',
    postalCode: '55330-000',
  },
  hours: {
    short: 'Seg. a sex., 08h às 17h',
    label: 'Segunda a sexta-feira, das 08h às 17h',
    exceptions: 'Exceto feriados',
    sentence: 'de segunda a sexta-feira, das 08h às 17h, exceto feriados',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  // Aguardando a serventia: e-mail próprio da Ouvidoria e prazo de resposta.
  ouvidoria: {
    email: 'suportecartoriobc@gmail.com',
    responseTime: null as string | null,
  },
  oversight: {
    provimentoUrl:
      'https://portal.tjpe.jus.br/c/document_library/get_file?uuid=d40ef27b-907a-c2f0-ccf3-a3e082dcd030&groupId=29010',
    corregedoriaUrl: 'https://portal.tjpe.jus.br/web/corregedoria/perguntas-frequentes',
    ouvidoriaUrl: 'https://portal.tjpe.jus.br/web/ouvidoria',
  },
  // Provimento CNJ 134/2022, arts. 17 e 18. Enquanto null, /privacidade mostra
  // o campo como pendente; preencher antes da publicação oficial.
  privacy: {
    encarregado: {
      name: null as string | null,
      address: null as string | null,
      email: null as string | null,
      phone: null as string | null,
    },
    requestChannel: null as string | null,
    responseTime: null as string | null,
    retention: null as string | null,
    updatedAt: null as string | null,
  },
}
