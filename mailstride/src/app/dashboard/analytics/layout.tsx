import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Analytics - Mailstride',
  description: 'Track your email campaign performance',
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 