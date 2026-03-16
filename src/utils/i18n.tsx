'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Locale } from './translations'

type TranslationDict = typeof translations[Locale]

const I18nContext = createContext<{
  t: TranslationDict
  locale: Locale
  setLocale: (l: Locale) => void
}>({
  t: translations.en,
  locale: 'en',
  setLocale: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem('safeunfollow-lang') as Locale
    if (saved === 'en' || saved === 'ko') {
      setLocaleState(saved)
    } else if (navigator.language.startsWith('ko')) {
      setLocaleState('ko')
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('safeunfollow-lang', l)
  }

  return (
    <I18nContext.Provider value={{ t: translations[locale], locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useTranslation = () => useContext(I18nContext)
