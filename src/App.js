import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import { Footer, HomePage, CatalogPage, ProductModal } from './components/Storefront'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { CartProvider, useCart } from './context/CartContext'
import './styles/global.css'

const getScrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

function Store() {
  const { lang } = useLang(); const { toast, setToast } = useCart()
  const [route, setRoute] = useState(() => window.location.hash === '#/catalog' ? 'catalog' : 'home')
  const [cartOpen, setCartOpen] = useState(false); const [selectedProduct, setSelectedProduct] = useState(null)
  useEffect(() => { const handleRoute = () => { if (window.location.hash.startsWith('#/')) { setRoute(window.location.hash.startsWith('#/catalog') ? 'catalog' : 'home'); window.scrollTo({ top: 0, behavior: getScrollBehavior() }) } }; window.addEventListener('hashchange', handleRoute); return () => window.removeEventListener('hashchange', handleRoute) }, [])
  useEffect(() => { const nodes = document.querySelectorAll('.reveal'); if (!('IntersectionObserver' in window)) { nodes.forEach((node) => node.classList.add('reveal-visible')); return undefined } const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('reveal-visible'); observer.unobserve(entry.target) } }), { threshold: .12 }); nodes.forEach((node) => observer.observe(node)); return () => observer.disconnect() }, [route])
  useEffect(() => { document.title = lang === 'ua' ? 'GC Cheese — сир із турботою про смак' : 'GC Cheese — cheese made with care'; const description = lang === 'ua' ? 'Сири малими партіями з доброго молока. Обирайте улюблені смаки GC Cheese та замовляйте доставку Україною.' : 'Small-batch cheese made with good milk. Explore GC Cheese favourites and order delivery across Ukraine.'; document.querySelector('meta[name="description"]')?.setAttribute('content', description); document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title); document.querySelector('meta[property="og:description"]')?.setAttribute('content', description); document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'ua' ? 'uk_UA' : 'en_US'); document.documentElement.lang = lang === 'ua' ? 'uk' : 'en' }, [lang])
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(''), 2400); return () => window.clearTimeout(timer) }, [toast, setToast])
  const navigate = (page, section) => {
    setCartOpen(false)
    setSelectedProduct(null)
    const hash = page === 'catalog' ? '#/catalog' : '#/'
    const pageChanged = route !== page
    if (window.location.hash !== hash) window.location.hash = hash
    if (section) {
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' }), pageChanged ? 140 : 0)
    } else if (!pageChanged) {
      window.scrollTo({ top: 0, behavior: getScrollBehavior() })
    }
  }
  const checkout = () => { setCartOpen(false); if (route === 'catalog') { window.location.hash = '#/'; window.setTimeout(() => document.getElementById('order')?.scrollIntoView({ behavior: getScrollBehavior() }), 120) } else document.getElementById('order')?.scrollIntoView({ behavior: getScrollBehavior() }) }
  return <><Header onCart={() => setCartOpen(true)} onNavigate={navigate}/>{route === 'catalog' ? <CatalogPage onProduct={setSelectedProduct}/> : <HomePage onProduct={setSelectedProduct}/>}<Footer/><Cart open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={checkout}/><ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>{toast && <div className="toast" role="status">{lang === 'ua' ? 'Додано до кошика' : 'Added to your basket'} <span>✓</span></div>}<a className="scroll-top" href="#top" aria-label={lang === 'ua' ? 'На початок сторінки' : 'Back to top'} onClick={(event) => {event.preventDefault();window.scrollTo({top:0,behavior:getScrollBehavior()})}}>↑</a></>
}
export default function App() { return <LanguageProvider><CartProvider><Store/></CartProvider></LanguageProvider> }
