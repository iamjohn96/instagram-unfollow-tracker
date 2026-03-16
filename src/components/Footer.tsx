'use client'

import Link from 'next/link'
import { useTranslation } from '@/utils/i18n'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <Link href="/privacy" className="hover:text-[#1A73E8] transition-colors">{t.footer_privacy}</Link>
          <Link href="/terms" className="hover:text-[#1A73E8] transition-colors">{t.footer_terms}</Link>
          <Link href="/guide" className="hover:text-[#1A73E8] transition-colors">{t.footer_guide}</Link>
        </div>
        <p>{t.footer_disclaimer}</p>
        <p className="mt-1">© {new Date().getFullYear()} SafeUnfollow</p>
      </div>
    </footer>
  )
}
