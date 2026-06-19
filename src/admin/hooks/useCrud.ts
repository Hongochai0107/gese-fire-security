import { useState, useEffect, useCallback } from 'react'
import api from '@/admin/lib/api'
import toast from 'react-hot-toast'

interface Meta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function useCrud<T extends { id: number }>(endpoint: string, defaultParams: Record<string, unknown> = {}) {
  const [data, setData] = useState<T[]>([])
  const [meta, setMeta] = useState<Meta>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<Record<string, unknown>>({ page: 1, limit: 10, ...defaultParams })
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => { if (!cancelled) setLoading(true) })
    api.get(endpoint, { params }).then(({ data: res }) => {
      if (cancelled) return
      const result = res.data ?? res
      if (Array.isArray(result.data)) {
        setData(result.data)
        setMeta(result.meta)
      } else if (Array.isArray(result)) {
        setData(result)
        setMeta({ page: 1, limit: result.length, total: result.length, totalPages: 1 })
      }
    }).catch(() => {
      // handled by interceptor
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [endpoint, params, trigger])

  const fetchData = useCallback(() => setTrigger((t) => t + 1), [])
  const setPage = (page: number) => setParams((p) => ({ ...p, page }))
  const setFilter = (key: string, value: unknown) => setParams((p) => ({ ...p, [key]: value, page: 1 }))

  const remove = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa?')) return
    await api.delete(`${endpoint}/${id}`)
    toast.success('Xóa thành công')
    fetchData()
  }

  return { data, meta, loading, params, setPage, setFilter, setParams, fetchData, remove }
}
