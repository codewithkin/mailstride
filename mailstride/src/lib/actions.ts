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

  // Here you would typically:
  // 1. Validate the input
  // 2. Update the user profile in the database
  // 3. Redirect to the dashboard

  redirect('/dashboard')
}