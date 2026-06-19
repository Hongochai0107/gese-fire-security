import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { CtaSection } from '@/pages/home/sections/CtaSection'
import { ProjectCard } from '@/components/project/ProjectCard'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { projectCategories, projects } from '@/data/projects'
import type { ProjectCategory } from '@/data/projects'
import { cn } from '@/lib/utils'

type ProjectFilter = 'Tất cả' | ProjectCategory

const filters: ProjectFilter[] = ['Tất cả', ...projectCategories]

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('Tất cả')

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'Tất cả'
        ? projects
        : projects.filter((project) => project.category === activeFilter),
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
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}
