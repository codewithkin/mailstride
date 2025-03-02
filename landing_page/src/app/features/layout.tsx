import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - MailStride',
  description: 'Powerful features for modern newsletters. Everything you need to create, grow, and monetize your newsletter.',
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 