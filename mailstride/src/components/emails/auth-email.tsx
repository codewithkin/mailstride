import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface AuthEmailProps {
  url: string
}

export function AuthEmail({ url }: AuthEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Sign in to Mailstride</Preview>
      <Tailwind>
        <Body className="bg-gradient-to-br from-slate-50 to-purple-50">
          <Container className="mx-auto py-8 px-4">
            <Section className="bg-white border border-purple-100 rounded-2xl shadow-xl shadow-purple-100/30 px-8 py-12 mb-6">
              <Heading className="text-3xl font-bold text-slate-800 text-center mb-3">
                Welcome back
              </Heading>
              <Text className="text-gray-600 text-lg text-center mb-6">
                Click the button below to sign in to your account.
              </Text>
              <Section className="text-center mb-8">
                <Link
                  href={url}
                  className="inline-block px-8 py-4 bg-[#4F46E5] rounded-xl text-white font-medium shadow-xl"
                  style={{
                    background: '#4F46E5',
                    color: '#ffffff',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontWeight: '500',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    textDecoration: 'none',
                  }}
                >
                  Sign in to Mailstride
                </Link>
              </Section>
              <Text className="text-gray-400 text-xs text-center mt-4">
                <Link href={url} className="text-[#4F46E5] underline">
                  {url}
                </Link>
              </Text>
            </Section>
            <Text className="text-gray-400 text-xs text-center">
              © {new Date().getFullYear()} Mailstride
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 