import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/components/motion/variants'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import api from '@/lib/api'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: siteConfig.contact.address,
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Hotline',
    value: siteConfig.contact.hotline,
    href: `tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Clock,
    label: 'Giờ làm việc',
    value: 'Thứ 2 - Thứ 7: 08:00 - 17:30',
    href: undefined,
  },
]

const inputStyles =
  'w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white placeholder:text-subtle transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || undefined,
      company: (formData.get('company') as string) || undefined,
      service: (formData.get('service') as string) || undefined,
      message: formData.get('message') as string,
      source: 'contact_page',
    }
    try {
      await api.post('/leads/submit', body)
      setSubmitted(true)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

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
              Liên hệ
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Liên hệ với GESE
            </h1>
            <p className="mt-4 text-lg text-muted">
              Gửi yêu cầu tư vấn hoặc liên hệ trực tiếp với đội ngũ kinh doanh &amp; kỹ thuật
              của chúng tôi — phản hồi trong vòng 2 giờ làm việc.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Thông tin liên hệ
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Chúng tôi luôn sẵn sàng hỗ trợ
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                role="list"
                className="mt-10 flex flex-col gap-6"
              >
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    role="listitem"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex items-start gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 text-sm font-medium text-white hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-white">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-10 overflow-hidden rounded-2xl border border-border">
                <div className="relative flex aspect-video items-center justify-center bg-card">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
                  </div>
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 text-sm text-muted">Bản đồ sẽ được tích hợp tại đây</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
                <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Gửi yêu cầu tư vấn
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Nhận báo giá miễn phí
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Điền thông tin bên dưới, đội ngũ GESE sẽ liên hệ lại trong thời gian sớm nhất.
                </p>

                {submitted ? (
                  <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                      <Send className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">
                      Gửi yêu cầu thành công!
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      Cảm ơn bạn đã liên hệ. Đội ngũ GESE sẽ phản hồi trong vòng 2 giờ làm việc.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-semibold text-primary"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                          Họ và tên <span className="text-error">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-white"
                        >
                          Số điện thoại <span className="text-error">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="0912 345 678"
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@congty.vn"
                        className={inputStyles}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-white"
                      >
                        Công ty / Tổ chức
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Tên công ty"
                        className={inputStyles}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="mb-2 block text-sm font-medium text-white"
                      >
                        Dịch vụ quan tâm
                      </label>
                      <select
                        id="service"
                        name="service"
                        className={cn(inputStyles, 'appearance-none')}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Chọn dịch vụ
                        </option>
                        <option value="tu-van-thiet-ke">Tư vấn & Thiết kế PCCC</option>
                        <option value="thi-cong">Thi công lắp đặt PCCC</option>
                        <option value="bao-chay">Hệ thống báo cháy tự động</option>
                        <option value="chua-chay">Hệ thống chữa cháy tự động</option>
                        <option value="camera-an-ninh">Camera & Giám sát an ninh</option>
                        <option value="bao-tri">Kiểm định, bảo trì & bảo dưỡng</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-white"
                      >
                        Nội dung yêu cầu <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Mô tả ngắn về công trình và nhu cầu PCCC / an ninh..."
                        className={cn(inputStyles, 'resize-none')}
                      />
                    </div>

                    {error && (
                      <p className="rounded-xl border border-error/30 bg-error/10 px-4 py-2.5 text-sm text-error">{error}</p>
                    )}

                    <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
                      <Send className="h-4 w-4" />
                      {submitting ? 'Đang gửi...' : 'Gửi yêu cầu báo giá'}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
