import Icon from '../Icon/Icon'
import styles from './Cart.module.css'

import React from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useLang } from '../../i18n/LanguageContext'
import { useCart } from '../../context/CartContext'

export default function Cart({ open, onClose, onCheckout }) {
  const { lang, t } = useLang()
  const { items, remove, setQuantity, total } = useCart()

  const dialogRef = useDialog(open, onClose)

  if (!open) return null

  return (
    <div className={styles['drawer-backdrop']} onClick={onClose} role="presentation">
      <aside
        ref={dialogRef}
        tabIndex={-1}
        className={styles['cart-drawer']}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles['drawer-heading']}>
          <div className={styles['drawer-title-group']}>
            <h2 id="cart-title">{t.cart}</h2>
            {items.length > 0 && (
              <span className={styles['cart-badge']}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button
            className={styles['icon-button']}
            onClick={onClose}
            aria-label={t.close}
          >
            ✕
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className={styles['cart-items']}>
              {items.map((item) => (
                <div className={styles['cart-item']} key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name[lang]}
                    className={styles['cart-item-image']}
                    loading="lazy"
                  />
                  <div className={styles['cart-item-main']}>
                    <b className={styles['cart-item-title']}>{item.name[lang]}</b>
                    <span className={styles['cart-item-price']}>{item.price} ₴</span>
                    <div className={styles['quantity-stepper']}>
                      <button
                        type="button"
                        className={styles['stepper-btn']}
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        aria-label={
                          lang === 'ua'
                            ? 'Зменшити кількість'
                            : 'Decrease quantity'
                        }
                      >
                        −
                      </button>
                      <span className={styles['stepper-value']}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles['stepper-btn']}
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
                    className={styles['remove-button']}
                    onClick={() => remove(item.id)}
                    aria-label={`${t.remove} ${item.name[lang]}`}
                  >
                    {t.remove}
                  </button>
                </div>
              ))}
            </div>

            <div className={styles['cart-footer']}>
              <div className={styles['cart-total-row']}>
                <span className={styles['cart-total-label']}>{t.total}</span>
                <strong className={styles['cart-total-amount']}>{total} ₴</strong>
              </div>
              <p className={styles['cart-shipping-note']}>
                <Icon name="truck" size={18} /> {t.fastDelivery}
              </p>
              <button
                type="button"
                className={styles['button'] + ' ' + styles['button-accent'] + ' ' + styles['cart-checkout-btn']}
                onClick={onCheckout}
              >
                <span>{t.checkout}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </>
        ) : (
          <div className={styles['empty-cart-state']}>
            <div className={styles['empty-icon-wrap']} aria-hidden="true">
              <span className={styles['empty-emoji']}><Icon name="cheese" size={40} /></span>
            </div>
            <h3>{t.emptyCart}</h3>
            <p className={styles['empty-desc']}>{t.emptyCartSubtitle}</p>
            <button
              type="button"
              className={styles['button'] + ' ' + styles['button-accent']}
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
