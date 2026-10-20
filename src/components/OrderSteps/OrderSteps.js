import styles from './OrderSteps.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'
import SectionTitle from '../SectionTitle/SectionTitle'

export default function OrderSteps() {
  const { lang, t } = useLang()
  return (
    <section className={styles['section'] + ' ' + styles['how-order']}>
      <SectionTitle eyebrow={lang === 'ua' ? 'ТРИ ПРОСТІ КРОКИ' : 'THREE SIMPLE STEPS'} title={t.howTo} />
      <div className={styles['steps-grid']}>
        {[
          [t.step1, t.step1Text],
          [t.step2, t.step2Text],
          [t.step3, t.step3Text],
        ].map(([title, text], i) => (
          <article data-reveal className={styles['step']} key={title}>
            <span className={styles['step-number']}>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            {i < 2 && <span className={styles['step-connector']} aria-hidden="true">→</span>}
          </article>
        ))}
      </div>
    </section>
  )
}
