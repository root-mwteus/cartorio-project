const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MAX_LENGTH = {
  name: 100,
  email: 254,
  subject: 150,
  message: 2000,
} as const

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export type ValidationResult =
  | { valid: true; isBot: false; data: ContactFormData }
  | { valid: true; isBot: true }
  | { valid: false; message: string }

export function validateContactForm(formData: FormData): ValidationResult {
  // Honeypot: campo invisível para usuários reais. Se vier preenchido, é bot.
  const honeypot = formData.get('website')?.toString().trim()
  if (honeypot) {
    return { valid: true, isBot: true }
  }

  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const subject = formData.get('subject')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !subject || !message) {
    return { valid: false, message: 'Preencha todos os campos.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: 'Informe um e-mail válido.' }
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    subject.length > MAX_LENGTH.subject ||
    message.length > MAX_LENGTH.message
  ) {
    return { valid: false, message: 'Um dos campos excede o tamanho máximo permitido.' }
  }

  return { valid: true, isBot: false, data: { name, email, subject, message } }
}
