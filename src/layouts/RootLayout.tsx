import { Outlet } from 'react-router-dom'
import { Navbar } from '@/layouts/navbar'
import { Footer } from '@/layouts/footer'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
