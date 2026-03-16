'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileArchive, CheckCircle, AlertCircle, Lock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { parseFile } from '@/utils/parser'
import { useTranslation } from '@/utils/i18n'

type Status = 'idle' | 'parsing' | 'success' | 'error'

export default function UploadPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState('')

  const handleFile = useCallback(async (file: File) => {
    setStatus('parsing')
    setError('')
    setProgress(t.upload_parsing)

    try {
      setProgress(t.upload_parsing_data)
      const { followers, following } = await parseFile(file)

      sessionStorage.setItem('ig_followers', JSON.stringify(followers))
      sessionStorage.setItem('ig_following', JSON.stringify(following))

      setStatus('success')
      setProgress(`Found ${followers.length} followers and ${following.length} following`)
      setTimeout(() => router.push('/dashboard'), 1200)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to parse file. Please try again.')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, t])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.upload_title}</h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t.upload_subtitle}</p>
        </div>

        {/* Drop zone */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center gap-5 border-2 border-dashed rounded-2xl p-16 cursor-pointer transition-all duration-200 animate-fade-in-up animate-delay-100 ${
            dragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.01]'
              : status === 'success'
              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20'
              : status === 'error'
              ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
              : 'border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/10'
          }`}
        >
          <input type="file" accept=".zip,.json" className="sr-only" onChange={onInputChange} />

          {status === 'idle' && (
            <>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                dragging ? 'bg-blue-100 dark:bg-blue-900/40 scale-110' : 'bg-slate-100 dark:bg-zinc-800'
              }`}>
                {dragging
                  ? <FileArchive size={28} className="text-blue-600 dark:text-blue-400" />
                  : <Upload size={28} className="text-slate-400 dark:text-zinc-500" />
                }
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-900 dark:text-white text-lg">{t.upload_drag}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.upload_or}</p>
                <span className="inline-block mt-3 text-xs text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                  {t.upload_supports}
                </span>
              </div>
            </>
          )}

          {status === 'parsing' && (
            <div className="text-center">
              <div className="w-12 h-12 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-semibold text-slate-900 dark:text-white">{progress}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
              <p className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">{t.upload_success}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{progress}</p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2">{t.upload_redirecting}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <AlertCircle size={48} className="text-red-500 mx-auto mb-3" />
              <p className="font-bold text-red-600 dark:text-red-400 text-lg">{t.upload_failed}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">{error}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 font-medium">{t.upload_try_again}</p>
            </div>
          )}
        </label>

        {/* Privacy notice */}
        <div className="mt-5 flex items-start gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-5 animate-fade-in-up animate-delay-200">
          <Lock size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-emerald-800 dark:text-emerald-300">{t.upload_privacy_title}</p>
            <p className="text-emerald-700 dark:text-emerald-400 mt-0.5 leading-relaxed">{t.upload_privacy_desc}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
