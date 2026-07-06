import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, Search, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Navbar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    } else {
      setSearchQuery('')
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const handleSearch = () => {
    const q = searchQuery.trim()
    if (!q) return
    setIsSearchOpen(false)
    navigate(`/products-catalog?q=${encodeURIComponent(q)}`)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isScrolled || isMobileMenuOpen || isSearchOpen
          ? 'border-b border-border bg-background/95 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <NavLinks />

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />

            {/* Search icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                isSearchOpen
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted hover:border-primary/50 hover:text-white',
              )}
              aria-label="Tìm kiếm"
            >
              {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>

            <a
              href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-primary" />
              {siteConfig.contact.hotline}
            </a>
            <Button to="/contact" size="md">
              Yêu cầu báo giá
            </Button>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                isSearchOpen
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted',
              )}
              aria-label="Tìm kiếm"
            >
              {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white"
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Search overlay panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <Container>
              <div className="py-4">
                <div className="flex overflow-hidden rounded-xl border border-border bg-card focus-within:border-primary transition-colors">
                  <div className="flex items-center pl-4 text-subtle">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Tìm kiếm sản phẩm PCCC & An ninh..."
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-subtle focus:outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    className="m-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
                    disabled={!searchQuery.trim()}
                  >
                    Tìm kiếm
                  </button>
                </div>
                <p className="mt-2 text-xs text-subtle">
                  Gợi ý: đầu báo khói, tủ trung tâm, camera IP, sprinkler...
                </p>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}
