import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Automations - Mailstride',
  description: 'Create automated email sequences',
}

export default function AutomationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 