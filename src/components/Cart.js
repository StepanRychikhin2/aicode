import React from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
export default function Cart({ open, onClose, onCheckout }) {
  const { lang, t } = useLang(); const { items, remove, setQuantity, total } = useCart()
  if (!open) return null
  return <div className="drawer-backdrop" onClick={onClose}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><h2 id="cart-title">{t.cart}</h2><button className="icon-button" onClick={onClose} aria-label={t.close}>×</button></div>
    {items.length ? <><div className="cart-items">{items.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" loading="lazy" /><div className="cart-item-main"><b>{item.name[lang]}</b><span>{item.price} ₴</span><div className="quantity"><button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={lang === 'ua' ? 'Зменшити кількість' : 'Decrease quantity'}>−</button><span>{item.quantity}</span><button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={lang === 'ua' ? 'Збільшити кількість' : 'Increase quantity'}>+</button></div></div><button className="remove-button" onClick={() => remove(item.id)}>{t.remove}</button></div>)}</div><div className="cart-total"><span>{t.total}</span><strong>{total} ₴</strong></div><button type="button" className="button cart-checkout" onClick={onCheckout}>{t.checkout}</button></> : <p className="empty-cart">{t.emptyCart}</p>}
  </aside></div>
}
