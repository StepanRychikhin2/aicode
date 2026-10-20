import React from 'react'
import styles from './Icon.module.css'

const paths = {
  cheese: <><path d="m3 10 8-6 10 6v10H3Z"/><path d="M3 10h18M8 14h.01M16 17h.01M13 13h.01M11 7h.01"/></>,
  leaf: <><path d="M20 4c-9-1-16 3-16 10a6 6 0 0 0 6 6c7 0 11-7 10-16Z"/><path d="m4 20 11-11"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  truck: <><path d="M3 5h12v12H3ZM15 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  alert: <><path d="m12 3 10 18H2Z"/><path d="M12 9v4m0 4h.01"/></>,
}
export default function Icon({ name, size = 24 }) {
  return <svg className={styles.icon} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.cheese}</svg>
}
