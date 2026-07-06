import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export interface PaginatedResponse<T> {
  data: T[]
  meta: { page: number; limit: number; total: number; totalPages: number }
}

export interface Product {
  id: number
  name: string
  slug: string
  sku: string
  shortDescription: string
  description: string | null
  specifications: Record<string, string>
  features: string[] | null
  price: number
  status: string
  thumbnail: string | null
  seoTitle: string | null
  seoDescription: string | null
  categoryId: number
  category: Category | null
  supplierId: number | null
  supplier: Supplier | null
  images: { id: number; url: string; alt: string }[] | null
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  sortOrder: number
  parentId: number | null
  active: boolean
  children: Category[] | null
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: number
  name: string
  slug: string
  logo: string | null
  createdAt: string
  updatedAt: string
}

export interface Article {
  id: number
  title: string
  slug: string
  thumbnail: string | null
  content: string
  excerpt: string
  status: string
  publishedAt: string
  seoTitle: string | null
  seoDescription: string | null
  categoryId: number | null
  category: { id: number; name: string; slug: string } | null
  authorId: number | null
  author: { id: number; name: string } | null
  tags: { id: number; name: string; slug: string }[] | null
  createdAt: string
  updatedAt: string
}

export interface ProjectItem {
  id: number
  title: string
  slug: string
  client: string
  location: string
  description: string
  content: string | null
  thumbnail: string | null
  completedAt: string
  scope: string[]
  status: string
  seoTitle: string | null
  seoDescription: string | null
  images: { id: number; url: string; alt: string }[] | null
  createdAt: string
  updatedAt: string
}

export const productApi = {
  list: (params?: Record<string, unknown>) =>
    api.get<{ data: PaginatedResponse<Product> }>('/products/public', { params }).then((r) => r.data.data),
  getBySlug: (slug: string) =>
    api.get<{ data: Product }>(`/products/public/${slug}`).then((r) => r.data.data),
}

export const categoryApi = {
  list: () =>
    api.get<{ data: Category[] }>('/categories/public').then((r) => r.data.data),
}

export const supplierApi = {
  list: () =>
    api.get<{ data: Supplier[] }>('/suppliers/public').then((r) => r.data.data),
}

export const newsApi = {
  list: (params?: Record<string, unknown>) =>
    api.get<{ data: PaginatedResponse<Article> }>('/news/public', { params }).then((r) => r.data.data),
  getBySlug: (slug: string) =>
    api.get<{ data: Article }>(`/news/public/${slug}`).then((r) => r.data.data),
}

export const projectApi = {
  list: (params?: Record<string, unknown>) =>
    api.get<{ data: PaginatedResponse<ProjectItem> }>('/projects/public', { params }).then((r) => r.data.data),
  getBySlug: (slug: string) =>
    api.get<{ data: ProjectItem }>(`/projects/public/${slug}`).then((r) => r.data.data),
}

export default api
