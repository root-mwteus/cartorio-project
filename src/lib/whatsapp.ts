import { siteConfig } from './site-config'

// Abre a conversa com a mensagem já escrita: o cidadão só completa e envia.
export const generalMessage = 'Olá! Tenho uma dúvida sobre os serviços do cartório.'

export const whatsappLink = (message: string) =>
  `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`

// Assuntos da landing. Toda ação do site termina numa destas mensagens.
export const topics = [
  {
    id: 'certidao',
    title: 'Certidão de matrícula',
    short: 'Certidão',
    message: 'Olá! Gostaria de solicitar uma certidão de matrícula. Dados do imóvel: ',
  },
  {
    id: 'registro',
    title: 'Registro de escritura ou contrato',
    short: 'Registro',
    message: 'Olá! Gostaria de orientação para registrar uma escritura ou contrato.',
  },
  {
    id: 'documentos',
    title: 'Documentos necessários',
    short: 'Documentos',
    message: 'Olá! Quais documentos são necessários para ',
  },
  {
    id: 'valores',
    title: 'Valor de um ato',
    short: 'Valores',
    message: 'Olá! Gostaria de saber o valor dos emolumentos para ',
  },
  {
    id: 'balcao',
    title: 'Atendimento no balcão',
    short: 'Balcão',
    message: 'Olá! Gostaria de combinar um atendimento presencial na serventia para ',
  },
  {
    id: 'duvida',
    title: 'Outras dúvidas',
    short: 'Dúvidas',
    message: generalMessage,
  },
] as const

export type Topic = (typeof topics)[number]

export const topicLink = (id: Topic['id']) =>
  whatsappLink(topics.find((topic) => topic.id === id)?.message ?? generalMessage)
