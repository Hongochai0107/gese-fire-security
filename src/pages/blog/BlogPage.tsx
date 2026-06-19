import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { blogCategories, blogPosts } from '@/data/blog'
import type { BlogCategory } from '@/data/blog'
import { cn } from '@/lib/utils'

type BlogFilter = 'Tất cả' | BlogCategory

const filters: BlogFilter[] = ['Tất cả', ...blogCategories]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>('Tất cả')

  const filteredPosts = useMemo(
    () =>
      activeFilter === 'Tất cả'
        ? blogPosts
        : blogPosts.filter((post) => post.category === activeFilter),
    [activeFilter],
  )

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
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-200',
                  activeFilter === filter
                    ? 'border-primary bg-primary text-background'
                    : 'border-border text-muted hover:border-primary/40 hover:text-white',
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            role="list"
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {filteredPosts.map(({ slug, category, date, readTime, title, excerpt }) => (
              <motion.article
                key={slug}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
              >
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-surface to-card">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
                  <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                    {category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-subtle">
                    <time dateTime={date}>{formatDate(date)}</time>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {readTime}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-white">{title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{excerpt}</p>
                  <Link
                    to={`/blog/${slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Đọc bài viết
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
