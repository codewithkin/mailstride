import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community - MailStride',
  description: 'Connect with fellow newsletter creators and grow together.',
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 