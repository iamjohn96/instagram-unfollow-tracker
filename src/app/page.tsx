'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Lock, Server, Download, Upload, BarChart3, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/utils/i18n'

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SafeUnfollow',
  url: 'https://safeunfollow.com',
  description: 'The safest Instagram unfollow tracker. See who unfollowed you without login or ban risk.',
  applicationCategory: 'SocialNetworkingApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Instagram unfollow tracking',
    'No login required',
    '100% client-side processing',
    'Snapshot comparison',
    'Multi-language support',
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is SafeUnfollow safe to use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. SafeUnfollow never asks for your Instagram password. All data is processed 100% in your browser and never sent to any server.' },
    },
    {
      '@type': 'Question',
      name: 'Will I get banned for using SafeUnfollow?',
      acceptedAnswer: { '@type': 'Answer', text: "No. SafeUnfollow uses Instagram's official data export feature. It does not interact with Instagram's API or automate any actions on your account." },
    },
    {
      '@type': 'Question',
      name: 'How do I check who unfollowed me on Instagram?',
      acceptedAnswer: { '@type': 'Answer', text: 'Download your Instagram data as JSON from Settings > Account Center > Your Information > Download Your Information. Then upload the file to SafeUnfollow to instantly see who unfollowed you.' },
    },
    {
      '@type': 'Question',
      name: 'Is SafeUnfollow free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Basic unfollow tracking is completely free. Premium features like unlimited snapshots and CSV export are available for $3.99/month.' },
    },
  ],
}

export default function Home() {
  const { t, locale } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqItems = [
    { q: t.faq_q1, a: t.faq_a1 },
    { q: t.faq_q2, a: t.faq_a2 },
    { q: t.faq_q3, a: t.faq_a3 },
    { q: t.faq_q4, a: t.faq_a4 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50/60 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)] -z-10" />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-28 md:py-40 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-sm px-4 py-1.5 rounded-full mb-8 font-medium shadow-sm shadow-blue-100/50 dark:shadow-none animate-fade-in-up">
              <Shield size={14} />
              {t.hero_badge}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6 animate-fade-in-up animate-delay-100">
              {locale === 'en' ? (
                <>The Safest Instagram<br />Unfollow Tracker</>
              ) : locale === 'ja' ? (
                <>最も安全なInstagramフォロー<br />解除トラッカー</>
              ) : (
                t.hero_title
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
              {t.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-blue-500/25 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30"
              >
                {t.hero_cta}
                <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t.hero_steps_subtitle} ↓
              </a>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Lock, label: t.trust_1_title, desc: t.trust_1_desc, iconColor: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40' },
              { icon: Server, label: t.trust_2_title, desc: t.trust_2_desc, iconColor: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/40' },
              { icon: Shield, label: t.trust_3_title, desc: t.trust_3_desc, iconColor: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
            ].map(({ icon: Icon, label, desc, iconColor, bg }, i) => (
              <div
                key={label}
                className={`bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 animate-fade-in-up animate-delay-${(i + 1) * 100}`}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 ${bg} rounded-xl mb-4`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1.5">{label}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-white dark:bg-zinc-900/40 border-y border-slate-200 dark:border-zinc-800 py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-3">{t.how_label}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">{t.how_title}</h2>
              <p className="text-slate-500 dark:text-slate-400">{t.how_subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px border-t-2 border-dashed border-slate-200 dark:border-zinc-700" />

              {[
                { icon: Download, step: '1', title: t.how_step1_title, desc: t.how_step1_desc },
                { icon: Upload, step: '2', title: t.how_step2_title, desc: t.how_step2_desc },
                { icon: BarChart3, step: '3', title: t.how_step3_title, desc: t.how_step3_desc },
              ].map(({ icon: Icon, step, title, desc }, i) => (
                <div
                  key={step}
                  className={`flex flex-col items-center text-center animate-fade-in-up animate-delay-${(i + 1) * 100}`}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Icon size={32} className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-zinc-900 border-2 border-blue-600 rounded-full text-xs font-bold text-blue-600 flex items-center justify-center shadow-sm">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.02]"
              >
                {t.hero_cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-3">{t.why_label}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{t.why_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { stat: '100%', label: t.trust_1_title, icon: CheckCircle, iconColor: 'text-blue-500' },
              { stat: '0', label: t.stat_ban, icon: Shield, iconColor: 'text-emerald-500' },
              { stat: '∞', label: t.trust_2_title, icon: Server, iconColor: 'text-cyan-500' },
            ].map(({ stat, label, icon: Icon, iconColor }, i) => (
              <div
                key={label}
                className={`bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-slate-200 dark:border-zinc-800 text-center shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 animate-fade-in-up animate-delay-${(i + 1) * 100}`}
              >
                <Icon size={22} className={`${iconColor} mx-auto mb-3`} />
                <p className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">{stat}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{t.faq_title}</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqItems.map(({ q, a }, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 mb-20">
          <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 rounded-3xl p-12 md:p-16 text-center shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t.final_cta_title}
              </h2>
              <p className="text-blue-100 mb-10 text-lg">{t.final_cta_sub}</p>
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-xl shadow-lg"
              >
                {t.hero_cta}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
