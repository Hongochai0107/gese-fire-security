import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: string
  label: string
  render?: (item: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  meta?: { page: number; limit: number; total: number; totalPages: number }
  onPageChange?: (page: number) => void
  loading?: boolean
}

export function DataTable<T extends { id: number }>({
  columns, data, meta, onPageChange, loading,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th key={col.key} className={cn('px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500', col.className)}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
              </td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">Không có dữ liệu</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3', col.className)}>
                      {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-500">Tổng: <span className="font-medium text-gray-900">{meta.total}</span> | Trang {meta.page}/{meta.totalPages}</p>
          <div className="flex gap-1">
            <button onClick={() => onPageChange?.(meta.page - 1)} disabled={meta.page <= 1} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => onPageChange?.(meta.page + 1)} disabled={meta.page >= meta.totalPages} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
