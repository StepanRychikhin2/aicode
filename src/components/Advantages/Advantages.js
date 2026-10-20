import Icon from '../Icon/Icon'
import styles from './Advantages.module.css'
import React from 'react'
import { useLang } from '../../i18n/LanguageContext'
import SectionTitle from '../SectionTitle/SectionTitle'

export default function Advantages() {
  const { lang, t } = useLang()
  const advantages = [
    [t.advantage1, t.advantage1Text, 'leaf'],
    [t.advantage2, t.advantage2Text, 'heart'],
    [t.advantage3, t.advantage3Text, 'clock'],
    [t.advantage4, t.advantage4Text, 'truck'],
  ]
  return (
    <section className={styles['section'] + ' ' + styles['advantages']} id="advantages">
      <SectionTitle eyebrow={lang === 'ua' ? 'ЯКІСТЬ У КОЖНІЙ ДЕТАЛІ' : 'GOOD FROM THE START'} title={t.advantages} />
      <div className={styles['advantage-grid']}>
        {advantages.map(([title, text, icon], i) => (
          <article data-reveal className={styles['advantage-card']} key={title}>
            <div className={styles['advantage-icon-wrapper']}>
              <span className={styles['advantage-icon']}><Icon name={icon} /></span>
            </div>
            <span className={styles['advantage-number']}>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
