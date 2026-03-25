'use client'

import { X, Check, Sparkles } from 'lucide-react'
import { useTranslation } from '@/utils/i18n'

interface PremiumModalProps {
  onClose: () => void
}

export default function PremiumModal({ onClose }: PremiumModalProps) {
  const { t } = useTranslation()

  const features = [
    t.premium_feature_1,
    t.premium_feature_2,
    t.premium_feature_3,
    t.premium_feature_4,
    t.premium_feature_5,
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-700 max-w-md w-full p-6 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X size={17} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
            <Sparkles className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.premium_title}</h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1.5 leading-relaxed">{t.premium_desc}</p>
        </div>

        <div className="space-y-2.5 mb-6">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
              <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-emerald-500" />
              </div>
              {f}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://safeunfollow.lemonsqueezy.com/checkout/buy/7fe88ebd-96b3-4901-9218-859959cfc02e"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 border-2 border-slate-200 dark:border-zinc-700 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-950/10"
          >
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">$3.99</span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{t.premium_monthly}</span>
          </a>
          <a
            href="https://safeunfollow.lemonsqueezy.com/checkout/buy/eea09f76-d8e4-4bbc-899c-38d70bec7cba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 relative shadow-lg shadow-blue-500/25"
          >
            <span className="absolute -top-2.5 right-3 bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">Save 58%</span>
            <span className="text-xl font-extrabold text-white">$19.99</span>
            <span className="text-xs text-white/70 mt-0.5">{t.premium_yearly}</span>
          </a>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-zinc-500 mt-4">{t.premium_cancel}</p>
      </div>
    </div>
  )
}
