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
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-14 w-full">
        <div className="flex items-center gap-3 mb-3 animate-fade-in-up">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.privacy_title}</h1>
        </div>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mb-12 ml-13">{t.privacy_updated}</p>

        <div className="space-y-8 animate-fade-in-up animate-delay-100">
          {[
            {
              title: t.privacy_s1_title,
              body: <p>{t.privacy_s1_body}</p>,
            },
            {
              title: t.privacy_s2_title,
              body: <p>{t.privacy_s2_body}</p>,
            },
            {
              title: t.privacy_s3_title,
              body: (
                <div>
                  <p>{t.privacy_s3_body}</p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-3 text-slate-500 dark:text-zinc-400">
                    <li>{t.privacy_s3_item1}</li>
                    <li>{t.privacy_s3_item2}</li>
                  </ul>
                  <p className="mt-3">{t.privacy_s3_clear}</p>
                </div>
              ),
            },
            {
              title: t.privacy_s4_title,
              body: <p>{t.privacy_s4_body}</p>,
            },
            {
              title: t.privacy_s5_title,
              body: <p>{t.privacy_s5_body}</p>,
            },
            {
              title: t.privacy_s6_title,
              body: <p>{t.privacy_s6_body}</p>,
            },
          ].map(({ title, body }) => (
            <section key={title} className="border-b border-slate-100 dark:border-zinc-800 pb-8 last:border-0 last:pb-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
              <div className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">{body}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
