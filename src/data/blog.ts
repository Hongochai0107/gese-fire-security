export interface BlogPost {
  slug: string
  category: string
  date: string
  readTime: string
  title: string
  excerpt: string
}

export const blogCategories = [
  'Kiến thức PCCC',
  'Quy định pháp luật',
  'Tin công ty',
] as const

export type BlogCategory = (typeof blogCategories)[number]

export const blogPosts: BlogPost[] = [
  {
    slug: 'huong-dan-lap-dat-he-thong-bao-chay-dia-chi',
    category: 'Kiến thức PCCC',
    date: '2024-11-15',
    readTime: '8 phút',
    title: 'Hướng dẫn lắp đặt hệ thống báo cháy địa chỉ từ A-Z',
    excerpt:
      'Tìm hiểu quy trình lắp đặt hệ thống báo cháy địa chỉ đúng chuẩn TCVN, từ khảo sát, thiết kế đến nghiệm thu và bàn giao.',
  },
  {
    slug: 'so-sanh-he-thong-chua-chay-sprinkler-va-fm200',
    category: 'Kiến thức PCCC',
    date: '2024-10-22',
    readTime: '6 phút',
    title: 'So sánh hệ thống chữa cháy Sprinkler và FM200: Nên chọn loại nào?',
    excerpt:
      'Phân tích ưu nhược điểm của Sprinkler và FM200, giúp bạn lựa chọn giải pháp chữa cháy phù hợp với từng loại công trình.',
  },
  {
    slug: 'qcvn-06-2022-bxd-thay-doi-quan-trong',
    category: 'Quy định pháp luật',
    date: '2024-09-10',
    readTime: '5 phút',
    title: 'QCVN 06:2022/BXD — Những thay đổi quan trọng cần biết',
    excerpt:
      'Tổng hợp các điểm mới trong quy chuẩn kỹ thuật quốc gia QCVN 06:2022/BXD về an toàn cháy cho nhà và công trình.',
  },
  {
    slug: 'gese-hoan-thanh-du-an-sky-residence',
    category: 'Tin công ty',
    date: '2024-08-20',
    readTime: '3 phút',
    title: 'GESE hoàn thành dự án PCCC khu phức hợp Sky Residence',
    excerpt:
      'GESE vừa bàn giao thành công hệ thống PCCC và kiểm soát ra vào cho 3 tòa tháp căn hộ Sky Residence tại Quận 7, TP.HCM.',
  },
  {
    slug: 'checklist-kiem-tra-pccc-dinh-ky',
    category: 'Kiến thức PCCC',
    date: '2024-07-05',
    readTime: '7 phút',
    title: 'Checklist kiểm tra PCCC định kỳ cho doanh nghiệp',
    excerpt:
      'Danh sách kiểm tra PCCC hàng tháng và hàng quý dành cho quản lý tòa nhà, nhà máy — đảm bảo hệ thống luôn sẵn sàng hoạt động.',
  },
  {
    slug: 'quy-dinh-bao-tri-he-thong-pccc-2024',
    category: 'Quy định pháp luật',
    date: '2024-06-12',
    readTime: '4 phút',
    title: 'Quy định bảo trì hệ thống PCCC năm 2024: Doanh nghiệp cần làm gì?',
    excerpt:
      'Hướng dẫn chi tiết về nghĩa vụ bảo trì, kiểm định hệ thống PCCC theo Nghị định 136/2020/NĐ-CP và các văn bản liên quan.',
  },
]
