import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, ArrowRight, CheckCircle2, Camera, Flame, Shield, Radio, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GeseLogoMark } from '@/components/icons/GeseLogo'
import { siteConfig } from '@/lib/site-config'

const STORAGE_KEY = 'gese_promo_dismissed'
const SHOW_DELAY = 2000

const services = [
  'Thiết kế hệ thống PCCC',
  'Thi công trọn gói',
  'Camera giám sát',
  'Access Control',
  'Bảo trì định kỳ',
  'Hỗ trợ 24/7',
]

function BackgroundIcons() {
  const icons = [
    { Icon: Camera, x: '8%', y: '15%', rotate: -15, size: 40 },
    { Icon: Flame, x: '85%', y: '20%', rotate: 12, size: 36 },
    { Icon: Shield, x: '75%', y: '75%', rotate: -8, size: 42 },
    { Icon: Radio, x: '12%', y: '70%', rotate: 20, size: 34 },
    { Icon: Droplets, x: '50%', y: '85%', rotate: -12, size: 38 },
    { Icon: Camera, x: '90%', y: '50%', rotate: 15, size: 32 },
  ]

  return (
    <>
      {icons.map(({ Icon, x, y, rotate, size }, i) => (
        <Icon
          key={i}
          className="absolute text-primary/[0.04]"
          style={{ left: x, top: y, transform: `rotate(${rotate}deg)`, width: size, height: size }}
        />
      ))}
    </>
  )
}

export function PromoPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (dismissed) return

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-[900px] overflow-hidden rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Grid pattern background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0fdf4] to-[#dcfce7]" />
              <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(22,163,74,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,163,74,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-[80px]" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/8 blur-[60px]" />

              <BackgroundIcons />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/5 text-gray-500 transition-colors hover:bg-gray-900/10 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>

              {/* HOT badge */}
              <div className="absolute right-14 top-4 z-10">
                <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E53935] to-[#FF7A00] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/25">
                  <Flame className="h-3.5 w-3.5" />
                  Giảm 20%
                </div>
              </div>

              {/* Content */}
              <div className="relative grid gap-0 md:grid-cols-[1fr_320px]">
                {/* Left — Main content */}
                <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12">
                  {/* Logo */}
                  <GeseLogoMark className="mb-6 h-10 w-auto sm:h-12" />

                  {/* Heading */}
                  <div>
                    <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                      Ưu đãi thi công
                      <br />
                      <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                        hệ thống PCCC & An ninh
                      </span>
                    </h2>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-lg bg-[#E53935]/10 px-3 py-1.5 text-sm font-bold text-[#E53935]">
                        Giảm đến 20%
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="inline-flex items-center rounded-lg bg-[#FF7A00]/10 px-3 py-1.5 text-sm font-bold text-[#FF7A00]">
                        Miễn phí khảo sát & tư vấn
                      </span>
                    </div>
                  </div>

                  {/* Services */}
                  <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:mt-8">
                    {services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button to="/contact" size="lg" onClick={handleClose}>
                      Yêu cầu báo giá
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button to="/services" variant="outline" size="lg" onClick={handleClose} className="border-primary/30 text-primary hover:border-primary hover:text-primary-dark">
                      Khám phá dịch vụ
                    </Button>
                  </div>

                  {/* Footer info */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-5 text-xs text-gray-500 sm:gap-6">
                    <a
                      href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
                      className="flex items-center gap-1.5 font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      {siteConfig.contact.hotline}
                    </a>
                    <span className="text-gray-400">|</span>
                    <span>www.gese.vn</span>
                  </div>
                </div>

                {/* Right — Visual panel (desktop only) */}
                <div className="relative hidden overflow-hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary-dark" />
                  <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

                  <div className="relative flex h-full flex-col items-center justify-center p-8 text-center text-white">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                      <Shield className="h-10 w-10" />
                    </div>

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                      Hơn 9 năm kinh nghiệm
                    </p>
                    <p className="mt-3 text-3xl font-extrabold leading-tight">
                      500+
                    </p>
                    <p className="text-sm text-white/80">Dự án đã triển khai</p>

                    <div className="mt-8 w-full space-y-3">
                      {[
                        { label: 'Nhà máy & Khu CN', pct: 85 },
                        { label: 'Tòa nhà văn phòng', pct: 70 },
                        { label: 'TTTM & Khách sạn', pct: 60 },
                      ].map(({ label, pct }) => (
                        <div key={label}>
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="text-white/80">{label}</span>
                            <span className="font-semibold">{pct}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                              className="h-full rounded-full bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 text-xs text-white/60">
                      Đối tác tin cậy trong lĩnh vực<br />PCCC & An ninh doanh nghiệp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
