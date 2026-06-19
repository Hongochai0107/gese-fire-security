import type { LucideIcon } from 'lucide-react'
import { Camera, ClipboardCheck, Compass, Droplets, HardHat, Siren } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

export const services: Service[] = [
  {
    icon: Compass,
    title: 'Tư vấn & Thiết kế hệ thống PCCC',
    description:
      'Khảo sát hiện trạng, tư vấn giải pháp và thiết kế hệ thống PCCC tối ưu, đúng theo Tiêu chuẩn Việt Nam (TCVN) hiện hành.',
    features: [
      'Khảo sát, đánh giá hiện trạng công trình',
      'Thiết kế bản vẽ kỹ thuật theo TCVN 3890, QCVN 06',
      'Tư vấn lựa chọn giải pháp tối ưu chi phí - hiệu quả',
      'Hỗ trợ thẩm duyệt thiết kế PCCC với cơ quan chức năng',
    ],
  },
  {
    icon: HardHat,
    title: 'Thi công lắp đặt hệ thống PCCC',
    description:
      'Thi công trọn gói hệ thống báo cháy, chữa cháy tự động với đội ngũ kỹ sư giàu kinh nghiệm, đảm bảo tiến độ và chất lượng.',
    features: [
      'Thi công trọn gói theo bản vẽ đã thẩm duyệt',
      'Đội ngũ kỹ sư, thợ lành nghề được đào tạo bài bản',
      'Giám sát thi công, kiểm soát chất lượng vật tư',
      'Bàn giao đúng tiến độ, hỗ trợ nghiệm thu công trình',
    ],
  },
  {
    icon: Siren,
    title: 'Hệ thống báo cháy tự động',
    description:
      'Lắp đặt hệ thống báo cháy địa chỉ, cảm biến khói, nhiệt thế hệ mới, kết nối giám sát trung tâm theo thời gian thực.',
    features: [
      'Đầu báo khói, báo nhiệt, báo gas thế hệ mới',
      'Tủ trung tâm báo cháy địa chỉ, hiển thị vị trí chính xác',
      'Tích hợp chuông, đèn, còi báo động toàn khu vực',
      'Kết nối giám sát, cảnh báo từ xa qua trung tâm điều hành',
    ],
  },
  {
    icon: Droplets,
    title: 'Hệ thống chữa cháy tự động',
    description:
      'Giải pháp chữa cháy Sprinkler, khí FM200, CO2 cho nhà xưởng, trung tâm dữ liệu và khu vực có yêu cầu đặc thù.',
    features: [
      'Hệ thống Sprinkler tự động cho nhà xưởng, kho bãi',
      'Chữa cháy bằng khí FM200, CO2 cho phòng máy chủ',
      'Hệ thống bơm chữa cháy, bể nước dự trữ chuyên dụng',
      'Thiết kế theo đặc thù từng loại công trình',
    ],
  },
  {
    icon: Camera,
    title: 'Camera & Giám sát an ninh',
    description:
      'Triển khai hệ thống CCTV, kiểm soát ra vào và giám sát an ninh 24/7, tích hợp cảnh báo thông minh.',
    features: [
      'Camera IP độ phân giải cao, lưu trữ NVR/Cloud',
      'Kiểm soát ra vào bằng thẻ, vân tay, nhận diện khuôn mặt',
      'Giám sát tập trung 24/7, cảnh báo bất thường tức thì',
      'Tích hợp với hệ thống báo cháy & quản lý tòa nhà (BMS)',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Kiểm định, bảo trì & bảo dưỡng',
    description:
      'Kiểm định định kỳ, bảo trì hệ thống và hỗ trợ thủ tục nghiệm thu, gia hạn giấy phép PCCC theo quy định.',
    features: [
      'Kiểm tra, bảo dưỡng định kỳ theo lịch trình',
      'Kiểm định thiết bị PCCC theo quy chuẩn',
      'Hỗ trợ thủ tục nghiệm thu, gia hạn giấy phép PCCC',
      'Phản ứng nhanh, sửa chữa khắc phục sự cố 24/7',
    ],
  },
]
