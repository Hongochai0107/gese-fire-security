import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import api from '@/admin/lib/api'
import toast from 'react-hot-toast'

interface Props {
  id: number | null
  onClose: () => void
}

export function ProductFormModal({ id, onClose }: Props) {
  const [form, setForm] = useState({
    name: '', slug: '', sku: '', shortDescription: '', description: '',
    price: '', status: 'draft', categoryId: '', seoTitle: '', seoDescription: '', thumbnail: '',
  })
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get('/categories').then((r) => {
      const list = r.data?.data ?? r.data
      setCategories(Array.isArray(list) ? list : [])
    })
    if (id) {
      api.get(`/products/${id}`).then((r) => {
        const p = r.data?.data ?? r.data
        setForm({
          name: p.name || '', slug: p.slug || '', sku: p.sku || '',
          shortDescription: p.shortDescription || '', description: p.description || '',
          price: p.price?.toString() || '', status: p.status || 'draft',
          categoryId: p.categoryId?.toString() || '', seoTitle: p.seoTitle || '',
          seoDescription: p.seoDescription || '', thumbnail: p.thumbnail || '',
        })
      })
    }
  }, [id])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const body = {
        ...form,
        price: form.price ? Number(form.price) : undefined,
        categoryId: form.categoryId ? Number(form.categoryId) : undefined,
      }
      if (id) {
        await api.put(`/products/${id}`, body)
        toast.success('Cập nhật sản phẩm thành công')
      } else {
        await api.post('/products', body)
        toast.success('Tạo sản phẩm thành công')
      }
      onClose()
      window.location.reload()
    } catch {
      // handled by interceptor
    } finally {
      setSubmitting(false)
    }
  }

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const autoSlug = () => {
    if (!form.slug && form.name) {
      const slug = form.name.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      set('slug', slug)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-20">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tên sản phẩm *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} onBlur={autoSlug}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Slug *</label>
              <input required value={form.slug} onChange={(e) => set('slug', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Mã SP (SKU)</label>
              <input value={form.sku} onChange={(e) => set('sku', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giá (VND)</label>
              <input type="number" value={form.price} onChange={(e) => set('price', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Danh mục</label>
              <select value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="">— Chọn —</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả ngắn</label>
            <textarea rows={2} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả chi tiết (HTML)</label>
            <textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Trạng thái</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Thumbnail URL</label>
              <input value={form.thumbnail} onChange={(e) => set('thumbnail', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Hủy
            </button>
            <button type="submit" disabled={submitting}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50">
              {submitting ? 'Đang lưu...' : id ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
