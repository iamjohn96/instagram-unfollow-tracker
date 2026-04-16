'use client'

import { useState } from 'react'
import { X, Check, Sparkles } from 'lucide-react'
import { useTranslation } from '@/utils/i18n'
import { checkPremiumStatus } from '@/utils/premiumCheck'

interface PremiumModalProps {
  onClose: () => void
  onPremiumActivated?: () => void
}

export default function PremiumModal({ onClose, onPremiumActivated }: PremiumModalProps) {
  const { t } = useTranslation()
  const [verifyEmail, setVerifyEmail] = useState('')
  const [verifyState, setVerifyState] = useState<'idle' | 'checking' | 'found' | 'notfound'>('idle')

  const handleVerify = async () => {
    if (!verifyEmail.trim()) return
    setVerifyState('checking')
    const isPremium = await checkPremiumStatus(verifyEmail.trim())
    if (isPremium) {
      localStorage.setItem('isPremium', 'true')
      localStorage.setItem('premiumEmail', verifyEmail.trim().toLowerCase())
      setVerifyState('found')
      setTimeout(() => {
        onPremiumActivated?.()
        onClose()
      }, 1200)
    } else {
      setVerifyState('notfound')
    }
  }

  const features = [
    t.premium_feature_1,
    t.premium_feature_2,
    t.premium_feature_4,
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
            href="https://checkout.dodopayments.com/buy/pdt_0NbWskBGarEniKABARtpq?quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 border-2 border-slate-200 dark:border-zinc-700 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-950/10"
          >
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">$3.99</span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{t.premium_monthly}</span>
          </a>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_0NbWsnlHHbhazcQwjwDSV?quantity=1"
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

        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-zinc-800">
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-2 text-center">Already purchased? Activate your premium</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={verifyEmail}
              onChange={(e) => { setVerifyEmail(e.target.value); setVerifyState('idle') }}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
            <button
              onClick={handleVerify}
              disabled={verifyState === 'checking' || verifyState === 'found'}
              className="text-sm font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {verifyState === 'checking' ? 'Checking…' : verifyState === 'found' ? '✓ Activated' : 'Verify'}
            </button>
          </div>
          {verifyState === 'notfound' && (
            <p className="text-xs text-red-500 mt-2 text-center">No premium found for this email.</p>
          )}
          {verifyState === 'found' && (
            <p className="text-xs text-emerald-500 mt-2 text-center">Premium activated! Reloading…</p>
          )}
        </div>
      </div>
    </div>
  )
}
