'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase'
import { contactFormRateLimit } from '@/lib/rate-limit'
import { validateContactForm } from '@/lib/validate-contact-form'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  const { success: withinRateLimit } = await contactFormRateLimit.limit(ip)
  if (!withinRateLimit) {
    return {
      status: 'error',
      message: 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
    }
  }

  const result = validateContactForm(formData)
  if (!result.valid) {
    return { status: 'error', message: result.message }
  }
  if (result.isBot) {
    return { status: 'success' }
  }

  const { name, email, subject, message } = result.data

  const supabase = createSupabaseServerClient()
  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert({ name, email, subject, message })

  if (dbError) {
    console.error('Erro ao salvar no Supabase:', dbError)
    return { status: 'error', message: 'Não foi possível enviar sua mensagem. Tente novamente.' }
  }

  try {
    // onboarding@resend.dev é o domínio sandbox do Resend: só entrega
    // e-mail para o endereço dono da conta Resend, nenhum outro. Pra
    // notificar um e-mail diferente (ex: o e-mail real do cartório),
    // é preciso verificar um domínio próprio no painel do Resend e
    // trocar o "from" abaixo por um endereço nesse domínio.
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
