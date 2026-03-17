import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/utils/i18n'

export const metadata: Metadata = {
  title: 'SafeUnfollow — See Who Unfollowed You on Instagram | Free & Safe',
  description: 'Track who unfollowed you on Instagram safely. No login required, no ban risk. 100% client-side processing. Free Instagram unfollow tracker.',
  keywords: 'instagram unfollower tracker, who unfollowed me instagram, instagram unfollow checker, check instagram unfollowers, see who unfollowed you instagram, instagram follower tracker, safe unfollow tracker, no login instagram tracker',
  authors: [{ name: 'SafeUnfollow' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://safeunfollow.com',
    title: 'SafeUnfollow — The Safest Instagram Unfollow Tracker',
    description: 'Find out who unfollowed you on Instagram. No login, no ban risk. Your data never leaves your device.',
    siteName: 'SafeUnfollow',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeUnfollow — See Who Unfollowed You on Instagram',
    description: 'Free, safe Instagram unfollow tracker. No login required.',
  },
  alternates: {
    canonical: 'https://safeunfollow.com',
  },
  other: {
    'og:locale:alternate': 'ko_KR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#2563EB" />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
