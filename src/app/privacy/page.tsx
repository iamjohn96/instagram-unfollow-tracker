'use client'

import { Shield } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/utils/i18n'

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={28} className="text-[#1A73E8]" />
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white">{t.privacy_title}</h1>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">{t.privacy_updated}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.privacy_s1_title}</h2>
            <p>{t.privacy_s1_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.privacy_s2_title}</h2>
            <p>{t.privacy_s2_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.privacy_s3_title}</h2>
            <p>{t.privacy_s3_body}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t.privacy_s3_item1}</li>
              <li>{t.privacy_s3_item2}</li>
            </ul>
            <p className="mt-2">{t.privacy_s3_clear}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.privacy_s4_title}</h2>
            <p>{t.privacy_s4_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.privacy_s5_title}</h2>
            <p>{t.privacy_s5_body}</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">{t.privacy_s6_title}</h2>
            <p>{t.privacy_s6_body}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
