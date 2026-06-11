import type { LucideIcon } from 'lucide-react'
import { Building, Building2, Factory } from 'lucide-react'

export const projectCategories = [
  'Nhà máy sản xuất',
  'Trung tâm thương mại',
  'Khu dân cư',
] as const

export type ProjectCategory = (typeof projectCategories)[number]

export interface Project {
  slug: string
  icon: LucideIcon
  category: ProjectCategory
  year: string
  title: string
  location: string
  description: string
  scope: string[]
}

export const featuredProjects: Project[] = [
  {
    slug: 'nha-may-linh-kien-dien-tu-yen-phong',
    icon: Factory,
    category: 'Nhà máy sản xuất',
    year: '2023',
    title: 'Hệ thống PCCC nhà máy sản xuất linh kiện điện tử',
    location: 'KCN Yên Phong, Bắc Ninh',
    description:
      'Thiết kế & thi công hệ thống báo cháy địa chỉ và chữa cháy Sprinkler cho nhà xưởng quy mô 45.000 m².',
    scope: ['Thiết kế hệ thống', 'Thi công lắp đặt', 'Nghiệm thu PCCC'],
  },
  {
    slug: 'giai-phap-pccc-an-ninh-riverside-plaza',
    icon: Building2,
    category: 'Trung tâm thương mại',
    year: '2022',
    title: 'Giải pháp PCCC & an ninh Riverside Plaza',
    location: 'Quận 1, TP. Hồ Chí Minh',
    description:
      'Tích hợp hệ thống chữa cháy, báo cháy và camera giám sát cho trung tâm thương mại 6 tầng.',
    scope: ['Hệ thống chữa cháy', 'Hệ thống báo cháy', 'Camera giám sát'],
  },
  {
    slug: 'he-thong-pccc-sky-residence',
    icon: Building,
    category: 'Khu dân cư',
    year: '2024',
    title: 'Hệ thống PCCC khu phức hợp Sky Residence',
    location: 'Quận 7, TP. Hồ Chí Minh',
    description:
      'Lắp đặt hệ thống chữa cháy tự động và kiểm soát ra vào cho 3 tòa tháp căn hộ cao tầng.',
    scope: ['Chữa cháy tự động', 'Kiểm soát ra vào', 'Bảo trì định kỳ'],
  },
]
