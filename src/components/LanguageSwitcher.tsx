'use client'

import { useTranslation } from '@/utils/i18n'
import type { Locale } from '@/utils/translations'

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: 'KR' },
  { value: 'ja', label: 'JA' },
  { value: 'es', label: 'ES' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <>
      {/* Desktop: pill buttons */}
      <div className="hidden sm:flex items-center gap-0.5 rounded-xl bg-slate-100 dark:bg-zinc-800 p-0.5">
        {LOCALES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setLocale(value)}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
              locale === value
                ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'
            }`}
            aria-label={`Switch to ${label}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown select */}
      <select
        className="sm:hidden text-xs font-semibold rounded-lg px-2 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border-none outline-none cursor-pointer"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label="Select language"
      >
        {LOCALES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </>
  )
}
