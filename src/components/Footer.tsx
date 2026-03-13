'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <Link href="/privacy" className="hover:text-[#1A73E8] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#1A73E8] transition-colors">Terms of Service</Link>
          <Link href="/guide" className="hover:text-[#1A73E8] transition-colors">Guide</Link>
        </div>
        <p>Not affiliated with Instagram or Meta. All data processing is 100% client-side.</p>
        <p className="mt-1">© {new Date().getFullYear()} UnfollowTracker</p>
      </div>
    </footer>
  )
}
