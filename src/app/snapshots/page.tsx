'use client'

import { useEffect, useState } from 'react'
import { Trash2, Clock, Lock, Upload, Users, UserPlus } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { db, type Snapshot } from '@/utils/db'
import { useTranslation } from '@/utils/i18n'

export default function SnapshotsPage() {
  const { t } = useTranslation()
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
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
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.snap_title}</h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              {snapshots.length} {snapshots.length !== 1 ? t.snap_count_plural : t.snap_count_singular}
              <span className="text-slate-400 dark:text-zinc-500"> {t.snap_free_limit}</span>
            </p>
          </div>
          <Link
            href="/upload"
            className="flex items-center gap-1.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm shadow-blue-500/20 hover:scale-[1.02]"
          >
            <Upload size={14} />
            {t.snap_new}
          </Link>
        </div>

        {snapshots.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up animate-delay-100">
            <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock size={28} className="text-slate-300 dark:text-zinc-600" />
            </div>
            <p className="text-slate-500 dark:text-zinc-400 text-sm mb-4">{t.snap_empty}</p>
            <Link href="/upload" className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              {t.snap_upload_now}
            </Link>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in-up animate-delay-100">
            {snapshots.map((snap) => (
              <div
                key={snap.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm p-5 flex items-center justify-between hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">{snap.label}</p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
                    {new Date(snap.date).toLocaleString()}
                  </p>
                  <div className="flex gap-4 mt-2.5">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
                      <Users size={12} className="text-blue-500" />
                      {snap.followers.length} {t.snap_followers}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
                      <UserPlus size={12} className="text-violet-500" />
                      {snap.following.length} {t.snap_following}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => snap.id && deleteSnapshot(snap.id)}
                  disabled={deleting === snap.id}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 ml-4 flex-shrink-0"
                  aria-label={t.snap_delete_label}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Premium compare teaser */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/8 to-cyan-500/8 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 animate-fade-in-up">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.snap_compare_title}</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{t.snap_compare_desc}</p>
            </div>
            <a
              href="https://safeunfollow.lemonsqueezy.com/checkout/buy/7fe88ebd-96b3-4901-9218-859959cfc02e?checkout[custom][email]="
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02]"
            >
              {t.snap_upgrade}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
