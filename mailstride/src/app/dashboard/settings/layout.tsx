import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Settings - Mailstride',
  description: 'Manage your Mailstride account settings',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 