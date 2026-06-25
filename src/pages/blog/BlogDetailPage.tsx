import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { newsApi } from '@/lib/api'
import type { Article } from '@/lib/api'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { DetailSkeleton } from '@/components/ui/Skeleton'

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    queueMicrotask(() => { if (!cancelled) setLoading(true) })
    newsApi.getBySlug(slug).then((a) => {
      if (!cancelled) setArticle(a)
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
          <div className="mx-auto max-w-3xl">
            <DetailSkeleton />
          </div>
        </Container>
      </section>
    )
  }

  if (notFound || !article) return <NotFoundPage />

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <>
      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="h-4 w-4" /> Tất cả bài viết
            </Link>

            {article.category && (
              <span className="mt-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {article.category.name}
              </span>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {article.author.name}
                </span>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {article.thumbnail && (
        <section className="border-b border-border bg-surface py-10">
          <Container>
            <img src={article.thumbnail} alt={article.title} className="mx-auto max-w-3xl rounded-2xl border border-border" />
          </Container>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <Container>
          <div
            className="prose prose-invert mx-auto max-w-3xl prose-headings:text-white prose-p:text-muted prose-a:text-primary prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </Container>
      </section>
    </>
  )
}
