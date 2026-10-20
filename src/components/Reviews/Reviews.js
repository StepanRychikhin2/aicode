import styles from './Reviews.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'
import SectionTitle from '../SectionTitle/SectionTitle'
import { reviews } from '../../data/reviews'

export default function Reviews() {
  const { lang, t } = useLang()
  return (
    <section className={styles['section']}>
      <SectionTitle eyebrow={lang === 'ua' ? 'ВАШІ ТЕПЛІ СЛОВА' : 'KIND WORDS'} title={t.reviews} />
      <div className={styles['review-grid']}>
        {reviews.map((review) => (
          <figure data-reveal className={styles['review-card']} key={review.name}>
            <div
              className={styles['stars']}
              aria-label={`${review.rating} out of 5 stars`}
            >
              {'★'.repeat(review.rating)}
            </div>
            <blockquote>“{review.text[lang]}”</blockquote>
            <figcaption>
              <span className={styles['review-avatar']}>{review.name.charAt(0)}</span>
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
  )
}
