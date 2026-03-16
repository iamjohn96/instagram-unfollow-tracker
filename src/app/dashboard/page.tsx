'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Users, UserMinus, UserPlus, ArrowLeftRight, Search, ExternalLink, Lock, Upload } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PremiumModal from '@/components/PremiumModal'
import { analyze } from '@/utils/analyzer'
import type { InstagramUser } from '@/utils/parser'
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
    return <p className="text-center text-slate-400 dark:text-slate-500 py-10 text-sm">{emptyLabel}</p>
  }

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-700">
      {sorted.map((u) => (
        <li key={u.username} className="flex items-center justify-between py-3 px-1">
          <div>
            <a
              href={`https://www.instagram.com/${u.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1A73E8] hover:underline text-sm flex items-center gap-1"
            >
              @{u.username}
              <ExternalLink size={12} />
            </a>
            {u.timestamp > 0 && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
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
  const [showPremium, setShowPremium] = useState(false)

  useEffect(() => {
    const f = sessionStorage.getItem('ig_followers')
    const fw = sessionStorage.getItem('ig_following')
    if (f && fw) {
      setFollowers(JSON.parse(f))
      setFollowing(JSON.parse(fw))
    }
    setLoaded(true)
  }, [])

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
          <div className="text-center">
            <Users size={48} className="text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-2">{t.dash_no_data_title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{t.dash_no_data_desc}</p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
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
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#1E293B] dark:text-white">{t.dash_title}</h1>
          <Link href="/upload" className="text-xs text-[#1A73E8] hover:underline flex items-center gap-1">
            <Upload size={12} /> {t.dash_reupload}
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Users, label: t.dash_followers, value: followers.length, color: 'text-blue-500' },
            { icon: UserPlus, label: t.dash_following, value: following.length, color: 'text-purple-500' },
            { icon: ArrowLeftRight, label: t.dash_mutual, value: mutual.length, color: 'text-green-500' },
            { icon: UserMinus, label: t.dash_dont_follow_back, value: notFollowingBack.length, color: 'text-red-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
              <Icon size={18} className={`${color} mb-2`} />
              <p className="text-xl font-bold text-[#1E293B] dark:text-white">{value.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {[
            { key: 'notFollowingBack', label: t.dash_tab1, count: notFollowingBack.length },
            { key: 'iDontFollowBack', label: t.dash_tab2, count: iDontFollowBack.length },
            { key: 'changes', label: t.dash_tab3, premium: true },
          ].map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => {
                if (tabItem.premium) { setShowPremium(true); return }
                setTab(tabItem.key as Tab); setSearch('')
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                tab === tabItem.key && !tabItem.premium
                  ? 'bg-white dark:bg-slate-700 text-[#1A73E8] shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tabItem.premium && <Lock size={11} />}
              {tabItem.label}
              {tabItem.count !== undefined && (
                <span className="bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs px-1.5 py-0.5 rounded-full">{tabItem.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Search & sort */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.dash_search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 dark:text-white"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none dark:text-white"
          >
            <option value="alpha">{t.dash_sort_alpha}</option>
            <option value="date">{t.dash_sort_date}</option>
          </select>
        </div>

        {/* List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm px-4">
          <UserList users={filtered} sort={sort} emptyLabel={t.dash_no_results} />
        </div>

        {/* Premium teaser */}
        <div className="mt-6 bg-gradient-to-r from-[#1A73E8]/10 to-purple-500/10 border border-[#1A73E8]/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[#1E293B] dark:text-white text-sm">{t.dash_premium_title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.dash_premium_desc}</p>
          </div>
          <button
            onClick={() => setShowPremium(true)}
            className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
          >
            {t.dash_upgrade}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
