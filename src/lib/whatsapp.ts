import { siteConfig } from './site-config'

// Abre a conversa com a mensagem já escrita: o cidadão só completa e envia.
export const whatsappLink = (message: string) =>
  `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`
