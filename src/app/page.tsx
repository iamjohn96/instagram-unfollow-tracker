'use client'

import Link from 'next/link'
import { Shield, Lock, Server, Download, Upload, BarChart3 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/utils/i18n'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm px-3 py-1 rounded-full mb-6 font-medium">
            <Shield size={14} />
            {t.hero_badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] dark:text-white leading-tight mb-4">
            {t.hero_title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            {t.hero_subtitle}
          </p>
          <Link
            href="/guide"
            className="inline-block bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold px-8 py-3 rounded-xl text-base transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
          >
            {t.hero_cta}
          </Link>
        </section>

        {/* Trust badges */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Lock, label: t.trust_1_title, desc: t.trust_1_desc },
              { icon: Server, label: t.trust_2_title, desc: t.trust_2_desc },
              { icon: Shield, label: t.trust_3_title, desc: t.trust_3_desc },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[#1A73E8]/10 rounded-full mb-3">
                  <Icon size={20} className="text-[#1A73E8]" />
                </div>
                <h3 className="font-semibold text-[#1E293B] dark:text-white text-sm mb-1">{label}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white dark:bg-slate-800/50 py-14 border-y border-slate-100 dark:border-slate-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-2 text-[#1E293B] dark:text-white">{t.how_title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm">{t.hero_steps_subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Download, step: '1', title: t.how_step1_title, desc: t.how_step1_desc },
                { icon: Upload, step: '2', title: t.how_step2_title, desc: t.how_step2_desc },
                { icon: BarChart3, step: '3', title: t.how_step3_title, desc: t.how_step3_desc },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-14 h-14 bg-[#1A73E8] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
                      <Icon size={26} className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-slate-800 border-2 border-[#1A73E8] rounded-full text-xs font-bold text-[#1A73E8] flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1E293B] dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/guide"
                className="inline-block bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                {t.hero_get_started}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
