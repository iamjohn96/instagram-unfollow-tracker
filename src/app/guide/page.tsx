'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const steps = [
  { title: 'Open Instagram', desc: 'Tap your profile picture in the bottom right corner, then tap the menu icon (☰) in the top right.' },
  { title: 'Go to Settings', desc: 'Tap "Settings and privacy" at the bottom of the menu.' },
  { title: 'Your Activity', desc: 'Scroll down and tap "Your activity" then "Download your information".' },
  { title: 'Select Data', desc: 'Tap "Download or transfer information" → "Some of your information" → check "Followers and following" only.' },
  { title: 'Choose JSON Format', desc: 'Select "Download to device". Change the Format dropdown to "JSON" (not HTML). Leave date range as All time.' },
  { title: 'Request Download', desc: 'Tap "Create files". Instagram will email you when the file is ready (usually within minutes to a few hours). Download the ZIP from that email.' },
]

export default function GuidePage() {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-2">How to Download Your Instagram Data</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Follow these steps to get your followers &amp; following data from Instagram.</p>

        {/* Platform toggle */}
        <div className="flex gap-2 mb-8">
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
              {p === 'ios' ? 'iPhone (iOS)' : 'Android'}
            </button>
          ))}
        </div>

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
          <strong>Important:</strong> Make sure to select <strong>JSON</strong> format (not HTML). Our tool only supports JSON files.
        </div>

        <div className="text-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
          >
            I Already Have My File
            <ChevronRight size={18} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
