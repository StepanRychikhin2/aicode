import React, { useMemo, useState, useEffect } from 'react'
import { products, cheeseTypes } from '../data/products'
import { reviews } from '../data/reviews'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { submitOrder } from '../services/submitOrder'
import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function HomePage({ onProduct }) {
  const { lang, t } = useLang()
  const advantages = [
    [t.advantage1, t.advantage1Text, '✳'],
    [t.advantage2, t.advantage2Text, '♡'],
    [t.advantage3, t.advantage3Text, '◌'],
    [t.advantage4, t.advantage4Text, '⌁'],
  ]

  return (
    <main>
      <section className="hero">
        <img
          className="hero-photo"
          src={process.env.PUBLIC_URL + '/images/hero-photo.jpg'}
          alt=""
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content glass-card hero-glass-card">
          <span className="eyebrow hero-pill-eyebrow">
            <span className="glow-dot" /> {t.heroEyebrow}
          </span>
          <h1>
            {t.heroTitle.split('\n').map((line, i) => (
              <React.Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="button button-accent hero-primary-btn" href="#/catalog">
              <span>{t.catalog}</span>
              <span aria-hidden="true"> ↗</span>
            </a>
            <a className="button button-glass" href="#order">
              <span>{t.order}</span>
              <span aria-hidden="true"> ↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="accent-star">✳</span> {t.heroNote}
          </div>
        </div>
        <div className="hero-caption">
          {lang === 'ua'
            ? 'ПОВІЛЬНО СТВОРЕНО, РАДО РОЗДІЛЕНО'
            : 'MADE SLOW, SHARED OFTEN'}
        </div>
      </section>

      <section className="section advantages" id="advantages">
        <SectionTitle eyebrow="GOOD FROM THE START" title={t.advantages} />
        <div className="advantage-grid">
          {advantages.map(([title, text, icon], i) => (
            <article className="advantage-card glass-panel reveal" key={title}>
              <div className="advantage-icon-wrapper">
                <span className="advantage-icon">{icon}</span>
              </div>
              <span className="advantage-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section featured" id="featured">
        <SectionTitle
          eyebrow="FROM OUR CHEESE ROOM"
          title={t.featured}
          text={t.featuredText}
        />
        <div className="product-grid">
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
        <div className="featured-action-wrap">
          <a className="button button-accent button-featured-more" href="#/catalog">
            <span>{t.allCatalog}</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </section>

      <section className="story-section" id="about">
        <div className="story-image">
          <img
            src={process.env.PUBLIC_URL + '/images/about-photo.jpg'}
            alt=""
            loading="lazy"
          />
          <span className="image-stamp glass-stamp">
            MADE BY HAND
            <br />
            IN UKRAINE
          </span>
        </div>
        <div className="story-copy glass-copy-panel">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2>{t.about}</h2>
          <p>{t.aboutText}</p>
          <a className="underlined-link" href="#order">
            {t.order}
            <span> ↗</span>
          </a>
          <div className="handwritten">
            from our family
            <br />
            to your table <span>♡</span>
          </div>
        </div>
      </section>

      <section className="restaurant-section" id="restaurants">
        <div className="restaurant-copy glass-copy-panel dark-glass">
          <span className="eyebrow accent-eyebrow">A GOOD PARTNERSHIP</span>
          <h2>{t.restaurants}</h2>
          <p>{t.restaurantText}</p>
          <a className="button button-accent" href="#order">
            <span>{t.priceList}</span>
            <span aria-hidden="true"> ↗</span>
          </a>
          <div className="restaurant-list">
            <span className="restaurant-chip">01 Flexible wholesale</span>
            <span className="restaurant-chip">02 Reliable delivery</span>
            <span className="restaurant-chip">03 A real person to call</span>
          </div>
        </div>
        <div className="restaurant-image">
          <img
            src={process.env.PUBLIC_URL + '/images/cheese-board-assortment.jpg'}
            alt=""
            loading="lazy"
          />
          <div className="image-label glass-panel">
            GOOD FOOD
            <br />
            STARTS HERE
          </div>
        </div>
      </section>

      <section className="section reviews">
        <SectionTitle eyebrow="KIND WORDS" title={t.reviews} />
        <div className="review-grid">
          {reviews.map((review) => (
            <figure className="review-card glass-panel reveal" key={review.name}>
              <div
                className="stars"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {'★'.repeat(review.rating)}
              </div>
              <blockquote>“{review.text[lang]}”</blockquote>
              <figcaption>
                <span className="review-avatar">{review.name.charAt(0)}</span>
                <span>
                  <b>{review.name}</b>
                  <small>
                    {review.city} ·{' '}
                    {review.kind === 'restaurant'
                      ? t.restaurantType
                      : t.customerType}
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section how-order">
        <SectionTitle eyebrow="THREE SIMPLE STEPS" title={t.howTo} />
        <div className="steps-grid">
          {[
            [t.step1, t.step1Text],
            [t.step2, t.step2Text],
            [t.step3, t.step3Text],
          ].map(([title, text], i) => (
            <article className="step glass-panel reveal" key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              {i < 2 && <span className="step-connector" aria-hidden="true">→</span>}
            </article>
          ))}
        </div>
      </section>

      <OrderForm />
    </main>
  )
}

export function CatalogPage({ onProduct }) {
  const { lang, t } = useLang()
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [isLoading] = useState(false)

  const handleTypeChange = (newType) => {
    setType(newType)
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

  const typeKey = (value) =>
    `type_${value === 'semi-hard' ? 'semi' : value === 'mold' ? 'mold' : value}`

  return (
    <main className="catalog-page">
      <section className="catalog-intro glass-intro">
        <a href="#/" className="back-link">
          ← {t.backHome}
        </a>
        <span className="eyebrow">THE CHEESE ROOM</span>
        <h1>{t.navCatalog}</h1>
        <p>{t.featuredText}</p>

        {/* TikTok-style Quick Category Filter Chips */}
        <div className="filter-chips-bar" role="tablist" aria-label={t.filter}>
          {cheeseTypes.map((item) => {
            const isActive = type === item
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-chip ${isActive ? 'active' : ''}`}
                onClick={() => handleTypeChange(item)}
              >
                {t[typeKey(item)]}
              </button>
            )
          })}
        </div>
      </section>

      <section className="catalog-content">
        <div className="catalog-controls glass-panel">
          <label className="search-control">
            <span className="sr-only">{t.search}</span>
            <span aria-hidden="true" className="search-icon">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
            />
            {query && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </label>

          <label className="select-control">
            <span>{t.sort}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">—</option>
              <option value="price">{t.sortPrice}</option>
              <option value="name">{t.sortName}</option>
            </select>
          </label>
        </div>

        <div className="catalog-meta-row">
          <p className="result-count">
            {visible.length} {lang === 'ua' ? 'сирів у меню' : 'cheeses available'}
          </p>
          {(type !== 'all' || query) && (
            <button
              type="button"
              className="reset-text-btn"
              onClick={handleReset}
            >
              {t.resetFilters} ✕
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="product-grid catalog-grid">
            <ProductSkeleton count={4} />
          </div>
        ) : visible.length > 0 ? (
          <div className="product-grid catalog-grid">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onProduct}
              />
            ))}
          </div>
        ) : (
          <div className="empty-catalog-state glass-panel">
            <div className="empty-icon-bubble">🧀</div>
            <h3>{t.noResults}</h3>
            <p className="empty-desc">{t.emptySearchSubtitle}</p>
            <button
              type="button"
              className="button button-accent button-reset"
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

export function ProductModal({ product, onClose }) {
  const { lang, t } = useLang()
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="product-modal glass-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label={t.close}
        >
          ×
        </button>
        <div className="modal-image">
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
        <div className="modal-details">
          <div className="modal-top-tags">
            <span className="eyebrow modal-eyebrow">
              GC CHEESE · {product.weight} {t.grams}
            </span>
            {product.isFeatured && (
              <span className="product-badge product-badge-hit">{t.badgeHit}</span>
            )}
          </div>
          <h2 id="modal-title">{product.name[lang]}</h2>
          <p className="modal-description">{product.description[lang]}</p>
          
          <div className="modal-specs">
            <div className="spec-block">
              <h3>{t.composition}</h3>
              <p>{product.composition[lang]}</p>
            </div>
            <div className="spec-block">
              <h3>{t.aging}</h3>
              <p>{product.aging[lang]}</p>
            </div>
          </div>

          <div className="modal-purchase">
            <div className="quantity-stepper modal-stepper">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label={
                  lang === 'ua' ? 'Зменшити кількість' : 'Decrease quantity'
                }
              >
                −
              </button>
              <span className="stepper-value">{quantity}</span>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => setQuantity(quantity + 1)}
                aria-label={
                  lang === 'ua' ? 'Збільшити кількість' : 'Increase quantity'
                }
              >
                +
              </button>
            </div>
            <strong className="modal-price">{product.price * quantity} ₴</strong>
            <button
              className="button button-accent modal-add-btn"
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

function OrderForm() {
  const { t, lang } = useLang()
  const { items, total } = useCart()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      await submitOrder({
        ...data,
        items: items.map(({ id, name, quantity, price }) => ({
          id,
          name,
          quantity,
          price,
        })),
        total,
      })
      setSent(true)
    } catch {
      setError(
        lang === 'ua'
          ? 'Виникла помилка при відправці. Перевірте з’єднання та спробуйте ще раз.'
          : 'An error occurred while submitting. Please check your connection and try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="order-section" id="order">
      <div className="order-intro">
        <span className="eyebrow accent-pill">
          {lang === 'ua' ? 'ЗРОБІМО ЦЕ СМАЧНО' : 'LET’S MAKE IT A GOOD ONE'}
        </span>
        <h2>{t.orderTitle}</h2>
        <p>{t.orderText}</p>
        <div className="order-doodle">
          ✳<br />
          <span>
            {lang === 'ua' ? 'зроблено з турботою' : 'made with care'}
          </span>
        </div>
      </div>
      <div className="order-form-wrap glass-panel">
        {sent ? (
          <div className="form-success" role="status">
            <span className="success-icon">✓</span>
            <h3>{t.success}</h3>
            <p className="success-sub">
              {lang === 'ua'
                ? 'Наш менеджер зв’яжеться з вами протягом 15 хвилин.'
                : 'Our manager will contact you within 15 minutes.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate={false}>
            <div className="form-row">
              <label>
                {t.name}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={lang === 'ua' ? 'Ваше ім’я' : 'Your name'}
                />
              </label>
              <label>
                {t.phone}
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+380"
                  pattern="[+0-9()\s-]{8,}"
                  title={
                    lang === 'ua'
                      ? 'Введіть коректний номер телефону'
                      : 'Enter a valid phone number'
                  }
                />
              </label>
            </div>
            <fieldset>
              <legend>{t.orderFor}</legend>
              <label className="radio-label">
                <input
                  type="radio"
                  name="customerType"
                  value="customer"
                  defaultChecked
                />{' '}
                <span>{t.customer}</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="customerType" value="restaurant" />{' '}
                <span>{t.restaurant}</span>
              </label>
            </fieldset>
            <label>
              {t.comment}
              <textarea
                name="comment"
                rows="3"
                placeholder={
                  lang === 'ua'
                    ? 'Побажання щодо сиру, часу доставки чи особливих нотаток...'
                    : 'Notes about delivery time or cheese preferences...'
                }
              />
            </label>
            
            {error && (
              <div role="alert" className="form-error-banner glass-panel">
                <span className="error-icon">⚠️</span>
                <div className="error-text">
                  <p>{error}</p>
                </div>
                <button
                  type="button"
                  className="retry-btn"
                  onClick={() => setError('')}
                >
                  {t.retry}
                </button>
              </div>
            )}

            <button
              className="button button-accent form-submit"
              type="submit"
              disabled={submitting}
            >
              <span>{submitting ? t.loading : t.send}</span>
              <span aria-hidden="true"> ↗</span>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="site-footer glass-panel">
      <div className="footer-top">
        <a className="brand footer-brand" href="#/">
          <span className="brand-mark">gc</span>
          <span>
            GC <b>CHEESE</b>
          </span>
        </a>
        <p>Small batch. Big heart.</p>
        <div className="footer-contact">
          <span>{t.contact}</span>
          <a href="mailto:hello@gccheese.ua">hello@gccheese.ua</a>
          <a href="tel:+380000000000">+38 (000) 000 00 00</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.rights}</span>
        <span>CHEESE MADE WITH CARE · UKRAINE</span>
      </div>
    </footer>
  )
}
