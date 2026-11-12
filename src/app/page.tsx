import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Hero } from '@/components/landing/hero'
import { Topics } from '@/components/landing/topics'
import { Services } from '@/components/landing/services'
import { Certificates } from '@/components/landing/certificates'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Gallery } from '@/components/landing/gallery'
import { Location } from '@/components/landing/location'
import { OmbudsmanBand } from '@/components/landing/ombudsman-band'

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main">
        <Hero />
        <Topics />
        <Services />
        <Certificates />
        <HowItWorks />
        <Gallery />
        <Location />
        <OmbudsmanBand />
      </main>
      <SiteFooter />
    </div>
  )
}
