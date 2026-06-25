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
  description: string
  specifications: Record<string, string>
  price: number
  status: string
  thumbnail: string
  seoTitle: string
  seoDescription: string
  categoryId: number
  category: Category | null
  images: { id: number; url: string; alt: string }[]
  createdAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  sortOrder: number
  isActive: boolean
  children: Category[]
}

export interface Article {
  id: number
  title: string
  slug: string
  thumbnail: string
  content: string
  excerpt: string
  status: string
  publishedAt: string
  category: { id: number; name: string; slug: string } | null
  author: { id: number; name: string } | null
  tags: { id: number; name: string; slug: string }[]
  createdAt: string
}

export interface ProjectItem {
  id: number
  title: string
  slug: string
  client: string
  location: string
  description: string
  content: string
  thumbnail: string
  completedAt: string
  scope: string[]
  status: string
  images: { id: number; url: string; alt: string }[]
  createdAt: string
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
