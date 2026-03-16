'use client'

import { Globe } from 'lucide-react'
import { useTranslation } from '@/utils/i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  const toggle = () => {
    setLocale(locale === 'en' ? 'ko' : 'en')
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 text-xs font-medium"
      aria-label="Toggle language"
    >
      <Globe size={15} />
      <span>{locale === 'en' ? 'EN' : 'KR'}</span>
    </button>
  )
}
