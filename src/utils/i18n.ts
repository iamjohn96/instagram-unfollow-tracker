'use client'

import { useState, useEffect, useCallback } from 'react'
import { translations, type Locale } from './translations'

const STORAGE_KEY = 'safeunfollow-lang'

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ko') return saved

    const browserLang = navigator.language || (navigator.languages?.[0]) || 'en'
    if (browserLang.startsWith('ko')) return 'ko'
  }
  return 'en'
}

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    setLocaleState(getInitialLocale())
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  return {
    t: translations[locale],
    locale,
    setLocale,
  }
}
