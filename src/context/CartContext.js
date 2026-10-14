import React, { createContext, useContext, useState } from 'react'
const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { const saved = JSON.parse(localStorage.getItem('gc-cheese-cart') || '[]'); return saved.map((item) => item.image?.startsWith('/images/') ? { ...item, image: `${process.env.PUBLIC_URL}${item.image}` } : item) } catch { return [] } })
  const [toast, setToast] = useState('')
  const update = (next) => { setItems(next); localStorage.setItem('gc-cheese-cart', JSON.stringify(next)) }
  const add = (product, quantity = 1) => { const found = items.find((item) => item.id === product.id); update(found ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }]); setToast('added') }
  const remove = (id) => update(items.filter((item) => item.id !== id))
  const setQuantity = (id, quantity) => update(items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
  const value = { items, add, remove, setQuantity, toast, setToast, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() { return useContext(CartContext) }
