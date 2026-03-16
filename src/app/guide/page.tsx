'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/utils/i18n'

export default function GuidePage() {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios')
  const { t } = useTranslation()

  const steps = [
    { title: t.guide_step1_title, desc: t.guide_step1_desc },
    { title: t.guide_step2_title, desc: t.guide_step2_desc },
    { title: t.guide_step3_title, desc: t.guide_step3_desc },
    { title: t.guide_step4_title, desc: t.guide_step4_desc },
    { title: t.guide_step5_title, desc: t.guide_step5_desc },
    { title: t.guide_step6_title, desc: t.guide_step6_desc },
    { title: t.guide_step7_title, desc: t.guide_step7_desc },
    { title: t.guide_step8_title, desc: t.guide_step8_desc },
    { title: t.guide_step9_title, desc: t.guide_step9_desc },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-2">{t.guide_title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{t.guide_subtitle}</p>

        {/* Platform toggle */}
        <div className="flex gap-2 mb-4">
          {(['ios', 'android'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                platform === p
                  ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-[#1A73E8]'
              }`}
            >
              <Smartphone size={15} />
              {p === 'ios' ? t.guide_tab_ios : t.guide_tab_android}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">{t.guide_platforms_note}</p>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] dark:text-white text-sm mb-0.5">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note about JSON */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 mb-8 text-sm text-amber-800 dark:text-amber-300">
          <strong>{t.guide_json_warning_label}</strong> {t.guide_json_warning}
        </div>

        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
          >
            {t.guide_skip}
            <ChevronRight size={18} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
