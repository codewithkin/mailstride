import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Subscribers - Mailstride',
  description: 'Manage your newsletter subscribers',
}

export default function SubscribersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 