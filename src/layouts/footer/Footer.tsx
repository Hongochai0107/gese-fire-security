import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/data/services'
import { Logo } from '@/layouts/navbar/Logo'
import { FacebookIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons/social'

const companyLinks = [
  { label: 'Giới thiệu', to: '/about' },
  { label: 'Dự án', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Câu hỏi thường gặp', to: '/faq' },
  { label: 'Liên hệ', to: '/contact' },
]

const socialLinks = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: 'Facebook' },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: 'YouTube' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Dịch vụ
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {services.map(({ title }) => (
                <li key={title}>
                  <Link
                    to="/services"
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Công ty
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {companyLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-muted transition-colors hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Liên hệ
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {siteConfig.contact.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`} className="transition-colors hover:text-primary">
                  {siteConfig.contact.hotline}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-primary">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border-t border-border py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-subtle">
            © {currentYear} {siteConfig.name}. Đã đăng ký bản quyền.
          </p>
        </div>
      </Container>
    </footer>
  )
}
