'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, ChevronRight, AlertTriangle } from 'lucide-react'
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

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Page header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.guide_title}</h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t.guide_subtitle}</p>
        </div>

        {/* Platform toggle */}
        <div className="flex gap-1 mb-2 bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl w-fit animate-fade-in-up animate-delay-100">
          {(['ios', 'android'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                platform === p
                  ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <Smartphone size={14} />
              {p === 'ios' ? t.guide_tab_ios : t.guide_tab_android}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mb-8">{t.guide_platforms_note}</p>

        {/* Steps */}
        <div className="space-y-3 mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${120 + i * 40}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-5 mb-8 flex gap-3 animate-fade-in-up">
          <AlertTriangle size={18} className="text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>{t.guide_json_warning_label}</strong> {t.guide_json_warning}
          </p>
        </div>

        <div className="text-center animate-fade-in-up">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:scale-[1.02]"
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
