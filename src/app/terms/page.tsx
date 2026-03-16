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
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-6">
          <FileText size={28} className="text-[#1A73E8]" />
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white">{t.terms_title}</h1>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">{t.terms_updated}</p>

        <div className="text-sm space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s1_title}</h2>
            <p>{t.terms_s1_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s2_title}</h2>
            <p>{t.terms_s2_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s3_title}</h2>
            <p>{t.terms_s3_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s4_title}</h2>
            <p>{t.terms_s4_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s5_title}</h2>
            <p>{t.terms_s5_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s6_title}</h2>
            <p>{t.terms_s6_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.terms_s7_title}</h2>
            <p>{t.terms_s7_body}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
