import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Program - MailStride',
  description: 'Grow together with MailStride.',
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 