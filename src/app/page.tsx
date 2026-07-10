import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ServicesGrid } from '@/components/sections/services-grid'
import { PrepareSection } from '@/components/sections/prepare-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <ServicesGrid />
        <PrepareSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
