import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => window.localStorage.getItem('gc-cheese-language') || 'ua')
  useEffect(() => { window.localStorage.setItem('gc-cheese-language', lang); document.documentElement.lang = lang === 'ua' ? 'uk' : 'en' }, [lang])
  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export function useLang() { return useContext(LanguageContext) }
