import type { LucideIcon } from 'lucide-react'
import { Camera, ClipboardCheck, Compass, Droplets, HardHat, Siren } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: Compass,
    title: 'Tư vấn & Thiết kế hệ thống PCCC',
    description:
      'Khảo sát hiện trạng, tư vấn giải pháp và thiết kế hệ thống PCCC tối ưu, đúng theo Tiêu chuẩn Việt Nam (TCVN) hiện hành.',
  },
  {
    icon: HardHat,
    title: 'Thi công lắp đặt hệ thống PCCC',
    description:
      'Thi công trọn gói hệ thống báo cháy, chữa cháy tự động với đội ngũ kỹ sư giàu kinh nghiệm, đảm bảo tiến độ và chất lượng.',
  },
  {
    icon: Siren,
    title: 'Hệ thống báo cháy tự động',
    description:
      'Lắp đặt hệ thống báo cháy địa chỉ, cảm biến khói, nhiệt thế hệ mới, kết nối giám sát trung tâm theo thời gian thực.',
  },
  {
    icon: Droplets,
    title: 'Hệ thống chữa cháy tự động',
    description:
      'Giải pháp chữa cháy Sprinkler, khí FM200, CO2 cho nhà xưởng, trung tâm dữ liệu và khu vực có yêu cầu đặc thù.',
  },
  {
    icon: Camera,
    title: 'Camera & Giám sát an ninh',
    description:
      'Triển khai hệ thống CCTV, kiểm soát ra vào và giám sát an ninh 24/7, tích hợp cảnh báo thông minh.',
  },
  {
    icon: ClipboardCheck,
    title: 'Kiểm định, bảo trì & bảo dưỡng',
    description:
      'Kiểm định định kỳ, bảo trì hệ thống và hỗ trợ thủ tục nghiệm thu, gia hạn giấy phép PCCC theo quy định.',
  },
]
