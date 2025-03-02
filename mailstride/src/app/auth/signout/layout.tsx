import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Sign out - Mailstride',
  description: 'Sign out of your Mailstride account',
}

export default function SignOutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 