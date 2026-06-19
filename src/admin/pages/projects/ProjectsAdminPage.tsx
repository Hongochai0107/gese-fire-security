import { useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { DataTable } from '@/admin/components/ui/DataTable'
import { StatusBadge } from '@/admin/components/ui/StatusBadge'
import { useCrud } from '@/admin/hooks/useCrud'
import api from '@/admin/lib/api'
import toast from 'react-hot-toast'

interface Project {
  id: number; title: string; slug: string; client: string; location: string; status: string; createdAt: string
}

export function ProjectsAdminPage() {
  const { data, meta, loading, params, setPage, setFilter, remove } = useCrud<Project>('/projects')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const columns = [
    { key: 'title', label: 'Dự án', render: (p: Project) => <span className="font-medium">{p.title}</span> },
    { key: 'client', label: 'Khách hàng', render: (p: Project) => <span className="text-gray-600">{p.client || '—'}</span> },
    { key: 'location', label: 'Địa điểm', render: (p: Project) => <span className="text-gray-500 text-xs">{p.location || '—'}</span> },
    { key: 'status', label: 'Trạng thái', render: (p: Project) => <StatusBadge status={p.status} /> },
    {
      key: 'actions', label: '', className: 'w-24',
      render: (p: Project) => (
        <div className="flex gap-1">
          <button onClick={() => { setEditId(p.id); setShowForm(true) }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => remove(p.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Dự án" description="Quản lý dự án đã triển khai"
        action={<button onClick={() => { setEditId(null); setShowForm(true) }} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"><Plus className="h-4 w-4" /> Thêm dự án</button>} />
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm..." value={(params.search as string) || ''} onChange={(e) => setFilter('search', e.target.value || undefined)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <DataTable columns={columns} data={data} meta={meta} loading={loading} onPageChange={setPage} />

      {showForm && <ProjectFormModal id={editId} onClose={() => { setShowForm(false); window.location.reload() }} />}
    </>
  )
}

function ProjectFormModal({ id, onClose }: { id: number | null; onClose: () => void }) {
  const [form, setForm] = useState({ title: '', slug: '', client: '', location: '', description: '', status: 'draft', thumbnail: '' })
  const [submitting, setSubmitting] = useState(false)

  useState(() => {
    if (id) {
      api.get(`/projects/${id}`).then((r) => {
        const p = r.data?.data ?? r.data
        setForm({ title: p.title || '', slug: p.slug || '', client: p.client || '', location: p.location || '', description: p.description || '', status: p.status || 'draft', thumbnail: p.thumbnail || '' })
      })
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      if (id) { await api.put(`/projects/${id}`, form); toast.success('Cập nhật thành công') }
      else { await api.post('/projects', form); toast.success('Tạo thành công') }
      onClose()
    } catch { /* interceptor */ } finally { setSubmitting(false) }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-16">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{id ? 'Sửa dự án' : 'Thêm dự án'}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">Tên dự án *</label><input required value={form.title} onChange={e => set('title', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="mb-1 block text-sm font-medium">Slug *</label><input required value={form.slug} onChange={e => set('slug', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">Khách hàng</label><input value={form.client} onChange={e => set('client', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="mb-1 block text-sm font-medium">Địa điểm</label><input value={form.location} onChange={e => set('location', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Mô tả</label><textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">Trạng thái</label><select value={form.status} onChange={e => set('status', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"><option value="draft">Draft</option><option value="active">Active</option></select></div>
            <div><label className="mb-1 block text-sm font-medium">Thumbnail URL</label><input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50">Hủy</button>
            <button type="submit" disabled={submitting} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50">{submitting ? 'Đang lưu...' : id ? 'Cập nhật' : 'Tạo mới'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
