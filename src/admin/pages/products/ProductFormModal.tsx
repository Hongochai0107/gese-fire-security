import { useEffect, useState, useRef } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
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
    price: '', status: 'draft', categoryId: '', supplierId: '',
    seoTitle: '', seoDescription: '', thumbnail: '',
  })
  const [features, setFeatures] = useState<string[]>([])
  const [featureInput, setFeatureInput] = useState('')
  const featureInputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get('/categories').then((r) => {
      const list = r.data?.data ?? r.data
      setCategories(Array.isArray(list) ? list : [])
    })
    api.get('/suppliers').then((r) => {
      const list = r.data?.data ?? r.data
      setSuppliers(Array.isArray(list) ? list : [])
    }).catch(() => {})
    if (id) {
      api.get(`/products/${id}`).then((r) => {
        const p = r.data?.data ?? r.data
        setForm({
          name: p.name || '', slug: p.slug || '', sku: p.sku || '',
          shortDescription: p.shortDescription || '', description: p.description || '',
          price: p.price?.toString() || '', status: p.status || 'draft',
          categoryId: p.categoryId?.toString() || '', supplierId: p.supplierId?.toString() || '',
          seoTitle: p.seoTitle || '', seoDescription: p.seoDescription || '', thumbnail: p.thumbnail || '',
        })
        setFeatures(Array.isArray(p.features) ? p.features : [])
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
        supplierId: form.supplierId ? Number(form.supplierId) : undefined,
        features: features.length > 0 ? features : undefined,
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

  const addFeature = () => {
    const val = featureInput.trim()
    if (val && !features.includes(val)) {
      setFeatures((prev) => [...prev, val])
    }
    setFeatureInput('')
    featureInputRef.current?.focus()
  }

  const handleFeatureKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addFeature()
    } else if (e.key === ',' && featureInput.trim()) {
      e.preventDefault()
      addFeature()
    } else if (e.key === 'Backspace' && !featureInput && features.length > 0) {
      setFeatures((prev) => prev.slice(0, -1))
    }
  }

  const removeFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx))
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

          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Danh mục</label>
              <select value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="">— Chọn —</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nhà cung cấp</label>
              <select value={form.supplierId} onChange={(e) => set('supplierId', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                <option value="">— Chọn —</option>
                {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả ngắn</label>
            <textarea rows={2} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)}
              className="w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          {/* Features tag input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tính năng nổi bật
              <span className="ml-1 font-normal text-gray-400">(Enter hoặc , để thêm)</span>
            </label>
            <div
              className="flex min-h-10.5 flex-wrap gap-1.5 rounded-xl border border-gray-300 px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
              onClick={() => featureInputRef.current?.focus()}
            >
              {features.map((f, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700"
                >
                  {f}
                  <button type="button" onClick={() => removeFeature(i)} className="text-green-500 hover:text-green-700">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                ref={featureInputRef}
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
                onBlur={() => { if (featureInput.trim()) addFeature() }}
                placeholder={features.length === 0 ? 'Nhập tính năng...' : ''}
                className="min-w-30 flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả chi tiết (HTML)</label>
            <textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)}
              className="w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
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
