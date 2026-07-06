import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, Send, ShoppingBag, FileText, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/Button'
import { useQuote } from '@/contexts/QuoteContext'
import { cn } from '@/lib/utils'
import api from '@/lib/api'

const inputStyles =
  'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white placeholder:text-subtle transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

export function QuotePage() {
  const { items, removeItem, updateQuantity, clearItems } = useQuote()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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
      message: `[YÊU CẦU BÁO GIÁ]\n\nSản phẩm:\n${productLines}\n\nGhi chú: ${(fd.get('note') as string) || 'Không có'}`,
      source: 'quote_request',
    }

    try {
      await api.post('/leads/submit', body)
      clearItems()
      setSubmitted(true)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo title="Yêu cầu báo giá" description="Gửi danh sách sản phẩm PCCC & An ninh cần báo giá — đội ngũ GESE sẽ phản hồi trong thời gian sớm nhất." />

      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Báo giá
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Yêu cầu báo giá
            </h1>
            <p className="mt-4 text-lg text-muted">
              Xem lại danh sách sản phẩm và gửi yêu cầu — đội ngũ GESE sẽ liên hệ báo giá chi tiết.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mx-auto max-w-lg rounded-3xl border border-primary/30 bg-primary/5 p-10 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Send className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">Gửi yêu cầu thành công!</h2>
              <p className="mt-2 text-muted">
                Cảm ơn bạn đã gửi yêu cầu báo giá. Đội ngũ GESE sẽ liên hệ trong vòng 2 giờ làm việc.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button to="/products-catalog">
                  Tiếp tục xem sản phẩm
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button to="/" variant="outline">Về trang chủ</Button>
              </div>
            </motion.div>
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mx-auto max-w-lg rounded-3xl border border-border bg-card py-20 text-center"
            >
              <ShoppingBag className="mx-auto h-16 w-16 text-border" />
              <p className="mt-4 text-lg font-medium text-muted">Chưa có sản phẩm nào</p>
              <p className="mt-1 text-sm text-subtle">Thêm sản phẩm từ trang danh mục để yêu cầu báo giá.</p>
              <Button to="/products-catalog" className="mt-8">
                Xem sản phẩm
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
              {/* Product list */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <FileText className="h-5 w-5 text-primary" />
                    Sản phẩm đã chọn ({items.length})
                  </h2>
                  <button onClick={clearItems} className="text-sm text-subtle transition-colors hover:text-error">
                    Xóa tất cả
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-border" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            to={`/products-catalog/${item.slug}`}
                            className="font-semibold text-white hover:text-primary"
                          >
                            {item.name}
                          </Link>
                          {item.sku && <p className="mt-0.5 text-xs text-subtle">SKU: {item.sku}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-white disabled:opacity-40"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-white"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle transition-colors hover:bg-error/10 hover:text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quote form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              >
                <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-white">Thông tin liên hệ</h2>
                  <p className="mt-1 text-sm text-muted">Điền thông tin để nhận báo giá chi tiết.</p>

                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
                        placeholder="Yêu cầu đặc biệt, số lượng lớn..."
                        className={cn(inputStyles, 'resize-none')}
                      />
                    </div>

                    {error && (
                      <p className="rounded-xl border border-error/30 bg-error/10 px-4 py-2.5 text-sm text-error">{error}</p>
                    )}

                    <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
                      <Send className="h-4 w-4" />
                      {submitting ? 'Đang gửi...' : 'Gửi yêu cầu báo giá'}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
