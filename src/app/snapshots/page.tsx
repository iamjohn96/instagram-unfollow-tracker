'use client'

import { useEffect, useState } from 'react'
import { Trash2, Clock, Lock, Upload } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PremiumModal from '@/components/PremiumModal'
import { db, type Snapshot } from '@/utils/db'

export default function SnapshotsPage() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [showPremium, setShowPremium] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)

  const load = async () => {
    const all = await db.snapshots.orderBy('date').reverse().toArray()
    setSnapshots(all)
  }

  useEffect(() => { load() }, [])

  const deleteSnapshot = async (id: number) => {
    setDeleting(id)
    await db.snapshots.delete(id)
    await load()
    setDeleting(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}

      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#1E293B] dark:text-white">Snapshot History</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {snapshots.length} snapshot{snapshots.length !== 1 ? 's' : ''} saved
              <span className="text-slate-400 dark:text-slate-500"> (Free: 1 max)</span>
            </p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-1.5 text-sm bg-[#1A73E8] hover:bg-[#1557B0] text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Upload size={14} />
            New Snapshot
          </Link>
        </div>

        {snapshots.length === 0 ? (
          <div className="text-center py-16">
            <Clock size={40} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">No snapshots yet. Upload your Instagram data to create one.</p>
            <Link href="/upload" className="inline-block mt-4 text-[#1A73E8] text-sm hover:underline">Upload now →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {snapshots.map((snap) => (
              <div
                key={snap.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-[#1E293B] dark:text-white text-sm">{snap.label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {new Date(snap.date).toLocaleString()}
                  </p>
                  <div className="flex gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span>{snap.followers.length} followers</span>
                    <span>{snap.following.length} following</span>
                  </div>
                </div>
                <button
                  onClick={() => snap.id && deleteSnapshot(snap.id)}
                  disabled={deleting === snap.id}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Delete snapshot"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Premium compare teaser */}
        <div className="mt-8 bg-gradient-to-r from-[#1A73E8]/10 to-purple-500/10 border border-[#1A73E8]/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock size={18} className="text-[#1A73E8] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-[#1E293B] dark:text-white text-sm">Compare Snapshots</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Upgrade to Premium to save unlimited snapshots and compare any two to see who unfollowed you over time.
              </p>
            </div>
            <button
              onClick={() => setShowPremium(true)}
              className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
            >
              Upgrade
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
