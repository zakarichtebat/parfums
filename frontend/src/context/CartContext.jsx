import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Modes de livraison. `freeOver` : seuil de gratuite en dollars.
export const SHIPPING_METHODS = [
  {
    id: 'standard',
    label: 'Standard delivery',
    hint: '3 to 5 business days',
    price: 4.9,
    freeOver: 60,
  },
  {
    id: 'express',
    label: 'Express delivery',
    hint: 'Next day before 6 pm',
    price: 12.9,
    freeOver: null,
  },
]

// Codes promo acceptes.
const PROMOS = {
  WELCOME10: { type: 'percent', value: 10, label: '10% off your order' },
  MAISON20: { type: 'percent', value: 20, label: '20% off your order' },
  FREESHIP: { type: 'shipping', value: 0, label: 'Free delivery' },
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [shippingId, setShippingId] = useState('standard')
  const [promo, setPromo] = useState(null)
  // Dernier ajout : sert a declencher l'animation de confirmation.
  const [lastAdded, setLastAdded] = useState(null)

  const addItem = useCallback(
    (perfume, { volume = 30, quantity = 1, unitPrice } = {}) => {
      const price = unitPrice ?? perfume.price
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
            slug: perfume.slug,
            name: perfume.name,
            image: perfume.image_url,
            volume,
            quantity,
            price,
          },
        ]
      })
      setLastAdded({
        stamp: Date.now(),
        name: perfume.name,
        image: perfume.image_url,
        volume,
        quantity,
        price,
      })
    },
    []
  )

  const updateQuantity = useCallback((key, quantity) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.key !== key)
        : current.map((i) => (i.key === key ? { ...i, quantity } : i))
    )
  }, [])

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((i) => i.key !== key))
  }, [])

  const clear = useCallback(() => {
    setItems([])
    setPromo(null)
  }, [])

  /** Renvoie true si le code existe, false sinon. */
  const applyPromo = useCallback((code) => {
    const clean = code.trim().toUpperCase()
    const found = PROMOS[clean]
    if (!found) return false
    setPromo({ code: clean, ...found })
    return true
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    const discount =
      promo?.type === 'percent' ? (subtotal * promo.value) / 100 : 0

    const method =
      SHIPPING_METHODS.find((m) => m.id === shippingId) ?? SHIPPING_METHODS[0]

    const afterDiscount = subtotal - discount
    const freeByThreshold =
      method.freeOver !== null && afterDiscount >= method.freeOver
    const freeByPromo = promo?.type === 'shipping'
    const shippingCost =
      count === 0 || freeByThreshold || freeByPromo ? 0 : method.price

    return {
      items,
      count,
      subtotal,
      discount,
      promo,
      applyPromo,
      clearPromo: () => setPromo(null),
      shippingId,
      setShippingId,
      shippingMethod: method,
      shippingCost,
      shippingIsFree: shippingCost === 0 && count > 0,
      total: afterDiscount + shippingCost,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      lastAdded,
    }
  }, [
    items,
    promo,
    shippingId,
    lastAdded,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    applyPromo,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart doit etre utilise dans <CartProvider>')
  return context
}
