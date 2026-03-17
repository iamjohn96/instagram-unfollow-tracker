import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram Follower Analysis | SafeUnfollow Dashboard',
  description: 'View your Instagram unfollow analysis. See who doesn\'t follow you back, mutual followers, and changes.',
  alternates: { canonical: 'https://safeunfollow.com/dashboard' },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
