import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, GitCompare, ShoppingBag } from 'lucide-react'
import { useCompare } from '@/contexts/CompareContext'
import { cn } from '@/lib/utils'

export function CompareBar() {
  const { items, removeFromCompare, clearCompare } = useCompare()

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 shadow-2xl backdrop-blur"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-center gap-3 overflow-x-auto pb-1">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">
                So sánh ({items.length}/3)
              </span>
              {[0, 1, 2].map((i) => {
                const item = items[i]
                return (
                  <div
                    key={i}
                    className={cn(
                      'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2',
                      item ? 'border-primary/60 bg-surface' : 'border-dashed border-border bg-surface/50',
                    )}
                  >
                    {item ? (
                      <>
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.name} className="h-full w-full rounded-xl object-cover" />
                        ) : (
                          <ShoppingBag className="h-5 w-5 text-border" />
                        )}
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-white"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-subtle">+</span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={clearCompare}
                className="text-xs text-muted hover:text-white transition-colors"
              >
                Xóa tất cả
              </button>
              <Link
                to="/compare"
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                  items.length >= 2
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'pointer-events-none bg-surface text-subtle',
                )}
              >
                <GitCompare className="h-4 w-4" />
                Xem so sánh
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
