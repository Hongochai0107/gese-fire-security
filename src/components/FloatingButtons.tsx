import { useState, useEffect } from 'react'
import { Phone, MessageCircle, ChevronUp, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-all duration-300',
          showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
        aria-label="Về đầu trang"
      >
        <ChevronUp className="h-5 w-5 text-muted" />
      </button>

      {/* Expanded contact options */}
      <div className={cn('flex flex-col items-end gap-3 transition-all duration-300', expanded ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0')}>
        {/* Hotline */}
        <a
          href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`}
          className="flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          <Phone className="h-4 w-4" />
          {siteConfig.contact.hotline}
        </a>

        {/* Zalo */}
        <a
          href={`https://zalo.me/${siteConfig.contact.hotline.replace(/\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full bg-[#0068ff] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" />
          Chat Zalo
        </a>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300',
          expanded
            ? 'rotate-0 bg-gray-600 text-white'
            : 'animate-bounce bg-primary text-white hover:bg-primary-hover',
        )}
        aria-label={expanded ? 'Đóng' : 'Liên hệ nhanh'}
      >
        {expanded ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </button>
    </div>
  )
}
