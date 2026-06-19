import { useEffect, useState } from 'react'
import { Package, Newspaper, Building2, Users } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import api from '@/admin/lib/api'

interface Stats { products: number; articles: number; projects: number; leads: number }

const cards = [
  { key: 'products', label: 'Sản phẩm', icon: Package, color: 'bg-blue-500' },
  { key: 'articles', label: 'Bài viết', icon: Newspaper, color: 'bg-purple-500' },
  { key: 'projects', label: 'Dự án', icon: Building2, color: 'bg-orange-500' },
  { key: 'leads', label: 'Leads', icon: Users, color: 'bg-green-500' },
] as const

export function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ products: 0, articles: 0, projects: 0, leads: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/products?limit=1').catch(() => ({ data: { meta: { total: 0 } } })),
      api.get('/news?limit=1').catch(() => ({ data: { meta: { total: 0 } } })),
      api.get('/projects?limit=1').catch(() => ({ data: { meta: { total: 0 } } })),
      api.get('/leads?limit=1').catch(() => ({ data: { meta: { total: 0 } } })),
    ]).then(([p, n, pr, l]) => {
      setStats({
        products: p.data?.data?.meta?.total ?? p.data?.meta?.total ?? 0,
        articles: n.data?.data?.meta?.total ?? n.data?.meta?.total ?? 0,
        projects: pr.data?.data?.meta?.total ?? pr.data?.meta?.total ?? 0,
        leads: l.data?.data?.meta?.total ?? l.data?.meta?.total ?? 0,
      })
    })
  }, [])

  return (
    <>
      <PageHeader title="Dashboard" description="Tổng quan hệ thống quản trị GESE" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats[key]}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
