import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../i18n/LanguageContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { lang } = useLang()

  const isDark = theme === 'dark'
  const label = isDark
    ? lang === 'ua'
      ? 'Увімкнути світлу тему'
      : 'Switch to light mode'
    : lang === 'ua'
      ? 'Увімкнути темну тему'
      : 'Switch to dark mode'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? (
          // Moon icon
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          // Sun icon
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )}
      </span>
    </button>
  )
}

