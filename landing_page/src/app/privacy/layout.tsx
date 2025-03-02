import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - MailStride',
  description: 'How we protect your data and privacy.',
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 