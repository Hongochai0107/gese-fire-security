import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
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
            Khách hàng nói gì về GESE
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Được tin tưởng bởi các đối tác trên cả nước
          </h2>
          <p className="mt-4 text-lg text-muted">
            Sự hài lòng của khách hàng là thước đo quan trọng nhất cho chất lượng dịch vụ của
            chúng tôi.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {testimonials.map(({ quote, name, initials, role, company }) => (
            <motion.div
              key={name}
              role="listitem"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
              </div>
              <p className="mt-6 flex-1 text-base leading-relaxed text-muted">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{name}</p>
                  <p className="text-xs text-muted">
                    {role} · {company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
