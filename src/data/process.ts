import type { LucideIcon } from 'lucide-react'
import { BadgeCheck, ClipboardList, PenTool, Wrench } from 'lucide-react'

export interface ProcessStep {
  icon: LucideIcon
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Khảo sát & Tư vấn',
    description:
      'Kỹ sư GESE khảo sát thực tế công trình, trao đổi nhu cầu và đề xuất giải pháp phù hợp nhất.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Thiết kế kỹ thuật',
    description:
      'Lập bản vẽ thiết kế chi tiết theo TCVN, QCVN, hỗ trợ thẩm duyệt với cơ quan PCCC.',
  },
  {
    icon: Wrench,
    step: '03',
    title: 'Thi công & Lắp đặt',
    description:
      'Triển khai thi công trọn gói, giám sát chất lượng vật tư và tiến độ thi công chặt chẽ.',
  },
  {
    icon: BadgeCheck,
    step: '04',
    title: 'Nghiệm thu & Bảo trì',
    description:
      'Hỗ trợ nghiệm thu, bàn giao hồ sơ pháp lý và đồng hành bảo trì hệ thống dài hạn.',
  },
]
