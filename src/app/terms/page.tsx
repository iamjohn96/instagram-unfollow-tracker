'use client'

import { FileText } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-6">
          <FileText size={28} className="text-[#1A73E8]" />
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white">Terms of Service</h1>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">Last updated: March 2026</p>

        <div className="text-sm space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Acceptance of Terms</h2>
            <p>By using UnfollowTracker, you agree to these terms. If you do not agree, please do not use this service.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Description of Service</h2>
            <p>UnfollowTracker is a free, browser-based tool that helps you analyze your Instagram followers and following lists. The service processes data entirely on your device and does not collect any personal information.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">No Affiliation with Instagram or Meta</h2>
            <p>UnfollowTracker is an independent, third-party tool. It is not affiliated with, sponsored by, or endorsed by Instagram, Meta Platforms, Inc., or any of their subsidiaries. Instagram and Meta are trademarks of their respective owners.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Acceptable Use</h2>
            <p>You agree to use this service only for lawful purposes and in accordance with Instagram&apos;s Terms of Service. You are responsible for ensuring your use of your own Instagram data complies with applicable laws and platform policies.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Disclaimer of Warranties</h2>
            <p>This service is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee the accuracy, completeness, or usefulness of the analysis provided. Instagram may change their data export format at any time, which could affect functionality.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, UnfollowTracker shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this service.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
