import styles from './Header.module.css'

import React, { useEffect, useRef, useState } from 'react'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useLang } from '../../i18n/LanguageContext'
import { useCart } from '../../context/CartContext'
import { useNavIndicator } from './useNavIndicator'

export default function Header({ route, onCart, onNavigate }) {
  const { lang, t } = useLang()
  const { count, addition } = useCart()
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuRef = useRef(null)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const activeKey = route === 'catalog' ? 'catalog' : activeSection || 'home'
  useNavIndicator(navRef, indicatorRef, activeKey, lang, open)

  useEffect(() => {
    if (route === 'catalog') setActiveSection('')
  }, [route])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const close = () => setOpen(false)
  const go = (page, section) => (event) => {
    event.preventDefault()
    close()
    setActiveSection(section || '')
    onNavigate(page, section)
  }

  return (
    <header className={styles['site-header']}>
      <a className={styles['brand']} href="#/" onClick={go('home')} aria-label="GC Cheese home">
        <span className={styles['brand-mark']}>gc</span>
        <span>
          GC <b>CHEESE</b>
        </span>
      </a>

      <nav
        ref={navRef}
        id="main-navigation"
        className={`${styles['main-nav']} ${open ? styles.open : ''}`}
        aria-label={lang === 'ua' ? 'Головна навігація' : 'Main navigation'}
      >
        <span ref={indicatorRef} className={styles['nav-indicator']} aria-hidden="true" />
        <a data-nav-key="home" aria-current={activeKey === 'home' ? 'page' : undefined} href="#/" onClick={go('home')}>
          <span data-nav-label>{t.navHome}</span>
        </a>
        <a data-nav-key="catalog" aria-current={activeKey === 'catalog' ? 'page' : undefined} href="#/catalog" onClick={go('catalog')}>
          <span data-nav-label>{t.navCatalog}</span>
        </a>
        <a data-nav-key="about" aria-current={activeKey === 'about' ? 'location' : undefined} href="#about" onClick={go('home', 'about')}>
          <span data-nav-label>{t.navAbout}</span>
        </a>
        <a data-nav-key="restaurants" aria-current={activeKey === 'restaurants' ? 'location' : undefined} href="#restaurants" onClick={go('home', 'restaurants')}>
          <span data-nav-label>{t.navRestaurants}</span>
        </a>
      </nav>

      <div className={styles['header-actions']}>
        <ThemeToggle />
        <LanguageSwitcher />
        <button
          className={styles['cart-trigger']}
          type="button"
          onClick={() => { close(); onCart() }}
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
          <span key={addition?.sequence || 'initial'} data-added={Boolean(addition)} className={styles['cart-count']}>{count}</span>
        </button>
        <button
          className={styles['menu-toggle']}
          ref={menuRef}
          type="button"
          aria-controls="main-navigation"
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
