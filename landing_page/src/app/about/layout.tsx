import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - MailStride',
  description: 'Our mission and vision for the future of newsletters.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 