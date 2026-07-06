import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '@/lib/api'

const STORAGE_KEY = 'gese_compare_items'
const MAX_COMPARE = 3

interface CompareContextValue {
  items: Product[]
  addToCompare: (product: Product) => boolean
  removeFromCompare: (id: number) => void
  clearCompare: () => void
  isInCompare: (id: number) => boolean
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCompare = (product: Product): boolean => {
    if (items.find((i) => i.id === product.id)) return true
    if (items.length >= MAX_COMPARE) return false
    setItems((prev) => [...prev, product])
    return true
  }

  const removeFromCompare = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCompare = () => setItems([])

  const isInCompare = (id: number) => items.some((i) => i.id === id)

  return (
    <CompareContext.Provider value={{ items, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
