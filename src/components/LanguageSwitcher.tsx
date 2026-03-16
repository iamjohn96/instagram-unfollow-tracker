'use client'

import { useTranslation } from '@/utils/i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'ko' : 'en')}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-xs font-semibold"
      aria-label="Toggle language"
    >
      <span className="text-blue-600 dark:text-blue-400">{locale === 'en' ? 'EN' : 'KR'}</span>
      <span className="text-slate-300 dark:text-zinc-600">/</span>
      <span className="text-slate-400 dark:text-zinc-500">{locale === 'en' ? 'KR' : 'EN'}</span>
    </button>
  )
}
