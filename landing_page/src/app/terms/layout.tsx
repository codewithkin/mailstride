import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - MailStride',
  description: 'Our terms and conditions.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 