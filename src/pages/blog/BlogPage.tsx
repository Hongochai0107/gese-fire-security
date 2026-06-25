import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Newspaper } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { newsApi } from '@/lib/api'
import { ArticleGridSkeleton } from '@/components/ui/Skeleton'
import type { Article } from '@/lib/api'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [articles, setArticles] = useState<Article[]>([])
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)

  const currentPage = Number(searchParams.get('page')) || 1
  const currentStatus = 'published'

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => { if (!cancelled) setLoading(true) })
    newsApi.list({ page: currentPage, limit: 12, status: currentStatus }).then((res) => {
      if (!cancelled) { setArticles(res.data); setMeta(res.meta) }
    }).catch(() => {}).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [currentPage])

  const updatePage = (page: number) => {
    const next = new URLSearchParams(searchParams)
    if (page > 1) next.set('page', String(page))
    else next.delete('page')
    setSearchParams(next)
  }

  return (
    <>
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
              Blog
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tin tức &amp; Kiến thức PCCC
            </h1>
            <p className="mt-4 text-lg text-muted">
              Cập nhật các bài viết, hướng dẫn và quy định mới nhất về PCCC &amp; an ninh.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          {loading ? (
            <ArticleGridSkeleton count={3} />
          ) : articles.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-20 text-center">
              <Newspaper className="mx-auto h-12 w-12 text-subtle" />
              <p className="mt-4 text-muted">Chưa có bài viết nào.</p>
            </div>
          ) : (
            <>
              <motion.div
                key={currentPage}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                role="list"
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              >
                {articles.map((article) => (
                  <motion.article
                    key={article.id}
                    role="listitem"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
                  >
                    <div className="relative aspect-video overflow-hidden bg-surface">
                      {article.thumbnail ? (
                        <img src={article.thumbnail} alt={article.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-linear-to-br from-surface to-card">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>
                      )}
                      {article.category && (
                        <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                          {article.category.name}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs text-subtle">
                        <time dateTime={article.publishedAt || article.createdAt}>
                          {formatDate(article.publishedAt || article.createdAt)}
                        </time>
                        {article.author && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span>{article.author.name}</span>
                          </>
                        )}
                      </div>
                      <h2 className="mt-3 text-lg font-bold text-white">{article.title}</h2>
                      {article.excerpt && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">{article.excerpt}</p>
                      )}
                      <Link
                        to={`/blog/${article.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      >
                        Đọc bài viết
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {meta.totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button onClick={() => updatePage(currentPage - 1)} disabled={currentPage <= 1}
                    className="flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm text-muted hover:border-primary hover:text-white disabled:opacity-40">
                    <ChevronLeft className="h-4 w-4" /> Trước
                  </button>
                  <span className="text-sm text-muted">Trang {meta.page} / {meta.totalPages}</span>
                  <button onClick={() => updatePage(currentPage + 1)} disabled={currentPage >= meta.totalPages}
                    className="flex items-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm text-muted hover:border-primary hover:text-white disabled:opacity-40">
                    Sau <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  )
}
