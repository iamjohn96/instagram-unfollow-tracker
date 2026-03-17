import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Download Instagram Data | SafeUnfollow Guide',
  description: 'Step-by-step guide to download your Instagram followers data as JSON. Easy tutorial for iOS and Android.',
  alternates: { canonical: 'https://safeunfollow.com/guide' },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
