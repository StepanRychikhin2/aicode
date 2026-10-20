import styles from './FeaturedProducts.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'
import SectionTitle from '../SectionTitle/SectionTitle'
import { products } from '../../data/products'
import ProductCard from '../ProductCard/ProductCard'

export default function FeaturedProducts({ onProduct }) {
  const { lang, t } = useLang()
  return (
    <section className={styles['section'] + ' ' + styles['featured']} id="featured">
      <SectionTitle
        eyebrow={lang === 'ua' ? 'ОБРАНЕ З НАШОЇ СИРОВАРНІ' : 'FROM OUR CHEESE ROOM'}
        title={t.featured}
        text={t.featuredText}
      />
      <div data-motion-group className={styles['product-grid']}>
        {products
          .filter((item) => item.isFeatured)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onProduct}
            />
          ))}
      </div>
      <div data-reveal className={styles['featured-action-wrap']}>
        <a className={styles['button'] + ' ' + styles['button-accent'] + ' ' + styles['button-featured-more']} href="#/catalog">
          <span>{t.allCatalog}</span>
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </section>
  )
}
