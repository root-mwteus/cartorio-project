'use server'

import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MAX_LENGTH = {
  name: 100,
  email: 254,
  subject: 150,
  message: 2000,
}

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: campo invisível para usuários reais. Se vier preenchido, é bot.
  const honeypot = formData.get('website')?.toString().trim()
  if (honeypot) {
    return { status: 'success' }
  }

  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const subject = formData.get('subject')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !subject || !message) {
    return { status: 'error', message: 'Preencha todos os campos.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: 'error', message: 'Informe um e-mail válido.' }
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    subject.length > MAX_LENGTH.subject ||
    message.length > MAX_LENGTH.message
  ) {
    return { status: 'error', message: 'Um dos campos excede o tamanho máximo permitido.' }
  }

  const supabase = createSupabaseServerClient()
  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert({ name, email, subject, message })

  if (dbError) {
    console.error('Erro ao salvar no Supabase:', dbError)
    return { status: 'error', message: 'Não foi possível enviar sua mensagem. Tente novamente.' }
  }

  try {
    await resend.emails.send({
      from: 'Cartório de Bom Conselho <onboarding@resend.dev>',
      to: process.env.CONTACT_NOTIFICATION_EMAIL!,
      replyTo: email,
      subject: `Novo contato: ${subject}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    })
  } catch (emailError) {
    console.error('Erro ao enviar e-mail:', emailError)
  }

  return { status: 'success' }
}
