'use client'

import { Popover } from '@base-ui/react/popover'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

export function WhatsAppFloating() {
  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden sm:bottom-6 sm:right-6">
      <Popover.Root>
        <Popover.Trigger
          aria-label="Falar com o cartório pelo WhatsApp"
          className="relative inline-flex size-12 items-center justify-center gap-2.5 rounded-full border border-gold/40 bg-wine-deep text-sm text-paper shadow-[0_12px_32px_-12px_oklch(0.26_0.09_18/0.6)] outline-none transition-colors hover:border-gold/80 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold motion-reduce:transition-none sm:h-12 sm:w-auto sm:px-5"
        >
          <MessageCircle className="h-5 w-5 text-gold" aria-hidden="true" />
          <span className="hidden sm:inline">Dúvidas? Fale no WhatsApp</span>
          <span
            aria-hidden="true"
            className="absolute right-0.5 top-0.5 size-2.5 rounded-full border border-wine-deep bg-[oklch(0.68_0.12_150)] sm:static sm:size-2 sm:border-0"
          />
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Positioner side="top" align="end" sideOffset={8} collisionPadding={16} className="z-40">
            <Popover.Popup className="w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-gold/40 border-t-2 border-t-gold bg-paper p-5 text-foreground shadow-[0_18px_40px_-16px_oklch(0.26_0.09_18/0.45)] outline-none transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none">
              <Popover.Title className="font-serif text-lg font-semibold">
                Atendimento da Serventia
              </Popover.Title>

              <dl className="mt-3 border-t border-rule text-sm">
                <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                  <dt className="text-ink-muted">Horário</dt>
                  <dd className="text-right">{siteConfig.hours.short}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                  <dt className="text-ink-muted">WhatsApp</dt>
                  <dd className="font-medium tabular-nums">{siteConfig.whatsappDisplay}</dd>
                </div>
              </dl>

              <Button
                nativeButton={false}
                className="mt-4 h-11 w-full bg-wine-deep text-paper hover:bg-primary"
                render={
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Iniciar conversa no WhatsApp
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                }
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
