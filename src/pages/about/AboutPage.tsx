import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { CtaSection } from '@/pages/home/sections/CtaSection'
import { CertificatesSection } from '@/pages/home/sections/CertificatesSection'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { companyStats, coreValues, milestones } from '@/data/about'
import { siteConfig } from '@/lib/site-config'

export function AboutPage() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Giới thiệu
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Về {siteConfig.name}
            </h1>
            <p className="mt-4 text-lg text-muted">{siteConfig.description}</p>
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Câu chuyện GESE
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Từ đội ngũ 5 kỹ sư đến đơn vị PCCC toàn quốc
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  GESE Fire &amp; Security được thành lập năm 2015 tại TP. Hồ Chí Minh với sứ mệnh
                  mang đến giải pháp PCCC &amp; an ninh chuyên nghiệp, đạt chuẩn quốc tế cho các
                  doanh nghiệp Việt Nam.
                </p>
                <p>
                  Sau gần một thập kỷ phát triển, GESE đã trở thành đối tác tin cậy của hàng trăm
                  doanh nghiệp — từ nhà máy sản xuất, trung tâm thương mại đến khu đô thị cao tầng,
                  trải dài trên toàn quốc.
                </p>
                <p>
                  Với đội ngũ hơn 50 kỹ sư và kỹ thuật viên được đào tạo bài bản, cùng hệ thống
                  quản lý chất lượng ISO 9001 &amp; ISO 45001, GESE cam kết đồng hành dài hạn — từ
                  tư vấn, thiết kế, thi công đến bảo trì trọn đời.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
              </div>
              <div className="text-center">
                <span className="text-6xl font-bold text-primary sm:text-7xl">9+</span>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                  Năm kinh nghiệm
                </p>
              </div>
            </motion.div>
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
              Giá trị cốt lõi
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Nền tảng cho mọi giải pháp
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            role="list"
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {coreValues.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col rounded-2xl border border-border bg-card p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

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
              Hành trình phát triển
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Những cột mốc quan trọng
            </h2>
          </motion.div>

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-border sm:block lg:left-1/2 lg:-translate-x-px" />

            <div className="flex flex-col gap-12">
              {milestones.map(({ year, title, description }, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  className="relative grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12"
                >
                  <div
                    className={`hidden lg:block ${index % 2 === 0 ? 'text-right' : 'order-3 text-left'}`}
                  >
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                  </div>

                  <div className="relative flex items-start justify-center sm:flex-col sm:items-center">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    className={`lg:hidden ${index % 2 === 0 ? '' : ''}`}
                  >
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                  </div>

                  <div
                    className={`hidden lg:block ${index % 2 === 0 ? 'order-3' : ''}`}
                  >
                    <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {year}
                    </span>
                  </div>

                  <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary lg:hidden">
                    {year}
                  </span>
                </motion.div>
              ))}
            </div>
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
              Thành tựu
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Con số nói lên tất cả
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            role="list"
            className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {companyStats.map(({ value, label }) => (
              <motion.div
                key={label}
                role="listitem"
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-10 text-center"
              >
                <span className="text-4xl font-bold text-primary sm:text-5xl">{value}</span>
                <span className="mt-3 text-sm text-muted">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CertificatesSection />

      <CtaSection />
    </>
  )
}
