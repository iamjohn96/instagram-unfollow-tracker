'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileArchive, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { parseFile } from '@/utils/parser'
import { db } from '@/utils/db'

type Status = 'idle' | 'parsing' | 'success' | 'error'

export default function UploadPage() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState('')

  const handleFile = useCallback(async (file: File) => {
    setStatus('parsing')
    setError('')
    setProgress('Reading file...')

    try {
      setProgress('Parsing Instagram data...')
      const { followers, following } = await parseFile(file)

      setProgress('Saving snapshot...')
      const followersData: Record<string, number> = {}
      const followingData: Record<string, number> = {}
      followers.forEach((u) => { followersData[u.username] = u.timestamp })
      following.forEach((u) => { followingData[u.username] = u.timestamp })

      const count = await db.snapshots.count()
      if (count >= 1) {
        // Free tier: only 1 snapshot allowed
        await db.snapshots.clear()
      }

      await db.snapshots.add({
        date: new Date().toISOString(),
        label: `Snapshot ${new Date().toLocaleDateString()}`,
        followers: followers.map((u) => u.username),
        following: following.map((u) => u.username),
        followersData,
        followingData,
      })

      // Store current data in sessionStorage for dashboard
      sessionStorage.setItem('ig_followers', JSON.stringify(followers))
      sessionStorage.setItem('ig_following', JSON.stringify(following))

      setStatus('success')
      setProgress(`Found ${followers.length} followers and ${following.length} following`)
      setTimeout(() => router.push('/dashboard'), 1200)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to parse file. Please try again.')
    }
  }, [router])

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

      <main className="flex-1 max-w-xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-2">Upload Your Instagram Data</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Upload the ZIP file you downloaded from Instagram, or individual JSON files.
        </p>

        {/* Drop zone */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all ${
            dragging
              ? 'border-[#1A73E8] bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-[#1A73E8] hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
          }`}
        >
          <input type="file" accept=".zip,.json" className="sr-only" onChange={onInputChange} />

          {status === 'idle' && (
            <>
              <div className="w-14 h-14 bg-[#1A73E8]/10 rounded-2xl flex items-center justify-center">
                {dragging ? <FileArchive size={28} className="text-[#1A73E8]" /> : <Upload size={28} className="text-[#1A73E8]" />}
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#1E293B] dark:text-white">Drop your file here</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">or click to browse</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Supports .zip and .json files</p>
              </div>
            </>
          )}

          {status === 'parsing' && (
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-[#1E293B] dark:text-white">{progress}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-700 dark:text-green-400">Parsed successfully!</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{progress}</p>
              <p className="text-xs text-slate-400 mt-1">Redirecting to dashboard...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <AlertCircle size={40} className="text-red-500 mx-auto mb-2" />
              <p className="font-semibold text-red-600 dark:text-red-400">Upload failed</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">{error}</p>
              <p className="text-xs text-[#1A73E8] mt-3">Click to try again</p>
            </div>
          )}
        </label>

        {/* Privacy notice */}
        <div className="mt-6 flex items-start gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <Shield size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-green-800 dark:text-green-300">Your file never leaves your device</p>
            <p className="text-green-700 dark:text-green-400 mt-0.5">All processing happens 100% in your browser. We never upload your data to any server.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
