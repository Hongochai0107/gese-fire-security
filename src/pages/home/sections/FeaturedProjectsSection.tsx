import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ProjectCard } from '@/components/project/ProjectCard'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { featuredProjects } from '@/data/projects'

export function FeaturedProjectsSection() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Dự án tiêu biểu
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Công trình đã triển khai
            </h2>
            <p className="mt-4 text-lg text-muted">
              Một số dự án PCCC &amp; an ninh tiêu biểu mà GESE đã tư vấn, thiết kế và thi công
              trên toàn quốc.
            </p>
          </div>
          <Button to="/projects" variant="outline" size="lg" className="shrink-0">
            Xem tất cả dự án
          </Button>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {featuredProjects.map((project) => (
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
  )
}
