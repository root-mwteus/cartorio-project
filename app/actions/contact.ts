'use server'

import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const subject = formData.get('subject')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !subject || !message) {
    return { status: 'error', message: 'Preencha todos os campos.' }
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
