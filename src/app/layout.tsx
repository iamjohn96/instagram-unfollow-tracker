import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instagram Unfollow Tracker – No Login, No Ban Risk',
  description: 'The safest way to track Instagram unfollowers. No login required. 100% client-side processing. Your data never leaves your device.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] dark:bg-slate-950 text-[#1E293B] dark:text-slate-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
