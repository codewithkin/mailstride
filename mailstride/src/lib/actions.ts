'use server'

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function authenticateWithEmail(formData: FormData) {
  await signIn("resend", {
    ...Object.fromEntries(formData),
    redirect: true,
    callbackUrl: '/auth/verify-request'
  })
}

export async function authenticateWithGoogle() {
  await signIn("google", {
    callbackUrl: '/dashboard'
  })
}

export async function updateProfile(formData: FormData) {
  'use server'
  
  const name = formData.get('name') as string
  const username = formData.get('username') as string

  redirect('/dashboard')
}