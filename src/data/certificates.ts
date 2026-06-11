import type { LucideIcon } from 'lucide-react'
import { Award, HeartPulse, Medal, ShieldCheck } from 'lucide-react'

export interface Certificate {
  icon: LucideIcon
  title: string
  issuer: string
}

export const certificates: Certificate[] = [
  {
    icon: ShieldCheck,
    title: 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ PCCC',
    issuer: 'Cục Cảnh sát PCCC & CNCH - Bộ Công an',
  },
  {
    icon: Medal,
    title: 'ISO 9001:2015',
    issuer: 'Hệ thống quản lý chất lượng',
  },
  {
    icon: HeartPulse,
    title: 'ISO 45001:2018',
    issuer: 'Hệ thống quản lý an toàn & sức khỏe nghề nghiệp',
  },
  {
    icon: Award,
    title: 'Chứng chỉ năng lực HĐXD hạng I',
    issuer: 'Bộ Xây dựng',
  },
]
