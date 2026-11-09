// Escapa "<" para o conteúdo nunca fechar a tag <script> em que o JSON-LD é embutido.
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
