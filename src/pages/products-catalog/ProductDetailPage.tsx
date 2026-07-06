import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingBag, Phone, FileText, Check,
  ChevronLeft, ChevronRight, Home, GitCompare,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/Seo'
import { productApi } from '@/lib/api'
import type { Product } from '@/lib/api'
import { siteConfig } from '@/lib/site-config'
import { buildProductSchema } from '@/components/Seo'
import { useQuote } from '@/contexts/QuoteContext'
import { useCompare } from '@/contexts/CompareContext'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { DetailSkeleton, Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

function MiniProductCard({ product }: { product: Product }) {
  const { addItem, isInQuote } = useQuote()
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  return (
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
            <ShoppingBag className="h-10 w-10 text-border" />
          </div>
        )}
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full border border-primary/30 bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur">
            {product.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {product.sku && <p className="mb-1 text-xs text-subtle">SKU: {product.sku}</p>}
        <h3 className="text-sm font-bold leading-snug text-white group-hover:text-primary line-clamp-2">
          {product.name}
        </h3>
        {product.price > 0 && (
          <p className="mt-2 text-sm font-bold text-primary">{formatPrice(product.price)}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              if (!isInQuote(product.id)) toast.success(`Đã thêm "${product.name}" vào báo giá`)
              addItem({ id: product.id, name: product.name, sku: product.sku, thumbnail: product.thumbnail, slug: product.slug })
            }}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-colors',
              isInQuote(product.id)
                ? 'bg-primary/10 text-primary'
                : 'bg-surface text-muted hover:bg-primary/10 hover:text-primary',
            )}
          >
            {isInQuote(product.id) ? <><Check className="h-3.5 w-3.5" /> Đã báo giá</> : <><FileText className="h-3.5 w-3.5" /> Báo giá</>}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              if (isInCompare(product.id)) {
                removeFromCompare(product.id)
              } else {
                const ok = addToCompare(product)
                if (!ok) toast.error('Chỉ so sánh tối đa 3 sản phẩm')
              }
            }}
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors',
              isInCompare(product.id)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted hover:border-primary hover:text-primary',
            )}
            title="So sánh"
          >
            <GitCompare className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { addItem, isInQuote } = useQuote()
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs')
  const [related, setRelated] = useState<Product[]>([])
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    queueMicrotask(() => { if (!cancelled) setLoading(true) })
    setRelated([])
    setFeatured([])
    productApi.getBySlug(slug).then((p) => {
      if (!cancelled) {
        setProduct(p)
        setActiveImage(0)
        setActiveTab(p.specifications && Object.keys(p.specifications).length > 0 ? 'specs' : 'description')

        // Related: same category
        if (p.categoryId) {
          productApi.list({ categoryId: p.categoryId, limit: 5 }).then((res) => {
            if (!cancelled) setRelated(res.data.filter((r) => r.id !== p.id).slice(0, 4))
          }).catch(() => {})
        }
        // Featured: latest products (any category)
        productApi.list({ limit: 5 }).then((res) => {
          if (!cancelled) setFeatured(res.data.filter((r) => r.id !== p.id).slice(0, 4))
        }).catch(() => {})
      }
    }).catch(() => {
      if (!cancelled) setNotFound(true)
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Skeleton className="aspect-4/3 rounded-3xl" />
            <DetailSkeleton />
          </div>
        </Container>
      </section>
    )
  }

  if (notFound || !product) return <NotFoundPage />

  const allImages = [
    ...(product.thumbnail ? [{ id: 0, url: product.thumbnail, alt: product.name }] : []),
    ...(product.images || []),
  ]

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  const handleAddQuote = () => {
    addItem({ id: product.id, name: product.name, sku: product.sku, thumbnail: product.thumbnail, slug: product.slug })
    if (!isInQuote(product.id)) {
      toast.success(`Đã thêm "${product.name}" vào danh sách báo giá`)
    }
  }

  const handleToggleCompare = () => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id)
      toast(`Đã bỏ "${product.name}" khỏi so sánh`, { icon: '✕' })
    } else {
      const added = addToCompare(product)
      if (added) {
        toast.success(`Đã thêm "${product.name}" vào so sánh`)
      } else {
        toast.error('Chỉ có thể so sánh tối đa 3 sản phẩm')
      }
    }
  }

  const prevImage = () => setActiveImage((i) => (i > 0 ? i - 1 : allImages.length - 1))
  const nextImage = () => setActiveImage((i) => (i < allImages.length - 1 ? i + 1 : 0))

  const hasSpecs = product.specifications && Object.keys(product.specifications).length > 0
  const hasTabs = hasSpecs || !!product.description

  return (
    <>
      <Seo
        title={product.seoTitle || product.name}
        description={product.seoDescription || product.shortDescription}
        image={product.thumbnail || undefined}
        url={`/products-catalog/${product.slug}`}
        jsonLd={buildProductSchema(product)}
      />

      <section className="border-b border-border py-10 sm:py-14">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-white">
              <Home className="h-3.5 w-3.5" />
              Trang chủ
            </Link>
            <span className="text-subtle">/</span>
            <Link to="/products-catalog" className="transition-colors hover:text-white">Sản phẩm</Link>
            {product.category && (
              <>
                <span className="text-subtle">/</span>
                <Link
                  to={`/products-catalog?category=${product.categoryId}`}
                  className="transition-colors hover:text-white"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-subtle">/</span>
            <span className="max-w-50 truncate text-white sm:max-w-xs">{product.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Gallery */}
              <div className="flex flex-col gap-3">
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-card">
                  {allImages.length > 0 ? (
                    <img
                      src={allImages[activeImage]?.url}
                      alt={allImages[activeImage]?.alt || product.name}
                      className="h-full w-full object-cover transition-opacity duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ShoppingBag className="h-20 w-20 text-border" />
                    </div>
                  )}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted backdrop-blur transition-colors hover:border-primary hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted backdrop-blur transition-colors hover:border-primary hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, i) => (
                      <button
                        key={img.id}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          'h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors',
                          i === activeImage ? 'border-primary' : 'border-border hover:border-muted',
                        )}
                      >
                        <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                {/* Badges: category + supplier */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {product.category && (
                    <Link
                      to={`/products-catalog?category=${product.categoryId}`}
                      className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                    >
                      {product.category.name}
                    </Link>
                  )}
                  {product.supplier && (
                    <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                      {product.supplier.name}
                      <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        Chính hãng
                      </span>
                    </span>
                  )}
                </div>

                {product.sku && (
                  <p className="mb-2 text-xs text-subtle">SKU: {product.sku}</p>
                )}

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {product.name}
                </h1>

                {product.shortDescription && (
                  <p className="mt-4 text-lg leading-relaxed text-muted">{product.shortDescription}</p>
                )}

                {product.price > 0 && (
                  <p className="mt-5 text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
                )}

                {/* Features list */}
                {product.features && product.features.length > 0 && (
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <Check className="h-2.5 w-2.5 text-primary" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button size="lg" onClick={handleAddQuote}>
                    {isInQuote(product.id) ? (
                      <><Check className="h-4 w-4" /> Đã thêm vào báo giá</>
                    ) : (
                      <><FileText className="h-4 w-4" /> Thêm vào báo giá</>
                    )}
                  </Button>
                  <Button
                    href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
                    variant="outline"
                    size="lg"
                  >
                    <Phone className="h-4 w-4" />
                    Hotline: {siteConfig.contact.hotline}
                  </Button>
                  <button
                    onClick={handleToggleCompare}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors',
                      isInCompare(product.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted hover:border-primary hover:text-white',
                    )}
                  >
                    <GitCompare className="h-4 w-4" />
                    {isInCompare(product.id) ? 'Đang so sánh' : 'So sánh'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Tabs: Specifications + Description */}
      {hasTabs && (
        <section className="border-b border-border py-14 sm:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Tab headers */}
              <div className="mb-8 flex gap-1 border-b border-border">
                {hasSpecs && (
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={cn(
                      '-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors',
                      activeTab === 'specs'
                        ? 'border-primary text-white'
                        : 'border-transparent text-muted hover:text-white',
                    )}
                  >
                    Thông số kỹ thuật
                  </button>
                )}
                {product.description && (
                  <button
                    onClick={() => setActiveTab('description')}
                    className={cn(
                      '-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors',
                      activeTab === 'description'
                        ? 'border-primary text-white'
                        : 'border-transparent text-muted hover:text-white',
                    )}
                  >
                    Mô tả chi tiết
                  </button>
                )}
              </div>

              {/* Specs table */}
              {activeTab === 'specs' && hasSpecs && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border border-border"
                >
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-card' : 'bg-surface'}>
                          <td className="w-1/3 px-6 py-4 font-medium text-white">{key}</td>
                          <td className="px-6 py-4 text-muted">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {/* Description */}
              {activeTab === 'description' && product.description && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-invert max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </motion.div>
          </Container>
        </section>
      )}

      {/* Related products (same category) */}
      {related.length > 0 && (
        <section className="border-b border-border bg-surface/30 py-16 sm:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sản phẩm liên quan
              </p>
              <h2 className="mb-8 text-xl font-bold text-white">
                Cùng danh mục {product.category?.name && `"${product.category.name}"`}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => <MiniProductCard key={p.id} product={p} />)}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to={`/products-catalog${product.categoryId ? `?category=${product.categoryId}` : ''}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Xem tất cả {product.category?.name} →
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sản phẩm nổi bật
              </p>
              <h2 className="mb-8 text-xl font-bold text-white">Có thể bạn quan tâm</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((p) => <MiniProductCard key={p.id} product={p} />)}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/products-catalog"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Xem tất cả sản phẩm →
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      )}
    </>
  )
}
