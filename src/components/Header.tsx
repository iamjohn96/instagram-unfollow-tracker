'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Moon, Sun, Instagram } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from '@/utils/i18n'

export default function Header() {
  const [dark, setDark] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#1A73E8]">
          <Instagram size={22} />
          <span>UnfollowTracker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/guide" className="hover:text-[#1A73E8] transition-colors">{t.nav_guide}</Link>
          <Link href="/upload" className="hover:text-[#1A73E8] transition-colors">{t.nav_upload}</Link>
          <Link href="/dashboard" className="hover:text-[#1A73E8] transition-colors">{t.nav_dashboard}</Link>
          <Link href="/snapshots" className="hover:text-[#1A73E8] transition-colors">{t.nav_history}</Link>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
