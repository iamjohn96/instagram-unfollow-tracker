'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Users, UserMinus, UserPlus, ArrowLeftRight, Search, ExternalLink, Lock, Upload, BookmarkPlus, Check, ChevronDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PremiumModal from '@/components/PremiumModal'
import { analyze, compareSnapshots } from '@/utils/analyzer'
import type { InstagramUser } from '@/utils/parser'
import { db, type Snapshot } from '@/utils/db'
import { useTranslation } from '@/utils/i18n'

type Tab = 'notFollowingBack' | 'iDontFollowBack' | 'changes'
type SortKey = 'alpha' | 'date'

function UserList({ users, sort, emptyLabel }: { users: InstagramUser[]; sort: SortKey; emptyLabel: string }) {
  const sorted = useMemo(() => {
    return [...users].sort((a, b) =>
      sort === 'alpha'
        ? a.username.localeCompare(b.username)
        : b.timestamp - a.timestamp
    )
  }, [users, sort])

  if (sorted.length === 0) {
    return <p className="text-center text-slate-400 dark:text-zinc-500 py-12 text-sm">{emptyLabel}</p>
  }

  return (
    <ul className="divide-y divide-slate-100 dark:divide-zinc-800">
      {sorted.map((u) => (
        <li key={u.username} className="flex items-center justify-between py-3.5 -mx-2 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
          <div>
            <a
              href={`https://www.instagram.com/${u.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1.5"
            >
              @{u.username}
              <ExternalLink size={11} className="opacity-60" />
            </a>
            {u.timestamp > 0 && (
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
                {new Date(u.timestamp * 1000).toLocaleDateString()}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [followers, setFollowers] = useState<InstagramUser[]>([])
  const [following, setFollowing] = useState<InstagramUser[]>([])
  const [loaded, setLoaded] = useState(false)
  const [tab, setTab] = useState<Tab>('notFollowingBack')
  const [sort, setSort] = useState<SortKey>('alpha')
  const [search, setSearch] = useState('')
  const [prevSnapshot, setPrevSnapshot] = useState<Snapshot | null | undefined>(undefined)
  const [todaySnapshot, setTodaySnapshot] = useState<Snapshot | null | undefined>(undefined)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [isPremiumUser, setIsPremiumUser] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    setIsPremiumUser(localStorage.getItem('isPremium') === 'true')
  }, [])

  useEffect(() => {
    const f = sessionStorage.getItem('ig_followers')
    const fw = sessionStorage.getItem('ig_following')
    if (f && fw) {
      setFollowers(JSON.parse(f))
      setFollowing(JSON.parse(fw))
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (tab === 'changes' && prevSnapshot === undefined) {
      db.snapshots.orderBy('date').reverse().first().then((snap) => {
        setPrevSnapshot(snap ?? null)
      })
    }
  }, [tab, prevSnapshot])

  useEffect(() => {
    const today = new Date().toDateString()
    db.snapshots.toArray().then((all) => {
      const match = all.find((s) => new Date(s.date).toDateString() === today) ?? null
      setTodaySnapshot(match)
    })
  }, [])

  const saveSnapshot = async () => {
    if (!isPremiumUser && !todaySnapshot) {
      const count = await db.snapshots.count()
      if (count >= 1) {
        setShowPremiumModal(true)
        return
      }
    }
    setSaveState('saving')
    const now = new Date()
    const label = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    const followersData: Record<string, number> = {}
    const followingData: Record<string, number> = {}
    followers.forEach((u) => { followersData[u.username] = u.timestamp })
    following.forEach((u) => { followingData[u.username] = u.timestamp })

    if (!isPremiumUser && todaySnapshot?.id) {
      await db.snapshots.update(todaySnapshot.id, {
        date: now.toISOString(),
        label,
        followers: followers.map((u) => u.username),
        following: following.map((u) => u.username),
        followersData,
        followingData,
      })
    } else {
      const id = await db.snapshots.add({
        date: now.toISOString(),
        label,
        followers: followers.map((u) => u.username),
        following: following.map((u) => u.username),
        followersData,
        followingData,
      })
      setTodaySnapshot({ id: id as number, date: now.toISOString(), label, followers: followers.map((u) => u.username), following: following.map((u) => u.username), followersData, followingData })
    }
    setPrevSnapshot(undefined)
    setSaveState('saved')
    setTimeout(() => setSaveState('idle'), 2500)
  }

  const changes = useMemo(() => {
    if (!prevSnapshot) return null
    const prevFollowers = prevSnapshot.followers.map((u) => ({
      username: u,
      href: `https://www.instagram.com/${u}`,
      timestamp: prevSnapshot.followersData[u] ?? 0,
    }))
    const prevFollowing = prevSnapshot.following.map((u) => ({
      username: u,
      href: `https://www.instagram.com/${u}`,
      timestamp: prevSnapshot.followingData[u] ?? 0,
    }))
    return compareSnapshots(
      { followers: prevFollowers, following: prevFollowing },
      { followers, following }
    )
  }, [prevSnapshot, followers, following])

  const { notFollowingBack, iDontFollowBack, mutual } = useMemo(
    () => analyze(followers, following),
    [followers, following]
  )

  const filtered = useMemo(() => {
    const list = tab === 'notFollowingBack' ? notFollowingBack : iDontFollowBack
    if (!search.trim()) return list
    return list.filter((u) => u.username.toLowerCase().includes(search.toLowerCase()))
  }, [tab, notFollowingBack, iDontFollowBack, search])

  if (!loaded) return null

  if (followers.length === 0 && following.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Users size={36} className="text-slate-300 dark:text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.dash_no_data_title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">{t.dash_no_data_desc}</p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.02]"
            >
              <Upload size={16} />
              {t.dash_upload_file}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.dash_title}</h1>
          <Link
            href="/upload"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-zinc-700 px-3 py-1.5 rounded-xl hover:border-blue-300 dark:hover:border-blue-800"
          >
            <Upload size={13} /> {t.dash_reupload}
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in-up animate-delay-100">
          {[
            { icon: Users, label: t.dash_followers, value: followers.length, leftBorder: 'border-l-blue-500', iconColor: 'text-blue-500', iconBg: 'bg-blue-50 dark:bg-blue-950/30' },
            { icon: UserPlus, label: t.dash_following, value: following.length, leftBorder: 'border-l-violet-500', iconColor: 'text-violet-500', iconBg: 'bg-violet-50 dark:bg-violet-950/30' },
            { icon: ArrowLeftRight, label: t.dash_mutual, value: mutual.length, leftBorder: 'border-l-emerald-500', iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50 dark:bg-emerald-950/30' },
            { icon: UserMinus, label: t.dash_dont_follow_back, value: notFollowingBack.length, leftBorder: 'border-l-red-500', iconColor: 'text-red-500', iconBg: 'bg-red-50 dark:bg-red-950/30' },
          ].map(({ icon: Icon, label, value, leftBorder, iconColor, iconBg }) => (
            <div key={label} className={`bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 border-l-4 ${leftBorder} shadow-sm`}>
              <div className={`inline-flex items-center justify-center w-8 h-8 ${iconBg} rounded-lg mb-3`}>
                <Icon size={15} className={iconColor} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Save snapshot */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-up animate-delay-200">
          <button
            onClick={saveSnapshot}
            disabled={saveState === 'saving'}
            className={`w-full max-w-sm inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02] ${
              saveState === 'saved'
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {saveState === 'saved' ? (
              <><Check size={15} /> {t.dash_snapshot_saved}</>
            ) : (!isPremiumUser && todaySnapshot) ? (
              <><BookmarkPlus size={15} /> {t.dash_snapshot_update}</>
            ) : (
              <><BookmarkPlus size={15} /> {t.dash_save_snapshot}</>
            )}
          </button>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 text-center mt-3">{t.dash_snapshot_hint}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 animate-fade-in-up animate-delay-300">
          {[
            { key: 'notFollowingBack', label: t.dash_tab1, count: notFollowingBack.length },
            { key: 'iDontFollowBack', label: t.dash_tab2, count: iDontFollowBack.length },
            { key: 'changes', label: t.dash_tab3 },
          ].map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => { setTab(tabItem.key as Tab); setSearch('') }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                tab === tabItem.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
              }`}
            >
              {tabItem.label}
              {tabItem.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  tab === tabItem.key
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300'
                }`}>
                  {tabItem.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'changes' ? (
          prevSnapshot === null ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 px-4 py-12 text-center shadow-sm">
              <p className="text-slate-400 dark:text-zinc-500 text-sm">{t.dash_no_snapshot}</p>
            </div>
          ) : changes && (changes.lostFollowers.length > 0 || changes.gainedFollowers.length > 0) ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-5">
                  <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">{changes.lostFollowers.length}</p>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300 mt-1">{t.dash_new_unfollowers}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-5">
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{changes.gainedFollowers.length}</p>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mt-1">{t.dash_new_followers}</p>
                </div>
              </div>

              {!isPremiumUser ? (
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="space-y-3 blur-sm pointer-events-none select-none opacity-60" aria-hidden="true">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 px-4 pt-4 pb-2">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">{t.dash_new_unfollowers}</p>
                      {[...Array(Math.min(changes.lostFollowers.length, 3))].map((_, i) => (
                        <div key={i} className="py-3 border-t border-slate-100 dark:border-zinc-800 first:border-0">
                          <div className="w-28 h-4 bg-slate-200 dark:bg-zinc-700 rounded" />
                        </div>
                      ))}
                    </div>
                    {changes.gainedFollowers.length > 0 && (
                      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 px-4 pt-4 pb-2">
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">{t.dash_new_followers}</p>
                        {[...Array(Math.min(changes.gainedFollowers.length, 2))].map((_, i) => (
                          <div key={i} className="py-3 border-t border-slate-100 dark:border-zinc-800 first:border-0">
                            <div className="w-24 h-4 bg-slate-200 dark:bg-zinc-700 rounded" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Lock size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.dash_premium_title}</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 w-full leading-relaxed">{t.dash_premium_desc}</p>
                    <div className="flex flex-row gap-2 w-full">
                      <button
                        onClick={() => setShowPremiumModal(true)}
                        className="flex-1 text-center border border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 whitespace-nowrap"
                      >
                        {t.upgrade_monthly}
                      </button>
                      <button
                        onClick={() => setShowPremiumModal(true)}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 shadow-sm whitespace-nowrap"
                      >
                        {t.upgrade_yearly}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {changes.lostFollowers.length > 0 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm px-4 pt-4 pb-2">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">{t.dash_new_unfollowers}</p>
                      <ul className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {changes.lostFollowers.map((u) => (
                          <li key={u.username} className="py-3">
                            <a
                              href={`https://www.instagram.com/${u.username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-red-500 hover:underline text-sm flex items-center gap-1.5"
                            >
                              @{u.username}
                              <ExternalLink size={11} className="opacity-60" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {changes.gainedFollowers.length > 0 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm px-4 pt-4 pb-2">
                      <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">{t.dash_new_followers}</p>
                      <ul className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {changes.gainedFollowers.map((u) => (
                          <li key={u.username} className="py-3">
                            <a
                              href={`https://www.instagram.com/${u.username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-emerald-500 hover:underline text-sm flex items-center gap-1.5"
                            >
                              @{u.username}
                              <ExternalLink size={11} className="opacity-60" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : changes ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm px-4 py-12 text-center">
              <p className="text-slate-400 dark:text-zinc-500 text-sm">{t.dash_no_changes}</p>
            </div>
          ) : null
        ) : (
          <>
            {/* Search & sort */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder={t.dash_search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:text-white dark:placeholder:text-zinc-500 transition-all shadow-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none text-sm bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-white transition-all shadow-sm"
                >
                  <option value="alpha">{t.dash_sort_alpha}</option>
                  <option value="date">{t.dash_sort_date}</option>
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm px-4">
              <UserList users={filtered} sort={sort} emptyLabel={t.dash_no_results} />
            </div>
          </>
        )}

      </main>

      <Footer />
      {showPremiumModal && (
        <PremiumModal
          onClose={() => setShowPremiumModal(false)}
          onPremiumActivated={() => setIsPremiumUser(true)}
        />
      )}
    </div>
  )
}
