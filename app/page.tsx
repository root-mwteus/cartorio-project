import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ServicesGrid } from '@/components/services-grid'
import { PrepareSection } from '@/components/prepare-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesGrid />
        <PrepareSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
