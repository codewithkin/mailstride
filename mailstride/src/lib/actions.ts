'use server'

import { signIn } from "@/auth"
import { prisma } from "@/prisma"
import { redirect } from "next/navigation"

export async function authenticateWithEmail(formData: FormData) {
  await signIn("resend", {
    ...Object.fromEntries(formData),
    redirect: true,
    callbackUrl: '/auth/verify-request'
  })
}

export async function authenticateWithGoogle() {
  // DELETE ALL USERS 
  // TODO: Remove in production
  // await prisma.user.deleteMany()

  return await signIn("google", {
    redirect: true,
    callbackUrl: '/dashboard'
  })
}

export async function updateProfile(formData: FormData) {
  'use server'
  
  const name = formData.get('name') as string
  const username = formData.get('username') as string

  redirect('/dashboard')
}