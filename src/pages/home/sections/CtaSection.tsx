import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/site-config'

export function CtaSection() {
  return (
    <section className="border-b border-border bg-surface py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]" />
            <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
          </div>

          <p className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Sẵn sàng bảo vệ doanh nghiệp của bạn?
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Nhận tư vấn &amp; báo giá miễn phí từ đội ngũ chuyên gia GESE
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Đội ngũ kỹ sư của chúng tôi sẵn sàng khảo sát hiện trạng, tư vấn giải pháp PCCC &amp;
            an ninh phù hợp nhất với công trình của bạn — hoàn toàn miễn phí, không ràng buộc.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to="/contact" size="lg">
              Yêu cầu báo giá ngay
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
              variant="outline"
              size="lg"
            >
              <Phone className="h-4 w-4" />
              Hotline: {siteConfig.contact.hotline}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
