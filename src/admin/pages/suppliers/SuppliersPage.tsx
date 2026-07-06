import { useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { DataTable } from '@/admin/components/ui/DataTable'
import { useCrud } from '@/admin/hooks/useCrud'
import toast from 'react-hot-toast'
import api from '@/admin/lib/api'

interface Supplier { id: number; name: string; slug: string; logo: string }

export function SuppliersPage() {
  const { data, loading, fetchData, remove } = useCrud<Supplier>('/suppliers')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Supplier | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', logo: '' })

  const openCreate = () => { setEditItem(null); setForm({ name: '', slug: '', logo: '' }); setShowForm(true) }
  const openEdit = (s: Supplier) => { setEditItem(s); setForm({ name: s.name, slug: s.slug, logo: s.logo || '' }); setShowForm(true) }

  const autoSlug = () => {
    if (!form.slug && form.name) {
      const slug = form.name.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      setForm(f => ({ ...f, slug }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editItem) {
      await api.put(`/suppliers/${editItem.id}`, form)
      toast.success('Cập nhật nhà cung cấp thành công')
    } else {
      await api.post('/suppliers', form)
      toast.success('Tạo nhà cung cấp thành công')
    }
    setShowForm(false)
    fetchData()
  }

  const columns = [
    {
      key: 'name', label: 'Nhà cung cấp',
      render: (s: Supplier) => (
        <div className="flex items-center gap-3">
          {s.logo && <img src={s.logo} alt={s.name} className="h-8 w-8 rounded-lg object-contain" />}
          <span className="font-medium">{s.name}</span>
        </div>
      ),
    },
    { key: 'slug', label: 'Slug', render: (s: Supplier) => <code className="text-xs text-gray-500">{s.slug}</code> },
    {
      key: 'actions', label: '', className: 'w-24',
      render: (s: Supplier) => (
        <div className="flex gap-1">
          <button onClick={() => openEdit(s)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => remove(s.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Nhà cung cấp" action={
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          <Plus className="h-4 w-4" /> Thêm nhà cung cấp
        </button>
      } />
      <DataTable columns={columns} data={data} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editItem ? 'Sửa nhà cung cấp' : 'Thêm nhà cung cấp'}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tên nhà cung cấp *</label>
                <input required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} onBlur={autoSlug}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Slug *</label>
                <input required value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Logo URL</label>
                <input value={form.logo} onChange={(e) => setForm(f => ({ ...f, logo: e.target.value }))}
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
