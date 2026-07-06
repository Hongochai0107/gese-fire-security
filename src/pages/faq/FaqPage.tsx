import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Seo } from '@/components/Seo'
import { cn } from '@/lib/utils'

const faqs = [
  {
    category: 'Quy định & Pháp lý',
    items: [
      {
        q: 'Công trình nào bắt buộc phải lắp hệ thống PCCC?',
        a: 'Theo Nghị định 136/2020/NĐ-CP, các công trình bắt buộc gồm: nhà cao tầng từ 5 tầng trở lên, tòa nhà văn phòng diện tích ≥ 300 m², nhà xưởng/kho từ 1.000 m², trung tâm thương mại, bệnh viện, trường học và cơ sở lưu trú từ 10 phòng. GESE tư vấn miễn phí để xác định yêu cầu cụ thể cho công trình của bạn.',
      },
      {
        q: 'Hệ thống PCCC cần được kiểm định bao lâu một lần?',
        a: 'Theo quy định hiện hành, hệ thống PCCC phải được kiểm tra định kỳ 6 tháng/lần và kiểm định toàn diện 1 năm/lần bởi đơn vị có chứng chỉ. GESE cung cấp dịch vụ bảo trì định kỳ với báo cáo đầy đủ để phục vụ kiểm tra của cơ quan chức năng.',
      },
      {
        q: 'Thủ tục thẩm duyệt thiết kế PCCC gồm những gì?',
        a: 'Hồ sơ thẩm duyệt gồm: đơn đề nghị, bản vẽ thiết kế kỹ thuật thi công, bản vẽ tổng mặt bằng, thuyết minh tính toán và hồ sơ pháp lý công trình. GESE hỗ trợ chuẩn bị toàn bộ hồ sơ và đại diện làm việc với Cảnh sát PCCC.',
      },
    ],
  },
  {
    category: 'Sản phẩm & Thiết bị',
    items: [
      {
        q: 'GESE phân phối thiết bị của những hãng nào?',
        a: 'GESE là nhà phân phối chính hãng của Hochiki (Nhật Bản), Notifier (Mỹ), Bosch Security Systems (Đức) và Hikvision (Trung Quốc). Tất cả thiết bị đều có chứng nhận xuất xứ, tem chống hàng giả và bảo hành theo chính sách hãng.',
      },
      {
        q: 'Sản phẩm có bảo hành không? Thời gian bảo hành bao lâu?',
        a: 'Tất cả thiết bị được bảo hành 12–24 tháng tùy hãng (Hochiki 24 tháng, Notifier 18 tháng, Bosch 24 tháng, Hikvision 24 tháng). Ngoài bảo hành hãng, GESE còn bảo hành thêm 6 tháng cho công lắp đặt. Trong thời gian bảo hành, GESE sửa chữa/thay thế miễn phí trong vòng 24 giờ.',
      },
      {
        q: 'Làm sao biết sản phẩm phù hợp với công trình của tôi?',
        a: 'GESE cung cấp dịch vụ khảo sát và tư vấn miễn phí tại công trình. Kỹ sư của chúng tôi sẽ đánh giá đặc điểm công trình (diện tích, chiều cao, vật liệu, nguy cơ cháy nổ) để đề xuất giải pháp và thiết bị phù hợp nhất với ngân sách.',
      },
    ],
  },
  {
    category: 'Thi công & Lắp đặt',
    items: [
      {
        q: 'Thời gian thi công một hệ thống PCCC mất bao lâu?',
        a: 'Thời gian thi công phụ thuộc vào quy mô: nhà ở 5–7 ngày, văn phòng dưới 500 m² từ 7–14 ngày, nhà xưởng/tòa nhà lớn từ 30–90 ngày. GESE cam kết đúng tiến độ, có hợp đồng phạt chậm tiến độ để đảm bảo quyền lợi cho khách hàng.',
      },
      {
        q: 'GESE có thể thi công ngoài giờ hành chính không?',
        a: 'Có. GESE hỗ trợ thi công ca đêm và cuối tuần để không ảnh hưởng hoạt động kinh doanh của khách hàng, đặc biệt với các công trình văn phòng, khách sạn và trung tâm thương mại đang vận hành.',
      },
      {
        q: 'Sau khi thi công xong có được nghiệm thu và bàn giao hồ sơ không?',
        a: 'Có. GESE thực hiện đầy đủ quy trình: chạy thử hệ thống, nghiệm thu nội bộ, hỗ trợ nghiệm thu với cơ quan PCCC và bàn giao hồ sơ hoàn công gồm bản vẽ hoàn công, biên bản nghiệm thu, hướng dẫn vận hành và phiếu bảo hành.',
      },
    ],
  },
  {
    category: 'Dịch vụ & Hợp tác',
    items: [
      {
        q: 'GESE có cung cấp dịch vụ bảo trì định kỳ không?',
        a: 'Có. GESE có gói bảo trì hàng tháng, quý và năm. Mỗi lần bảo trì đội kỹ thuật sẽ kiểm tra toàn bộ thiết bị, vệ sinh đầu báo, kiểm tra nguồn điện dự phòng và cấp báo cáo bảo trì có chữ ký kỹ sư để lưu hồ sơ pháp lý.',
      },
      {
        q: 'Liên hệ để được báo giá như thế nào?',
        a: 'Bạn có thể: (1) Gọi hotline 1900 1234 để được tư vấn ngay, (2) Chat Zalo cùng số trên, (3) Điền form báo giá trên website và chọn sản phẩm quan tâm, (4) Gửi email kèm bản vẽ mặt bằng để nhận báo giá chi tiết trong 24 giờ.',
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className={cn('text-sm font-semibold leading-snug transition-colors sm:text-base', open ? 'text-primary' : 'text-white')}>
          {q}
        </span>
        <ChevronDown
          className={cn('h-5 w-5 shrink-0 text-muted transition-transform duration-300', open && 'rotate-180 text-primary')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqPage() {
  return (
    <>
      <Seo
        title="Câu hỏi thường gặp"
        description="Giải đáp các câu hỏi về quy định PCCC, sản phẩm, thi công lắp đặt và dịch vụ bảo trì hệ thống phòng cháy chữa cháy."
        url="/faq"
      />

      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Hỏi &amp; Đáp
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Câu hỏi thường gặp
            </h1>
            <p className="mt-4 text-lg text-muted">
              Tổng hợp các thắc mắc phổ biến về hệ thống PCCC &amp; An ninh — từ quy định pháp lý đến quy trình thi công.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {faqs.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: gi * 0.1 }}
                className="mb-10"
              >
                <h2 className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {group.category}
                </h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card px-6">
                  {group.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
              <p className="font-semibold text-white">Không tìm thấy câu trả lời bạn cần?</p>
              <p className="mt-2 text-sm text-muted">Đội ngũ kỹ sư GESE sẵn sàng tư vấn miễn phí 24/7.</p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="tel:19001234"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Gọi 1900 1234
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-white"
                >
                  Gửi câu hỏi
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
