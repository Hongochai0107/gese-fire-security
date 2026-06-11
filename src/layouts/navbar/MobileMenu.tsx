import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { navItems } from '@/data/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden border-t border-border bg-background md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted hover:bg-card hover:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-4 py-6">
            <Button to="/contact" size="lg" className="w-full" onClick={onClose}>
              Yêu cầu báo giá
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
