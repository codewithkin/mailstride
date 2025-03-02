import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Welcome to Mailstride',
  description: 'Complete your profile setup to get started with Mailstride',
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 