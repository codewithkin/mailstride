'use server'

import { signIn } from "@/auth"

export async function authenticateWithEmail(formData: FormData) {
  await signIn("resend", {
    ...Object.fromEntries(formData),
    redirect: true,
    callbackUrl: '/auth/verify-request'
  })
}

export async function authenticateWithGoogle() {
  await signIn("google", {
    redirect: true,
    callbackUrl: '/dashboard'
  })
}