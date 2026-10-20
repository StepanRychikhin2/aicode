import styles from './SectionTitle.module.css'
import React from 'react'

export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div data-reveal className={styles['section-title']}>
      <span className={styles['eyebrow']}>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}
