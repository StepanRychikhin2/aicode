import React from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
export default function ProductCard({ product, onOpen }) {
  const { lang, t } = useLang(); const { add } = useCart()
  return <article className="product-card reveal"><button className="product-image-button" onClick={() => onOpen(product)} aria-label={`${product.name[lang]} — ${t.description}`}><img src={product.image} alt={lang === 'ua' ? `${product.name[lang]} — крафтовий сир` : `${product.name[lang]} — artisanal cheese`} loading="lazy" /></button>
    <div className="product-info"><div><p className="product-type">{t[`type_${product.type === 'semi-hard' ? 'semi' : product.type === 'mold' || product.type === 'blue' ? 'mold' : product.type}`] || t.type_soft}</p><h3><button className="text-button" onClick={() => onOpen(product)}>{product.name[lang]}</button></h3></div><p className="product-weight">{product.weight} {t.grams}</p></div>
    <p className="product-description">{product.description[lang]}</p><div className="product-bottom"><strong>{product.price} ₴</strong><button className="button button-small" onClick={() => add(product)}>{t.addCart}<span aria-hidden="true"> +</span></button></div>
  </article>
}
