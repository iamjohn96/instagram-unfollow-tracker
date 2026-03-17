import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Instagram Data | SafeUnfollow',
  description: 'Upload your Instagram data file to see who unfollowed you. 100% private, processed in your browser.',
  alternates: { canonical: 'https://safeunfollow.com/upload' },
}

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
