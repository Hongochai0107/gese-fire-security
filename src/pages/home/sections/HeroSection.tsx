import { motion } from 'framer-motion'
import { ArrowRight, Award, Camera, CheckCircle2, Flame, ShieldCheck, Wrench } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'

const trustPoints = [
  'Đạt chuẩn TCVN PCCC mới nhất',
  'Kỹ sư có chứng chỉ hành nghề PCCC',
  'Bảo hành & bảo trì dài hạn',
]

const serviceTiles = [
  { icon: Flame, label: 'Hệ thống chữa cháy' },
  { icon: Camera, label: 'Giám sát an ninh 24/7' },
  { icon: ShieldCheck, label: 'Kiểm định & nghiệm thu' },
  { icon: Wrench, label: 'Bảo trì định kỳ' },
]

const itemTransition = { duration: 0.6, ease: 'easeOut' as const }

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_40%,transparent_100%)]" />
        <div className="absolute -top-32 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 left-[-10%] h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <Container>
        <div className="grid gap-16 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p
              variants={fadeInUp}
              transition={itemTransition}
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Giải pháp PCCC &amp; An ninh chuyên nghiệp
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              transition={itemTransition}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Bảo vệ con người &amp; tài sản với{' '}
              <span className="fire-text">hệ thống PCCC</span> đạt chuẩn
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={itemTransition}
              className="mt-6 max-w-xl text-lg text-muted"
            >
              Tư vấn, thiết kế, thi công và bảo trì hệ thống Phòng cháy chữa cháy &amp; An ninh
              đạt chuẩn cho nhà máy, tòa nhà và trung tâm thương mại.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={itemTransition}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button to="/contact" size="lg">
                Yêu cầu báo giá
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Khám phá dịch vụ
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeInUp}
              transition={itemTransition}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
            >
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  GESE Control Center
                </span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {serviceTiles.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col gap-4 bg-card p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-glow sm:flex"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-background">
                <Award className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-bold text-white">15+ năm</p>
                <p className="text-xs text-muted">Kinh nghiệm triển khai</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
