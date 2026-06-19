import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/admin/contexts/AuthContext'
import toast from 'react-hot-toast'

export function LoginPage() {
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await login(email, password)
      toast.success('Đăng nhập thành công')
    } catch {
      // handled by interceptor
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <LogIn className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">GESE Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Đăng nhập để quản lý nội dung</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-5">
            <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@gesefiresecurity.vn"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="mb-6">
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-gray-700">Mật khẩu</label>
            <div className="relative">
              <input id="admin-password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 pr-10 text-sm text-gray-900 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50">
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
