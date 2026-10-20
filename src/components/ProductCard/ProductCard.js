import styles from './ProductCard.module.css'

import React from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product, onOpen }) {
  const { lang, t } = useLang()
  const { add, toast, addition } = useCart()
  const justAdded = toast && addition?.productId === product.id

  const typeKey = `type_${
    product.type === 'semi-hard'
      ? 'semi'
      : product.type === 'mold' || product.type === 'blue'
        ? 'mold'
        : product.type
  }`

  return (
    <article data-motion-card className={styles['product-card']}>
      <div className={styles['product-image-container']}>
        <button
          type="button"
          className={styles['product-image-button']}
          onClick={() => onOpen(product)}
          aria-label={`${product.name[lang]} — ${t.description}`}
        >
          <img
            src={product.image}
            alt={
              lang === 'ua'
                ? `${product.name[lang]} — крафтовий сир`
                : `${product.name[lang]} — artisanal cheese`
            }
            loading="lazy"
          />
        </button>
        {product.isFeatured ? (
          <span className={styles['product-badge']}>{t.badgeHit}</span>
        ) : (
          <span className={styles['product-badge'] + ' ' + styles['product-badge-craft']}>{t.badgeCraft}</span>
        )}
      </div>

      <div className={styles['product-info']}>
        <div>
          <p className={styles['product-type']}>{t[typeKey] || t.type_soft}</p>
          <h3>
            <button
              type="button"
              className={styles['text-button']}
              onClick={() => onOpen(product)}
            >
              {product.name[lang]}
            </button>
          </h3>
        </div>
        <span className={styles['product-weight']}>
          {product.weight} {t.grams}
        </span>
      </div>

      <p className={styles['product-description']}>{product.description[lang]}</p>

      <div className={styles['product-bottom']}>
        <div>
          <span className={styles['sr-only']}>{lang === 'ua' ? 'Ціна' : 'Price'}</span>
          <strong className={styles['product-price']}>{product.price} ₴</strong>
        </div>
        <button
          type="button"
          className={styles['button'] + ' ' + styles['button-accent'] + ' ' + styles['button-small']}
          onClick={() => add(product)}
          aria-label={`${t.addCart}: ${product.name[lang]}`}
        >
          <span>{t.addCart}</span>
          <span key={justAdded ? addition.sequence : 'plus'} aria-hidden="true" className={justAdded ? styles['added-check'] : styles['btn-plus']}>
            {justAdded ? '✓' : '+'}
          </span>
        </button>
      </div>
    </article>
  )
}
