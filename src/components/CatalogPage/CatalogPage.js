import Icon from '../Icon/Icon'
import styles from './CatalogPage.module.css'
import React, { useMemo, useRef, useState } from 'react'
import { usePageMotion } from '../../hooks/usePageMotion'
import { products, cheeseTypes } from '../../data/products'
import { useLang } from '../../i18n/LanguageContext'
import ProductCard from '../ProductCard/ProductCard'
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton'

export default function CatalogPage({ onProduct }) {
  const { lang, t } = useLang()
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [isLoading] = useState(false)
  const scope = useRef(null)

  const handleTypeChange = (newType) => {
    setType(newType)
  }

  const handleCategoryKeyDown = (event, index) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? cheeseTypes.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + cheeseTypes.length) % cheeseTypes.length
    setType(cheeseTypes[next])
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus()
  }

  const handleReset = () => {
    setType('all')
    setQuery('')
  }

  const visible = useMemo(
    () =>
      products
        .filter(
          (product) =>
            (type === 'all' ||
              product.type === type ||
              (type === 'mold' && product.type === 'blue')) &&
            `${product.name[lang]} ${product.description[lang]}`
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()),
        )
        .sort((a, b) =>
          sort === 'price'
            ? a.price - b.price
            : sort === 'name'
              ? a.name[lang].localeCompare(
                b.name[lang],
                lang === 'ua' ? 'uk' : 'en',
              )
              : Number(b.isFeatured) - Number(a.isFeatured),
        ),
    [type, sort, query, lang],
  )

  const productSignature = visible.map(product => product.id).join(',')
  usePageMotion(scope, [lang, productSignature])

  const typeKey = (value) =>
    `type_${value === 'semi-hard' ? 'semi' : value === 'mold' ? 'mold' : value}`

  return (
    <main ref={scope} id="main-content" tabIndex={-1} className={styles['catalog-page']}>
      <section className={styles['catalog-intro']}>
        <a href="#/" className={styles['back-link']}>
          ← {t.backHome}
        </a>
        <span className={styles['eyebrow']}>{lang === 'ua' ? 'НАША СИРНА КОЛЕКЦІЯ' : 'THE CHEESE ROOM'}</span>
        <h1>{t.navCatalog}</h1>
        <p>{t.featuredText}</p>

        
        <div className={styles['filter-chips-bar']} role="tablist" aria-label={t.filter}>
          {cheeseTypes.map((item, index) => {
            const isActive = type === item
            return (
              <button
                key={item}
                type="button"
                role="tab"
                id={`category-${item}`}
                aria-controls="catalog-results"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`${styles['filter-chip']} ${isActive ? styles.active : ''}`}
                onClick={() => handleTypeChange(item)}
                onKeyDown={(event) => handleCategoryKeyDown(event, index)}
              >
                {t[typeKey(item)]}
              </button>
            )
          })}
        </div>
      </section>

      <section className={styles['catalog-content']} role="tabpanel" id="catalog-results" aria-labelledby={`category-${type}`}>
        <div className={styles['catalog-controls']}>
          <label className={styles['search-control']}>
            <span className={styles['sr-only']}>{t.search}</span>
            <span aria-hidden="true" className={styles['search-icon']}><Icon name="search" size={20} /></span>
            <input
              type="search"
              aria-label={t.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
            />
            {query && (
              <button
                type="button"
                className={styles['clear-search-btn']}
                onClick={() => setQuery('')}
                aria-label={lang === 'ua' ? 'Очистити пошук' : 'Clear search'}
              >
                ✕
              </button>
            )}
          </label>

          <label className={styles['select-control']}>
            <span>{t.sort}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">{lang === 'ua' ? 'Рекомендовані' : 'Recommended'}</option>
              <option value="price">{t.sortPrice}</option>
              <option value="name">{t.sortName}</option>
            </select>
          </label>
        </div>

        <div className={styles['catalog-meta-row']}>
          <p className={styles['result-count']} role="status" aria-live="polite" aria-atomic="true">
            {visible.length} {lang === 'ua' ? 'сирів у меню' : 'cheeses available'}
          </p>
          {(type !== 'all' || query) && (
            <button
              type="button"
              className={styles['reset-text-btn']}
              onClick={handleReset}
            >
              {t.resetFilters} ✕
            </button>
          )}
        </div>

        {isLoading ? (
          <div data-motion-group className={styles['product-grid']}>
            <ProductSkeleton count={4} />
          </div>
        ) : visible.length > 0 ? (
          <div data-motion-group className={styles['product-grid']}>
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onProduct}
              />
            ))}
          </div>
        ) : (
          <div className={styles['empty-catalog-state']}>
            <div className={styles['empty-icon-bubble']}><Icon name="cheese" size={40} /></div>
            <h3>{t.noResults}</h3>
            <p className={styles['empty-desc']}>{t.emptySearchSubtitle}</p>
            <button
              type="button"
              className={styles['button'] + ' ' + styles['button-accent']}
              onClick={handleReset}
            >
              <span>{t.resetFilters}</span>
              <span aria-hidden="true"> ↺</span>
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
