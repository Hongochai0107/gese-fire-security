export interface Testimonial {
  quote: string
  name: string
  initials: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'GESE đã giúp chúng tôi triển khai hệ thống PCCC đạt chuẩn cho toàn bộ nhà máy chỉ trong 3 tháng. Đội ngũ kỹ thuật chuyên nghiệp, hồ sơ nghiệm thu rõ ràng và đúng tiến độ cam kết.',
    name: 'Nguyễn Văn An',
    initials: 'NA',
    role: 'Giám đốc Vận hành',
    company: 'Công ty TNHH Sản xuất ABC',
  },
  {
    quote:
      'Dịch vụ bảo trì định kỳ của GESE luôn đúng hẹn, báo cáo chi tiết và hỗ trợ xử lý sự cố nhanh chóng 24/7. Chúng tôi hoàn toàn yên tâm về vận hành hệ thống PCCC của tòa nhà.',
    name: 'Trần Thị Bích',
    initials: 'TB',
    role: 'Trưởng ban Quản lý Tòa nhà',
    company: 'Riverside Plaza',
  },
  {
    quote:
      'Năng lực thi công và hồ sơ pháp lý của GESE đáp ứng đầy đủ yêu cầu thẩm định của chúng tôi cho các dự án quy mô lớn, giúp rút ngắn đáng kể thời gian phê duyệt.',
    name: 'Lê Hoàng Cường',
    initials: 'LC',
    role: 'Giám đốc Đầu tư',
    company: 'Tập đoàn Đầu tư XYZ',
  },
]
