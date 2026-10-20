import styles from './ProductSkeleton.module.css'

import React, { useEffect, useRef } from 'react'

export default function ProductSkeleton({ count = 1 }) {
  const cards = useRef([])
  useEffect(() => {
    if (!window.IntersectionObserver || !window.matchMedia) return undefined
    const nodes = cards.current.filter(Boolean)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visible = new Set()
    const sync = () => nodes.forEach(node => {
      node.dataset.animationActive = String(visible.has(node) && !document.hidden && !reduced.matches)
    })
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      })
      sync()
    })
    nodes.forEach(node => observer.observe(node))
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [count])
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <article ref={node => { cards.current[idx] = node }} data-animation-active="false" className={styles['skeleton-card']} key={idx} aria-hidden="true">
          <div className={styles['skeleton-image-wrapper']}>
            <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-image']} />
          </div>
          <div className={styles['skeleton-info']}>
            <div className={styles['skeleton-text-group']}>
              <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-tag']} />
              <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-title']} />
            </div>
            <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-weight']} />
          </div>
          <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-desc']} />
          <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-desc'] + ' ' + styles['short']} />
          <div className={styles['skeleton-bottom']}>
            <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-price']} />
            <div className={styles['skeleton-shimmer'] + ' ' + styles['skeleton-btn']} />
          </div>
        </article>
      ))}
    </>
  )
}
