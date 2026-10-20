import styles from './AboutSection.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'

export default function AboutSection() {
  const { lang, t } = useLang()
  return (
    <section className={styles['story-section']} id="about">
      <div data-photo-reveal className={styles['story-image']}>
        <img
          data-parallax-photo
          src={process.env.PUBLIC_URL + '/images/about-photo.jpg'}
          alt=""
          loading="lazy"
        />
        <span data-photo-cover className={styles['photo-cover']} aria-hidden="true" />
        <span className={styles['image-stamp']}>
          MADE BY HAND
          <br />
          IN UKRAINE
        </span>
      </div>
      <div data-reveal className={styles['story-copy']}>
        <span className={styles['eyebrow']}>{lang === 'ua' ? 'ЗНАЙОМСТВО З НАМИ' : 'A LITTLE ABOUT US'}</span>
        <h2>{t.about}</h2>
        <p>{t.aboutText}</p>
        <a className={styles['underlined-link']} href="#order">
          {t.order}
          <span> ↗</span>
        </a>
        <div className={styles['handwritten']}>
          from our family
          <br />
          to your table <span>♡</span>
        </div>
      </div>
    </section>
  )
}
