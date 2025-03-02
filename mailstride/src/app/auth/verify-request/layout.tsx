import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Check your email - Mailstride',
  description: 'Verify your email address to sign in to Mailstride',
}

export default function VerifyRequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 