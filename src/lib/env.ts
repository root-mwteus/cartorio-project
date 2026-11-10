// Lê uma variável de ambiente sem aspas, espaços ou quebras de linha nas pontas:
// valores colados assim no painel da Vercel quebram as integrações.
export function readEnv(name: string) {
  return (process.env[name] ?? '').trim().replace(/^(['"])(.*)\1$/, '$2').trim()
}

// Para logs: mantém o motivo do erro, mas oculta endereços de e-mail.
export function redactEmails(text: string) {
  return text.replace(/[^\s@<>()"',;:]+@[^\s@<>()"',;:]+/g, '[e-mail]')
}
