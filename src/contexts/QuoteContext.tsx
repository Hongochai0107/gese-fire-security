import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

export interface QuoteItem {
  id: number
  name: string
  sku: string
  thumbnail: string | null
  slug: string
  quantity: number
}

interface QuoteContextType {
  items: QuoteItem[]
  addItem: (product: Omit<QuoteItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearItems: () => void
  isInQuote: (id: number) => boolean
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const STORAGE_KEY = 'gese_quote_items'

function loadItems(): QuoteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveItems(items: QuoteItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const QuoteContext = createContext<QuoteContextType | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(loadItems)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const persist = (next: QuoteItem[]) => {
    setItems(next)
    saveItems(next)
  }

  const addItem = useCallback((product: Omit<QuoteItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      const next = existing
        ? prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...product, quantity: 1 }]
      saveItems(next)
      return next
    })
    setDrawerOpen(true)
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id)
      saveItems(next)
      return next
    })
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      saveItems(next)
      return next
    })
  }, [])

  const clearItems = useCallback(() => {
    persist([])
  }, [])

  const isInQuote = useCallback((id: number) => items.some((i) => i.id === id), [items])

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearItems,
        isInQuote,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider')
  return ctx
}
