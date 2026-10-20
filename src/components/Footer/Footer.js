import styles from './Footer.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className={styles['site-footer']}>
      <div className={styles['footer-top']}>
        <a className={styles['brand']} href="#/">
          <span className={styles['brand-mark']}>gc</span>
          <span>
            GC <b>CHEESE</b>
          </span>
        </a>
        <p>Small batch. Big heart.</p>
        <div className={styles['footer-contact']}>
          <span>{t.contact}</span>
          <a href="mailto:hello@gccheese.ua">hello@gccheese.ua</a>
          <a href="tel:+380000000000">+38 (000) 000 00 00</a>
        </div>
      </div>
      <div className={styles['footer-bottom']}>
        <span>{t.rights}</span>
        <span>CHEESE MADE WITH CARE · UKRAINE</span>
      </div>
    </footer>
  )
}
