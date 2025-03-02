import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"
import { render } from '@react-email/render'
import { AuthEmail } from "@/components/emails/auth-email"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "Mailstride <hello@aiseogen.com>",
      apiKey: process.env.AUTH_RESEND_KEY,
      async generateVerificationToken() {
        return crypto.randomUUID()
      },
      async sendVerificationRequest({ identifier, token, url }) {
        try {
          const emailHtml = await render(AuthEmail({ url }))
          
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Mailstride <hello@aiseogen.com>",
              to: identifier,
              subject: "Sign in to Mailstride",
              html: emailHtml,
            }),
          })

          if (!res.ok) {
            console.error(await res.json())

            throw new Error('Failed to send verification email')
          }
        } catch (error) {
          throw new Error('Failed to send verification email')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/onboarding',
  },
  callbacks: {
    async signIn({ user, account }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      // If the url starts with '/', join it with the base url
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // If the url is already absolute, allow it
      else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  }
})