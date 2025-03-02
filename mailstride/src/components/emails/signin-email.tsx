import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface SignInEmailProps {
  url: string
}

export const SignInEmail = ({ url }: SignInEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Sign in to Mailstride</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Mailstride! 👋</Heading>
          
          <Text style={text}>
            We're excited to have you here! Click the button below to sign in to your account.
            This link will expire in 24 hours and can only be used once.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Sign in to Mailstride
            </Button>
          </Section>

          <Text style={footer}>
            If you didn't request this email, you can safely ignore it.
            <br />
            <Link href={url} style={link}>
              {url}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
}

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  textAlign: 'center' as const,
}

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
}

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
  marginBottom: '32px',
}

const button = {
  backgroundColor: '#4f46e5',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  backgroundImage: 'linear-gradient(to right, #4f46e5, #9333ea)',
}

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginTop: '32px',
}

const link = {
  color: '#6b7280',
  fontSize: '14px',
  textDecoration: 'underline',
} 