import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | SafeUnfollow',
  alternates: { canonical: 'https://safeunfollow.com/terms' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
