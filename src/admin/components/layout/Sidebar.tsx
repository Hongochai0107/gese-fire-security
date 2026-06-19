import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Package, FolderTree, Newspaper, Building2,
  Users, Image, LogOut, ArrowLeft,
} from 'lucide-react'
import { useAuth } from '@/admin/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Sản phẩm' },
  { to: '/admin/categories', icon: FolderTree, label: 'Danh mục' },
  { to: '/admin/news', icon: Newspaper, label: 'Tin tức' },
  { to: '/admin/projects', icon: Building2, label: 'Dự án' },
  { to: '/admin/leads', icon: Users, label: 'Leads' },
  { to: '/admin/media', icon: Image, label: 'Media' },
]

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col bg-[#0f172a] text-white">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold">
          G
        </div>
        <div>
          <p className="text-sm font-semibold">GESE Admin</p>
          <p className="text-[11px] text-gray-400">CMS Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/admin'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:bg-[#1e293b] hover:text-white',
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="mb-2 rounded-lg bg-[#1e293b] px-3 py-2.5">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.role}</p>
        </div>
        <NavLink to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-[#1e293b] hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Về trang chính
        </NavLink>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-[#1e293b] hover:text-white">
          <LogOut className="h-4 w-4" /> Đăng xuất
        </button>
      </div>
    </aside>
  )
}
