import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Sign in - Mailstride',
  description: 'Sign in to your Mailstride account',
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {children}
    </>
  )
}
