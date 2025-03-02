import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Authentication Error - Mailstride',
  description: 'There was a problem signing you in to Mailstride',
}

export default function AuthErrorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 