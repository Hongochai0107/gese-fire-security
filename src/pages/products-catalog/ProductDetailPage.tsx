import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag, Phone, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { productApi } from '@/lib/api'
import type { Product } from '@/lib/api'
import { siteConfig } from '@/lib/site-config'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { DetailSkeleton, Skeleton } from '@/components/ui/Skeleton'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    queueMicrotask(() => { if (!cancelled) setLoading(true) })
    productApi.getBySlug(slug).then((p) => {
      if (!cancelled) setProduct(p)
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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  return (
    <>
      <section className="border-b border-border py-12 sm:py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link
              to="/products-catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Tất cả sản phẩm
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-card">
                {product.thumbnail ? (
                  <img src={product.thumbnail} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ShoppingBag className="h-20 w-20 text-border" />
                  </div>
                )}
                {product.category && (
                  <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Info */}
              <div>
                {product.sku && (
                  <p className="mb-2 text-xs text-subtle">SKU: {product.sku}</p>
                )}
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {product.name}
                </h1>
                {product.shortDescription && (
                  <p className="mt-4 text-lg text-muted">{product.shortDescription}</p>
                )}
                {product.price > 0 && (
                  <p className="mt-6 text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button to="/contact" size="lg">
                    Yêu cầu báo giá
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
                    variant="outline"
                    size="lg"
                  >
                    <Phone className="h-4 w-4" />
                    Hotline: {siteConfig.contact.hotline}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Thông số kỹ thuật
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-card' : 'bg-surface'}>
                        <td className="px-6 py-4 font-medium text-white">{key}</td>
                        <td className="px-6 py-4 text-muted">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Description */}
      {product.description && (
        <section className="border-b border-border py-16 sm:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="prose prose-invert mx-auto max-w-3xl"
            >
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary not-prose">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Mô tả chi tiết
              </p>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </motion.div>
          </Container>
        </section>
      )}
    </>
  )
}
