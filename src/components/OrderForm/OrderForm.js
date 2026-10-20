import Icon from '../Icon/Icon'
import styles from './OrderForm.module.css'
import React, { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { useCart } from '../../context/CartContext'
import { submitOrder } from '../../services/submitOrder'

export default function OrderForm() {
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
    <section className={styles['order-section']} id="order">
      <div data-reveal className={styles['order-intro']}>
        <span className={styles['eyebrow'] + ' ' + styles['accent-pill']}>
          {lang === 'ua' ? 'ЗРОБІМО ЦЕ СМАЧНО' : 'LET’S MAKE IT A GOOD ONE'}
        </span>
        <h2>{t.orderTitle}</h2>
        <p>{t.orderText}</p>
        <div className={styles['order-doodle']}>
          ✳<br />
          <span>
            {lang === 'ua' ? 'зроблено з турботою' : 'made with care'}
          </span>
        </div>
      </div>
      <div data-reveal className={styles['order-form-wrap']}>
        {sent ? (
          <div className={styles['form-success']} role="status">
            <span className={styles['success-icon']}>✓</span>
            <h3>{t.success}</h3>
            <p className={styles['success-sub']}>
              {lang === 'ua'
                ? 'Наш менеджер зв’яжеться з вами протягом 15 хвилин.'
                : 'Our manager will contact you within 15 minutes.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate={false}>
            <div className={styles['form-row']}>
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
                  pattern="[+0-9\(\)\s\-]{8,}"
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
              <label className={styles['radio-label']}>
                <input
                  type="radio"
                  name="customerType"
                  value="customer"
                  defaultChecked
                />{' '}
                <span>{t.customer}</span>
              </label>
              <label className={styles['radio-label']}>
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
              <div role="alert" className={styles['form-error-banner']}>
                <span className={styles['error-icon']}><Icon name="alert" /></span>
                <div className={styles['error-text']}>
                  <p>{error}</p>
                </div>
                <button
                  type="submit"
                  className={styles['retry-btn']}
                >
                  {t.retry}
                </button>
              </div>
            )}

            <button
              className={styles['button'] + ' ' + styles['button-accent'] + ' ' + styles['form-submit']}
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
