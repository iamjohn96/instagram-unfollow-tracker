import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/utils/i18n'

export const metadata: Metadata = {
  title: 'SafeUnfollow – No Login, No Ban Risk',
  description: 'The safest way to track Instagram unfollowers. No login required. 100% client-side processing. Your data never leaves your device.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
