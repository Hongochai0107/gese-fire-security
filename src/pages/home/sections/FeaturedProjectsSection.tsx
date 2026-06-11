import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
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
          {featuredProjects.map(({ icon: Icon, category, title, location, description }) => (
            <motion.div
              key={title}
              role="listitem"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface to-card">
                <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
                <Icon
                  className="absolute -bottom-8 -right-8 h-40 w-40 text-primary/10 transition-transform duration-300 group-hover:scale-105"
                  strokeWidth={1.25}
                />
                <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                  {category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </div>
                <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                <Link
                  to="/projects"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Xem chi tiết
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
