import styles from './ProductModal.module.css'
import React, { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { useCart } from '../../context/CartContext'
import { useDialog } from '../../hooks/useDialog'

export default function ProductModal({ product, onClose }) {
  const { lang, t } = useLang()
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)

  const dialogRef = useDialog(Boolean(product), onClose)

  if (!product) return null

  return (
    <div className={styles['modal-backdrop']} onClick={onClose} role="presentation">
      <section
        ref={dialogRef}
        tabIndex={-1}
        className={styles['product-modal']}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles['icon-button'] + ' ' + styles['modal-close']}
          onClick={onClose}
          aria-label={t.close}
        >
          ×
        </button>
        <div className={styles['modal-image']}>
          <img
            src={product.image}
            alt={
              lang === 'ua'
                ? `${product.name[lang]} — крафтовий сир`
                : `${product.name[lang]} — artisanal cheese`
            }
            loading="lazy"
          />
        </div>
        <div className={styles['modal-details']}>
          <div className={styles['modal-top-tags']}>
            <span className={styles['eyebrow'] + ' ' + styles['modal-eyebrow']}>
              GC CHEESE · {product.weight} {t.grams}
            </span>
            {product.isFeatured && (
              <span className={styles['product-badge']}>{t.badgeHit}</span>
            )}
          </div>
          <h2 id="modal-title">{product.name[lang]}</h2>
          <p className={styles['modal-description']}>{product.description[lang]}</p>
          
          <div className={styles['modal-specs']}>
            <div className={styles['spec-block']}>
              <h3>{t.composition}</h3>
              <p>{product.composition[lang]}</p>
            </div>
            <div className={styles['spec-block']}>
              <h3>{t.aging}</h3>
              <p>{product.aging[lang]}</p>
            </div>
          </div>

          <div className={styles['modal-purchase']}>
            <div className={styles['quantity-stepper']}>
              <button
                type="button"
                className={styles['stepper-btn']}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label={
                  lang === 'ua' ? 'Зменшити кількість' : 'Decrease quantity'
                }
              >
                −
              </button>
              <span className={styles['stepper-value']}>{quantity}</span>
              <button
                type="button"
                className={styles['stepper-btn']}
                onClick={() => setQuantity(quantity + 1)}
                aria-label={
                  lang === 'ua' ? 'Збільшити кількість' : 'Increase quantity'
                }
              >
                +
              </button>
            </div>
            <strong className={styles['modal-price']}>{product.price * quantity} ₴</strong>
            <button
              className={styles['button'] + ' ' + styles['button-accent'] + ' ' + styles['modal-add-btn']}
              onClick={() => {
                add(product, quantity)
                onClose()
              }}
            >
              <span>{t.addCart}</span>
              <span aria-hidden="true"> +</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
