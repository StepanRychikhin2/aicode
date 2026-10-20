import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import HomePage from './components/HomePage/HomePage'
import CatalogPage from './components/CatalogPage/CatalogPage'
import ProductModal from './components/ProductModal/ProductModal'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { CartProvider, useCart } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import './styles/global.css'
import styles from './App.module.css'

const getScrollBehavior = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)')?.matches
    ? 'auto'
    : 'smooth'

function Store() {
  const { lang } = useLang()
  const { toast, setToast, addition } = useCart()
  const [route, setRoute] = useState(() =>
    window.location.hash.startsWith('#/catalog') ? 'catalog' : 'home'
  )
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const handleRoute = () => {
      if (window.location.hash.startsWith('#/')) {
        // Set the route's starting position before its layout effects measure it.
        window.scrollTo({ top: 0, behavior: 'auto' })
        setRoute(window.location.hash.startsWith('#/catalog') ? 'catalog' : 'home')
      }
    }
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])

  useEffect(() => {
    document.title =
      lang === 'ua'
        ? 'GC Cheese — сир із турботою про смак'
        : 'GC Cheese — cheese made with care'
    const description =
      lang === 'ua'
        ? 'Сири малими партіями з доброго молока. Обирайте улюблені смаки GC Cheese та замовляйте доставку Україною.'
        : 'Small-batch cheese made with good milk. Explore GC Cheese favourites and order delivery across Ukraine.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'ua' ? 'uk_UA' : 'en_US')
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en'
  }, [lang])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timer)
  }, [toast, setToast, addition?.sequence])

  const navigate = (page, section) => {
    setCartOpen(false)
    setSelectedProduct(null)
    const hash = page === 'catalog' ? '#/catalog' : '#/'
    const pageChanged = route !== page
    if (pageChanged) window.scrollTo({ top: 0, behavior: 'auto' })
    setRoute(page)
    if (window.location.hash !== hash) window.location.hash = hash
    if (section) {
      window.setTimeout(
        () =>
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' }),
        pageChanged ? 140 : 0
      )
    } else if (!pageChanged) {
      window.scrollTo({ top: 0, behavior: getScrollBehavior() })
    }
  }

  const checkout = () => {
    setCartOpen(false)
    if (route === 'catalog') {
      window.location.hash = '#/'
      window.setTimeout(
        () =>
          document.getElementById('order')?.scrollIntoView({ behavior: getScrollBehavior() }),
        120
      )
    } else {
      document.getElementById('order')?.scrollIntoView({ behavior: getScrollBehavior() })
    }
  }

  return (
    <>
      <a className={styles['skip-link']} href="#main-content">{lang === 'ua' ? 'Перейти до вмісту' : 'Skip to content'}</a>

      <Header route={route} onCart={() => setCartOpen(true)} onNavigate={navigate} />

      {route === 'catalog' ? (
        <CatalogPage onProduct={setSelectedProduct} />
      ) : (
        <HomePage onProduct={setSelectedProduct} />
      )}

      <Footer />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
      />

      <ProductModal
        key={selectedProduct?.id || 'closed'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {toast && (
        <div key={addition?.sequence} className={styles['toast']} role="status" aria-atomic="true">
          <span className={styles['toast-check']}>✓</span>
          <span>{lang === 'ua' ? 'Додано до кошика' : 'Added to your basket'}</span>
        </div>
      )}

      <a
        className={styles['scroll-top']}
        href="#top"
        aria-label={lang === 'ua' ? 'На початок сторінки' : 'Back to top'}
        onClick={(event) => {
          event.preventDefault()
          window.scrollTo({ top: 0, behavior: getScrollBehavior() })
        }}
      >
        ↑
      </a>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <Store />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
