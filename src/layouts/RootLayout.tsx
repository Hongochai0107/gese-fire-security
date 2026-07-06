import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/layouts/navbar'
import { Footer } from '@/layouts/footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { PageTransition } from '@/components/PageTransition'
import { QuoteProvider } from '@/contexts/QuoteContext'
import { CompareProvider } from '@/contexts/CompareContext'
import { QuoteDrawer } from '@/components/QuoteDrawer'
import { CompareBar } from '@/components/CompareBar'
import { PromoPopup } from '@/components/PromoPopup'
import { Seo, organizationSchema } from '@/components/Seo'

export function RootLayout() {
  const location = useLocation()

  return (
    <CompareProvider>
      <QuoteProvider>
        <Seo jsonLd={organizationSchema} />
        <div className="min-h-screen bg-background">
          <Navbar />

          <main>
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </main>

          <Footer />
          <FloatingButtons />
          <QuoteDrawer />
          <CompareBar />
          <PromoPopup />
        </div>
      </QuoteProvider>
    </CompareProvider>
  )
}
