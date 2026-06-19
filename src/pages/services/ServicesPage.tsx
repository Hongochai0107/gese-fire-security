import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { CtaSection } from '@/pages/home/sections/CtaSection'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { services } from '@/data/services'
import { processSteps } from '@/data/process'
import { cn } from '@/lib/utils'

export function ServicesPage() {
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
              Dịch vụ
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Giải pháp PCCC &amp; An ninh toàn diện
            </h1>
            <p className="mt-4 text-lg text-muted">
              Từ tư vấn, thiết kế đến thi công và bảo trì — GESE đồng hành cùng doanh nghiệp trong
              toàn bộ vòng đời của hệ thống PCCC &amp; an ninh.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-20 sm:gap-28">
            {services.map(({ icon: Icon, title, description, features }, index) => {
              const isReversed = index % 2 === 1

              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
                >
                  <div className={cn('relative', isReversed && 'lg:order-2')}>
                    <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card">
                      <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]" />
                        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
                      </div>
                      <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-12 w-12" />
                      </span>
                    </div>
                  </div>

                  <div className={isReversed ? 'lg:order-1' : undefined}>
                    <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Dịch vụ {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-white">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

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
              Quy trình làm việc
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              4 bước đồng hành cùng dự án của bạn
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            role="list"
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {processSteps.map(({ icon: Icon, step, title, description }) => (
              <motion.div
                key={step}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-3xl font-bold text-border">{step}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}
