import { Navbar } from '@/layouts/navbar'
import { Container } from '@/components/ui/Container'
import { HeroSection } from '@/pages/home/sections/HeroSection'
import { TrustSection } from '@/pages/home/sections/TrustSection'
import { ServicesSection } from '@/pages/home/sections/ServicesSection'
import { WhyChooseUsSection } from '@/pages/home/sections/WhyChooseUsSection'
import { FeaturedProjectsSection } from '@/pages/home/sections/FeaturedProjectsSection'
import { CertificatesSection } from '@/pages/home/sections/CertificatesSection'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <FeaturedProjectsSection />
        <CertificatesSection />

        <section className="flex h-[60vh] items-center">
          <Container>
            <p className="text-muted">Khu vực xem trước cho các section tiếp theo.</p>
          </Container>
        </section>
      </main>
    </div>
  )
}

export default App
