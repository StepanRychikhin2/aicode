import styles from './RestaurantSection.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'

export default function RestaurantSection() {
  const { lang, t } = useLang()
  return (
    <section className={styles['restaurant-section']} id="restaurants">
      <div data-reveal className={styles['restaurant-copy']}>
        <span className={styles['eyebrow'] + ' ' + styles['accent-eyebrow']}>{lang === 'ua' ? 'СМАК ДОБРОЇ СПІВПРАЦІ' : 'A GOOD PARTNERSHIP'}</span>
        <h2>{t.restaurants}</h2>
        <p>{t.restaurantText}</p>
        <a className={styles['button'] + ' ' + styles['button-accent']} href="#order">
          <span>{t.priceList}</span>
          <span aria-hidden="true"> ↗</span>
        </a>
        <div className={styles['restaurant-list']}>
          <span className={styles['restaurant-chip']}>01 {lang === 'ua' ? 'Гнучкі оптові умови' : 'Flexible wholesale'}</span>
          <span className={styles['restaurant-chip']}>02 {lang === 'ua' ? 'Надійна доставка' : 'Reliable delivery'}</span>
          <span className={styles['restaurant-chip']}>03 {lang === 'ua' ? 'Завжди на зв’язку' : 'A real person to call'}</span>
        </div>
      </div>
      <div data-reveal className={styles['restaurant-image']}>
        <img
          src={process.env.PUBLIC_URL + '/images/cheese-board-assortment.jpg'}
          alt=""
          loading="lazy"
        />
        <div className={styles['image-label']}>
          GOOD FOOD
          <br />
          STARTS HERE
        </div>
      </div>
    </section>
  )
}
