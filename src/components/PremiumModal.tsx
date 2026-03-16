'use client'

import { X, Check, Lock } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1A73E8]/10 rounded-full mb-3">
            <Lock className="text-[#1A73E8]" size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t.premium_title}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.premium_desc}</p>
        </div>

        <div className="space-y-3 mb-6">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
              <Check size={16} className="text-green-500 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center p-3 border-2 border-[#1A73E8] rounded-xl hover:bg-[#1A73E8]/5 transition-colors">
            <span className="text-lg font-bold text-[#1A73E8]">$3.99</span>
            <span className="text-xs text-slate-500">{t.premium_monthly}</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-[#1A73E8] rounded-xl hover:bg-[#1557B0] transition-colors relative">
            <span className="absolute -top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Save 58%</span>
            <span className="text-lg font-bold text-white">$19.99</span>
            <span className="text-xs text-white/80">{t.premium_yearly}</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">{t.premium_cancel}</p>
      </div>
    </div>
  )
}
