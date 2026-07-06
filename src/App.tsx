import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { RootLayout } from '@/layouts/RootLayout'
import { ScrollToTop } from '@/components/ScrollToTop'
import { HomePage } from '@/pages/home/HomePage'

const ServicesPage = lazy(() => import('@/pages/services/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const ProjectsPage = lazy(() => import('@/pages/projects/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const ProjectDetailPage = lazy(() => import('@/pages/projects/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })))
const AboutPage = lazy(() => import('@/pages/about/AboutPage').then((m) => ({ default: m.AboutPage })))
const BlogPage = lazy(() => import('@/pages/blog/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogDetailPage = lazy(() => import('@/pages/blog/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })))
const ContactPage = lazy(() => import('@/pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })))
const ProductsCatalogPage = lazy(() => import('@/pages/products-catalog/ProductsCatalogPage').then((m) => ({ default: m.ProductsCatalogPage })))
const ProductCatalogDetailPage = lazy(() => import('@/pages/products-catalog/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })))
const QuotePage = lazy(() => import('@/pages/quote/QuotePage').then((m) => ({ default: m.QuotePage })))
const ComparePage = lazy(() => import('@/pages/compare/ComparePage').then((m) => ({ default: m.ComparePage })))
const FaqPage = lazy(() => import('@/pages/faq/FaqPage').then((m) => ({ default: m.FaqPage })))
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const AuthProvider = lazy(() => import('@/admin/contexts/AuthContext').then((m) => ({ default: m.AuthProvider })))
const AdminLayout = lazy(() => import('@/admin/components/layout/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminLoginPage = lazy(() => import('@/admin/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('@/admin/pages/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const AdminProductsPage = lazy(() => import('@/admin/pages/products/ProductsPage').then((m) => ({ default: m.ProductsPage })))
const CategoriesPage = lazy(() => import('@/admin/pages/categories/CategoriesPage').then((m) => ({ default: m.CategoriesPage })))
const SuppliersPage = lazy(() => import('@/admin/pages/suppliers/SuppliersPage').then((m) => ({ default: m.SuppliersPage })))
const NewsPage = lazy(() => import('@/admin/pages/news/NewsPage').then((m) => ({ default: m.NewsPage })))
const ProjectsAdminPage = lazy(() => import('@/admin/pages/projects/ProjectsAdminPage').then((m) => ({ default: m.ProjectsAdminPage })))
const LeadsPage = lazy(() => import('@/admin/pages/leads/LeadsPage').then((m) => ({ default: m.LeadsPage })))
const MediaPage = lazy(() => import('@/admin/pages/media/MediaPage').then((m) => ({ default: m.MediaPage })))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ===== Marketing Website ===== */}
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products-catalog" element={<ProductsCatalogPage />} />
            <Route path="products-catalog/:slug" element={<ProductCatalogDetailPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="quote" element={<QuotePage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="faq" element={<FaqPage />} />
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
                  <Route path="suppliers" element={<SuppliersPage />} />
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
      </Suspense>
    </>
  )
}

export default App
