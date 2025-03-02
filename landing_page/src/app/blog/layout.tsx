import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - MailStride',
  description: 'Insights and strategies for newsletter creators.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 