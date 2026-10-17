import React from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onOpen }) {
  const { lang, t } = useLang()
  const { add } = useCart()

  const typeKey = `type_${
    product.type === 'semi-hard'
      ? 'semi'
      : product.type === 'mold' || product.type === 'blue'
        ? 'mold'
        : product.type
  }`

  return (
    <article className="product-card">
      <div className="product-image-container">
        <button
          type="button"
          className="product-image-button"
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
          <span className="product-badge product-badge-hit">{t.badgeHit}</span>
        ) : (
          <span className="product-badge product-badge-craft">{t.badgeCraft}</span>
        )}
      </div>

      <div className="product-info">
        <div>
          <p className="product-type">{t[typeKey] || t.type_soft}</p>
          <h3>
            <button
              type="button"
              className="text-button"
              onClick={() => onOpen(product)}
            >
              {product.name[lang]}
            </button>
          </h3>
        </div>
        <span className="product-weight">
          {product.weight} {t.grams}
        </span>
      </div>

      <p className="product-description">{product.description[lang]}</p>

      <div className="product-bottom">
        <div className="product-price-wrap">
          <span className="price-label sr-only">{lang === 'ua' ? 'Ціна' : 'Price'}</span>
          <strong className="product-price">{product.price} ₴</strong>
        </div>
        <button
          type="button"
          className="button button-accent button-small"
          onClick={() => add(product)}
          aria-label={`${t.addCart}: ${product.name[lang]}`}
        >
          <span>{t.addCart}</span>
          <span aria-hidden="true" className="btn-plus">+</span>
        </button>
      </div>
    </article>
  )
}
