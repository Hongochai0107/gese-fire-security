import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { certificates } from '@/data/certificates'

export function CertificatesSection() {
  return (
    <section className="border-b border-border bg-surface py-20 sm:py-28">
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
            Chứng chỉ &amp; Năng lực
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Được công nhận bởi các tổ chức uy tín
          </h2>
          <p className="mt-4 text-lg text-muted">
            GESE đáp ứng đầy đủ các tiêu chuẩn, chứng chỉ và giấy phép hoạt động theo quy định của
            pháp luật Việt Nam và quốc tế.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {certificates.map(({ icon: Icon, title, issuer }) => (
            <motion.div
              key={title}
              role="listitem"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30" />
                <span className="absolute inset-2 rounded-full bg-primary/10" />
                <Icon className="relative h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-muted">{issuer}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
