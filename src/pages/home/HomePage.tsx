import { Seo } from '@/components/Seo'
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
      <Seo description="Tư vấn, thiết kế, thi công và bảo trì hệ thống PCCC & An ninh đạt chuẩn cho nhà máy, tòa nhà và trung tâm thương mại." />
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
