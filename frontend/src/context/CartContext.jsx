import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((perfume, { volume = 30, quantity = 1, unitPrice } = {}) => {
    setItems((current) => {
      const key = `${perfume.id}-${volume}`
      const existing = current.find((i) => i.key === key)
      if (existing) {
        return current.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...current,
        {
          key,
          id: perfume.id,
          name: perfume.name,
          image: perfume.image_url,
          volume,
          quantity,
          price: unitPrice ?? perfume.price,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((i) => i.key !== key))
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0)
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { items, addItem, removeItem, count, total }
  }, [items, addItem, removeItem])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart doit etre utilise dans <CartProvider>')
  return context
}
