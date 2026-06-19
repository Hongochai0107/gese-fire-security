import type { LucideIcon } from 'lucide-react'
import { Eye, Heart, Shield, Target } from 'lucide-react'

export interface CoreValue {
  icon: LucideIcon
  title: string
  description: string
}

export const coreValues: CoreValue[] = [
  {
    icon: Target,
    title: 'Sứ mệnh',
    description:
      'Mang đến giải pháp PCCC & an ninh đạt chuẩn, bảo vệ con người và tài sản cho mọi công trình tại Việt Nam.',
  },
  {
    icon: Eye,
    title: 'Tầm nhìn',
    description:
      'Trở thành đơn vị PCCC & an ninh hàng đầu Việt Nam, được khách hàng tin tưởng lựa chọn đầu tiên.',
  },
  {
    icon: Shield,
    title: 'An toàn tuyệt đối',
    description:
      'Mọi giải pháp đều tuân thủ nghiêm ngặt TCVN, QCVN và tiêu chuẩn quốc tế, không thỏa hiệp về an toàn.',
  },
  {
    icon: Heart,
    title: 'Tận tâm phục vụ',
    description:
      'Đặt lợi ích khách hàng lên hàng đầu, đồng hành từ khảo sát đến bảo trì dài hạn với tinh thần trách nhiệm cao nhất.',
  },
]

export interface Milestone {
  year: string
  title: string
  description: string
}

export const milestones: Milestone[] = [
  {
    year: '2015',
    title: 'Thành lập GESE',
    description:
      'GESE Fire & Security được thành lập tại TP. Hồ Chí Minh với đội ngũ 5 kỹ sư PCCC đầu tiên.',
  },
  {
    year: '2018',
    title: 'Đạt chứng nhận ISO 9001 & ISO 45001',
    description:
      'Hoàn thiện hệ thống quản lý chất lượng và an toàn lao động đạt tiêu chuẩn quốc tế.',
  },
  {
    year: '2020',
    title: 'Mở rộng quy mô toàn quốc',
    description:
      'Mở thêm chi nhánh tại Hà Nội và Đà Nẵng, phủ sóng dịch vụ trên toàn lãnh thổ Việt Nam.',
  },
  {
    year: '2022',
    title: 'Cột mốc 100+ dự án',
    description:
      'Hoàn thành hơn 100 công trình PCCC & an ninh cho nhà máy, trung tâm thương mại và khu dân cư.',
  },
  {
    year: '2024',
    title: 'Nâng cấp năng lực hạng I',
    description:
      'Được Bộ Xây dựng cấp chứng chỉ năng lực HĐXD hạng I, khẳng định vị thế hàng đầu ngành.',
  },
]

export interface CompanyStat {
  value: string
  label: string
}

export const companyStats: CompanyStat[] = [
  { value: '9+', label: 'Năm kinh nghiệm' },
  { value: '100+', label: 'Dự án hoàn thành' },
  { value: '50+', label: 'Kỹ sư & kỹ thuật viên' },
  { value: '98%', label: 'Khách hàng hài lòng' },
]
