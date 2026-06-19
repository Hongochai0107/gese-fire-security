import { HeroSection } from '@/pages/home/sections/HeroSection'
import { TrustSection } from '@/pages/home/sections/TrustSection'
import { ServicesSection } from '@/pages/home/sections/ServicesSection'
import { WhyChooseUsSection } from '@/pages/home/sections/WhyChooseUsSection'
import { FeaturedProjectsSection } from '@/pages/home/sections/FeaturedProjectsSection'
import { CertificatesSection } from '@/pages/home/sections/CertificatesSection'
import { TestimonialsSection } from '@/pages/home/sections/TestimonialsSection'
import { CtaSection } from '@/pages/home/sections/CtaSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FeaturedProjectsSection />
      <CertificatesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
