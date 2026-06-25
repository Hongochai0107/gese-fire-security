export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/products-catalog' },
  { label: 'Dịch vụ', to: '/services' },
  { label: 'Dự án', to: '/projects' },
  { label: 'Giới thiệu', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Liên hệ', to: '/contact' },
]
