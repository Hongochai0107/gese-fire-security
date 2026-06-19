import { useState } from 'react'
import { Download, Search, Eye, X } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { DataTable } from '@/admin/components/ui/DataTable'
import { StatusBadge } from '@/admin/components/ui/StatusBadge'
import { useCrud } from '@/admin/hooks/useCrud'
import api from '@/admin/lib/api'
import toast from 'react-hot-toast'

interface Lead {
  id: number; name: string; phone: string; email: string; company: string
  service: string; message: string; status: string; adminNote: string; createdAt: string
}

export function LeadsPage() {
  const { data, meta, loading, params, setPage, setFilter, fetchData } = useCrud<Lead>('/leads')
  const [detail, setDetail] = useState<Lead | null>(null)

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/leads/${id}`, { status })
    toast.success('Cập nhật trạng thái thành công')
    fetchData()
  }

  const exportCsv = async () => {
    const res = await api.get('/leads/export', { params, responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const a = document.createElement('a')
    a.href = url; a.download = 'leads.csv'; a.click()
    window.URL.revokeObjectURL(url)
  }

  const columns = [
    {
      key: 'name', label: 'Khách hàng',
      render: (l: Lead) => (
        <div>
          <p className="font-medium text-gray-900">{l.name}</p>
          <p className="text-xs text-gray-400">{l.phone}</p>
        </div>
      ),
    },
    { key: 'email', label: 'Email', render: (l: Lead) => <span className="text-gray-600 text-xs">{l.email || '—'}</span> },
    { key: 'company', label: 'Công ty', render: (l: Lead) => <span className="text-gray-600 text-xs">{l.company || '—'}</span> },
    { key: 'service', label: 'Dịch vụ', render: (l: Lead) => <span className="text-gray-500 text-xs">{l.service || '—'}</span> },
    { key: 'status', label: 'Trạng thái', render: (l: Lead) => <StatusBadge status={l.status} /> },
    {
      key: 'createdAt', label: 'Ngày',
      render: (l: Lead) => <span className="text-gray-500 text-xs">{new Date(l.createdAt).toLocaleDateString('vi-VN')}</span>,
    },
    {
      key: 'actions', label: '', className: 'w-36',
      render: (l: Lead) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setDetail(l)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"><Eye className="h-4 w-4" /></button>
          <select
            value={l.status}
            onChange={(e) => updateStatus(l.id, e.target.value)}
            className="rounded-lg border border-gray-200 px-2 py-1 text-xs focus:border-primary focus:outline-none"
          >
            <option value="new">Mới</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="closed">Đã chốt</option>
            <option value="spam">Spam</option>
          </select>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader title="Leads" description="Quản lý yêu cầu tư vấn"
        action={
          <button onClick={exportCsv} className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
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
          <option value="new">Mới</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="closed">Đã chốt</option>
          <option value="spam">Spam</option>
        </select>
      </div>
      <DataTable columns={columns} data={data} meta={meta} loading={loading} onPageChange={setPage} />

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Chi tiết Lead</h2>
              <button onClick={() => setDetail(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <p><span className="font-medium text-gray-500">Họ tên:</span> {detail.name}</p>
              <p><span className="font-medium text-gray-500">SĐT:</span> {detail.phone}</p>
              <p><span className="font-medium text-gray-500">Email:</span> {detail.email || '—'}</p>
              <p><span className="font-medium text-gray-500">Công ty:</span> {detail.company || '—'}</p>
              <p><span className="font-medium text-gray-500">Dịch vụ:</span> {detail.service || '—'}</p>
              <p><span className="font-medium text-gray-500">Nội dung:</span> {detail.message || '—'}</p>
              <p><span className="font-medium text-gray-500">Ngày gửi:</span> {new Date(detail.createdAt).toLocaleString('vi-VN')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
