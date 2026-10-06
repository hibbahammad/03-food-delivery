import { createContext, useContext, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/formatters'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'food-delivery-cart-v1'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => readStorage(CART_STORAGE_KEY, []))

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, items)
  }, [items])

  const addItem = (item, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((entry) => entry.id === item.id)

      if (existingItem) {
        return currentItems.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        )
      }

      return [...currentItems, { ...item, quantity }]
    })
  }

  const removeItem = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, change) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = items.length ? 4.99 : 0
  const total = subtotal + deliveryFee
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    items,
    subtotal,
    deliveryFee,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
