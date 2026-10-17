import React, { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'

export default function Header({ onCart, onNavigate }) {
  const { lang, t } = useLang()
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)
  const go = (page, section) => (event) => {
    event.preventDefault()
    close()
    onNavigate(page, section)
  }

  return (
    <header className="site-header">
      <a className="brand" href="#/" onClick={go('home')} aria-label="GC Cheese home">
        <span className="brand-mark">gc</span>
        <span>
          GC <b>CHEESE</b>
        </span>
      </a>

      <nav
        className={open ? 'main-nav open' : 'main-nav'}
        aria-label={lang === 'ua' ? 'Головна навігація' : 'Main navigation'}
      >
        <a href="#/" onClick={go('home')}>
          {t.navHome}
        </a>
        <a href="#/catalog" onClick={go('catalog')}>
          {t.navCatalog}
        </a>
        <a href="#about" onClick={go('home', 'about')}>
          {t.navAbout}
        </a>
        <a href="#restaurants" onClick={go('home', 'restaurants')}>
          {t.navRestaurants}
        </a>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <LanguageSwitcher />
        <button
          className="cart-trigger"
          type="button"
          onClick={onCart}
          aria-label={`${t.cart}, ${count}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6" />
            <path d="M9 8 10 4m5 4 1-4M8.5 20h.01M18 20h.01" />
            <path d="m10 12 1 2m3-2-1 2" />
          </svg>
          <span className="cart-count">{count}</span>
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label={
            open
              ? lang === 'ua'
                ? 'Закрити меню'
                : 'Close menu'
              : lang === 'ua'
                ? 'Відкрити меню'
                : 'Open menu'
          }
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
