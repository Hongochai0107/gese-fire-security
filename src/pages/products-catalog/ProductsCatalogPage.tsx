import { useEffect, useState } from 'react'
import { Seo } from '@/components/Seo'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { productApi, categoryApi } from '@/lib/api'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import type { Product, Category } from '@/lib/api'
import { cn } from '@/lib/utils'

export function ProductsCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)

  const currentCategory = searchParams.get('category') || ''
  const currentSearch = searchParams.get('q') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    categoryApi.list().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => { if (!cancelled) setLoading(true) })
    const p: Record<string, unknown> = { page: currentPage, limit: 12 }
    if (currentCategory) p.categoryId = currentCategory
    if (currentSearch) p.search = currentSearch

    productApi.list(p).then((res) => {
      if (!cancelled) { setProducts(res.data); setMeta(res.meta) }
    }).catch(() => {}).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [currentCategory, currentSearch, currentPage])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    if (key !== 'page') next.delete('page')
    setSearchParams(next)
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  return (
    <>
      <Seo title="Sản phẩm" description="Thiết bị PCCC & An ninh chính hãng — đầu báo cháy, tủ trung tâm, camera giám sát với thông số kỹ thuật chi tiết." />
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
              Sản phẩm
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Thiết bị PCCC &amp; An ninh
            </h1>
            <p className="mt-4 text-lg text-muted">
              Đầy đủ các thiết bị báo cháy, chữa cháy, camera an ninh chính hãng với thông số kỹ thuật chi tiết.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Sidebar filters */}
            <aside className="w-full shrink-0 lg:w-64">
              <div className="sticky top-24 flex flex-col gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    defaultValue={currentSearch}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') updateParam('q', (e.target as HTMLInputElement).value)
                    }}
                    className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-subtle focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Danh mục
                  </h3>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <button
                        onClick={() => updateParam('category', '')}
                        className={cn(
                          'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                          !currentCategory
                            ? 'bg-primary/10 font-semibold text-primary'
                            : 'text-muted hover:bg-surface hover:text-white',
                        )}
                      >
                        Tất cả sản phẩm
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => updateParam('category', String(cat.id))}
                          className={cn(
                            'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                            currentCategory === String(cat.id)
                              ? 'bg-primary/10 font-semibold text-primary'
                              : 'text-muted hover:bg-surface hover:text-white',
                          )}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1">
              {currentSearch && (
                <div className="mb-4 flex items-center gap-2 text-sm text-muted">
                  Kết quả cho "<span className="font-medium text-white">{currentSearch}</span>"
                  <button onClick={() => updateParam('q', '')} className="text-primary hover:underline">
                    Xóa
                  </button>
                </div>
              )}

              {loading ? (
                <ProductGridSkeleton count={6} />
              ) : products.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card py-20 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-subtle" />
                  <p className="mt-4 text-muted">Không tìm thấy sản phẩm nào.</p>
                </div>
              ) : (
                <>
                  <motion.div
                    key={`${currentCategory}-${currentSearch}-${currentPage}`}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={fadeInUp}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        <Link
                          to={`/products-catalog/${product.slug}`}
                          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
                        >
                          <div className="relative aspect-4/3 overflow-hidden bg-surface">
                            {product.thumbnail ? (
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <ShoppingBag className="h-12 w-12 text-border" />
                              </div>
                            )}
                            {product.category && (
                              <span className="absolute left-3 top-3 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                                {product.category.name}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            {product.sku && (
                              <p className="mb-1 text-xs text-subtle">SKU: {product.sku}</p>
                            )}
                            <h3 className="text-base font-bold text-white group-hover:text-primary">
                              {product.name}
                            </h3>
                            {product.shortDescription && (
                              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                                {product.shortDescription}
                              </p>
                            )}
                            {product.price > 0 && (
                              <p className="mt-3 text-lg font-bold text-primary">
                                {formatPrice(product.price)}
                              </p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {meta.totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-4">
                      <button
                        onClick={() => updateParam('page', String(currentPage - 1))}
                        disabled={currentPage <= 1}
                        className="flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-primary hover:text-white disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4" /> Trước
                      </button>
                      <span className="text-sm text-muted">
                        Trang {meta.page} / {meta.totalPages}
                      </span>
                      <button
                        onClick={() => updateParam('page', String(currentPage + 1))}
                        disabled={currentPage >= meta.totalPages}
                        className="flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-primary hover:text-white disabled:opacity-40"
                      >
                        Sau <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
