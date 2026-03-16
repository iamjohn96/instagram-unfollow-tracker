'use client'

import Link from 'next/link'
import { useTranslation } from '@/utils/i18n'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 mt-auto bg-white dark:bg-zinc-950">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-extrabold text-blue-600 dark:text-blue-500 text-sm tracking-tight">SafeUnfollow</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.footer_privacy}</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.footer_terms}</Link>
            <Link href="/guide" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.footer_guide}</Link>
          </div>
          <p className="text-xs text-slate-400 dark:text-zinc-500">© {new Date().getFullYear()} SafeUnfollow</p>
        </div>
        <p className="text-xs text-slate-400 dark:text-zinc-500 text-center mt-5 max-w-2xl mx-auto leading-relaxed">
          {t.footer_disclaimer}
        </p>
      </div>
    </footer>
  )
}
