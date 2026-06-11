import type { LucideIcon } from 'lucide-react'
import { Building, Building2, Factory } from 'lucide-react'

export interface Project {
  icon: LucideIcon
  category: string
  title: string
  location: string
  description: string
}

export const featuredProjects: Project[] = [
  {
    icon: Factory,
    category: 'Nhà máy sản xuất',
    title: 'Hệ thống PCCC nhà máy sản xuất linh kiện điện tử',
    location: 'KCN Yên Phong, Bắc Ninh',
    description:
      'Thiết kế & thi công hệ thống báo cháy địa chỉ và chữa cháy Sprinkler cho nhà xưởng quy mô 45.000 m².',
  },
  {
    icon: Building2,
    category: 'Trung tâm thương mại',
    title: 'Giải pháp PCCC & an ninh Riverside Plaza',
    location: 'Quận 1, TP. Hồ Chí Minh',
    description:
      'Tích hợp hệ thống chữa cháy, báo cháy và camera giám sát cho trung tâm thương mại 6 tầng.',
  },
  {
    icon: Building,
    category: 'Khu dân cư',
    title: 'Hệ thống PCCC khu phức hợp Sky Residence',
    location: 'Quận 7, TP. Hồ Chí Minh',
    description:
      'Lắp đặt hệ thống chữa cháy tự động và kiểm soát ra vào cho 3 tòa tháp căn hộ cao tầng.',
  },
]
