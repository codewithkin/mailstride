import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - MailStride',
  description: 'Join us in revolutionizing newsletter creation.',
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 