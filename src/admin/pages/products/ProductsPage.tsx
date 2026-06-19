import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { DataTable } from '@/admin/components/ui/DataTable'
import { StatusBadge } from '@/admin/components/ui/StatusBadge'
import { ProductFormModal } from './ProductFormModal'
import { useCrud } from '@/admin/hooks/useCrud'

interface Product {
  id: number
  name: string
  slug: string
  sku: string
  price: number
  status: string
  category: { id: number; name: string } | null
  thumbnail: string
  createdAt: string
}

export function ProductsPage() {
  const { data, meta, loading, params, setPage, setFilter, remove } = useCrud<Product>('/products')
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  const columns = [
    {
      key: 'name',
      label: 'Sản phẩm',
      render: (p: Product) => (
        <div className="flex items-center gap-3">
          {p.thumbnail ? (
            <img src={p.thumbnail} alt="" className="h-10 w-10 rounded-lg object-cover" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400 text-xs">
              N/A
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{p.name}</p>
            <p className="text-xs text-gray-400">{p.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Danh mục',
      render: (p: Product) => <span className="text-gray-600">{p.category?.name || '—'}</span>,
    },
    {
      key: 'price',
      label: 'Giá',
      render: (p: Product) => (
        <span className="text-gray-600">
          {p.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price) : '—'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (p: Product) => <StatusBadge status={p.status} />,
    },
    {
      key: 'actions',
      label: '',
      className: 'w-24',
      render: (p: Product) => (
        <div className="flex gap-1">
          <button
            onClick={() => { setEditId(p.id); setShowForm(true) }}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => remove(p.id)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Sản phẩm"
        description="Quản lý thiết bị & giải pháp PCCC"
        action={
          <button
            onClick={() => { setEditId(null); setShowForm(true) }}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </button>
        }
      />

      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={(params.search as string) || ''}
            onChange={(e) => setFilter('search', e.target.value || undefined)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={(params.status as string) || ''}
          onChange={(e) => setFilter('status', e.target.value || undefined)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <DataTable columns={columns} data={data} meta={meta} loading={loading} onPageChange={setPage} />

      {showForm && (
        <ProductFormModal
          id={editId}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  )
}
