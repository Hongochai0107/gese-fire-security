import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag, FileText, Check, X, GitCompare } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Seo } from '@/components/Seo'
import { useCompare } from '@/contexts/CompareContext'
import { useQuote } from '@/contexts/QuoteContext'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompare()
  const { addItem, isInQuote } = useQuote()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  // Collect all unique spec keys across all compared products
  const allSpecKeys = Array.from(
    new Set(items.flatMap((p) => Object.keys(p.specifications ?? {})))
  )

  // Collect all unique feature indices
  const maxFeatures = Math.max(...items.map((p) => p.features?.length ?? 0), 0)

  return (
    <>
      <Seo title="So sánh sản phẩm" description="So sánh thông số kỹ thuật các sản phẩm PCCC & An ninh" />

      <section className="border-b border-border py-12 sm:py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Link
              to="/products-catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại sản phẩm
            </Link>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitCompare className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-white sm:text-3xl">So sánh sản phẩm</h1>
              </div>
              {items.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="text-sm text-muted hover:text-white transition-colors"
                >
                  Xóa tất cả
                </button>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {items.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-20 text-center">
              <GitCompare className="mx-auto h-14 w-14 text-subtle" />
              <p className="mt-4 text-lg font-semibold text-white">Chưa có sản phẩm nào để so sánh</p>
              <p className="mt-2 text-sm text-muted">Nhấn nút "So sánh" trên trang chi tiết sản phẩm để thêm vào đây</p>
              <Link
                to="/products-catalog"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Xem sản phẩm
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                {/* Product header row */}
                <thead>
                  <tr className="border-b border-border">
                    <th className="w-40 py-4 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Sản phẩm
                    </th>
                    {items.map((p) => (
                      <th key={p.id} className="px-4 py-4 text-left align-top">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface text-muted hover:border-destructive hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="mb-3 aspect-4/3 w-full max-w-[160px] overflow-hidden rounded-xl border border-border bg-surface">
                            {p.thumbnail ? (
                              <img src={p.thumbnail} alt={p.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-border" />
                              </div>
                            )}
                          </div>
                          <Link
                            to={`/products-catalog/${p.slug}`}
                            className="font-bold text-white hover:text-primary leading-snug block"
                          >
                            {p.name}
                          </Link>
                          {p.sku && <p className="mt-1 text-xs text-subtle">SKU: {p.sku}</p>}
                          <button
                            onClick={() => {
                              if (!isInQuote(p.id)) {
                                toast.success(`Đã thêm "${p.name}" vào báo giá`)
                              }
                              addItem({ id: p.id, name: p.name, sku: p.sku, thumbnail: p.thumbnail, slug: p.slug })
                            }}
                            className={cn(
                              'mt-3 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                              isInQuote(p.id)
                                ? 'bg-primary/10 text-primary'
                                : 'bg-surface text-muted hover:bg-primary/10 hover:text-primary',
                            )}
                          >
                            {isInQuote(p.id) ? (
                              <><Check className="h-3.5 w-3.5" /> Đã báo giá</>
                            ) : (
                              <><FileText className="h-3.5 w-3.5" /> Thêm báo giá</>
                            )}
                          </button>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="px-4 py-4">
                        <div className="flex aspect-4/3 w-full max-w-[160px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/40">
                          <Link
                            to="/products-catalog"
                            className="flex flex-col items-center gap-2 text-xs text-subtle hover:text-primary"
                          >
                            <span className="text-2xl">+</span>
                            Thêm sản phẩm
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {/* Price */}
                  <tr className="bg-surface/30">
                    <td className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">Giá</td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-4 font-bold text-primary">
                        {p.price > 0 ? formatPrice(p.price) : <span className="text-subtle">Liên hệ</span>}
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-price-${i}`} className="px-4 py-4">—</td>
                    ))}
                  </tr>

                  {/* Category */}
                  <tr>
                    <td className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">Danh mục</td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-4 text-muted">
                        {p.category?.name ?? <span className="text-subtle">—</span>}
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-cat-${i}`} className="px-4 py-4 text-subtle">—</td>
                    ))}
                  </tr>

                  {/* Supplier */}
                  <tr className="bg-surface/30">
                    <td className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">Nhà cung cấp</td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-4 text-muted">
                        {p.supplier?.name ?? <span className="text-subtle">—</span>}
                      </td>
                    ))}
                    {Array.from({ length: 3 - items.length }).map((_, i) => (
                      <td key={`empty-sup-${i}`} className="px-4 py-4 text-subtle">—</td>
                    ))}
                  </tr>

                  {/* Features */}
                  {maxFeatures > 0 && (
                    <tr>
                      <td className="py-4 pr-4 align-top text-xs font-semibold uppercase tracking-wider text-muted">Tính năng</td>
                      {items.map((p) => (
                        <td key={p.id} className="px-4 py-4 align-top">
                          {p.features && p.features.length > 0 ? (
                            <ul className="flex flex-col gap-1.5">
                              {p.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-muted">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-subtle">—</span>
                          )}
                        </td>
                      ))}
                      {Array.from({ length: 3 - items.length }).map((_, i) => (
                        <td key={`empty-feat-${i}`} className="px-4 py-4 text-subtle">—</td>
                      ))}
                    </tr>
                  )}

                  {/* Specifications */}
                  {allSpecKeys.map((key, idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-surface/30' : ''}>
                      <td className="py-4 pr-4 font-medium text-white">{key}</td>
                      {items.map((p) => {
                        const val = p.specifications?.[key]
                        const others = items.filter((x) => x.id !== p.id).map((x) => x.specifications?.[key])
                        const isDifferent = others.some((v) => v !== val)
                        return (
                          <td
                            key={p.id}
                            className={cn('px-4 py-4', isDifferent ? 'text-white font-medium' : 'text-muted')}
                          >
                            {val ?? <span className="text-subtle">—</span>}
                          </td>
                        )
                      })}
                      {Array.from({ length: 3 - items.length }).map((_, i) => (
                        <td key={`empty-spec-${idx}-${i}`} className="px-4 py-4 text-subtle">—</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
