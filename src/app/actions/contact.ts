'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase'
import { checkGlobalRateLimit, checkIpRateLimit } from '@/lib/rate-limit'
import { siteConfig } from '@/lib/site-config'
import {
  readContactFormValues,
  validateContactForm,
  type ContactFormData,
} from '@/lib/validate-contact-form'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  // true quando o envio falhou por indisponibilidade: a tela oferece outros canais.
  fallback?: boolean
  // Devolvidos em todo erro, para o cidadão não perder o que digitou.
  values?: ContactFormData
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Variável de ambiente ausente: ${name}`)
  return value
}

function unavailable(values: ContactFormData): ContactFormState {
  return {
    status: 'error',
    fallback: true,
    values,
    message:
      'Não foi possível enviar sua mensagem agora. Seu texto foi mantido: envie direto por um dos canais abaixo.',
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readContactFormValues(formData)

  try {
    const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
    const ipLimit = await checkIpRateLimit(ip)
    if (ipLimit === 'unavailable') return unavailable(values)
    if (ipLimit === 'limited') {
      return {
        status: 'error',
        values,
        message: 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
      }
    }

    const result = validateContactForm(formData)
    if (!result.valid) {
      return { status: 'error', values, message: result.message }
    }
    if (result.isBot) {
      return { status: 'success' }
    }

    // Só depois da validação e do honeypot, para bots não consumirem a cota de todos.
    if ((await checkGlobalRateLimit()) !== 'allowed') return unavailable(values)

    const { name, email, subject, message } = result.data

    // Falta de configuração do e-mail interrompe aqui, antes de gravar a mensagem.
    const resend = new Resend(requireEnv('RESEND_API_KEY'))
    const notificationEmail = requireEnv('CONTACT_NOTIFICATION_EMAIL')

    const supabase = createSupabaseServerClient()
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name, email, subject, message })

    if (dbError) {
      console.error('Erro ao salvar no Supabase:', dbError.code)
      return unavailable(values)
    }

    // onboarding@resend.dev é o domínio sandbox do Resend: só entrega
    // e-mail para o endereço dono da conta Resend, nenhum outro. Pra
    // notificar um e-mail diferente (ex: o e-mail real do cartório),
    // é preciso verificar um domínio próprio no painel do Resend e
    // trocar o "from" abaixo por um endereço nesse domínio.
    const { error: emailError } = await resend.emails.send({
      from: `${siteConfig.tradeName} <onboarding@resend.dev>`,
      to: notificationEmail,
      replyTo: email,
      subject: `Novo contato: ${subject}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    })

    // O Resend devolve a recusa no retorno, sem lançar exceção.
    if (emailError) {
      console.error('Erro ao enviar e-mail:', emailError.name)
      return unavailable(values)
    }

    return { status: 'success' }
  } catch (error) {
    console.error('Falha no envio do formulário de contato:', error)
    return unavailable(values)
  }
}
