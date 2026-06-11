import { motion } from 'framer-motion'
import { Building2, HardHat, ShieldCheck, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const stats = [
  { icon: HardHat, value: '15+', label: 'Năm kinh nghiệm triển khai' },
  { icon: Building2, value: '500+', label: 'Dự án đã hoàn thành' },
  { icon: Users, value: '200+', label: 'Khách hàng doanh nghiệp' },
  { icon: ShieldCheck, value: '100%', label: 'Đạt chuẩn nghiệm thu PCCC' },
]

const partners = [
  'VinGroup',
  'Sun Group',
  'FPT Corporation',
  'Saigon Co.op',
  'Becamex IDC',
  'Novaland',
]

export function TrustSection() {
  return (
    <section className="border-b border-border bg-surface py-16 sm:py-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          role="list"
          aria-label="Số liệu nổi bật của GESE"
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              role="listitem"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-3xl font-bold text-white sm:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mt-16 border-t border-border pt-12"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:text-left">
            Được tin tưởng bởi các đối tác hàng đầu
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-5 text-center text-sm font-semibold text-muted transition-colors duration-200 hover:border-primary/40 hover:text-white"
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
