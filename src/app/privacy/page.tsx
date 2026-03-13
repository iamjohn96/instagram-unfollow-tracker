'use client'

import { Shield } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={28} className="text-[#1A73E8]" />
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white">Privacy Policy</h1>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">Last updated: March 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">No Data Collection</h2>
            <p>UnfollowTracker does not collect, store, transmit, or process any personal data on our servers. We have no servers that receive your data. All analysis of your Instagram data happens entirely within your web browser using client-side JavaScript.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">How Your Data Is Processed</h2>
            <p>When you upload your Instagram data file, it is read directly by your browser. The file contents are parsed in memory and stored temporarily in your browser&apos;s sessionStorage and IndexedDB (for snapshot history). This data never leaves your device.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Local Storage</h2>
            <p>We store only two things locally on your device:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your dark/light mode preference (localStorage)</li>
              <li>Snapshot data you choose to save (IndexedDB, only on your device)</li>
            </ul>
            <p className="mt-2">You can clear this data at any time by clearing your browser storage.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">No Tracking or Analytics</h2>
            <p>We do not use Google Analytics, cookies for tracking, advertising pixels, or any third-party tracking services.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Third-Party Services</h2>
            <p>This application is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc. We do not share any data with Instagram or Meta.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[#1E293B] dark:text-white mb-2">Contact</h2>
            <p>If you have any questions about this privacy policy, please open an issue on our GitHub repository.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
