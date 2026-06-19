import { useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { DataTable } from '@/admin/components/ui/DataTable'
import { useCrud } from '@/admin/hooks/useCrud'
import toast from 'react-hot-toast'
import api from '@/admin/lib/api'

interface Category { id: number; name: string; slug: string; sortOrder: number; isActive: boolean; parentId: number | null }

export function CategoriesPage() {
  const { data, loading, fetchData, remove } = useCrud<Category>('/categories')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', sortOrder: '0' })

  const openCreate = () => { setEditItem(null); setForm({ name: '', slug: '', sortOrder: '0' }); setShowForm(true) }
  const openEdit = (c: Category) => { setEditItem(c); setForm({ name: c.name, slug: c.slug, sortOrder: String(c.sortOrder) }); setShowForm(true) }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const body = { ...form, sortOrder: Number(form.sortOrder) }
    if (editItem) {
      await api.put(`/categories/${editItem.id}`, body)
      toast.success('Cập nhật danh mục thành công')
    } else {
      await api.post('/categories', body)
      toast.success('Tạo danh mục thành công')
    }
    setShowForm(false)
    fetchData()
  }

  const columns = [
    { key: 'name', label: 'Tên danh mục', render: (c: Category) => <span className="font-medium">{c.name}</span> },
    { key: 'slug', label: 'Slug', render: (c: Category) => <code className="text-xs text-gray-500">{c.slug}</code> },
    { key: 'sortOrder', label: 'Thứ tự' },
    {
      key: 'actions', label: '', className: 'w-24',
      render: (c: Category) => (
        <div className="flex gap-1">
          <button onClick={() => openEdit(c)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => remove(c.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Danh mục sản phẩm" action={
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          <Plus className="h-4 w-4" /> Thêm danh mục
        </button>
      } />
      <DataTable columns={columns} data={data} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editItem ? 'Sửa danh mục' : 'Thêm danh mục'}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tên *</label>
                <input required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Slug *</label>
                <input required value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Thứ tự</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm(f => ({ ...f, sortOrder: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50">Hủy</button>
                <button type="submit" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">{editItem ? 'Cập nhật' : 'Tạo mới'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
