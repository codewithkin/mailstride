import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center - MailStride',
  description: 'Get the support you need to succeed with MailStride.',
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 