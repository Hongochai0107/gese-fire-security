import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { CtaSection } from '@/pages/home/sections/CtaSection'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { projectApi } from '@/lib/api'
import type { ProjectItem } from '@/lib/api'

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    projectApi.list({ limit: 50 }).then((res) => {
      if (!cancelled) setProjects(res.data)
    }).catch(() => {}).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

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
              Dự án
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Dự án đã triển khai
            </h1>
            <p className="mt-4 text-lg text-muted">
              Khám phá các công trình PCCC &amp; an ninh tiêu biểu mà GESE đã thiết kế và thi công
              trên toàn quốc.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-20 text-center">
              <Building2 className="mx-auto h-12 w-12 text-subtle" />
              <p className="mt-4 text-muted">Chưa có dự án nào.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              role="list"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  role="listitem"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-surface">
                      {project.thumbnail ? (
                        <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-linear-to-br from-surface to-card">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
                          <Building2 className="relative h-16 w-16 text-primary/20" strokeWidth={1.25} />
                        </div>
                      )}
                      {project.completedAt && (
                        <span className="absolute right-3 top-3 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted backdrop-blur">
                          {new Date(project.completedAt).getFullYear()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {project.location && (
                        <div className="flex items-center gap-1.5 text-xs text-muted">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.location}
                        </div>
                      )}
                      <h3 className="mt-2 text-lg font-bold text-white">{project.title}</h3>
                      {project.description && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">{project.description}</p>
                      )}
                      {project.scope && project.scope.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.scope.map((item) => (
                            <span key={item} className="rounded-md border border-border px-2 py-1 text-xs text-muted">{item}</span>
                          ))}
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Xem chi tiết
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      <CtaSection />
    </>
  )
}
