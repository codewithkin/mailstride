import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Email Campaigns - Mailstride',
  description: 'Create and manage your email campaigns',
}

export default function EmailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 