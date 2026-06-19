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
  featured: boolean
  client: string
  duration: string
  scale: string
}

export const projects: Project[] = [
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
    featured: true,
    client: 'Công ty TNHH Điện tử ABC Việt Nam',
    duration: '4 tháng (06/2023 - 09/2023)',
    scale: 'Nhà xưởng 45.000 m²',
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
    featured: true,
    client: 'Riverside Plaza Investment',
    duration: '6 tháng (03/2022 - 08/2022)',
    scale: 'Trung tâm thương mại 6 tầng',
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
    featured: true,
    client: 'Sky Residence Corporation',
    duration: '8 tháng (01/2024 - 08/2024)',
    scale: '3 tòa tháp căn hộ cao tầng',
  },
  {
    slug: 'nha-may-che-bien-thuc-pham-long-an',
    icon: Factory,
    category: 'Nhà máy sản xuất',
    year: '2023',
    title: 'Hệ thống PCCC nhà máy chế biến thực phẩm',
    location: 'KCN Đức Hòa, Long An',
    description:
      'Lắp đặt hệ thống chữa cháy Sprinkler kết hợp bọt Foam cho khu vực kho lạnh và xưởng sản xuất.',
    scope: ['Hệ thống Sprinkler', 'Chữa cháy bọt Foam', 'Hệ thống bơm chữa cháy'],
    featured: false,
    client: 'Công ty CP Thực phẩm Long An',
    duration: '3 tháng (04/2023 - 06/2023)',
    scale: 'Nhà xưởng & kho lạnh 20.000 m²',
  },
  {
    slug: 'trung-tam-thuong-mai-sunrise-da-nang',
    icon: Building2,
    category: 'Trung tâm thương mại',
    year: '2023',
    title: 'Hệ thống PCCC & an ninh Trung tâm thương mại Sunrise',
    location: 'Quận Hải Châu, TP. Đà Nẵng',
    description:
      'Cải tạo và nâng cấp hệ thống báo cháy, chữa cháy và camera giám sát cho trung tâm thương mại 8 tầng.',
    scope: ['Cải tạo hệ thống báo cháy', 'Hệ thống chữa cháy Sprinkler', 'Camera an ninh'],
    featured: false,
    client: 'Sunrise Retail Group',
    duration: '5 tháng (07/2023 - 11/2023)',
    scale: 'Trung tâm thương mại 8 tầng',
  },
  {
    slug: 'khu-do-thi-green-valley-ha-noi',
    icon: Building,
    category: 'Khu dân cư',
    year: '2022',
    title: 'Hệ thống PCCC khu đô thị Green Valley',
    location: 'Huyện Hoài Đức, Hà Nội',
    description:
      'Thiết kế và thi công hệ thống PCCC cho khu đô thị gồm 5 block chung cư và khu thương mại dịch vụ.',
    scope: ['Thiết kế hệ thống', 'Thi công lắp đặt', 'Kiểm soát ra vào'],
    featured: false,
    client: 'Green Valley Real Estate',
    duration: '10 tháng (09/2021 - 06/2022)',
    scale: '5 block chung cư & khu thương mại',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
