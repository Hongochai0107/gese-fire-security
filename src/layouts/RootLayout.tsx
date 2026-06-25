import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/layouts/navbar'
import { Footer } from '@/layouts/footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { PageTransition } from '@/components/PageTransition'

export function RootLayout() {
  const location = useLocation()

  return (
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
    </div>
  )
}
