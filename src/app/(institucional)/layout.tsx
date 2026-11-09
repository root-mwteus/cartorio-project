import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { InstitutionalNav } from './_components/institutional-nav'

export default function InstitucionalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <main id="main" className="min-w-0 lg:col-span-7 lg:col-start-5 lg:row-start-1">
          {children}
        </main>
        <aside className="hidden lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:block">
          <div className="sticky top-28">
            <InstitutionalNav />
          </div>
        </aside>
      </div>
      <SiteFooter />
    </div>
  )
}
