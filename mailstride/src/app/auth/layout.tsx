import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Authentication - Mailstride',
  description: 'Sign in to your Mailstride account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 