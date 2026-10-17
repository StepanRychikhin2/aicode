import React, { useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'

export default function Cart({ open, onClose, onCheckout }) {
  const { lang, t } = useLang()
  const { items, remove, setQuantity, total } = useCart()

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="drawer-backdrop" onClick={onClose} role="presentation">
      <aside
        className="cart-drawer glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-heading">
          <div className="drawer-title-group">
            <h2 id="cart-title">{t.cart}</h2>
            {items.length > 0 && (
              <span className="cart-badge">{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button
            className="icon-button close-btn"
            onClick={onClose}
            aria-label={t.close}
          >
            ✕
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item glass-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className="cart-item-image"
                    loading="lazy"
                  />
                  <div className="cart-item-main">
                    <b className="cart-item-title">{item.name[lang]}</b>
                    <span className="cart-item-price">{item.price} ₴</span>
                    <div className="quantity-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        aria-label={
                          lang === 'ua'
                            ? 'Зменшити кількість'
                            : 'Decrease quantity'
                        }
                      >
                        −
                      </button>
                      <span className="stepper-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        aria-label={
                          lang === 'ua'
                            ? 'Збільшити кількість'
                            : 'Increase quantity'
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => remove(item.id)}
                    aria-label={`${t.remove} ${item.name[lang]}`}
                  >
                    {t.remove}
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span className="cart-total-label">{t.total}</span>
                <strong className="cart-total-amount">{total} ₴</strong>
              </div>
              <p className="cart-shipping-note">
                ⚡ {t.fastDelivery}
              </p>
              <button
                type="button"
                className="button button-accent cart-checkout-btn"
                onClick={onCheckout}
              >
                <span>{t.checkout}</span>
                <span aria-hidden="true" className="btn-arrow">↗</span>
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart-state">
            <div className="empty-icon-wrap" aria-hidden="true">
              <span className="empty-emoji">🧀</span>
            </div>
            <h3>{t.emptyCart}</h3>
            <p className="empty-desc">{t.emptyCartSubtitle}</p>
            <button
              type="button"
              className="button button-accent button-empty-action"
              onClick={() => {
                onClose()
                if (window.location.hash !== '#/catalog') {
                  window.location.hash = '#/catalog'
                }
              }}
            >
              <span>{t.exploreCheeses}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
