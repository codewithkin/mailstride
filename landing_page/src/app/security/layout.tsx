import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security - MailStride',
  description: 'How we keep your data safe.',
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 