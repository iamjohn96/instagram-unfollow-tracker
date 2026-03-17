import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | SafeUnfollow',
  alternates: { canonical: 'https://safeunfollow.com/privacy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
