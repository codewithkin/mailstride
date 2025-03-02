import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guides - MailStride',
  description: 'Comprehensive guides to help you master email marketing.',
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 