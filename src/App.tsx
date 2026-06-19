import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/home/HomePage'
import { ServicesPage } from '@/pages/services/ServicesPage'
import { ProjectsPage } from '@/pages/projects/ProjectsPage'
import { ProjectDetailPage } from '@/pages/projects/ProjectDetailPage'
import { AboutPage } from '@/pages/about/AboutPage'
import { BlogPage } from '@/pages/blog/BlogPage'
import { ContactPage } from '@/pages/contact/ContactPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'

import { AuthProvider } from '@/admin/contexts/AuthContext'
import { AdminLayout } from '@/admin/components/layout/AdminLayout'
import { LoginPage as AdminLoginPage } from '@/admin/pages/auth/LoginPage'
import { DashboardPage } from '@/admin/pages/dashboard/DashboardPage'
import { ProductsPage as AdminProductsPage } from '@/admin/pages/products/ProductsPage'
import { CategoriesPage } from '@/admin/pages/categories/CategoriesPage'
import { NewsPage } from '@/admin/pages/news/NewsPage'
import { ProjectsAdminPage } from '@/admin/pages/projects/ProjectsAdminPage'
import { LeadsPage } from '@/admin/pages/leads/LeadsPage'
import { MediaPage } from '@/admin/pages/media/MediaPage'

function App() {
  return (
    <>
      <Routes>
        {/* ===== Marketing Website ===== */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* ===== Admin Dashboard ===== */}
        <Route path="admin/*" element={
          <AuthProvider>
            <Routes>
              <Route path="login" element={<AdminLoginPage />} />
              <Route element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="projects" element={<ProjectsAdminPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="media" element={<MediaPage />} />
              </Route>
            </Routes>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </AuthProvider>
        } />

        {/* ===== 404 ===== */}
        <Route path="*" element={<RootLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
