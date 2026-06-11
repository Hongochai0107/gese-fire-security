import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { services } from '@/data/services'

export function ServicesSection() {
  return (
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
            Dịch vụ của chúng tôi
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Giải pháp toàn diện cho an toàn PCCC &amp; An ninh
          </h2>
          <p className="mt-4 text-lg text-muted">
            Từ tư vấn, thiết kế đến thi công và bảo trì — GESE đồng hành cùng doanh nghiệp trong
            toàn bộ vòng đời của hệ thống.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              role="listitem"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors duration-200 hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-background">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Tìm hiểu thêm
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Button to="/services" variant="outline" size="lg">
            Xem tất cả dịch vụ
          </Button>
        </div>
      </Container>
    </section>
  )
}
