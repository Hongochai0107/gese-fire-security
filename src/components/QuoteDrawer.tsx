import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, Send, ShoppingBag, FileText, Paperclip } from 'lucide-react'
import { useQuote } from '@/contexts/QuoteContext'
import { cn } from '@/lib/utils'
import api from '@/lib/api'

const inputStyles =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder:text-subtle transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

export function QuoteDrawer() {
  const { items, removeItem, updateQuantity, clearItems, drawerOpen, closeDrawer } = useQuote()
  const [step, setStep] = useState<'list' | 'form' | 'success'>('list')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    const productLines = items
      .map((i) => `- ${i.name}${i.sku ? ` (SKU: ${i.sku})` : ''} x${i.quantity}`)
      .join('\n')

    const body = {
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: (fd.get('email') as string) || undefined,
      company: (fd.get('company') as string) || undefined,
      message: `[YÊU CẦU BÁO GIÁ]\n\nSản phẩm:\n${productLines}\n\nGhi chú: ${(fd.get('note') as string) || 'Không có'}${attachedFile ? `\n\nFile đính kèm: ${attachedFile.name} (khách sẽ gửi qua email)` : ''}`,
      source: 'quote_request',
    }

    try {
      await api.post('/leads/submit', body)
      clearItems()
      setAttachedFile(null)
      setStep('success')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    closeDrawer()
    setTimeout(() => {
      setStep('list')
      setError('')
    }, 300)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-white">
              {step === 'form' ? 'Thông tin liên hệ' : step === 'success' ? 'Hoàn tất' : 'Danh sách báo giá'}
            </h2>
          </div>
          <button onClick={handleClose} className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 'success' ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Send className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Gửi yêu cầu thành công!</h3>
              <p className="mt-2 text-sm text-muted">
                Đội ngũ GESE sẽ liên hệ và gửi báo giá chi tiết trong thời gian sớm nhất.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
              >
                Đóng
              </button>
            </div>
          ) : step === 'form' ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
              <p className="text-sm text-muted">
                Vui lòng điền thông tin để nhận báo giá cho {items.length} sản phẩm đã chọn.
              </p>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Họ và tên <span className="text-error">*</span>
                </label>
                <input name="name" required placeholder="Nguyễn Văn A" className={inputStyles} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Số điện thoại <span className="text-error">*</span>
                </label>
                <input name="phone" type="tel" required placeholder="0912 345 678" className={inputStyles} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Email</label>
                <input name="email" type="email" placeholder="email@congty.vn" className={inputStyles} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Công ty / Tổ chức</label>
                <input name="company" placeholder="Tên công ty" className={inputStyles} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Ghi chú thêm</label>
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Yêu cầu đặc biệt, số lượng lớn, thời gian cần hàng..."
                  className={cn(inputStyles, 'resize-none')}
                />
              </div>

              {/* File attachment */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Đính kèm bản vẽ mặt bằng
                  <span className="ml-1 font-normal text-subtle">(PDF, DWG, PNG)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
                  onChange={(e) => setAttachedFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                {attachedFile ? (
                  <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Paperclip className="h-4 w-4 shrink-0" />
                      <span className="truncate max-w-45">{attachedFile.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setAttachedFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                      className="text-subtle hover:text-error transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <Paperclip className="h-4 w-4" />
                    Chọn file đính kèm
                  </button>
                )}
                <p className="mt-1.5 text-xs text-subtle">
                  File sẽ được gửi qua email {' '}
                  <a href="mailto:contact@gesefiresecurity.vn" className="text-primary hover:underline">
                    contact@gesefiresecurity.vn
                  </a>
                  {' '}sau khi submit.
                </p>
              </div>

              {error && (
                <p className="rounded-xl border border-error/30 bg-error/10 px-4 py-2.5 text-sm text-error">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('list')}
                  className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-white"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary-hover disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-border" />
              <p className="mt-4 font-medium text-muted">Chưa có sản phẩm nào</p>
              <p className="mt-1 text-sm text-subtle">Thêm sản phẩm từ trang danh mục để yêu cầu báo giá.</p>
              <Link
                to="/products-catalog"
                onClick={handleClose}
                className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
              >
                Xem sản phẩm
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-xl border border-border bg-card p-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-border" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        to={`/products-catalog/${item.slug}`}
                        onClick={handleClose}
                        className="text-sm font-semibold text-white hover:text-primary line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.sku && <p className="text-xs text-subtle">SKU: {item.sku}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-white disabled:opacity-40"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-subtle transition-colors hover:bg-error/10 hover:text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only show when list has items */}
        {step === 'list' && items.length > 0 && (
          <div className="border-t border-border p-6">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">{items.length} sản phẩm · {items.reduce((s, i) => s + i.quantity, 0)} số lượng</span>
              <button onClick={clearItems} className="text-subtle transition-colors hover:text-error">
                Xóa tất cả
              </button>
            </div>
            <button
              onClick={() => setStep('form')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-background transition-colors hover:bg-primary-hover"
            >
              <Send className="h-4 w-4" />
              Gửi yêu cầu báo giá
            </button>
          </div>
        )}
      </div>
    </>
  )
}
