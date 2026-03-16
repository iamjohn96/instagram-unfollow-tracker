'use client'

import { FileText } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/utils/i18n'

export default function TermsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-14 w-full">
        <div className="flex items-center gap-3 mb-3 animate-fade-in-up">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.terms_title}</h1>
        </div>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mb-12">{t.terms_updated}</p>

        <div className="space-y-8 animate-fade-in-up animate-delay-100">
          {[
            { title: t.terms_s1_title, body: t.terms_s1_body },
            { title: t.terms_s2_title, body: t.terms_s2_body },
            { title: t.terms_s3_title, body: t.terms_s3_body },
            { title: t.terms_s4_title, body: t.terms_s4_body },
            { title: t.terms_s5_title, body: t.terms_s5_body },
            { title: t.terms_s6_title, body: t.terms_s6_body },
            { title: t.terms_s7_title, body: t.terms_s7_body },
          ].map(({ title, body }) => (
            <section key={title} className="border-b border-slate-100 dark:border-zinc-800 pb-8 last:border-0 last:pb-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
