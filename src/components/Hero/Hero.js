import styles from './Hero.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'

export default function Hero() {
  const { lang, t } = useLang()
  return (
    <section className={styles['hero']} data-hero>
      <img
        className={styles['hero-photo']}
        src={process.env.PUBLIC_URL + '/images/hero-photo.jpg'}
        alt=""
        fetchPriority="high"
      />
      <div className={styles['hero-shade']} />
      <div className={styles['hero-content']}>
        <span data-hero-item className={styles['eyebrow'] + ' ' + styles['hero-pill-eyebrow']}>
          <span className={styles['glow-dot']} /> {t.heroEyebrow}
        </span>
        <h1 data-hero-item>
          {t.heroTitle.split('\n').map((line, i) => (
            <React.Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>
        <p data-hero-item>{t.heroText}</p>
        <div data-hero-item className={styles['hero-actions']}>
          <a className={styles['button'] + ' ' + styles['button-accent']} href="#/catalog">
            <span>{t.catalog}</span>
            <span aria-hidden="true"> ↗</span>
          </a>
          <a className={styles['button'] + ' ' + styles['button-glass']} href="#order">
            <span>{t.order}</span>
            <span aria-hidden="true"> ↓</span>
          </a>
        </div>
        <div data-hero-item className={styles['hero-note']}>
          <span className={styles['accent-star']}>✳</span> {t.heroNote}
        </div>
      </div>
      <div className={styles['hero-caption']}>
        {lang === 'ua'
          ? 'ПОВІЛЬНО СТВОРЕНО, РАДО РОЗДІЛЕНО'
          : 'MADE SLOW, SHARED OFTEN'}
      </div>
    </section>
  )
}
