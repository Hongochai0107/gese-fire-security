import { motion } from 'framer-motion'
import { BadgeCheck, FileCheck, GraduationCap, Headset } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const reasons = [
  {
    icon: GraduationCap,
    title: 'Đội ngũ kỹ sư có chứng chỉ hành nghề PCCC',
    description:
      '100% kỹ sư thiết kế và giám sát thi công được cấp chứng chỉ hành nghề PCCC theo quy định của Bộ Công an.',
  },
  {
    icon: FileCheck,
    title: 'Tuân thủ nghiêm ngặt TCVN & quy chuẩn quốc tế',
    description:
      'Mọi giải pháp được thiết kế và thi công theo TCVN 3890:2023, QCVN 06:2022/BXD và tiêu chuẩn NFPA.',
  },
  {
    icon: BadgeCheck,
    title: 'Bảo hành dài hạn & bảo trì trọn đời',
    description:
      'Cam kết bảo hành đến 24 tháng cho thiết bị và đồng hành bảo trì định kỳ trong suốt vòng đời công trình.',
  },
  {
    icon: Headset,
    title: 'Hỗ trợ kỹ thuật phản hồi nhanh 24/7',
    description:
      'Đội ngũ kỹ thuật trực tổng đài 24/7, có mặt xử lý sự cố trong vòng 2 giờ tại khu vực nội thành.',
  },
]

const standards = ['TCVN 3890:2023', 'QCVN 06:2022/BXD', 'ISO 9001:2015', 'NFPA']

const CIRCUMFERENCE = 2 * Math.PI * 45
const SATISFACTION_RATE = 0.98

export function WhyChooseUsSection() {
  return (
    <section className="border-b border-border bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Cam kết chất lượng GESE
                </span>
              </div>

              <div className="mt-10 flex justify-center">
                <div className="relative h-52 w-52">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      strokeWidth="6"
                      className="stroke-border"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="stroke-primary"
                      style={{ strokeDasharray: CIRCUMFERENCE }}
                      initial={{ strokeDashoffset: CIRCUMFERENCE }}
                      whileInView={{ strokeDashoffset: CIRCUMFERENCE * (1 - SATISFACTION_RATE) }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">98%</span>
                    <span className="mt-1 text-xs text-muted">Khách hàng hài lòng</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {standards.map((standard) => (
                  <span
                    key={standard}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Vì sao chọn GESE
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Đối tác đáng tin cậy cho an toàn doanh nghiệp
            </h2>
            <p className="mt-4 text-lg text-muted">
              Hơn một nhà thầu — GESE là đối tác đồng hành dài hạn, đảm bảo hệ thống PCCC &amp; an
              ninh của bạn luôn vận hành ổn định và đạt chuẩn.
            </p>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              role="list"
              className="mt-10 divide-y divide-border"
            >
              {reasons.map(({ icon: Icon, title, description }) => (
                <motion.li
                  key={title}
                  role="listitem"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
