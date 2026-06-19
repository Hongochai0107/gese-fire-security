import { useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { DataTable } from '@/admin/components/ui/DataTable'
import { StatusBadge } from '@/admin/components/ui/StatusBadge'
import { useCrud } from '@/admin/hooks/useCrud'
import api from '@/admin/lib/api'
import toast from 'react-hot-toast'

interface Article {
  id: number; title: string; slug: string; status: string; thumbnail: string
  category: { name: string } | null; author: { name: string } | null; createdAt: string
}

export function NewsPage() {
  const { data, meta, loading, params, setPage, setFilter, remove } = useCrud<Article>('/news')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const columns = [
    {
      key: 'title', label: 'Bài viết',
      render: (a: Article) => (
        <div>
          <p className="font-medium text-gray-900 line-clamp-1">{a.title}</p>
          <p className="text-xs text-gray-400">{a.category?.name || '—'}</p>
        </div>
      ),
    },
    { key: 'author', label: 'Tác giả', render: (a: Article) => <span className="text-gray-600">{a.author?.name || '—'}</span> },
    { key: 'status', label: 'Trạng thái', render: (a: Article) => <StatusBadge status={a.status} /> },
    {
      key: 'createdAt', label: 'Ngày tạo',
      render: (a: Article) => <span className="text-gray-500 text-xs">{new Date(a.createdAt).toLocaleDateString('vi-VN')}</span>,
    },
    {
      key: 'actions', label: '', className: 'w-24',
      render: (a: Article) => (
        <div className="flex gap-1">
          <button onClick={() => { setEditId(a.id); setShowForm(true) }} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Pencil className="h-4 w-4" /></button>
          <button onClick={() => remove(a.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Tin tức / Blog" description="Quản lý bài viết"
        action={<button onClick={() => { setEditId(null); setShowForm(true) }} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"><Plus className="h-4 w-4" /> Thêm bài viết</button>}
      />
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm..." value={(params.search as string) || ''} onChange={(e) => setFilter('search', e.target.value || undefined)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <select value={(params.status as string) || ''} onChange={(e) => setFilter('status', e.target.value || undefined)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none">
          <option value="">Tất cả</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <DataTable columns={columns} data={data} meta={meta} loading={loading} onPageChange={setPage} />

      {showForm && <ArticleFormModal id={editId} onClose={() => { setShowForm(false); window.location.reload() }} />}
    </>
  )
}

function ArticleFormModal({ id, onClose }: { id: number | null; onClose: () => void }) {
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', status: 'draft', thumbnail: '', seoTitle: '', seoDescription: '' })
  const [submitting, setSubmitting] = useState(false)

  useState(() => {
    if (id) {
      api.get(`/news/${id}`).then((r) => {
        const a = r.data?.data ?? r.data
        setForm({ title: a.title || '', slug: a.slug || '', excerpt: a.excerpt || '', content: a.content || '', status: a.status || 'draft', thumbnail: a.thumbnail || '', seoTitle: a.seoTitle || '', seoDescription: a.seoDescription || '' })
      })
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      if (id) { await api.put(`/news/${id}`, form); toast.success('Cập nhật thành công') }
      else { await api.post('/news', form); toast.success('Tạo thành công') }
      onClose()
    } catch { /* interceptor */ } finally { setSubmitting(false) }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-16">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{id ? 'Sửa bài viết' : 'Thêm bài viết'}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">Tiêu đề *</label><input required value={form.title} onChange={e => set('title', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="mb-1 block text-sm font-medium">Slug *</label><input required value={form.slug} onChange={e => set('slug', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Tóm tắt</label><textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <div><label className="mb-1 block text-sm font-medium">Nội dung (HTML)</label><textarea rows={6} value={form.content} onChange={e => set('content', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-mono resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">Trạng thái</label><select value={form.status} onChange={e => set('status', e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"><option value="draft">Draft</option><option value="published">Published</option></select></div>
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
