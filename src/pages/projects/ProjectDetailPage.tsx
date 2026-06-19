import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Calendar, MapPin, Ruler, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { CtaSection } from '@/pages/home/sections/CtaSection'
import { ProjectCard } from '@/components/project/ProjectCard'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { projects } from '@/data/projects'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <NotFoundPage />
  }

  const { icon: Icon, category, year, title, location, description, scope, client, duration, scale } =
    project

  const relatedProjects = [
    ...projects.filter((item) => item.slug !== slug && item.category === category),
    ...projects.filter((item) => item.slug !== slug && item.category !== category),
  ].slice(0, 3)

  const stats = [
    { icon: Users, label: 'Chủ đầu tư', value: client },
    { icon: Calendar, label: 'Thời gian thực hiện', value: duration },
    { icon: Ruler, label: 'Quy mô', value: scale },
  ]

  return (
    <>
      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Tất cả dự án
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {category}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted">
                {year}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
            <p className="mt-4 text-lg text-muted">{description}</p>
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex aspect-2/1 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
            </div>
            <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-32 sm:w-32">
              <Icon className="h-12 w-12 sm:h-16 sm:w-16" />
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            role="list"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {stats.map(({ icon: StatIcon, label, value }) => (
              <motion.div
                key={label}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <StatIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Phạm vi công việc
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Hạng mục GESE đã triển khai
            </h2>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            role="list"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {scope.map((item) => (
              <motion.li
                key={item}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6 text-sm font-medium text-white"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {relatedProjects.length > 0 && (
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
                Dự án liên quan
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Các công trình khác của GESE
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              role="list"
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {relatedProjects.map((relatedProject) => (
                <motion.div
                  key={relatedProject.slug}
                  role="listitem"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <ProjectCard project={relatedProject} />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  )
}
